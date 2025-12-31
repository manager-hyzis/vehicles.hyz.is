"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Reseller {
  id: string
  name: string
  type: string
  logo: string
  city: string
  state: string
  reputation: {
    rating: number
    totalReviews: number
  }
  _count?: {
    vehicles: number
  }
}

const states = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
]

export default function ResellersPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [resellers, setResellers] = useState<Reseller[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    state: "",
    city: "",
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
    fetchResellers()
  }, [filters])

  const fetchResellers = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        ...(filters.state && { state: filters.state }),
        ...(filters.city && { city: filters.city }),
        ...(filters.search && { search: filters.search }),
      })

      const response = await fetch(`/api/users/resellers?${params}`)
      if (response.ok) {
        const data = await response.json()
        setResellers(data)
      }
    } catch (error) {
      console.error("Error fetching resellers:", error)
      toast.error("Erro ao carregar revendedoras")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <section className={`py-8 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
            Revendedoras
          </h1>

          {/* Filtros */}
          <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} mb-8`}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Buscar por nome"
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                />
                <Select value={filters.state} onValueChange={(value) => handleFilterChange("state", value)}>
                  <SelectTrigger className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                    <SelectItem value="">Todos</SelectItem>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Cidade"
                  value={filters.city}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                  className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                />
                <Button
                  onClick={() => setFilters({ state: "", city: "", search: "" })}
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
              <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Carregando revendedoras...</p>
            </div>
          ) : resellers.length === 0 ? (
            <div className="text-center py-12">
              <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Nenhuma revendedora encontrada</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resellers.map((reseller) => (
                <Link key={reseller.id} href={`/resellers/${reseller.id}`}>
                  <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} hover:shadow-lg transition-shadow h-full`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        {reseller.logo ? (
                          <img
                            src={reseller.logo}
                            alt={reseller.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className={`w-16 h-16 rounded flex items-center justify-center ${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'}`}>
                            <span className={`text-xs ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Logo</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                            {reseller.name}
                          </h3>
                          <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                            {reseller.type === "REVENDEDORA"
                              ? "Revendedora"
                              : reseller.type === "GARAGE"
                              ? "Garage/Logista"
                              : "Concessionária"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                            {reseller.city}, {reseller.state}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-[#dc2626] text-[#dc2626]" />
                          <span className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                            {reseller.reputation.rating.toFixed(1)} ({reseller.reputation.totalReviews} avaliações)
                          </span>
                        </div>

                        <div>
                          <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                            <strong>{reseller._count?.vehicles || 0}</strong> veículos em estoque
                          </p>
                        </div>
                      </div>

                      <Button className="w-full mt-4 bg-[#dc2626] hover:bg-[#991b1b]">
                        Ver Veículos
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
