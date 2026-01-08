"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MapPin, Gauge, Calendar, Phone, Mail, Share2, Flag } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  city: string
  state: string
  color: string
  engine: string
  fuel: string
  transmission: string
  observations: string
  images: Array<{ imageUrl: string }>
  user: {
    id: string
    name: string
    type: string
    phone: string
    email: string
    address: string
  }
  features: string[]
  characteristics: string[]
}

export default function ListingDetailsPage() {
  const params = useParams()
  const vehicleId = params.id as string
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [mainImageIndex, setMainImageIndex] = useState(0)

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
    fetchVehicle()
  }, [vehicleId])

  const fetchVehicle = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/vehicles/${vehicleId}`)
      if (response.ok) {
        const data = await response.json()
        setVehicle(data)
      } else {
        toast.error("Anúncio não encontrado")
      }
    } catch (error) {
      console.error("Error fetching vehicle:", error)
      toast.error("Erro ao carregar anúncio")
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleFavorite = async () => {
    try {
      const response = await fetch("/api/favorites", {
        method: isFavorite ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId }),
      })

      if (response.ok) {
        setIsFavorite(!isFavorite)
        toast.success(isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos")
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast.error("Erro ao atualizar favoritos")
    }
  }

  const handleReport = async () => {
    const reportType = prompt("Tipo de denúncia:\n1. Golpe\n2. Conteúdo inadequado\n3. Veículo roubado\n4. Outro")
    if (!reportType) return

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId,
          type: reportType,
          description: prompt("Descrição (opcional):") || "",
        }),
      })

      if (response.ok) {
        toast.success("Denúncia enviada com sucesso")
      }
    } catch (error) {
      console.error("Error reporting:", error)
      toast.error("Erro ao enviar denúncia")
    }
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
        <div className="flex items-center justify-center py-12">
          <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Carregando anúncio...</p>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
        <div className="flex flex-col items-center justify-center py-12">
          <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Anúncio não encontrado</p>
          <Link href="/search" className="mt-4 text-[#dc2626] hover:underline">
            Voltar para busca
          </Link>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Galeria de Imagens */}
            <div className="lg:col-span-2">
              <div className={`${isDarkMode ? 'bg-[#222]' : 'bg-white'} rounded-lg overflow-hidden mb-4`}>
                {vehicle.images.length > 0 ? (
                  <>
                    <img
                      src={vehicle.images[mainImageIndex].imageUrl}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-96 object-cover"
                    />
                    <div className="flex gap-2 p-4 overflow-x-auto">
                      {vehicle.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setMainImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 ${
                            mainImageIndex === index
                              ? "border-[#dc2626]"
                              : isDarkMode
                              ? "border-[#454545]"
                              : "border-[#e4e4e7]"
                          }`}
                        >
                          <img
                            src={image.imageUrl}
                            alt={`Thumbnail ${index}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className={`w-full h-96 flex items-center justify-center ${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'}`}>
                    <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Sem imagens</p>
                  </div>
                )}
              </div>

              {/* Informações do Veículo */}
              <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
                <CardContent className="p-6">
                  <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                    {vehicle.brand} {vehicle.model}
                  </h1>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className={`${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'} p-4 rounded`}>
                      <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Ano</p>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>{vehicle.year}</p>
                    </div>
                    <div className={`${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'} p-4 rounded`}>
                      <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Quilometragem</p>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>{vehicle.mileage.toLocaleString("pt-BR")} km</p>
                    </div>
                    <div className={`${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'} p-4 rounded`}>
                      <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Motor</p>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>{vehicle.engine}</p>
                    </div>
                    <div className={`${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'} p-4 rounded`}>
                      <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Combustível</p>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>{vehicle.fuel}</p>
                    </div>
                  </div>

                  {/* Características */}
                  {vehicle.characteristics.length > 0 && (
                    <div className="mb-6">
                      <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Características
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {vehicle.characteristics.map((char) => (
                          <span
                            key={char}
                            className={`px-3 py-1 rounded-full text-sm ${
                              isDarkMode
                                ? "bg-[#111] text-[#7e7e7e]"
                                : "bg-[#f5f5f5] text-[#52525b]"
                            }`}
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Observações */}
                  {vehicle.observations && (
                    <div>
                      <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Observações
                      </h3>
                      <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>
                        {vehicle.observations}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Informações do Vendedor e Ações */}
            <div className="space-y-4">
              {/* Preço */}
              <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
                <CardContent className="p-6">
                  <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} mb-2`}>Valor</p>
                  <p className="text-4xl font-bold text-[#dc2626] mb-6">
                    R$ {vehicle.price.toLocaleString("pt-BR")}
                  </p>
                  <Button className="w-full bg-[#dc2626] hover:bg-[#991b1b] mb-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Entrar em Contato
                  </Button>
                  <Button
                    variant="outline"
                    className={`w-full ${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                    onClick={handleToggleFavorite}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                    {isFavorite ? "Nos Favoritos" : "Adicionar aos Favoritos"}
                  </Button>
                </CardContent>
              </Card>

              {/* Informações do Vendedor */}
              <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
                <CardContent className="p-6">
                  <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                    Informações do Vendedor
                  </h3>
                  <div className="space-y-3">
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      {vehicle.user.name}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                      {vehicle.user.type === "PRIVATE" ? "Pessoa Física" : "Revendedora"}
                    </p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${vehicle.user.phone}`} className="text-[#dc2626] hover:underline">
                        {vehicle.user.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${vehicle.user.email}`} className="text-[#dc2626] hover:underline">
                        {vehicle.user.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>
                        {vehicle.city}, {vehicle.state}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ações */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className={`flex-1 ${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                  onClick={() => {
                    const text = `${vehicle.brand} ${vehicle.model} - R$ ${vehicle.price.toLocaleString("pt-BR")}`;
                    navigator.share({ title: "Vehicles", text, url: window.location.href });
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className={`flex-1 ${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                  onClick={handleReport}
                >
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
