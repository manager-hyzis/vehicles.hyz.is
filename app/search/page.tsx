"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, MapPin, Gauge, Calendar } from "lucide-react"
import Link from "next/link"

const brands = ["Toyota", "Volkswagen", "Ford", "Chevrolet", "Fiat", "Honda", "Hyundai", "Renault", "BMW", "Mercedes-Benz"]
const fuels = ["GASOLINA", "DIESEL", "ELETRICO", "HIBRIDO", "ALCOOL"]
const transmissions = ["MANUAL", "AUTOMATICA"]
const states = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]
const userTypes = [
  { value: "PESSOA_FISICA", label: "Pessoa Física" },
  { value: "REVENDEDORA", label: "Revendedora" },
  { value: "GARAGE", label: "Garage/Logista" },
  { value: "CONCESSIONARIA", label: "Concessionária" },
]

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
}

export default function SearchPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    minYear: "",
    maxYear: "",
    minPrice: "",
    maxPrice: "",
    minMileage: "",
    maxMileage: "",
    fuel: "",
    transmission: "",
    city: "",
    state: "",
    userType: "",
    isOfertao: false,
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
        ...(filters.minYear && { minYear: filters.minYear }),
        ...(filters.maxYear && { maxYear: filters.maxYear }),
        ...(filters.minPrice && { minPrice: filters.minPrice }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
        ...(filters.minMileage && { minMileage: filters.minMileage }),
        ...(filters.maxMileage && { maxMileage: filters.maxMileage }),
        ...(filters.fuel && { fuel: filters.fuel }),
        ...(filters.transmission && { transmission: filters.transmission }),
        ...(filters.city && { city: filters.city }),
        ...(filters.state && { state: filters.state }),
        ...(filters.userType && { userType: filters.userType }),
        ...(filters.isOfertao && { isOfertao: "true" }),
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

  const handleFilterChange = (key: string, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
  }

  const handleReset = () => {
    setFilters({
      brand: "",
      model: "",
      minYear: "",
      maxYear: "",
      minPrice: "",
      maxPrice: "",
      minMileage: "",
      maxMileage: "",
      fuel: "",
      transmission: "",
      city: "",
      state: "",
      userType: "",
      isOfertao: false,
    })
    setPage(1)
  }

  const pages = Math.ceil(total / limit)

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <section className={`py-8 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <div className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} rounded-lg p-6 border sticky top-20`}>
              <h2 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-lg font-bold mb-4`}>Filtros</h2>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Marca</label>
                  <Select value={filters.brand} onValueChange={(value) => handleFilterChange("brand", value)}>
                    <SelectTrigger className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                      <SelectItem value="">Todas</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Modelo</label>
                  <Input
                    placeholder="Ex: Corolla"
                    value={filters.model}
                    onChange={(e) => handleFilterChange("model", e.target.value)}
                    className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Ano Mín.</label>
                    <Input
                      type="number"
                      placeholder="2010"
                      value={filters.minYear}
                      onChange={(e) => handleFilterChange("minYear", e.target.value)}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Ano Máx.</label>
                    <Input
                      type="number"
                      placeholder="2024"
                      value={filters.maxYear}
                      onChange={(e) => handleFilterChange("maxYear", e.target.value)}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Preço Mín.</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Preço Máx.</label>
                    <Input
                      type="number"
                      placeholder="999999"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>KM Mín.</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={filters.minMileage}
                      onChange={(e) => handleFilterChange("minMileage", e.target.value)}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>KM Máx.</label>
                    <Input
                      type="number"
                      placeholder="999999"
                      value={filters.maxMileage}
                      onChange={(e) => handleFilterChange("maxMileage", e.target.value)}
                      className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Combustível</label>
                  <Select value={filters.fuel} onValueChange={(value) => handleFilterChange("fuel", value)}>
                    <SelectTrigger className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                      <SelectItem value="">Todos</SelectItem>
                      {fuels.map((fuel) => (
                        <SelectItem key={fuel} value={fuel}>
                          {fuel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Câmbio</label>
                  <Select value={filters.transmission} onValueChange={(value) => handleFilterChange("transmission", value)}>
                    <SelectTrigger className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                      <SelectItem value="">Todos</SelectItem>
                      {transmissions.map((transmission) => (
                        <SelectItem key={transmission} value={transmission}>
                          {transmission}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Estado</label>
                  <Select value={filters.state} onValueChange={(value) => handleFilterChange("state", value)}>
                    <SelectTrigger className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                      <SelectValue placeholder="Todos" />
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
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Cidade</label>
                  <Input
                    placeholder="São Paulo"
                    value={filters.city}
                    onChange={(e) => handleFilterChange("city", e.target.value)}
                    className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>Tipo de Anunciante</label>
                  <Select value={filters.userType} onValueChange={(value) => handleFilterChange("userType", value)}>
                    <SelectTrigger className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                      <SelectItem value="">Todos</SelectItem>
                      {userTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="ofertao"
                    checked={filters.isOfertao}
                    onCheckedChange={(checked) => handleFilterChange("isOfertao", checked)}
                  />
                  <label htmlFor="ofertao" className={`text-sm cursor-pointer ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                    Apenas Ofertões
                  </label>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#454545]">
                  <Button onClick={fetchVehicles} className="w-full bg-[#dc2626] hover:bg-[#991b1b]">
                    Aplicar Filtros
                  </Button>
                  <Button onClick={handleReset} variant="outline" className={`w-full ${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}>
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-3">
            <h1 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-3xl font-bold mb-8`}>
              Busca Avançada ({total} encontrados)
            </h1>

            {isLoading ? (
              <div className="text-center py-12">
                <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Carregando anúncios...</p>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-12">
                <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Nenhum anúncio encontrado com esses filtros</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                                {vehicle.user.type === "PESSOA_FISICA"
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
                      {Array.from({ length: Math.min(pages, 5) }).map((_, i) => (
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
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
