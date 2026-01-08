"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Eye } from "lucide-react"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  email: string
  type: string
  status: string
  createdAt: string
  _count?: {
    vehicles: number
  }
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    search: "",
  })

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
    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/")
      return
    }
    if (status === "authenticated") {
      fetchUsers()
    }
  }, [status, session, filters])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        ...(filters.type && { type: filters.type }),
        ...(filters.status && { status: filters.status }),
        ...(filters.search && { search: filters.search }),
      })

      const response = await fetch(`/api/admin/users?${params}`)
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Erro ao carregar usuários")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm("Tem certeza que deseja deletar este usuário?")) return

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Usuário deletado com sucesso")
        fetchUsers()
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Erro ao deletar usuário")
    }
  }

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE" }),
      })

      if (response.ok) {
        toast.success("Status atualizado com sucesso")
        fetchUsers()
      }
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Erro ao atualizar status")
    }
  }

  if (status === "loading") {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
        <Footer isDarkMode={isDarkMode} />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <section className={`py-8 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
            Gestão de Usuários
          </h1>

          {/* Filtros */}
          <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} mb-6`}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Buscar por nome ou email"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                />
                <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                  <SelectTrigger className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                    <SelectValue placeholder="Tipo de Perfil" />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="PRIVATE">Pessoa Física</SelectItem>
                    <SelectItem value="RESELLER">Revendedora</SelectItem>
                    <SelectItem value="GARAGE">Garage/Logista</SelectItem>
                    <SelectItem value="DEALERSHIP">Concessionária</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="ACTIVE">Ativo</SelectItem>
                    <SelectItem value="INACTIVE">Inativo</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => setFilters({ type: "", status: "", search: "" })}
                  className="bg-[#dc2626] hover:bg-[#991b1b]"
                >
                  Limpar Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Listagem */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Carregando usuários...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Nenhum usuário encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <Card key={user.id} className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                          {user.name}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                          {user.email}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                          Tipo
                        </p>
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                          {user.type === "PRIVATE"
                            ? "Pessoa Física"
                            : user.type === "RESELLER"
                            ? "Revendedora"
                            : user.type === "GARAGE"
                            ? "Garage"
                            : "Concessionária"}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                          Status
                        </p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            user.status === "ACTIVE"
                              ? isDarkMode
                                ? "bg-green-900 text-green-200"
                                : "bg-green-100 text-green-800"
                              : isDarkMode
                              ? "bg-red-900 text-red-200"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status === "ACTIVE" ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                          Anúncios
                        </p>
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                          {user._count?.vehicles || 0}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                          onClick={() => router.push(`/admin/users/${user.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                          onClick={() => handleToggleStatus(user.id, user.status)}
                        >
                          {user.status === "ACTIVE" ? "Desativar" : "Ativar"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-700 hover:bg-red-800 text-white border-red-700"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
