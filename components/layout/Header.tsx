'use client'

import { MapPin, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface HeaderProps {
  isDarkMode?: boolean
  onThemeToggle?: (isDark: boolean) => void
}

export default function Header({ isDarkMode = false, onThemeToggle }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const toggleTheme = () => {
    onThemeToggle?.(!isDarkMode)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className={`${isDarkMode ? 'bg-[#111]' : 'bg-white'} h-full flex flex-col`}>
            <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'}`}>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#fe2601] rounded-full flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="text-[#fe2601] font-bold text-lg">Vehicles</span>
              </div>
              <button onClick={toggleMenu}>
                <X className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-[#222]'}`} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <p className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-sm leading-relaxed mb-6`}>
                Plataforma completa para compra e venda de veículos usados. Encontre o veículo ideal com segurança e praticidade.
              </p>
              <div className="mb-8">
                <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-4`}>Menu</h3>
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
      <header className={`hidden md:block ${isDarkMode ? 'bg-[#222]' : 'bg-white'} border-b ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} px-4 py-3`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#fe2601] rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">V</span>
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
          
          {/* Search Filter Bar */}
          <div className="flex items-center gap-2">
            <select className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-[#222]'} px-3 py-2 rounded-md border flex-1`}>
              <option>Veículo</option>
            </select>
            <select className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-[#222]'} px-3 py-2 rounded-md border flex-1`}>
              <option>Valor médio</option>
            </select>
            <select className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-[#222]'} px-3 py-2 rounded-md border flex-1`}>
              <option>Motorização</option>
            </select>
            <select className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-[#222]'} px-3 py-2 rounded-md border flex-1`}>
              <option>Ano</option>
            </select>
            <select className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-[#222]'} px-3 py-2 rounded-md border w-40`}>
              <option>São Paulo</option>
            </select>
            <Button className="bg-[#ff8c00] hover:bg-[#ff8c00]/90 text-white px-6">
              🔍
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <nav className={`hidden md:block ${isDarkMode ? 'bg-[#222]' : 'bg-white'} border-b ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} px-4 py-3`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className={`flex items-center ${isDarkMode ? 'text-white' : 'text-[#222]'} font-medium`}>
              Categorias
              <ChevronDown className="w-4 h-4 ml-1" />
            </div>
            <span className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Carros</span>
            <span className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Motos</span>
            <span className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Caminhões</span>
            <span className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Revendedoras</span>
          </div>
          <Button className="bg-[#fe2601] hover:bg-[#fe2601]/90 text-white px-6">Anunciar Veículo</Button>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className={`md:hidden ${isDarkMode ? 'bg-[#222]' : 'bg-white'} border-b ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} px-4 py-3`}>
        <div className="flex items-center justify-between">
          <button onClick={toggleMenu}>
            <Menu className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-[#222]'}`} />
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#fe2601] rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-[#fe2601] font-bold text-lg">Vehicles</span>
          </div>
          <button onClick={toggleTheme} className={`flex items-center ${isDarkMode ? 'bg-[#454545]' : 'bg-[#ebebeb]'} rounded-full p-1`}>
            {isDarkMode ? (
              <>
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
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
    </>
  )
}
