"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Eye } from "lucide-react"
import { toast } from "sonner"

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  price: number
  status: string
  images: Array<{ imageUrl: string }>
  user: { name: string; type: string }
  createdAt: string
  _count?: { reports: number }
}

export default function AdminModerationPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("PENDING")

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
      fetchVehicles()
    }
  }, [status, session, statusFilter])

  const fetchVehicles = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        status: statusFilter,
      })

      const response = await fetch(`/api/admin/moderation?${params}`)
      if (response.ok) {
        const data = await response.json()
        setVehicles(data)
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error)
      toast.error("Erro ao carregar anúncios")
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (vehicleId: string) => {
    try {
      const response = await fetch(`/api/admin/moderation/${vehicleId}/approve`, {
        method: "PUT",
      })

      if (response.ok) {
        toast.success("Anúncio aprovado com sucesso")
        fetchVehicles()
      }
    } catch (error) {
      console.error("Error approving vehicle:", error)
      toast.error("Erro ao aprovar anúncio")
    }
  }

  const handleReject = async (vehicleId: string) => {
    const reason = prompt("Motivo da rejeição:")
    if (!reason) return

    try {
      const response = await fetch(`/api/admin/moderation/${vehicleId}/reject`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      })

      if (response.ok) {
        toast.success("Anúncio rejeitado com sucesso")
        fetchVehicles()
      }
    } catch (error) {
      console.error("Error rejecting vehicle:", error)
      toast.error("Erro ao rejeitar anúncio")
    }
  }

  const handleRemove = async (vehicleId: string) => {
    const reason = prompt("Motivo da remoção:")
    if (!reason) return

    try {
      const response = await fetch(`/api/admin/moderation/${vehicleId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      })

      if (response.ok) {
        toast.success("Anúncio removido com sucesso")
        fetchVehicles()
      }
    } catch (error) {
      console.error("Error removing vehicle:", error)
      toast.error("Erro ao remover anúncio")
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
            Moderação de Anúncios
          </h1>

          {/* Filtro de Status */}
          <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'} mb-6`}>
            <CardContent className="p-6">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className={`w-48 ${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}>
                  <SelectItem value="PENDING">Pendente</SelectItem>
                  <SelectItem value="APPROVED">Aprovado</SelectItem>
                  <SelectItem value="REJECTED">Rejeitado</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Listagem */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Carregando anúncios...</p>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>Nenhum anúncio encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Imagem */}
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

                      {/* Informações */}
                      <div className="md:col-span-2">
                        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <p className="text-2xl font-bold text-[#dc2626] mb-4">
                          R$ {vehicle.price.toLocaleString("pt-BR")}
                        </p>
                        <div className={`space-y-1 text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                          <p><strong>Vendedor:</strong> {vehicle.user.name}</p>
                          <p><strong>Tipo:</strong> {vehicle.user.type}</p>
                          <p><strong>Data:</strong> {new Date(vehicle.createdAt).toLocaleDateString("pt-BR")}</p>
                          {vehicle._count?.reports && (
                            <p><strong>Denúncias:</strong> {vehicle._count.reports}</p>
                          )}
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          className={`w-full ${isDarkMode ? 'bg-[#111] border-[#454545] text-white hover:bg-[#222]' : 'bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]'}`}
                          onClick={() => router.push(`/listings/${vehicle.id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>

                        {statusFilter === "PENDING" && (
                          <>
                            <Button
                              className="w-full bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(vehicle.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Aprovar
                            </Button>
                            <Button
                              className="w-full bg-red-600 hover:bg-red-700"
                              onClick={() => handleReject(vehicle.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Rejeitar
                            </Button>
                          </>
                        )}

                        <Button
                          className="w-full bg-red-700 hover:bg-red-800"
                          onClick={() => handleRemove(vehicle.id)}
                        >
                          Remover
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
