"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, MapPin, Gauge, Calendar } from "lucide-react"
import Link from "next/link"

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  city: string
  state: string
  images: Array<{ imageUrl: string }>
  user: { name: string; type: string }
  _count?: { favorites: number }
}

export default function ListingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    city: "",
    minPrice: "",
    maxPrice: "",
  })

  const limit = 12

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
    fetchVehicles()
  }, [page, filters])

  const fetchVehicles = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filters.brand && { brand: filters.brand }),
        ...(filters.model && { model: filters.model }),
        ...(filters.city && { city: filters.city }),
        ...(filters.minPrice && { minPrice: filters.minPrice }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
      })

      const response = await fetch(`/api/vehicles?${params}`)
      const data = await response.json()
      setVehicles(data.vehicles)
      setTotal(data.pagination.total)
    } catch (error) {
      console.error("Error fetching vehicles:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
  }

  const pages = Math.ceil(total / limit)

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      {/* Filtros */}
      <section className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} border-b py-6 px-4`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-lg font-bold mb-4`}>Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Marca"
              value={filters.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
              className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
            />
            <Input
              placeholder="Modelo"
              value={filters.model}
              onChange={(e) => handleFilterChange("model", e.target.value)}
              className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
            />
            <Input
              placeholder="Cidade"
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
            />
            <Input
              placeholder="Preço mínimo"
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
            />
            <Input
              placeholder="Preço máximo"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
            />
          </div>
        </div>
      </section>

      {/* Listagem */}
      <section className={`py-12 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-2xl font-bold mb-8`}>
            Anúncios ({total} encontrados)
          </h2>

          {isLoading ? (
            <div className="text-center py-12">
              <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Carregando anúncios...</p>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Nenhum anúncio encontrado</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {vehicles.map((vehicle) => (
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
                          <button className={`absolute top-2 right-2 ${isDarkMode ? 'bg-[#222]' : 'bg-white'} rounded-full p-2 hover:bg-gray-100`}>
                            <Heart className="w-5 h-5 text-[#dc2626]" />
                          </button>
                        </div>

                        <div className="p-4">
                          <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-bold text-lg mb-2`}>
                            {vehicle.brand} {vehicle.model}
                          </h3>

                          <p className="text-2xl font-bold text-[#dc2626] mb-4">
                            R$ {vehicle.price.toLocaleString("pt-BR")}
                          </p>

                          <div className={`space-y-2 text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} mb-4`}>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{vehicle.year}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Gauge className="w-4 h-4" />
                              <span>{vehicle.mileage.toLocaleString("pt-BR")} km</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {vehicle.city}, {vehicle.state}
                              </span>
                            </div>
                          </div>

                          <div className={`border-t ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} pt-3`}>
                            <p className={`text-xs ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                              {vehicle.user.type === "PRIVATE"
                                ? "Pessoa Física"
                                : "Revendedora"}
                            </p>
                            <p className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>{vehicle.user.name}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {pages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className={isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}
                  >
                    Anterior
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: pages }).map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={page === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(i + 1)}
                        className={page === i + 1 ? 'bg-[#dc2626] hover:bg-[#991b1b]' : isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    disabled={page === pages}
                    onClick={() => setPage(page + 1)}
                    className={isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}
                  >
                    Próxima
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
