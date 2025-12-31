"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

const states = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
]

export default function EditProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "Brasil",
    acceptWeeklyOffers: false,
    acceptPartnerOffers: false,
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
    if (status === "authenticated" && session?.user?.id) {
      fetchUserProfile()
    }
  }, [status, session])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/users/profile")
      if (response.ok) {
        const data = await response.json()
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          neighborhood: data.neighborhood || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "Brasil",
          acceptWeeklyOffers: data.acceptWeeklyOffers || false,
          acceptPartnerOffers: data.acceptPartnerOffers || false,
        })
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast.error("Erro ao carregar perfil")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.message || "Erro ao atualizar perfil")
        return
      }

      toast.success("Perfil atualizado com sucesso!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Erro ao atualizar perfil")
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
        <div className="flex items-center justify-center py-12">
          <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Carregando...</p>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <section className={`py-12 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="max-w-2xl mx-auto">
          <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
            <CardHeader>
              <CardTitle className={`text-2xl ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Alterar Cadastro</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados do Usuário */}
                <div className="space-y-4">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Dados do Usuário</h3>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Nome
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
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
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Telefone
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Endereço
                    </label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Bairro
                    </label>
                    <Input
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Cidade
                    </label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Estado
                      </label>
                      <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                        <SelectTrigger disabled={isLoading} className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        País
                      </label>
                      <Input
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={isLoading}
                        className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                      />
                    </div>
                  </div>
                </div>

                {/* Preferências de Comunicação */}
                <div className="space-y-4 border-t border-[#454545] pt-6">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Preferências de Comunicação</h3>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="acceptWeeklyOffers"
                      name="acceptWeeklyOffers"
                      checked={formData.acceptWeeklyOffers}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptWeeklyOffers: checked as boolean }))}
                      disabled={isLoading}
                    />
                    <label htmlFor="acceptWeeklyOffers" className={`text-sm cursor-pointer ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Sim, aceito receber em meu e-mail, semanalmente, as melhores ofertas do Vehicles.
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="acceptPartnerOffers"
                      name="acceptPartnerOffers"
                      checked={formData.acceptPartnerOffers}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptPartnerOffers: checked as boolean }))}
                      disabled={isLoading}
                    />
                    <label htmlFor="acceptPartnerOffers" className={`text-sm cursor-pointer ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Sim, aceito receber em meu e-mail as promoções e ofertas que o Vehicles e seus parceiros realizarem.
                    </label>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-4 pt-6 border-t border-[#454545]">
                  <Button
                    type="submit"
                    className="flex-1 bg-[#dc2626] hover:bg-[#991b1b]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Salvando..." : "Alterar"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={`flex-1 ${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                    onClick={() => router.back()}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
