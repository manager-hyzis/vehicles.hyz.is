"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"
import { toast } from "sonner"

interface Report {
  id: string
  vehicleId: string
  vehicleTitle: string
  reportType: string
  description: string
  status: string
  reportCount: number
  createdAt: string
  updatedAt: string
}

const reportTypeLabels: Record<string, string> = {
  FRAUD: "Golpe",
  INAPPROPRIATE: "Conteúdo Inadequado",
  STOLEN: "Veículo Roubado",
  OTHER: "Outro",
}

const statusConfig: Record<string, any> = {
  PENDING: { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
  ANALYZING: { label: "Em Análise", color: "bg-blue-100 text-blue-800", icon: Clock },
  RESOLVED: { label: "Resolvido", color: "bg-green-100 text-green-800", icon: CheckCircle },
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true)
        const params = new URLSearchParams({
          status: filterStatus,
          type: filterType,
        })
        const response = await fetch(`/api/admin/reports?${params}`)
        if (response.ok) {
          const data = await response.json()
          setReports(data)
        }
      } catch (error) {
        console.error("Error fetching reports:", error)
        toast.error("Erro ao carregar denúncias")
      } finally {
        setIsLoading(false)
      }
    }

    fetchReports()
  }, [filterStatus, filterType])

  const filteredReports = reports.filter((report) => {
    const matchSearch =
      report.vehicleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchSearch
  })

  const handleResolve = async (reportId: string) => {
    try {
      const response = await fetch("/api/admin/reports", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, status: "RESOLVED" }),
      })

      if (response.ok) {
        toast.success("Denúncia marcada como resolvida")
        setReports(
          reports.map((r) =>
            r.id === reportId ? { ...r, status: "RESOLVED", updatedAt: new Date().toISOString() } : r
          )
        )
        setSelectedReport(null)
      }
    } catch (error) {
      console.error("Error resolving report:", error)
      toast.error("Erro ao resolver denúncia")
    }
  }

  const handleRemoveAd = async (reportId: string) => {
    try {
      const response = await fetch(`/api/admin/reports/${reportId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: notes }),
      })

      if (response.ok) {
        toast.success("Anúncio removido com sucesso")
        setReports(reports.filter((r) => r.id !== reportId))
        setSelectedReport(null)
      }
    } catch (error) {
      console.error("Error removing ad:", error)
      toast.error("Erro ao remover anúncio")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6 flex items-center justify-center">
        <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Carregando denúncias...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#222] dark:text-white mb-2">Gestão de Denúncias</h1>
          <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
            Gerenciar denúncias de anúncios e tomar ações apropriadas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Denúncias */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
              <CardHeader>
                <CardTitle className="text-[#222] dark:text-white">Denúncias</CardTitle>
                <CardDescription className="text-[#7e7e7e] dark:text-[#ebebeb]">
                  Total: {filteredReports.length} denúncias
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filtros */}
                <div className="space-y-3">
                  <Input
                    placeholder="Buscar por título ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222] dark:text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222] dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
                        <SelectItem value="all">Todos os Status</SelectItem>
                        <SelectItem value="PENDING">Pendente</SelectItem>
                        <SelectItem value="ANALYZING">Em Análise</SelectItem>
                        <SelectItem value="RESOLVED">Resolvido</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222] dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
                        <SelectItem value="all">Todos os Tipos</SelectItem>
                        <SelectItem value="FRAUD">Golpe</SelectItem>
                        <SelectItem value="INAPPROPRIATE">Conteúdo Inadequado</SelectItem>
                        <SelectItem value="STOLEN">Veículo Roubado</SelectItem>
                        <SelectItem value="OTHER">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Lista */}
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredReports.length === 0 ? (
                    <div className="text-center py-8 text-[#7e7e7e] dark:text-[#ebebeb]">
                      Nenhuma denúncia encontrada
                    </div>
                  ) : (
                    filteredReports.map((report) => {
                      const StatusIcon = statusConfig[report.status].icon
                      return (
                        <button
                          key={report.id}
                          onClick={() => setSelectedReport(report)}
                          className={`w-full text-left p-4 rounded-lg border transition-colors ${
                            selectedReport?.id === report.id
                              ? "bg-[#fe2601]/10 border-[#fe2601]"
                              : "bg-[#fafafa] dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] hover:border-[#fe2601]"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-[#222] dark:text-white">{report.vehicleTitle}</h3>
                              <p className="text-sm text-[#7e7e7e] dark:text-[#ebebeb]">{report.description}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                              <StatusIcon size={16} />
                              <Badge className={statusConfig[report.status].color}>
                                {statusConfig[report.status].label}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-[#7e7e7e] dark:text-[#ebebeb]">
                            <span>{reportTypeLabels[report.reportType]}</span>
                            <span>{report.reportCount} denúncias similares</span>
                          </div>
                        </button>
                      )
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detalhes da Denúncia */}
          {selectedReport && (
            <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545] h-fit">
              <CardHeader>
                <CardTitle className="text-[#222] dark:text-white">Detalhes da Denúncia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-[#222] dark:text-white">Anúncio</label>
                  <p className="text-[#7e7e7e] dark:text-[#ebebeb]">{selectedReport.vehicleTitle}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#222] dark:text-white">Tipo de Denúncia</label>
                  <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
                    {reportTypeLabels[selectedReport.reportType]}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#222] dark:text-white">Descrição</label>
                  <p className="text-[#7e7e7e] dark:text-[#ebebeb]">{selectedReport.description}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#222] dark:text-white">
                    Denúncias Similares
                  </label>
                  <p className="text-[#7e7e7e] dark:text-[#ebebeb]">{selectedReport.reportCount}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#222] dark:text-white">Status</label>
                  <Badge className={statusConfig[selectedReport.status].color}>
                    {statusConfig[selectedReport.status].label}
                  </Badge>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#222] dark:text-white mb-2 block">
                    Observações
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Adicione observações sobre a ação tomada..."
                    className="w-full p-2 rounded border bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222] dark:text-white text-sm"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={() => handleResolve(selectedReport.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Marcar como Resolvido
                  </Button>
                  <Button
                    onClick={() => handleRemoveAd(selectedReport.id)}
                    className="w-full bg-[#fe2601] hover:bg-[#fe2601]/90 text-white"
                  >
                    Remover Anúncio
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
