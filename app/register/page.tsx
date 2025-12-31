"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import Link from "next/link"

const userTypes = [
  { value: "PESSOA_FISICA", label: "Pessoa Física" },
  { value: "REVENDEDORA", label: "Revendedora" },
  { value: "GARAGE", label: "Garage/Logista" },
  { value: "CONCESSIONARIA", label: "Concessionária" },
]

const states = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
]

export default function RegisterPage() {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    type: "PESSOA_FISICA",
    phone: "",
    city: "",
    state: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      toast.error("Senhas não conferem")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          type: formData.type,
          phone: formData.phone,
          city: formData.city,
          state: formData.state,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.message || "Erro ao cadastrar")
        return
      }

      toast.success("Cadastro realizado com sucesso!")
      router.push("/login")
    } catch (error) {
      toast.error("Erro ao cadastrar")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      
      <div className={`flex items-center justify-center ${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'} p-4 py-12`}>
        <Card className={`w-full max-w-md ${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
          <CardHeader className="space-y-2">
            <CardTitle className={`text-2xl ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Cadastro</CardTitle>
            <CardDescription className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Crie sua conta na Vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                  Nome Completo
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                  Telefone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                  Tipo de Perfil
                </label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger id="type" disabled={isLoading} className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                    {userTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label htmlFor="state" className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                    Estado
                  </label>
                  <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                    <SelectTrigger id="state" disabled={isLoading} className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
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

                <div className="space-y-2">
                  <label htmlFor="city" className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                    Cidade
                  </label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="São Paulo"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                  Senha
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                  Confirmar Senha
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#dc2626] hover:bg-[#991b1b]"
                disabled={isLoading}
              >
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>

            <div className={`mt-4 text-center text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
              Já tem conta?{" "}
              <Link href="/login" className="text-[#dc2626] hover:underline font-medium">
                Faça login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
