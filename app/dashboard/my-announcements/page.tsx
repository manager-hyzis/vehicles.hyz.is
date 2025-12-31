"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Pause, Play, CheckCircle, Eye, Heart, MessageSquare } from "lucide-react"
import { toast } from "sonner"

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  price: number
  status: string
  images: Array<{ imageUrl: string }>
  views: number
  _count?: {
    favorites: number
    contacts: number
    reviews: number
  }
}

export default function MyAnnouncementsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("TODOS")

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
    if (status === "authenticated" && session?.user?.id) {
      fetchVehicles(session.user.id)
    }
  }, [status, session, statusFilter])

  const fetchVehicles = async (userId: string) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        ...(statusFilter !== "TODOS" && { status: statusFilter }),
      })

      const response = await fetch(`/api/vehicles/user/${userId}?${params}`)
      const data = await response.json()
      setVehicles(data)
    } catch (error) {
      console.error("Error fetching vehicles:", error)
      toast.error("Erro ao carregar anúncios")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (vehicleId: string) => {
    if (!confirm("Tem certeza que deseja deletar este anúncio?")) return

    try {
      const response = await fetch(`/api/vehicles/${vehicleId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")
      toast.success("Anúncio deletado com sucesso")
      if (session?.user?.id) fetchVehicles(session.user.id)
    } catch (error) {
      console.error("Error deleting vehicle:", error)
      toast.error("Erro ao deletar anúncio")
    }
  }

  const handleToggleStatus = async (vehicleId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "PAUSED" : "ACTIVE"

    try {
      const response = await fetch(`/api/vehicles/${vehicleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update")
      toast.success(`Anúncio ${newStatus === "ACTIVE" ? "reativado" : "pausado"}`)
      if (session?.user?.id) fetchVehicles(session.user.id)
    } catch (error) {
      console.error("Error updating vehicle:", error)
      toast.error("Erro ao atualizar anúncio")
    }
  }

  const handleMarkAsSold = async (vehicleId: string) => {
    try {
      const response = await fetch(`/api/vehicles/${vehicleId}/mark-sold`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          saleDate: new Date(),
          salePrice: 0,
          paymentMethod: "CASH",
        }),
      })

      if (!response.ok) throw new Error("Failed to mark as sold")
      toast.success("Anúncio marcado como vendido")
      if (session?.user?.id) fetchVehicles(session.user.id)
    } catch (error) {
      console.error("Error marking as sold:", error)
      toast.error("Erro ao marcar como vendido")
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      ACTIVE: { bg: isDarkMode ? "bg-green-900" : "bg-green-100", text: isDarkMode ? "text-green-200" : "text-green-800", label: "Ativo" },
      PAUSED: { bg: isDarkMode ? "bg-yellow-900" : "bg-yellow-100", text: isDarkMode ? "text-yellow-200" : "text-yellow-800", label: "Pausado" },
      SOLD: { bg: isDarkMode ? "bg-gray-700" : "bg-gray-100", text: isDarkMode ? "text-gray-200" : "text-gray-800", label: "Vendido" },
    }
    const badge = badges[status] || badges.ACTIVE
    return <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}>{badge.label}</span>
  }

  if (status === "loading") {
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

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <section className={`py-8 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-3xl font-bold`}>Meus Anúncios</h1>
            <Link href="/create-announcement">
              <Button className="bg-[#dc2626] hover:bg-[#991b1b]">
                + Novo Anúncio
              </Button>
            </Link>
          </div>

          <div className="mb-6">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className={`w-48 ${isDarkMode ? 'bg-[#222] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                <SelectItem value="TODOS">Todos</SelectItem>
                <SelectItem value="ACTIVE">Ativos</SelectItem>
                <SelectItem value="PAUSED">Pausados</SelectItem>
                <SelectItem value="SOLD">Vendidos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Carregando anúncios...</p>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className={`${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} mb-4`}>Você não tem anúncios</p>
              <Link href="/create-announcement">
                <Button className="bg-[#dc2626] hover:bg-[#991b1b]">
                  Criar Primeiro Anúncio
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} hover:shadow-lg transition-shadow`}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className={`relative w-full h-40 ${isDarkMode ? 'bg-[#111]' : 'bg-[#f5f5f5]'} rounded overflow-hidden`}>
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
                      </div>

                      <div className="md:col-span-2">
                        <h3 className={`${isDarkMode ? 'text-white' : 'text-[#222]'} text-xl font-bold mb-2`}>
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <p className="text-2xl font-bold text-[#dc2626] mb-4">
                          R$ {vehicle.price.toLocaleString("pt-BR")}
                        </p>
                        <div className={`flex gap-4 text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'} mb-4`}>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{vehicle.views} visualizações</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{vehicle._count?.favorites || 0} favoritos</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{vehicle._count?.contacts || 0} mensagens</span>
                          </div>
                        </div>
                        <div>{getStatusBadge(vehicle.status)}</div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Link href={`/create-announcement/${vehicle.id}`}>
                          <Button variant="outline" className={`w-full ${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                        </Link>

                        {vehicle.status !== "SOLD" && (
                          <>
                            <Button
                              variant="outline"
                              className={`w-full ${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                              onClick={() => handleToggleStatus(vehicle.id, vehicle.status)}
                            >
                              {vehicle.status === "ACTIVE" ? (
                                <>
                                  <Pause className="w-4 h-4 mr-2" />
                                  Pausar
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 mr-2" />
                                  Reativar
                                </>
                              )}
                            </Button>

                            <Button
                              variant="outline"
                              className={`w-full ${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                              onClick={() => handleMarkAsSold(vehicle.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Marcar Vendido
                            </Button>
                          </>
                        )}

                        <Button
                          className="w-full bg-red-700 hover:bg-red-800"
                          onClick={() => handleDelete(vehicle.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Deletar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
