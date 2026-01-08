'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Menu, X, Sun, Moon, Search, MapPin, ChevronDown, Home as HomeIcon, MessageCircle, FileText, User, Heart, ArrowRight, Facebook, Instagram } from 'lucide-react'

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    type: '',
    vehicle: '',
    price: '',
    motorization: '',
    year: '',
    city: ''
  })
  const [resellers, setResellers] = useState<any[]>([])
  const [destaqueVehicles, setDestaqueVehicles] = useState<any[]>([])
  const [superDestaqueVehicles, setSuperDestaqueVehicles] = useState<any[]>([])
  const [ofertaoVehicles, setOfertaoVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const router = useRouter()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [resellersRes, destaqueRes, superDestaqueRes, ofertaoRes] = await Promise.all([
          fetch('/api/users/resellers/featured?limit=4'),
          fetch('/api/vehicles/highlights?type=DESTAQUE&limit=3'),
          fetch('/api/vehicles/highlights?type=SUPER_DESTAQUE&limit=3'),
          fetch('/api/vehicles/highlights?type=OFERTAO&limit=3'),
        ])

        const [resellersData, destaqueData, superDestaqueData, ofertaoData] = await Promise.all([
          resellersRes.json(),
          destaqueRes.json(),
          superDestaqueRes.json(),
          ofertaoRes.json(),
        ])

        setResellers(resellersData.resellers || [])
        setDestaqueVehicles(destaqueData.vehicles || [])
        setSuperDestaqueVehicles(superDestaqueData.vehicles || [])
        setOfertaoVehicles(ofertaoData.vehicles || [])
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    Object.entries(searchFilters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    window.location.href = `/search?${params.toString()}`
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-[#fff]'}`}>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className={`${isDarkMode ? 'bg-[#111]' : 'bg-[#fff]'} h-full flex flex-col`}>
            <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'}`}>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#fe2601] rounded-full flex items-center justify-center mr-2">
                  <span className="text-[#fff] font-bold text-sm">V</span>
                </div>
                <span className="text-[#fe2601] font-bold text-lg">Vehicles</span>
              </div>
              <button onClick={toggleMenu}>
                <X className={`w-6 h-6 ${isDarkMode ? 'text-[#fff]' : 'text-[#222]'}`} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <p className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-sm leading-relaxed mb-6`}>
                Plataforma completa para compra e venda de veículos usados. Encontre o veículo ideal com segurança e praticidade.
              </p>
              <div className="mb-8">
                <h3 className={`${isDarkMode ? 'text-[#fff]' : 'text-[#222]'} font-semibold text-lg mb-4`}>Menu</h3>
                <ul className="space-y-3">
                  {['Buscar Veículos', 'Revendedoras', 'Planos', 'Contato'].map((item, index) => (
                    <li key={index}>
                      <a href="#" className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-sm hover:text-[#fe2601] transition-colors`}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <header className={`hidden md:block ${isDarkMode ? 'bg-[#222]' : 'bg-[#fff]'} border-b ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} px-4 py-3`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#fe2601] rounded-full flex items-center justify-center mr-2">
              <span className="text-[#fff] font-bold text-lg">V</span>
            </div>
            <span className="text-[#fe2601] font-bold text-xl">Vehicles</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-sm`}>
              <MapPin className="w-4 h-4 mr-1" />
              São Paulo - SP
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={toggleTheme} className="p-1">
                {isDarkMode ? <Sun className="w-5 h-5 text-[#7e7e7e]" /> : <Moon className="w-5 h-5 text-[#7e7e7e]" />}
              </button>
              <a href="/login" className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-sm`}>Acessar</a>
              <span className="text-[#7e7e7e]">|</span>
              <a href="/register" className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-sm`}>Cadastrar</a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className={`md:hidden ${isDarkMode ? 'bg-[#222]' : 'bg-[#fff]'} border-b ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} px-4 py-3`}>
        <div className="flex items-center justify-between">
          <button onClick={toggleMenu}>
            <Menu className={`w-6 h-6 ${isDarkMode ? 'text-[#fff]' : 'text-[#222]'}`} />
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#fe2601] rounded-full flex items-center justify-center mr-2">
              <span className="text-[#fff] font-bold text-sm">V</span>
            </div>
            <span className="text-[#fe2601] font-bold text-lg">Vehicles</span>
          </div>
          <button onClick={toggleTheme} className={`flex items-center ${isDarkMode ? 'bg-[#454545]' : 'bg-[#ebebeb]'} rounded-full p-1`}>
            {isDarkMode ? (
              <>
                <div className="w-6 h-6 bg-[#fff] rounded-full flex items-center justify-center">
                  <Moon className="w-3 h-3 text-[#222]" />
                </div>
                <Sun className="w-4 h-4 text-[#7e7e7e] mx-1" />
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-[#7e7e7e] mx-1" />
                <div className="w-6 h-6 bg-[#222] rounded-full"></div>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Desktop Navigation */}
      <nav className={`hidden md:block ${isDarkMode ? 'bg-[#222]' : 'bg-[#fff]'} border-b ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} px-4 py-3`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className={`flex items-center ${isDarkMode ? 'text-[#fff]' : 'text-[#222]'} font-medium`}>
              Categorias
              <ChevronDown className="w-4 h-4 ml-1" />
            </div>
            <span className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Carros</span>
            <span className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Motos</span>
            <span className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Caminhões</span>
            <span className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Revendedoras</span>
          </div>
          <Button className="bg-[#fe2601] hover:bg-[#fe2601]/90 text-[#fff] px-6">Anunciar Veículo</Button>
        </div>
      </nav>

      {/* Hero Section - Red Banner with Advanced Filter */}
      <section className="bg-gradient-to-r from-[#fe2601] to-[#fe2601] px-4 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-[#ffffff] text-3xl md:text-4xl font-bold">
              Encontre seu veículo
            </h1>
          </div>

          {/* Advanced Filter Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {/* Tipo */}
              <div>
                <select 
                  value={searchFilters.type}
                  onChange={(e) => setSearchFilters({...searchFilters, type: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-700 border-0 focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
                >
                  <option value="">Tipo</option>
                  <option value="carros">Carros e Vans</option>
                  <option value="motos">Motos</option>
                  <option value="caminhoes">Caminhões e Ônibus</option>
                  <option value="tratores">Tratores e Máquinas</option>
                  <option value="nautica">Náutica</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              {/* Veículo */}
              <div>
                <input
                  type="text"
                  placeholder="Veículo"
                  value={searchFilters.vehicle}
                  onChange={(e) => setSearchFilters({...searchFilters, vehicle: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-700 border-0 focus:ring-2 focus:ring-orange-500 placeholder:text-gray-500"
                />
              </div>

              {/* Valor médio */}
              <div>
                <select 
                  value={searchFilters.price}
                  onChange={(e) => setSearchFilters({...searchFilters, price: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-700 border-0 focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
                >
                  <option value="">Valor médio</option>
                  <option value="0-20000">Até R$ 20.000</option>
                  <option value="20000-40000">R$ 20.000 - R$ 40.000</option>
                  <option value="40000-60000">R$ 40.000 - R$ 60.000</option>
                  <option value="60000-80000">R$ 60.000 - R$ 80.000</option>
                  <option value="80000-100000">R$ 80.000 - R$ 100.000</option>
                  <option value="100000+">Acima de R$ 100.000</option>
                </select>
              </div>

              {/* Motorização */}
              <div>
                <select 
                  value={searchFilters.motorization}
                  onChange={(e) => setSearchFilters({...searchFilters, motorization: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-700 border-0 focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
                >
                  <option value="">Motorização</option>
                  <option value="1.0">1.0</option>
                  <option value="1.4">1.4</option>
                  <option value="1.6">1.6</option>
                  <option value="1.8">1.8</option>
                  <option value="2.0">2.0</option>
                  <option value="2.5+">2.5+</option>
                </select>
              </div>

              {/* Ano */}
              <div>
                <select 
                  value={searchFilters.year}
                  onChange={(e) => setSearchFilters({...searchFilters, year: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-700 border-0 focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
                >
                  <option value="">Ano</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2010-2014">2010-2014</option>
                  <option value="2000-2009">2000-2009</option>
                </select>
              </div>

              {/* Cidade */}
              <div>
                <select 
                  value={searchFilters.city}
                  onChange={(e) => setSearchFilters({...searchFilters, city: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-700 border-0 focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
                >
                  <option value="">Cidade</option>
                  <option value="sao-paulo">São Paulo - SP</option>
                  <option value="rio-de-janeiro">Rio de Janeiro - RJ</option>
                  <option value="belo-horizonte">Belo Horizonte - MG</option>
                  <option value="brasilia">Brasília - DF</option>
                  <option value="curitiba">Curitiba - PR</option>
                  <option value="porto-alegre">Porto Alegre - RS</option>
                  <option value="salvador">Salvador - BA</option>
                  <option value="fortaleza">Fortaleza - CE</option>
                  <option value="recife">Recife - PE</option>
                  <option value="manaus">Manaus - AM</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3 text-sm">
                <a href="/search" className="text-white hover:text-orange-300 transition-colors flex items-center gap-1">
                  <ChevronDown className="w-4 h-4" />
                  Busca avançada
                </a>
                <a href="/resellers" className="text-white hover:text-orange-300 transition-colors flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Revendas por cidade
                </a>
              </div>
              <Button 
                onClick={handleSearch}
                className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-3 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                ENCONTRAR
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Revendedoras */}
      <section className={`${isDarkMode ? 'bg-[#111]' : 'bg-[#fafafa]'} px-4 py-12 md:py-16`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`${isDarkMode ? 'text-[#fff]' : 'text-[#222]'} text-2xl md:text-3xl font-bold mb-8`}>Revendedoras</h2>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`${isDarkMode ? 'bg-[#222]' : 'bg-[#fff]'} rounded-lg p-6 text-center animate-pulse`}>
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : resellers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {resellers.map((reseller) => (
                <Link key={reseller.id} href={`/resellers/${reseller.id}`} className={`${isDarkMode ? 'bg-[#222]' : 'bg-[#fff]'} rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer`}>
                  <div className="w-20 h-20 bg-[#1b7a3a] rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    {reseller.logo ? (
                      <Image src={reseller.logo} alt={reseller.name} width={80} height={80} className="object-cover" />
                    ) : (
                      <span className="text-[#fff] text-2xl font-bold">{reseller.name.charAt(0)}</span>
                    )}
                  </div>
                  <h3 className={`${isDarkMode ? 'text-[#fff]' : 'text-[#222]'} font-semibold mb-1`}>{reseller.name}</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} mb-2`}>{reseller.city} - {reseller.state}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>⭐ {reseller.reputation?.toFixed(1) || '0.0'} ({reseller._count.reviews} avaliações)</p>
                  <p className={`text-xs ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} mt-1`}>{reseller._count.vehicles} veículos</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className={`text-center ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Nenhuma revendedora encontrada</p>
          )}
        </div>
      </section>

      {/* Veículos em Destaque */}
      <section className={`${isDarkMode ? 'bg-[#222]' : 'bg-white'} px-4 py-12 md:py-16`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs font-bold mb-2">DESTAQUE</span>
            <h2 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-2xl md:text-3xl font-bold`}>Veículos em Destaque</h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`${isDarkMode ? 'bg-[#111]' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} overflow-hidden animate-pulse`}>
                  <div className="w-full h-48 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-3"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : destaqueVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destaqueVehicles.map((vehicle) => (
                <Link key={vehicle.id} href={`/listings/${vehicle.id}`} className={`${isDarkMode ? 'bg-[#111]' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} overflow-hidden hover:shadow-md transition-shadow`}>
                  <div className="relative">
                    {vehicle.images && vehicle.images.length > 0 ? (
                      <Image 
                        src={vehicle.images[0].imageUrl} 
                        alt={vehicle.title} 
                        width={400} 
                        height={200} 
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-5xl">🚗</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded text-xs font-bold">
                      DESTAQUE
                    </div>
                    <button className="absolute top-3 right-3" onClick={(e) => e.preventDefault()}>
                      <Heart className="w-6 h-6 text-[#fe2601]" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-2`}>{vehicle.title}</h3>
                    <div className={`flex items-center ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-sm mb-3`}>
                      <MapPin className="w-4 h-4 mr-1" />
                      {vehicle.city}, {vehicle.state}
                    </div>
                    <p className="text-blue-600 font-bold text-lg">{formatPrice(Number(vehicle.price))}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className={`text-center ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Nenhum veículo em destaque no momento</p>
          )}
        </div>
      </section>

      {/* Super Destaque - Veículos Premium */}
      <section className={`${isDarkMode ? 'bg-[#111]' : 'bg-[#fafafa]'} px-4 py-12 md:py-16`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded text-xs font-bold mb-2">SUPER DESTAQUE</span>
            <h2 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-2xl md:text-3xl font-bold`}>Super Destaque - Veículos Premium</h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`${isDarkMode ? 'bg-[#222]' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} overflow-hidden animate-pulse`}>
                  <div className="w-full h-48 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-3"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : superDestaqueVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {superDestaqueVehicles.map((vehicle) => (
                <Link key={vehicle.id} href={`/listings/${vehicle.id}`} className={`${isDarkMode ? 'bg-[#222]' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} overflow-hidden hover:shadow-md transition-shadow`}>
                  <div className="relative">
                    {vehicle.images && vehicle.images.length > 0 ? (
                      <Image 
                        src={vehicle.images[0].imageUrl} 
                        alt={vehicle.title} 
                        width={400} 
                        height={200} 
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                        <span className="text-5xl">✨🚗</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-purple-500 text-white px-3 py-1 rounded text-xs font-bold">
                      SUPER DESTAQUE
                    </div>
                    <button className="absolute top-3 right-3" onClick={(e) => e.preventDefault()}>
                      <Heart className="w-6 h-6 text-[#fe2601]" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-2`}>{vehicle.title}</h3>
                    <div className={`flex items-center ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-sm mb-3`}>
                      <MapPin className="w-4 h-4 mr-1" />
                      {vehicle.city}, {vehicle.state}
                    </div>
                    <p className="text-purple-600 font-bold text-lg">{formatPrice(Number(vehicle.price))}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className={`text-center ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Nenhum veículo super destaque no momento</p>
          )}
        </div>
      </section>

      {/* Ofertão - Oportunidades Imperdíveis */}
      <section className={`${isDarkMode ? 'bg-[#222]' : 'bg-white'} px-4 py-12 md:py-16`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded text-xs font-bold mb-2">OFERTÃO</span>
            <h2 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-2xl md:text-3xl font-bold`}>Ofertão - Oportunidades Imperdíveis</h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`${isDarkMode ? 'bg-[#111]' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} overflow-hidden animate-pulse`}>
                  <div className="w-full h-48 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-3"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : ofertaoVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ofertaoVehicles.map((vehicle) => (
                <Link key={vehicle.id} href={`/listings/${vehicle.id}`} className={`${isDarkMode ? 'bg-[#111]' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} overflow-hidden hover:shadow-md transition-shadow`}>
                  <div className="relative">
                    {vehicle.images && vehicle.images.length > 0 ? (
                      <Image 
                        src={vehicle.images[0].imageUrl} 
                        alt={vehicle.title} 
                        width={400} 
                        height={200} 
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                        <span className="text-5xl">🔥🚗</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-xs font-bold">
                      OFERTÃO
                    </div>
                    <button className="absolute top-3 right-3" onClick={(e) => e.preventDefault()}>
                      <Heart className="w-6 h-6 text-[#fe2601]" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-2`}>{vehicle.title}</h3>
                    <div className={`flex items-center ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-sm mb-3`}>
                      <MapPin className="w-4 h-4 mr-1" />
                      {vehicle.city}, {vehicle.state}
                    </div>
                    <p className="text-red-600 font-bold text-lg">{formatPrice(Number(vehicle.price))}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className={`text-center ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Nenhum ofertão disponível no momento</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${isDarkMode ? 'bg-[#111]' : 'bg-[#222]'} px-4 py-16`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#fff] text-3xl font-bold mb-4">Publique. Conecte. Negocie. Simples!</h2>
          <p className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#a1a1aa]'} text-lg mb-8 leading-relaxed`}>
            Publique seu anúncio, conecte-se com compradores e feche negócios com facilidade. Experimente a praticidade hoje!
          </p>
          <Button className="bg-[#fe2601] hover:bg-[#fe2601]/90 text-[#fff] px-8 py-3 text-lg">
            Publique Seu Primeiro Anúncio
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-[#222]' : 'bg-[#fff]'} border-t ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} px-4 py-12`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#fe2601] rounded-full flex items-center justify-center mr-2">
                  <span className="text-[#fff] font-bold text-lg">V</span>
                </div>
                <span className="text-[#fe2601] font-bold text-xl">Vehicles</span>
              </div>
              <p className="text-[#7e7e7e] text-sm leading-relaxed mb-4">
                Plataforma completa para compra e venda de veículos usados. Encontre o veículo ideal com segurança e praticidade.
              </p>
              <div className="flex space-x-3">
                <div className={`w-8 h-8 ${isDarkMode ? 'bg-[#454545]' : 'bg-[#ebebeb]'} rounded flex items-center justify-center`}>
                  <Facebook className={`w-4 h-4 ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#454545]'}`} />
                </div>
                <div className={`w-8 h-8 ${isDarkMode ? 'bg-[#454545]' : 'bg-[#ebebeb]'} rounded flex items-center justify-center`}>
                  <Instagram className={`w-4 h-4 ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#454545]'}`} />
                </div>
              </div>
            </div>
            <div>
              <h3 className={`${isDarkMode ? 'text-[#fff]' : 'text-[#222]'} font-semibold mb-4`}>Categorias</h3>
              <ul className="space-y-2 text-[#7e7e7e] text-sm">
                <li>Carros e Vans</li>
                <li>Motos</li>
                <li>Caminhões</li>
                <li>Náutica</li>
              </ul>
            </div>
            <div>
              <h3 className={`${isDarkMode ? 'text-[#fff]' : 'text-[#222]'} font-semibold mb-4`}>Institucional</h3>
              <ul className="space-y-2 text-[#7e7e7e] text-sm">
                <li>Quem Somos</li>
                <li>Blog</li>
                <li>Trabalhe Conosco</li>
                <li>Fale Conosco</li>
              </ul>
            </div>
            <div>
              <h3 className={`${isDarkMode ? 'text-[#fff]' : 'text-[#222]'} font-semibold mb-4`}>Políticas</h3>
              <ul className="space-y-2 text-[#7e7e7e] text-sm">
                <li>Política de Privacidade</li>
                <li>Termos de Uso</li>
              </ul>
            </div>
          </div>
          <div className={`border-t ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} mt-8 pt-6 text-center`}>
            <p className="text-[#7e7e7e] text-sm">© 2025 Vehicles. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
