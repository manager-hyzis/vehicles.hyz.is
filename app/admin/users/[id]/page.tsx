"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Save, Trash2, Eye } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  type: string
  status: string
  createdAt: string
  address: string
  city: string
  state: string
  _count?: {
    vehicles: number
    reviews: number
  }
}

export default function AdminUserDetailsPage() {
  const params = useParams()
  const userId = params.id as string
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<User>>({})

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const handleThemeToggle = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }
    if (status === "authenticated" && session?.user?.type !== "ADMIN") {
      router.push("/")
      return
    }
    if (status === "authenticated") {
      fetchUser()
    }
  }, [status, session])

  const fetchUser = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/users/${userId}`)
      if (response.ok) {
        const data = await response.json()
        setUser(data)
        setFormData(data)
      } else {
        toast.error("Usuário não encontrado")
        router.push("/admin/users")
      }
    } catch (error) {
      console.error("Error fetching user:", error)
      toast.error("Erro ao carregar usuário")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Usuário atualizado com sucesso")
        fetchUser()
      } else {
        const error = await response.json()
        toast.error(error.message || "Erro ao atualizar usuário")
      }
    } catch (error) {
      console.error("Error updating user:", error)
      toast.error("Erro ao atualizar usuário")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita.")) return

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Usuário deletado com sucesso")
        router.push("/admin/users")
      } else {
        const error = await response.json()
        toast.error(error.message || "Erro ao deletar usuário")
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Erro ao deletar usuário")
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
        <Footer isDarkMode={isDarkMode} />
      </div>
    )
  }

  if (!user) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
        <div className="flex items-center justify-center py-12">
          <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Usuário não encontrado</p>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <section className={`py-8 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
              Detalhes do Usuário
            </h1>
            <Button
              variant="outline"
              className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
              onClick={() => router.push("/admin/users")}
            >
              Voltar
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informações Principais */}
            <div className="lg:col-span-2 space-y-6">
              <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
                <CardHeader>
                  <CardTitle className={isDarkMode ? 'text-white' : 'text-[#222]'}>
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Nome
                    </label>
                    <Input
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      disabled={isSaving}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      disabled={isSaving}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Telefone
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      disabled={isSaving}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Endereço
                    </label>
                    <Input
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      disabled={isSaving}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Cidade
                      </label>
                      <Input
                        name="city"
                        value={formData.city || ""}
                        onChange={handleChange}
                        disabled={isSaving}
                        className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Estado
                      </label>
                      <Input
                        name="state"
                        value={formData.state || ""}
                        onChange={handleChange}
                        disabled={isSaving}
                        className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
                <CardHeader>
                  <CardTitle className={isDarkMode ? 'text-white' : 'text-[#222]'}>
                    Configurações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Tipo de Perfil
                    </label>
                    <Select value={formData.type || ""} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger disabled={isSaving} className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                        <SelectItem value="PRIVATE">Pessoa Física</SelectItem>
                        <SelectItem value="RESELLER">Revendedora</SelectItem>
                        <SelectItem value="GARAGE">Garage/Logista</SelectItem>
                        <SelectItem value="DEALERSHIP">Concessionária</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Status
                    </label>
                    <Select value={formData.status || ""} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger disabled={isSaving} className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                        <SelectItem value="ACTIVE">Ativo</SelectItem>
                        <SelectItem value="INACTIVE">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Botões de Ação */}
              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-[#dc2626] hover:bg-[#991b1b]"
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
                <Button
                  onClick={handleDelete}
                  className="flex-1 bg-red-700 hover:bg-red-800"
                  disabled={isSaving}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Deletar Usuário
                </Button>
              </div>
            </div>

            {/* Resumo */}
            <div className="space-y-6">
              <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
                <CardHeader>
                  <CardTitle className={isDarkMode ? 'text-white' : 'text-[#222]'}>
                    Resumo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <p className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                      Data de Cadastro
                    </p>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>

                  <div>
                    <p className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                      Total de Anúncios
                    </p>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      {user._count?.vehicles || 0}
                    </p>
                  </div>

                  <div>
                    <p className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                      Total de Avaliações
                    </p>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      {user._count?.reviews || 0}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className={`w-full ${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                    onClick={() => router.push(`/admin/users?search=${user.email}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Anúncios
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
