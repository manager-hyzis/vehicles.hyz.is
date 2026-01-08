'use client'

import { useState, useEffect } from 'react'
import { MapPin, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LocationSelectorProps {
  onLocationChange?: (city: string, state: string) => void
}

export default function LocationSelector({ onLocationChange }: LocationSelectorProps) {
  const [selectedCity, setSelectedCity] = useState('São Paulo')
  const [selectedState, setSelectedState] = useState('SP')
  const [showModal, setShowModal] = useState(false)
  const [cepInput, setCepInput] = useState('')
  const [isLoadingGeo, setIsLoadingGeo] = useState(false)

  useEffect(() => {
    // Auto-detect location on mount
    detectLocation()
  }, [])

  const detectLocation = () => {
    if ('geolocation' in navigator) {
      setIsLoadingGeo(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            // Use reverse geocoding (you can integrate with a service like Google Maps or OpenStreetMap)
            // For now, we'll use a placeholder
            console.log('Location detected:', latitude, longitude)
            setIsLoadingGeo(false)
          } catch (error) {
            console.error('Error detecting location:', error)
            setIsLoadingGeo(false)
          }
        },
        (error) => {
          console.error('Geolocation error:', error)
          setIsLoadingGeo(false)
        }
      )
    }
  }

  const handleCepSearch = async () => {
    if (cepInput.length !== 8) {
      alert('CEP deve ter 8 dígitos')
      return
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepInput}/json/`)
      const data = await response.json()

      if (data.erro) {
        alert('CEP não encontrado')
        return
      }

      // Extract city and state from ViaCEP response
      const city = data.localidade
      const state = data.uf

      setSelectedCity(city)
      setSelectedState(state)
      onLocationChange?.(city, state)
      setShowModal(false)
      setCepInput('')
    } catch (error) {
      console.error('Error fetching CEP:', error)
      alert('Erro ao buscar CEP')
    }
  }

  return (
    <>
      {/* Location Selector Button */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <MapPin className="w-4 h-4" />
        <span>{selectedCity}, {selectedState}</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Selecionar Localidade</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* CEP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar por CEP
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="00000-000"
                    value={cepInput}
                    onChange={(e) => setCepInput(e.target.value.replace(/\D/g, ''))}
                    maxLength={8}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <Button
                    onClick={handleCepSearch}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Buscar
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou</span>
                </div>
              </div>

              {/* Geolocation Button */}
              <Button
                onClick={detectLocation}
                disabled={isLoadingGeo}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                {isLoadingGeo ? 'Detectando...' : 'Usar Geolocalização'}
              </Button>

              {/* Popular Cities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidades Populares
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { city: 'São Paulo', state: 'SP' },
                    { city: 'Rio de Janeiro', state: 'RJ' },
                    { city: 'Belo Horizonte', state: 'MG' },
                    { city: 'Brasília', state: 'DF' },
                    { city: 'Salvador', state: 'BA' },
                    { city: 'Curitiba', state: 'PR' },
                  ].map(({ city, state }) => (
                    <button
                      key={`${city}-${state}`}
                      onClick={() => {
                        setSelectedCity(city)
                        setSelectedState(state)
                        onLocationChange?.(city, state)
                        setShowModal(false)
                      }}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {city}, {state}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                onClick={() => setShowModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
