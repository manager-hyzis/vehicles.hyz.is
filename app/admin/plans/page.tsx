"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Edit, Save } from "lucide-react"
import { toast } from "sonner"

interface Plan {
  id: string
  name: string
  duration: number
  price: number
  description: string
  activeContracts: number
}

interface Highlight {
  id: string
  name: string
  duration: number
  price: number
  description: string
  activeContracts: number
}

export default function AdminPlansPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [plans, setPlans] = useState<Plan[]>([])
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingPlan, setEditingPlan] = useState<string | null>(null)
  const [editingHighlight, setEditingHighlight] = useState<string | null>(null)
  const [editPrices, setEditPrices] = useState<Record<string, number>>({})

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
    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/")
      return
    }
    if (status === "authenticated") {
      fetchPlans()
    }
  }, [status, session])

  const fetchPlans = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/plans")
      if (response.ok) {
        const data = await response.json()
        setPlans(data.plans || [])
        setHighlights(data.highlights || [])
      }
    } catch (error) {
      console.error("Error fetching plans:", error)
      toast.error("Erro ao carregar planos")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSavePrice = async (planId: string, newPrice: number) => {
    try {
      const response = await fetch(`/api/admin/plans/${planId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: newPrice }),
      })

      if (response.ok) {
        toast.success("Preço atualizado com sucesso")
        setEditingPlan(null)
        fetchPlans()
      }
    } catch (error) {
      console.error("Error updating price:", error)
      toast.error("Erro ao atualizar preço")
    }
  }

  const handleSaveHighlightPrice = async (highlightId: string, newPrice: number) => {
    try {
      const response = await fetch(`/api/admin/highlights/${highlightId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: newPrice }),
      })

      if (response.ok) {
        toast.success("Preço atualizado com sucesso")
        setEditingHighlight(null)
        fetchPlans()
      }
    } catch (error) {
      console.error("Error updating price:", error)
      toast.error("Erro ao atualizar preço")
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

      <section className={`py-8 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
            Gestão de Planos
          </h1>

          {isLoading ? (
            <div className="text-center py-12">
              <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Carregando planos...</p>
            </div>
          ) : (
            <>
              {/* Planos de Renovação */}
              <div className="mb-12">
                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                  Planos de Renovação
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card key={plan.id} className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
                      <CardHeader>
                        <CardTitle className={isDarkMode ? 'text-white' : 'text-[#222]'}>
                          {plan.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                            Duração
                          </p>
                          <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                            {plan.duration} meses
                          </p>
                        </div>

                        <div>
                          <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                            Preço
                          </p>
                          {editingPlan === plan.id ? (
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                value={editPrices[plan.id] || plan.price}
                                onChange={(e) =>
                                  setEditPrices({
                                    ...editPrices,
                                    [plan.id]: parseFloat(e.target.value),
                                  })
                                }
                                className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                              />
                              <Button
                                size="sm"
                                className="bg-[#dc2626] hover:bg-[#991b1b]"
                                onClick={() =>
                                  handleSavePrice(plan.id, editPrices[plan.id] || plan.price)
                                }
                              >
                                <Save className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <p className="text-lg font-semibold text-[#dc2626]">
                                R$ {plan.price.toFixed(2)}
                              </p>
                              <Button
                                size="sm"
                                variant="outline"
                                className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                                onClick={() => {
                                  setEditingPlan(plan.id)
                                  setEditPrices({ ...editPrices, [plan.id]: plan.price })
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>

                        <div>
                          <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                            Contratos Ativos
                          </p>
                          <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                            {plan.activeContracts}
                          </p>
                        </div>

                        <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                          {plan.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Serviços de Destaque */}
              <div>
                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                  Serviços de Destaque
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {highlights.map((highlight) => (
                    <Card key={highlight.id} className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
                      <CardHeader>
                        <CardTitle className={isDarkMode ? 'text-white' : 'text-[#222]'}>
                          {highlight.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                            Duração
                          </p>
                          <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                            {highlight.duration} dias
                          </p>
                        </div>

                        <div>
                          <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                            Preço
                          </p>
                          {editingHighlight === highlight.id ? (
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                value={editPrices[highlight.id] || highlight.price}
                                onChange={(e) =>
                                  setEditPrices({
                                    ...editPrices,
                                    [highlight.id]: parseFloat(e.target.value),
                                  })
                                }
                                className={isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}
                              />
                              <Button
                                size="sm"
                                className="bg-[#dc2626] hover:bg-[#991b1b]"
                                onClick={() =>
                                  handleSaveHighlightPrice(
                                    highlight.id,
                                    editPrices[highlight.id] || highlight.price
                                  )
                                }
                              >
                                <Save className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <p className="text-lg font-semibold text-[#dc2626]">
                                R$ {highlight.price.toFixed(2)}
                              </p>
                              <Button
                                size="sm"
                                variant="outline"
                                className={`${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                                onClick={() => {
                                  setEditingHighlight(highlight.id)
                                  setEditPrices({
                                    ...editPrices,
                                    [highlight.id]: highlight.price,
                                  })
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>

                        <div>
                          <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                            Contratos Ativos
                          </p>
                          <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                            {highlight.activeContracts}
                          </p>
                        </div>

                        <p className={`text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                          {highlight.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
