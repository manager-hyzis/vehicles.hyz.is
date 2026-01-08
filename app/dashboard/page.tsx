"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Heart, MessageSquare, TrendingUp, DollarSign, Star } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface DashboardStats {
  activeAds: number
  totalViews: number
  viewsThisMonth: number
  interested: number
  sales: number
  revenue: number
  reputation: number
  totalReviews: number
}

const defaultStats: DashboardStats = {
  activeAds: 0,
  totalViews: 0,
  viewsThisMonth: 0,
  interested: 0,
  sales: 0,
  revenue: 0,
  reputation: 0,
  totalReviews: 0,
}

interface RecentAd {
  id: string
  title: string
  price: number
  views: number
  interested: number
  status: "ACTIVE" | "PAUSED" | "SOLD"
  createdAt: string
}

interface Notification {
  id: string
  type: "VIEW" | "INTERESTED" | "REVIEW" | "EXPIRING" | "APPROVED" | "REJECTED"
  message: string
  timestamp: string
  read: boolean
}

const notificationConfig = {
  VIEW: { icon: Eye, color: "bg-blue-100 text-blue-800" },
  INTERESTED: { icon: Heart, color: "bg-red-100 text-red-800" },
  REVIEW: { icon: Star, color: "bg-yellow-100 text-yellow-800" },
  EXPIRING: { icon: TrendingUp, color: "bg-orange-100 text-orange-800" },
  APPROVED: { icon: MessageSquare, color: "bg-green-100 text-green-800" },
  REJECTED: { icon: MessageSquare, color: "bg-red-100 text-red-800" },
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(defaultStats)
  const [recentAds, setRecentAds] = useState<RecentAd[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [statsRes, adsRes, notificationsRes] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/dashboard/announcements?limit=5"),
          fetch("/api/notifications?limit=5"),
        ])

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData)
        }

        if (adsRes.ok) {
          const adsData = await adsRes.json()
          setRecentAds(adsData)
        }

        if (notificationsRes.ok) {
          const notificationsData = await notificationsRes.json()
          setNotifications(notificationsData)
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        toast.error("Erro ao carregar dados do dashboard")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6 flex items-center justify-center">
        <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Carregando dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#222] dark:text-white mb-2">Dashboard</h1>
          <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Bem-vindo ao seu painel de controle</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">
                Anúncios Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#222] dark:text-white">{stats.activeAds}</div>
              <p className="text-xs text-[#7e7e7e] dark:text-[#ebebeb] mt-1">Anúncios publicados</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb] flex items-center gap-2">
                <Eye size={16} className="text-blue-600" />
                Visualizações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#222] dark:text-white">{stats.totalViews}</div>
              <p className="text-xs text-[#7e7e7e] dark:text-[#ebebeb] mt-1">
                {stats.viewsThisMonth} este mês
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb] flex items-center gap-2">
                <Heart size={16} className="text-red-600" />
                Interessados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#222] dark:text-white">{stats.interested}</div>
              <p className="text-xs text-[#7e7e7e] dark:text-[#ebebeb] mt-1">Pessoas interessadas</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb] flex items-center gap-2">
                <TrendingUp size={16} className="text-green-600" />
                Vendas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#222] dark:text-white">{stats.sales}</div>
              <p className="text-xs text-[#7e7e7e] dark:text-[#ebebeb] mt-1">Veículos vendidos</p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb] flex items-center gap-2">
                <DollarSign size={16} className="text-green-600" />
                Receita Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#222] dark:text-white">
                R$ {stats.revenue.toLocaleString("pt-BR")}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb] flex items-center gap-2">
                <Star size={16} className="text-yellow-600" />
                Reputação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#222] dark:text-white">
                {stats.reputation}/5.0
              </div>
              <p className="text-xs text-[#7e7e7e] dark:text-[#ebebeb] mt-1">
                {stats.totalReviews} avaliações
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/create-announcement" className="block">
                  <Button className="w-full bg-[#fe2601] hover:bg-[#fe2601]/90 text-white text-sm">
                    Novo Anúncio
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Anúncios Recentes */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
              <CardHeader>
                <CardTitle className="text-[#222] dark:text-white">Anúncios Recentes</CardTitle>
                <CardDescription className="text-[#7e7e7e] dark:text-[#ebebeb]">
                  Seus últimos anúncios publicados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAds.map((ad) => (
                    <div
                      key={ad.id}
                      className="p-4 rounded-lg bg-[#fafafa] dark:bg-[#111] border border-[#e4e4e7] dark:border-[#454545]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-[#222] dark:text-white">{ad.title}</h3>
                          <p className="text-sm text-[#7e7e7e] dark:text-[#ebebeb]">
                            R$ {ad.price.toLocaleString("pt-BR")}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            ad.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : ad.status === "PAUSED"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {ad.status === "ACTIVE"
                            ? "Ativo"
                            : ad.status === "PAUSED"
                              ? "Pausado"
                              : "Vendido"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#7e7e7e] dark:text-[#ebebeb]">
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {ad.views} visualizações
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={14} />
                          {ad.interested} interessados
                        </span>
                        <span className="text-[#7e7e7e] dark:text-[#ebebeb]">
                          {new Date(ad.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard/my-announcements">
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-[#e4e4e7] dark:border-[#454545] text-[#222] dark:text-white hover:bg-[#fafafa] dark:hover:bg-[#111]"
                  >
                    Ver Todos os Anúncios
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Notificações */}
          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader>
              <CardTitle className="text-[#222] dark:text-white">Notificações</CardTitle>
              <CardDescription className="text-[#7e7e7e] dark:text-[#ebebeb]">
                Atividades recentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {notifications.map((notif) => {
                  const config = notificationConfig[notif.type]
                  const Icon = config.icon
                  return (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-lg ${
                        notif.read
                          ? "bg-[#fafafa] dark:bg-[#111]"
                          : "bg-[#fe2601]/10 dark:bg-[#fe2601]/20 border border-[#fe2601]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded ${config.color}`}>
                          <Icon size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-[#222] dark:text-white">{notif.message}</p>
                          <p className="text-xs text-[#7e7e7e] dark:text-[#ebebeb] mt-1">
                            {new Date(notif.timestamp).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
