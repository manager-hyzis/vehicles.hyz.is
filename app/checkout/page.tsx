"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { CreditCard, Smartphone, Banknote } from "lucide-react"

interface Plan {
  id: string
  name: string
  duration: number
  price: number
  description: string
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("planId")
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [plan, setPlan] = useState<Plan | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("CREDIT_CARD")
  const [isProcessing, setIsProcessing] = useState(false)

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
      return
    }
    if (status === "authenticated" && planId) {
      fetchPlan()
    }
  }, [status, planId])

  const fetchPlan = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/plans/${planId}`)
      if (response.ok) {
        const data = await response.json()
        setPlan(data)
      } else {
        toast.error("Plano não encontrado")
        router.push("/plans")
      }
    } catch (error) {
      console.error("Error fetching plan:", error)
      toast.error("Erro ao carregar plano")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          paymentMethod,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.message || "Erro ao processar pagamento")
        return
      }

      const data = await response.json()
      
      // Redirecionar para Mercado Pago ou processar pagamento
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        toast.success("Pagamento processado com sucesso!")
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error processing checkout:", error)
      toast.error("Erro ao processar pagamento")
    } finally {
      setIsProcessing(false)
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
        <div className="flex items-center justify-center py-12">
          <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Carregando...</p>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </div>
    )
  }

  if (!plan) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
        <div className="flex items-center justify-center py-12">
          <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Plano não encontrado</p>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <section className={`py-12 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
            Checkout
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Resumo do Plano */}
            <div className="md:col-span-1">
              <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} sticky top-20`}>
                <CardHeader>
                  <CardTitle className={isDarkMode ? 'text-white' : 'text-[#222]'}>
                    Resumo do Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                      Serviço
                    </p>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      {plan.name}
                    </p>
                  </div>

                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                      Duração
                    </p>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      {plan.duration} meses
                    </p>
                  </div>

                  <div className={`border-t ${isDarkMode ? 'border-[#454545]' : 'border-[#e4e4e7]'} pt-4`}>
                    <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                      Total
                    </p>
                    <p className="text-3xl font-bold text-[#dc2626]">
                      R$ {plan.price.toFixed(2)}
                    </p>
                  </div>

                  <div className={`${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'} p-4 rounded text-sm`}>
                    <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>
                      <strong>Aviso importante:</strong> Este é um pagamento único. Ao vencer o período, você poderá renovar manualmente.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Pagamento */}
            <div className="md:col-span-2">
              <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
                <CardHeader>
                  <CardTitle className={isDarkMode ? 'text-white' : 'text-[#222]'}>
                    Formas de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCheckout} className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      {/* Cartão de Crédito */}
                      <div className={`border rounded-lg p-4 cursor-pointer transition ${
                        paymentMethod === "CREDIT_CARD"
                          ? isDarkMode
                            ? "border-[#dc2626] bg-[#111]"
                            : "border-[#dc2626] bg-[#f5f5f5]"
                          : isDarkMode
                          ? "border-[#454545]"
                          : "border-[#e4e4e7]"
                      }`}>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="CREDIT_CARD" id="credit_card" />
                          <label htmlFor="credit_card" className="flex-1 cursor-pointer flex items-center gap-3">
                            <CreditCard className="w-5 h-5" />
                            <div>
                              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                                Cartão de Crédito
                              </p>
                              <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                                Visa, Mastercard, Elo, American Express
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* PIX */}
                      <div className={`border rounded-lg p-4 cursor-pointer transition ${
                        paymentMethod === "PIX"
                          ? isDarkMode
                            ? "border-[#dc2626] bg-[#111]"
                            : "border-[#dc2626] bg-[#f5f5f5]"
                          : isDarkMode
                          ? "border-[#454545]"
                          : "border-[#e4e4e7]"
                      }`}>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="PIX" id="pix" />
                          <label htmlFor="pix" className="flex-1 cursor-pointer flex items-center gap-3">
                            <Smartphone className="w-5 h-5" />
                            <div>
                              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                                PIX
                              </p>
                              <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                                Transferência instantânea
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Boleto */}
                      <div className={`border rounded-lg p-4 cursor-pointer transition ${
                        paymentMethod === "BOLETO"
                          ? isDarkMode
                            ? "border-[#dc2626] bg-[#111]"
                            : "border-[#dc2626] bg-[#f5f5f5]"
                          : isDarkMode
                          ? "border-[#454545]"
                          : "border-[#e4e4e7]"
                      }`}>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="BOLETO" id="boleto" />
                          <label htmlFor="boleto" className="flex-1 cursor-pointer flex items-center gap-3">
                            <Banknote className="w-5 h-4" />
                            <div>
                              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                                Boleto Bancário
                              </p>
                              <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                                Com código de barras
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Débito */}
                      <div className={`border rounded-lg p-4 cursor-pointer transition ${
                        paymentMethod === "DEBIT_CARD"
                          ? isDarkMode
                            ? "border-[#dc2626] bg-[#111]"
                            : "border-[#dc2626] bg-[#f5f5f5]"
                          : isDarkMode
                          ? "border-[#454545]"
                          : "border-[#e4e4e7]"
                      }`}>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="DEBIT_CARD" id="debit_card" />
                          <label htmlFor="debit_card" className="flex-1 cursor-pointer flex items-center gap-3">
                            <CreditCard className="w-5 h-5" />
                            <div>
                              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                                Cartão de Débito
                              </p>
                              <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                                Visa, Mastercard, Elo
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </RadioGroup>

                    {/* Informações Adicionais */}
                    <div className={`${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'} p-4 rounded text-sm`}>
                      <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>
                        Seu pagamento é processado de forma segura pela Mercado Pago. Você receberá uma confirmação por email após a conclusão.
                      </p>
                    </div>

                    {/* Botão de Pagamento */}
                    <div className="flex gap-4 pt-6 border-t border-[#454545]">
                      <Button
                        type="button"
                        variant="outline"
                        className={`flex-1 ${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                        onClick={() => router.back()}
                        disabled={isProcessing}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-[#dc2626] hover:bg-[#991b1b]"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processando..." : "Prosseguir com Pagamento"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
