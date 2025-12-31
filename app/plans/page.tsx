"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { toast } from "sonner"

interface Plan {
  id: string
  name: string
  duration: number
  price: number
  description: string
  userTypes: string[]
}

const features = [
  "Anúncios ilimitados",
  "Imagens em alta qualidade",
  "Destaque em buscas",
  "Suporte prioritário",
  "Análise de visualizações",
  "Renovação automática",
]

export default function PlansPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

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
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/plans")
      if (response.ok) {
        const data = await response.json()
        setPlans(data)
      }
    } catch (error) {
      console.error("Error fetching plans:", error)
      toast.error("Erro ao carregar planos")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
    window.location.href = `/checkout?planId=${planId}`
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <section className={`py-16 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-4xl font-bold mb-4`}>Planos de Anúncios</h1>
            <p className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-xl`}>
              Escolha o plano ideal para suas necessidades
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Carregando planos...</p>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-12">
              <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Nenhum plano disponível no momento</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative transition-all ${
                    selectedPlan === plan.id
                      ? `ring-2 ring-[#dc2626] shadow-lg ${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`
                      : `hover:shadow-lg ${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`
                  }`}
                >
                  {plan.duration === 6 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#dc2626] text-white px-4 py-1 rounded-full text-sm font-bold">
                        Mais Popular
                      </span>
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className={`text-2xl ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>{plan.name}</CardTitle>
                    <p className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} text-sm mt-2`}>{plan.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className={`border-b ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} pb-6`}>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-[#dc2626]">
                          R$ {plan.price.toFixed(2).replace(".", ",")}
                        </span>
                        <span className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>por {plan.duration} meses</span>
                      </div>
                      <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                        R$ {(plan.price / plan.duration).toFixed(2).replace(".", ",")} por mês
                      </p>
                    </div>

                    <div className="space-y-3">
                      {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full ${
                        plan.duration === 6
                          ? "bg-[#dc2626] hover:bg-[#991b1b]"
                          : "bg-gray-800 hover:bg-gray-900"
                      } text-white`}
                    >
                      Escolher Plano
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} rounded-lg p-8 border`}>
            <h2 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-2xl font-bold mb-8`}>Perguntas Frequentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-bold text-lg mb-2`}>Posso cancelar meu plano?</h3>
                <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>
                  Sim, você pode cancelar seu plano a qualquer momento. Não há cobranças automáticas após o vencimento.
                </p>
              </div>
              <div>
                <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-bold text-lg mb-2`}>Quantos anúncios posso criar?</h3>
                <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>
                  Com qualquer plano, você pode criar anúncios ilimitados durante o período de vigência.
                </p>
              </div>
              <div>
                <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-bold text-lg mb-2`}>Como funciona a renovação?</h3>
                <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>
                  Você receberá uma notificação 7 dias antes do vencimento. A renovação é manual, sem cobranças automáticas.
                </p>
              </div>
              <div>
                <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} font-bold text-lg mb-2`}>Qual é a melhor forma de pagamento?</h3>
                <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>
                  Aceitamos cartão de crédito, débito, PIX e boleto bancário. Escolha a forma mais conveniente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
