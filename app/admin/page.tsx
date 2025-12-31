"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, CreditCard, BarChart3, Eye, Edit, Trash2, Settings } from "lucide-react"

export default function AdminDashboard() {
  const [stats] = useState({
    totalUsers: 1247,
    totalAnnouncements: 3456,
    activeAnnouncements: 2890,
    totalRevenue: 45670.5,
    newUsersThisMonth: 89,
    newAnnouncementsThisMonth: 156,
  })

  const [recentUsers] = useState([
    { id: 1, name: "João Silva", email: "joao@email.com", type: "PF", plan: "Básico", createdAt: "2024-01-15" },
    { id: 2, name: "Maria Santos", email: "maria@email.com", type: "PJ", plan: "Premium", createdAt: "2024-01-14" },
    { id: 3, name: "Pedro Costa", email: "pedro@email.com", type: "PF", plan: "Básico", createdAt: "2024-01-13" },
  ])

  const [recentAnnouncements] = useState([
    { id: 1, title: "Bar do Alex", user: "João Silva", city: "Sorocaba", status: "Ativo", createdAt: "2024-01-15" },
    {
      id: 2,
      title: "Consultório Dr. Silva",
      user: "Maria Santos",
      city: "São Paulo",
      status: "Pendente",
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      title: "Loja de Roupas Fashion",
      user: "Pedro Costa",
      city: "Campinas",
      status: "Ativo",
      createdAt: "2024-01-13",
    },
  ])

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111]">
      {/* Admin Header */}
      <header className="bg-white dark:bg-[#222] border-b border-[#e4e4e7] dark:border-[#454545]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#fe2601] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
                <span className="font-bold text-[#222222] dark:text-white">Admin</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/admin" className="text-[#fe2601] font-medium">
                  Dashboard
                </Link>
                <Link
                  href="/admin/users"
                  className="text-[#7e7e7e] dark:text-[#ebebeb] hover:text-[#222222] dark:hover:text-white"
                >
                  Usuários
                </Link>
                <Link
                  href="/admin/announcements"
                  className="text-[#7e7e7e] dark:text-[#ebebeb] hover:text-[#222222] dark:hover:text-white"
                >
                  Anúncios
                </Link>
                <Link
                  href="/admin/plans"
                  className="text-[#7e7e7e] dark:text-[#ebebeb] hover:text-[#222222] dark:hover:text-white"
                >
                  Planos
                </Link>
                <Link
                  href="/admin/locations"
                  className="text-[#7e7e7e] dark:text-[#ebebeb] hover:text-[#222222] dark:hover:text-white"
                >
                  Localizações
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings size={16} className="mr-2" />
                Configurações
              </Button>
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/")}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#222222] dark:text-white mb-2">Dashboard Administrativo</h1>
          <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Visão geral da plataforma e métricas principais</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">
                Total de Usuários
              </CardTitle>
              <Users className="h-4 w-4 text-[#fe2601]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#222222] dark:text-white">
                {stats.totalUsers.toLocaleString()}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">+{stats.newUsersThisMonth} este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">Anúncios Ativos</CardTitle>
              <FileText className="h-4 w-4 text-[#fe2601]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#222222] dark:text-white">
                {stats.activeAnnouncements.toLocaleString()}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">+{stats.newAnnouncementsThisMonth} este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">Receita Total</CardTitle>
              <CreditCard className="h-4 w-4 text-[#fe2601]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#222222] dark:text-white">
                R$ {stats.totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">+12% este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">
                Taxa de Conversão
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-[#fe2601]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#222222] dark:text-white">24.5%</div>
              <p className="text-xs text-green-600 dark:text-green-400">+2.1% este mês</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-[#222222] dark:text-white">Usuários Recentes</CardTitle>
                  <CardDescription className="text-[#7e7e7e] dark:text-[#ebebeb]">
                    Últimos usuários cadastrados
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Ver Todos
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 border border-[#e4e4e7] dark:border-[#454545] rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-[#222222] dark:text-white">{user.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {user.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#7e7e7e] dark:text-[#ebebeb]">{user.email}</p>
                      <p className="text-xs text-[#7e7e7e] dark:text-[#ebebeb]">
                        Plano: {user.plan} • {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-[#222222] dark:text-white">Anúncios Recentes</CardTitle>
                  <CardDescription className="text-[#7e7e7e] dark:text-[#ebebeb]">
                    Últimos anúncios publicados
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Ver Todos
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="flex items-center justify-between p-3 border border-[#e4e4e7] dark:border-[#454545] rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-[#222222] dark:text-white">{announcement.title}</h4>
                        <Badge
                          variant={announcement.status === "Ativo" ? "default" : "secondary"}
                          className={
                            announcement.status === "Ativo"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }
                        >
                          {announcement.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#7e7e7e] dark:text-[#ebebeb]">
                        Por: {announcement.user} • {announcement.city}
                      </p>
                      <p className="text-xs text-[#7e7e7e] dark:text-[#ebebeb]">
                        {new Date(announcement.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
