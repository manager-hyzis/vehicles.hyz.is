"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Edit, Trash2, Star, MapPin, Calendar } from "lucide-react"

export default function DashboardPage() {
  const [user] = useState({
    name: "João Silva",
    email: "joao@email.com",
    plan: "Plano Básico",
    announcements: 2,
    maxAnnouncements: 3,
  })

  const [announcements] = useState([
    {
      id: 1,
      title: "Bar do Alex",
      category: "Comer e Beber",
      city: "Sorocaba",
      status: "Ativo",
      views: 156,
      photos: 3,
      createdAt: "2024-01-15",
      featured: false,
    },
    {
      id: 2,
      title: "Consultório Médico Dr. Silva",
      category: "Medicina e Saúde",
      city: "Sorocaba",
      status: "Ativo",
      views: 89,
      photos: 2,
      createdAt: "2024-01-10",
      featured: true,
    },
  ])

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111]">
      {/* Header */}
      <header className="bg-white dark:bg-[#222] border-b border-[#e4e4e7] dark:border-[#454545]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#fe2601] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="font-bold text-[#222222] dark:text-white">Guiaponto</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/dashboard" className="text-[#fe2601] font-medium">
                Dashboard
              </Link>
              <Link
                href="/dashboard/profile"
                className="text-[#7e7e7e] dark:text-[#ebebeb] hover:text-[#222222] dark:hover:text-white"
              >
                Perfil
              </Link>
              <Link
                href="/dashboard/plan"
                className="text-[#7e7e7e] dark:text-[#ebebeb] hover:text-[#222222] dark:hover:text-white"
              >
                Plano
              </Link>
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/")}>
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#222222] dark:text-white mb-2">Olá, {user.name}!</h1>
          <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Gerencie seus anúncios e acompanhe o desempenho</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">Anúncios Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#222222] dark:text-white">
                {user.announcements}/{user.maxAnnouncements}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">Visualizações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#222222] dark:text-white">245</div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">Plano Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold text-[#222222] dark:text-white">{user.plan}</div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#7e7e7e] dark:text-[#ebebeb]">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Ativo</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Announcements Section */}
        <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-[#222222] dark:text-white">Meus Anúncios</CardTitle>
                <CardDescription className="text-[#7e7e7e] dark:text-[#ebebeb]">
                  Gerencie seus anúncios publicados
                </CardDescription>
              </div>
              <Button className="bg-[#fe2601] hover:bg-[#fe2601]/90 text-white">
                <Plus size={16} className="mr-2" />
                Novo Anúncio
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="border border-[#e4e4e7] dark:border-[#454545] rounded-lg p-4 hover:bg-[#fafafa] dark:hover:bg-[#111] transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[#222222] dark:text-white">{announcement.title}</h3>
                        {announcement.featured && <Star size={16} className="text-yellow-500 fill-current" />}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#7e7e7e] dark:text-[#ebebeb]">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {announcement.city}
                        </span>
                        <span>{announcement.category}</span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {announcement.views} visualizações
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={announcement.status === "Ativo" ? "default" : "secondary"}
                        className={
                          announcement.status === "Ativo"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : ""
                        }
                      >
                        {announcement.status}
                      </Badge>
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
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#7e7e7e] dark:text-[#ebebeb]">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      Criado em {new Date(announcement.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                    <span>{announcement.photos} fotos</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
