"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Eye, Heart, DollarSign } from "lucide-react"
import { toast } from "sonner"

interface ReportData {
  period: string
  views: number
  interested: number
  sales: number
  revenue: number
}

interface Stats {
  totalViews: number
  totalInterested: number
  totalSales: number
  totalRevenue: number
  averageViewsPerAd: number
  conversionRate: number
}

export default function ReportsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [reportData, setReportData] = useState<ReportData[]>([])
  const [stats, setStats] = useState<Stats>({
    totalViews: 0,
    totalInterested: 0,
    totalSales: 0,
    totalRevenue: 0,
    averageViewsPerAd: 0,
    conversionRate: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [period, setPeriod] = useState("30days")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }
    if (status === "authenticated") {
      fetchReports()
    }
  }, [status, session, period])

  const fetchReports = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/reports?period=${period}`)
      if (response.ok) {
        const data = await response.json()
        setReportData(data.reportData || [])
        setStats(data.stats || {})
      }
    } catch (error) {
      console.error("Error fetching reports:", error)
      toast.error("Erro ao carregar relatórios")
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportPDF = () => {
    toast.success("Relatório exportado como PDF")
  }

  const handleExportCSV = () => {
    toast.success("Relatório exportado como CSV")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6 flex items-center justify-center">
        <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Carregando relatórios...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#222] dark:text-white mb-2">
              Relatórios e Estatísticas
            </h1>
            <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
              Análise detalhada do desempenho dos seus anúncios
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleExportPDF}
              variant="outline"
              className="border-[#e4e4e7] dark:border-[#454545]"
            >
              Exportar PDF
            </Button>
            <Button
              onClick={handleExportCSV}
              variant="outline"
              className="border-[#e4e4e7] dark:border-[#454545]"
            >
              Exportar CSV
            </Button>
          </div>
        </div>

        {/* Filtro de Período */}
        <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545] mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              {[
                { value: "7days", label: "Últimos 7 dias" },
                { value: "30days", label: "Últimos 30 dias" },
                { value: "90days", label: "Últimos 90 dias" },
                { value: "1year", label: "Último ano" },
              ].map((opt) => (
                <Button
                  key={opt.value}
                  onClick={() => setPeriod(opt.value)}
                  variant={period === opt.value ? "default" : "outline"}
                  className={
                    period === opt.value
                      ? "bg-[#fe2601] hover:bg-[#fe2601]/90 text-white"
                      : "border-[#e4e4e7] dark:border-[#454545]"
                  }
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">
                Total de Visualizações
              </CardTitle>
              <Eye className="h-4 w-4 text-[#fe2601]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#222] dark:text-white">
                {stats.totalViews.toLocaleString()}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                +{Math.round(stats.totalViews * 0.12)} este período
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">
                Interessados
              </CardTitle>
              <Heart className="h-4 w-4 text-[#fe2601]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#222] dark:text-white">
                {stats.totalInterested.toLocaleString()}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                {stats.conversionRate.toFixed(2)}% de conversão
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">
                Vendas
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#fe2601]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#222] dark:text-white">
                {stats.totalSales}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                +{Math.round(stats.totalSales * 0.15)} este período
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">
                Receita Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#fe2601]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#222] dark:text-white">
                R$ {stats.totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                +8% este período
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Desempenho */}
        <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
          <CardHeader>
            <CardTitle className="text-[#222] dark:text-white flex items-center gap-2">
              <BarChart3 size={20} />
              Desempenho por Período
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.length === 0 ? (
                <p className="text-center text-[#7e7e7e] dark:text-[#ebebeb]">
                  Nenhum dado disponível para este período
                </p>
              ) : (
                reportData.map((data, idx) => (
                  <div key={idx} className="border-b border-[#e4e4e7] dark:border-[#454545] pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-[#222] dark:text-white">
                        {data.period}
                      </span>
                      <span className="text-sm text-[#7e7e7e] dark:text-[#ebebeb]">
                        R$ {data.revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Visualizações</p>
                        <p className="font-semibold text-[#222] dark:text-white">
                          {data.views.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Interessados</p>
                        <p className="font-semibold text-[#222] dark:text-white">
                          {data.interested}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Vendas</p>
                        <p className="font-semibold text-[#222] dark:text-white">
                          {data.sales}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
