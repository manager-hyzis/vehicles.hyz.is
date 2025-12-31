"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { ChevronRight } from "lucide-react"

const brands = ["Toyota", "Volkswagen", "Ford", "Chevrolet", "Fiat", "Honda", "Hyundai", "Renault", "BMW", "Mercedes-Benz"]
const fuels = ["GASOLINA", "DIESEL", "ELETRICO", "HIBRIDO", "ALCOOL"]
const transmissions = ["MANUAL", "AUTOMATICA"]
const colors = ["Preto", "Prata", "Branco", "Cinza", "Vermelho", "Azul", "Verde", "Amarelo", "Laranja", "Marrom"]
const states = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]

const features = {
  security: ["Air Bag", "Alarme", "Freio ABS", "Sensor de Estacionamento", "Farol de Neblina", "Blindagem"],
  comfort: ["Ar Condicionado", "Direção Hidráulica", "Direção Elétrica", "Vidro Elétrico", "Trava Elétrica", "Bancos em Couro", "Teto Solar"],
  technology: ["Kit Multimídia", "Computador de Bordo", "Câmera de Ré", "GPS", "Botão Start/Stop", "Partida Elétrica"],
  mechanics: ["Câmbio Automático", "Rodas de Liga Leve", "Suspensão a Ar", "Freio a Disco", "Turbo"],
}

const characteristics = ["Único Dono", "Revisões em Concessionária", "IPVA Pago", "Pneus Novos", "Garantia de Fábrica"]

export default function CreateAnnouncementPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    // Step 1
    category: "",
    brand: "",
    model: "",
    year: "",
    version: "",
    popularName: "",
    mileage: "",
    color: "",
    engine: "",
    fuel: "",
    // Step 2
    price: "",
    repurchasePrice: "",
    // Step 3
    selectedFeatures: [] as string[],
    // Step 4
    selectedCharacteristics: [] as string[],
    observations: "",
    // Step 5
    images: [] as File[],
    // Step 6
    city: "",
    contactName: "",
    phone: "",
    alternatePhone: "",
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
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(feature)
        ? prev.selectedFeatures.filter((f) => f !== feature)
        : [...prev.selectedFeatures, feature],
    }))
  }

  const handleCharacteristicToggle = (characteristic: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedCharacteristics: prev.selectedCharacteristics.includes(characteristic)
        ? prev.selectedCharacteristics.filter((c) => c !== characteristic)
        : [...prev.selectedCharacteristics, characteristic],
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (formData.images.length + files.length > 15) {
      toast.error("Máximo de 15 imagens permitidas")
      return
    }
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/vehicles/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.message || "Erro ao criar anúncio")
        return
      }

      toast.success("Anúncio criado com sucesso!")
      router.push("/dashboard/my-announcements")
    } catch (error) {
      console.error("Error creating announcement:", error)
      toast.error("Erro ao criar anúncio")
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
        <Footer isDarkMode={isDarkMode} />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <section className={`py-12 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step <= currentStep
                        ? "bg-[#dc2626] text-white"
                        : isDarkMode
                        ? "bg-[#454545] text-[#7e7e7e]"
                        : "bg-[#e4e4e7] text-[#52525b]"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 7 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        step < currentStep
                          ? "bg-[#dc2626]"
                          : isDarkMode
                          ? "bg-[#454545]"
                          : "bg-[#e4e4e7]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
            <CardHeader>
              <CardTitle className={`text-2xl ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                {currentStep === 1 && "Dados do Veículo"}
                {currentStep === 2 && "Valor do Veículo"}
                {currentStep === 3 && "Componentes do Veículo"}
                {currentStep === 4 && "Observações"}
                {currentStep === 5 && "Imagens do Veículo"}
                {currentStep === 6 && "Contato do Anunciante"}
                {currentStep === 7 && "Revisão e Publicação"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Vehicle Data */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Marca
                      </label>
                      <Select value={formData.brand} onValueChange={(value) => handleSelectChange("brand", value)}>
                        <SelectTrigger className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                          <SelectValue placeholder="Selecione a marca" />
                        </SelectTrigger>
                        <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                          {brands.map((brand) => (
                            <SelectItem key={brand} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Modelo
                      </label>
                      <Input
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="Ex: Corolla"
                        className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                          Ano
                        </label>
                        <Input
                          name="year"
                          type="number"
                          value={formData.year}
                          onChange={handleChange}
                          placeholder="2024"
                          className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                          Quilometragem
                        </label>
                        <Input
                          name="mileage"
                          type="number"
                          value={formData.mileage}
                          onChange={handleChange}
                          placeholder="120000"
                          className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                          Cor
                        </label>
                        <Select value={formData.color} onValueChange={(value) => handleSelectChange("color", value)}>
                          <SelectTrigger className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                            <SelectValue placeholder="Selecione a cor" />
                          </SelectTrigger>
                          <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                            {colors.map((color) => (
                              <SelectItem key={color} value={color}>
                                {color}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                          Motor (L)
                        </label>
                        <Input
                          name="engine"
                          value={formData.engine}
                          onChange={handleChange}
                          placeholder="1.6"
                          className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Combustível
                      </label>
                      <Select value={formData.fuel} onValueChange={(value) => handleSelectChange("fuel", value)}>
                        <SelectTrigger className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}>
                          <SelectValue placeholder="Selecione o combustível" />
                        </SelectTrigger>
                        <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                          {fuels.map((fuel) => (
                            <SelectItem key={fuel} value={fuel}>
                              {fuel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 2: Price */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Preço (R$)
                      </label>
                      <Input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="30000"
                        required
                        className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Preço para Repasse (opcional)
                      </label>
                      <Input
                        name="repurchasePrice"
                        type="number"
                        value={formData.repurchasePrice}
                        onChange={handleChange}
                        placeholder="28000"
                        className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Features */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    {Object.entries(features).map(([category, items]) => (
                      <div key={category}>
                        <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                          {category === 'security' && 'Segurança'}
                          {category === 'comfort' && 'Conforto'}
                          {category === 'technology' && 'Tecnologia'}
                          {category === 'mechanics' && 'Mecânica'}
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {items.map((item) => (
                            <div key={item} className="flex items-center gap-2">
                              <Checkbox
                                id={item}
                                checked={formData.selectedFeatures.includes(item)}
                                onCheckedChange={() => handleFeatureToggle(item)}
                              />
                              <label htmlFor={item} className={`text-sm cursor-pointer ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 4: Observations */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div>
                      <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Características
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {characteristics.map((char) => (
                          <div key={char} className="flex items-center gap-2">
                            <Checkbox
                              id={char}
                              checked={formData.selectedCharacteristics.includes(char)}
                              onCheckedChange={() => handleCharacteristicToggle(char)}
                            />
                            <label htmlFor={char} className={`text-sm cursor-pointer ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                              {char}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Observações (máximo 2000 caracteres)
                      </label>
                      <textarea
                        name="observations"
                        value={formData.observations}
                        onChange={handleChange}
                        maxLength={2000}
                        rows={6}
                        placeholder="Descreva detalhes adicionais do veículo..."
                        className={`w-full p-3 rounded border ${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}`}
                      />
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                        {formData.observations.length}/2000
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 5: Images */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <div className={`border-2 border-dashed rounded-lg p-8 text-center ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'}`}>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="imageUpload"
                      />
                      <label htmlFor="imageUpload" className="cursor-pointer">
                        <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                          Clique para selecionar ou arraste imagens aqui
                        </p>
                        <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                          Máximo 15 imagens, JPG/PNG/WebP, até 5MB cada
                        </p>
                      </label>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className={`relative rounded overflow-hidden ${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'}`}>
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index}`}
                            className="w-full h-32 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                      {formData.images.length}/15 imagens
                    </p>
                  </div>
                )}

                {/* Step 6: Contact */}
                {currentStep === 6 && (
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Cidade
                      </label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="São Paulo"
                        required
                        className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Nome
                      </label>
                      <Input
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        required
                        className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Celular
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(11) 99999-9999"
                        required
                        className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                        Telefone Opcional
                      </label>
                      <Input
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={handleChange}
                        placeholder="(11) 3333-3333"
                        className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                      />
                    </div>
                  </div>
                )}

                {/* Step 7: Review */}
                {currentStep === 7 && (
                  <div className={`${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'} p-6 rounded`}>
                    <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Revisão do Anúncio
                    </h4>
                    <div className={`space-y-3 text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                      <p><strong>Marca:</strong> {formData.brand}</p>
                      <p><strong>Modelo:</strong> {formData.model}</p>
                      <p><strong>Ano:</strong> {formData.year}</p>
                      <p><strong>Preço:</strong> R$ {formData.price}</p>
                      <p><strong>Quilometragem:</strong> {formData.mileage} km</p>
                      <p><strong>Combustível:</strong> {formData.fuel}</p>
                      <p><strong>Cidade:</strong> {formData.city}</p>
                      <p><strong>Contato:</strong> {formData.phone}</p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-6 border-t border-[#454545]">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      className={`flex-1 ${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                      onClick={() => setCurrentStep(currentStep - 1)}
                      disabled={isLoading}
                    >
                      Voltar
                    </Button>
                  )}
                  {currentStep < 7 ? (
                    <Button
                      type="button"
                      className="flex-1 bg-[#dc2626] hover:bg-[#991b1b]"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={isLoading}
                    >
                      Próximo <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="flex-1 bg-[#dc2626] hover:bg-[#991b1b]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Publicando..." : "Finalizar Cadastro"}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
