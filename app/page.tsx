'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)

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

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#dc2626] to-[#991b1b] text-white px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Encontre o Veículo Perfeito
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Explore milhares de veículos de qualidade. Compre com segurança, venda com facilidade.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-white text-[#dc2626] hover:bg-gray-100 px-8 py-3 text-lg">
              Buscar Veículos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
              Publicar Anúncio
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Cards */}
      <section className={`${isDarkMode ? 'bg-[#111]' : 'bg-white'} px-4 py-12 md:py-16`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} rounded-lg p-6 border text-center`}>
              <div className="text-4xl mb-4">🚗</div>
              <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-lg font-semibold mb-2`}>Compre com Segurança</h3>
              <p className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Avaliações verificadas e histórico completo dos veículos</p>
            </div>
            <div className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} rounded-lg p-6 border text-center`}>
              <div className="text-4xl mb-4">💰</div>
              <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-lg font-semibold mb-2`}>Melhores Preços</h3>
              <p className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Compare preços e encontre a melhor oferta do mercado</p>
            </div>
            <div className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} rounded-lg p-6 border text-center`}>
              <div className="text-4xl mb-4">⚡</div>
              <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-lg font-semibold mb-2`}>Rápido e Fácil</h3>
              <p className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>Processo simples de compra e venda em poucos cliques</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resellers */}
      <section className={`${isDarkMode ? 'bg-[#222]' : 'bg-[#f5f5f5]'} px-4 py-12 md:py-16`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-2xl md:text-3xl font-bold mb-8`}>Revendedoras em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`${isDarkMode ? 'bg-[#111] border-[#454545]' : 'bg-white border-[#e4e4e7]'} rounded-lg p-6 border text-center hover:shadow-md transition-shadow cursor-pointer`}>
                <div className="w-16 h-16 bg-[#dc2626] rounded-full mx-auto mb-4"></div>
                <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-semibold mb-2`}>Revenda {i}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} mb-4`}>São Paulo, SP</p>
                <div className="flex justify-center items-center gap-1 text-sm">
                  <span>⭐ 4.8</span>
                  <span className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>(128 avaliações)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className={`${isDarkMode ? 'bg-[#111]' : 'bg-white'} px-4 py-12 md:py-16`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-2xl md:text-3xl font-bold mb-8`}>Veículos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} rounded-lg border overflow-hidden hover:shadow-md transition-shadow`}>
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-[#dc2626] to-[#991b1b] flex items-center justify-center">
                    <span className="text-4xl">🚗</span>
                  </div>
                  <button className="absolute top-3 right-3">
                    <Heart className="w-6 h-6 text-[#dc2626] fill-current" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-2`}>Toyota Corolla 2020</h3>
                  <div className={`flex items-center ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-sm mb-2`}>
                    <MapPin className="w-4 h-4 mr-1" />
                    São Paulo, SP
                  </div>
                  <p className="text-[#dc2626] font-bold text-lg">R$ 85.000</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#dc2626] text-white px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para Vender?</h2>
          <p className="text-lg mb-8 opacity-90">
            Publique seu anúncio gratuitamente e conecte-se com milhares de compradores
          </p>
          <Button className="bg-white text-[#dc2626] hover:bg-gray-100 px-8 py-3 text-lg">
            Publicar Anúncio Agora
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
