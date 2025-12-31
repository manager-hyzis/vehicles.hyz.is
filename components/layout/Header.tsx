'use client'

import { Search, MapPin, Menu, X, Sun, Moon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  isDarkMode?: boolean
  onThemeToggle?: (isDark: boolean) => void
}

export default function Header({ isDarkMode = false, onThemeToggle }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [vehicle, setVehicle] = useState('')
  const [city, setCity] = useState('São Paulo')
  const router = useRouter()

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (vehicle) params.append('vehicle', vehicle)
    if (city) params.append('city', city)
    router.push(`/search?${params.toString()}`)
  }

  const toggleTheme = () => {
    onThemeToggle?.(!isDarkMode)
  }

  return (
    <>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden bg-background">
          <div className="flex flex-col h-full">
            <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'}`}>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#dc2626] rounded-full flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="text-[#dc2626] font-bold text-lg">Vehicles</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <nav className="space-y-4">
                <a href="/" className="block text-foreground hover:text-[#dc2626]">Início</a>
                <a href="/search" className="block text-foreground hover:text-[#dc2626]">Busca Avançada</a>
                <a href="/resellers" className="block text-foreground hover:text-[#dc2626]">Revendedoras</a>
                <a href="/plans" className="block text-foreground hover:text-[#dc2626]">Planos</a>
                <a href="/contact" className="block text-foreground hover:text-[#dc2626]">Contato</a>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <header className={`hidden md:block ${isDarkMode ? 'bg-[#222]' : 'bg-white'} border-b ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} sticky top-0 z-50 shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#dc2626] rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-[#dc2626] font-bold text-xl">Vehicles</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/search" className={`text-sm ${isDarkMode ? 'text-[#7e7e7e] hover:text-white' : 'text-[#52525b] hover:text-[#dc2626]'}`}>Busca Avançada</a>
              <a href="/resellers" className={`text-sm ${isDarkMode ? 'text-[#7e7e7e] hover:text-white' : 'text-[#52525b] hover:text-[#dc2626]'}`}>Revendedoras</a>
              <button onClick={toggleTheme} className="p-1">
                {isDarkMode ? <Sun className="w-5 h-5 text-[#7e7e7e]" /> : <Moon className="w-5 h-5 text-[#7e7e7e]" />}
              </button>
              <a href="/login" className={`text-sm ${isDarkMode ? 'text-[#7e7e7e] hover:text-white' : 'text-[#52525b] hover:text-[#dc2626]'}`}>Acessar</a>
              <a href="/register" className={`text-sm ${isDarkMode ? 'text-[#7e7e7e] hover:text-white' : 'text-[#52525b] hover:text-[#dc2626]'}`}>Cadastrar</a>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2 items-center">
            <Input
              placeholder="Marca, modelo ou placa"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'} flex-1`}
            />
            <select className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'} px-3 py-2 rounded-md border`}>
              <option>Valor médio</option>
            </select>
            <select className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'} px-3 py-2 rounded-md border`}>
              <option>Motorização</option>
            </select>
            <select className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'} px-3 py-2 rounded-md border`}>
              <option>Ano</option>
            </select>
            <Input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'} w-32`}
            />
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </header>

      {/* Mobile Header */}
      <header className={`md:hidden ${isDarkMode ? 'bg-[#222]' : 'bg-white'} border-b ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} sticky top-0 z-50 shadow-sm`}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#dc2626] rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-[#dc2626] font-bold text-lg">Vehicles</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-1">
                {isDarkMode ? <Sun className="w-4 h-4 text-[#7e7e7e]" /> : <Moon className="w-4 h-4 text-[#7e7e7e]" />}
              </button>
              <div className={`flex items-center text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                <MapPin className="w-4 h-4 mr-1" />
                SP
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Marca ou modelo"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'} flex-1 rounded-full`}
            />
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </header>
    </>
  )
}
