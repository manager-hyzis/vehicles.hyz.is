"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Phone, Mail, Globe } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Reseller {
  id: string
  name: string
  type: string
  logo: string
  description: string
  city: string
  state: string
  phone: string
  email: string
  website: string
  reputation: {
    rating: number
    totalReviews: number
    totalSales: number
    responseTime: string
    recommendationPercentage: number
  }
  vehicles: Array<{
    id: string
    brand: string
    model: string
    year: number
    price: number
    mileage: number
    images: Array<{ imageUrl: string }>
  }>
}

export default function ResellerProfilePage() {
  const params = useParams()
  const resellerId = params.id as string
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [reseller, setReseller] = useState<Reseller | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)

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
    fetchReseller()
  }, [resellerId, page])

  const fetchReseller = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
      })

      const response = await fetch(`/api/users/${resellerId}/profile?${params}`)
      if (response.ok) {
        const data = await response.json()
        setReseller(data)
      } else {
        toast.error("Revendedora não encontrada")
      }
    } catch (error) {
      console.error("Error fetching reseller:", error)
      toast.error("Erro ao carregar perfil da revendedora")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
        <div className="flex items-center justify-center py-12">
          <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Carregando perfil...</p>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </div>
    )
  }

  if (!reseller) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
        <div className="flex items-center justify-center py-12">
          <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Revendedora não encontrada</p>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <section className={`py-8 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Header da Revendedora */}
          <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} mb-8`}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo */}
                <div className="flex justify-center items-start">
                  {reseller.logo ? (
                    <img
                      src={reseller.logo}
                      alt={reseller.name}
                      className="w-32 h-32 object-cover rounded"
                    />
                  ) : (
                    <div className={`w-32 h-32 rounded flex items-center justify-center ${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'}`}>
                      <span className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Sem logo</span>
                    </div>
                  )}
                </div>

                {/* Informações */}
                <div>
                  <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                    {reseller.name}
                  </h1>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                    {reseller.type === "RESELLER"
                      ? "Revendedora"
                      : reseller.type === "GARAGE"
                      ? "Garage/Logista"
                      : "Concessionária"}
                  </p>
                  <p className={`mb-4 ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                    {reseller.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{reseller.city}, {reseller.state}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${reseller.phone}`} className="text-[#dc2626] hover:underline">
                        {reseller.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${reseller.email}`} className="text-[#dc2626] hover:underline">
                        {reseller.email}
                      </a>
                    </div>
                    {reseller.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <a href={reseller.website} target="_blank" rel="noopener noreferrer" className="text-[#dc2626] hover:underline">
                          {reseller.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reputação */}
                <div className={`${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'} p-6 rounded`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                    Reputação
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(reseller.reputation.rating)
                                ? "fill-[#dc2626] text-[#dc2626]"
                                : isDarkMode
                                ? "text-[#454545]"
                                : "text-[#e4e4e7]"
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                        {reseller.reputation.rating.toFixed(1)} ({reseller.reputation.totalReviews} avaliações)
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                        <strong>Vendas:</strong> {reseller.reputation.totalSales}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                        <strong>Tempo de resposta:</strong> {reseller.reputation.responseTime}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                        <strong>Recomendação:</strong> {reseller.reputation.recommendationPercentage}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Veículos em Estoque */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
              Veículos em Estoque ({reseller.vehicles.length})
            </h2>

            {reseller.vehicles.length === 0 ? (
              <div className="text-center py-12">
                <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Nenhum veículo em estoque</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {reseller.vehicles.map((vehicle) => (
                  <Link key={vehicle.id} href={`/listings/${vehicle.id}`}>
                    <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} hover:shadow-lg transition-shadow h-full`}>
                      <CardContent className="p-0">
                        <div className={`relative w-full h-40 ${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'} overflow-hidden rounded-t`}>
                          {vehicle.images.length > 0 ? (
                            <img
                              src={vehicle.images[0].imageUrl}
                              alt={`${vehicle.brand} ${vehicle.model}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#7e7e7e]">
                              Sem imagem
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-bold text-lg mb-2`}>
                            {vehicle.brand} {vehicle.model}
                          </h3>

                          <p className="text-2xl font-bold text-[#dc2626] mb-4">
                            R$ {vehicle.price.toLocaleString("pt-BR")}
                          </p>

                          <div className={`space-y-1 text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                            <p><strong>Ano:</strong> {vehicle.year}</p>
                            <p><strong>KM:</strong> {vehicle.mileage.toLocaleString("pt-BR")}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
