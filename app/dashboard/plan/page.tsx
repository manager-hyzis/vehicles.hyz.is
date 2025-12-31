"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Check, Crown, Calendar, ArrowUpRight } from "lucide-react"

export default function UserPlanPage() {
  const [currentPlan] = useState({
    id: "basic",
    name: "Plano Básico",
    price: 29.9,
    billingCycle: "monthly",
    nextBilling: "2024-02-15",
    status: "active",
    features: {
      maxAnnouncements: 1,
      usedAnnouncements: 1,
      maxPhotos: 3,
      allowVideo: false,
      allowSocialMedia: true,
      allowWebsite: false,
      isPremium: false,
    },
  })

  const [usage] = useState({
    announcements: { used: 1, limit: 1 },
    photos: { used: 8, limit: 3 }, // Total across all announcements
    views: 245,
    clicks: 89,
  })

  const availablePlans = [
    {
      id: "professional",
      name: "Plano Profissional",
      price: 59.9,
      features: {
        maxAnnouncements: 3,
        maxPhotos: 5,
        allowVideo: true,
        allowSocialMedia: true,
        allowWebsite: true,
        isPremium: true,
      },
      popular: true,
    },
    {
      id: "enterprise",
      name: "Plano Empresarial",
      price: 99.9,
      features: {
        maxAnnouncements: 10,
        maxPhotos: 10,
        allowVideo: true,
        allowSocialMedia: true,
        allowWebsite: true,
        isPremium: true,
      },
      popular: false,
    },
  ]

  const handleUpgrade = (planId: string) => {
    // Mock upgrade - redirect to payment
    const plan = availablePlans.find((p) => p.id === planId)
    alert(`Redirecionando para upgrade para ${plan?.name}`)
  }

  const handleCancelPlan = () => {
    // Mock cancellation
    if (confirm("Tem certeza que deseja cancelar seu plano?")) {
      alert("Plano cancelado com sucesso")
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111]">
      {/* Header */}
      <header className="bg-white dark:bg-[#222] border-b border-[#e4e4e7] dark:border-[#454545]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#fe2601] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="font-bold text-[#222222] dark:text-white">Guiaponto</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-[#7e7e7e] dark:text-[#ebebeb] hover:text-[#222222] dark:hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/profile"
                className="text-[#7e7e7e] dark:text-[#ebebeb] hover:text-[#222222] dark:hover:text-white"
              >
                Perfil
              </Link>
              <Link href="/dashboard/plan" className="text-[#fe2601] font-medium">
                Plano
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#222222] dark:text-white mb-2">Meu Plano</h1>
          <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Gerencie sua assinatura e veja o uso dos recursos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-[#222222] dark:text-white">
                      <Crown className="w-5 h-5 text-[#fe2601]" />
                      {currentPlan.name}
                    </CardTitle>
                    <CardDescription className="text-[#7e7e7e] dark:text-[#ebebeb]">Plano atual ativo</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {currentPlan.status === "active" ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#222222] dark:text-white font-medium">Valor mensal</span>
                  <span className="text-2xl font-bold text-[#222222] dark:text-white">
                    R$ {currentPlan.price.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#7e7e7e] dark:text-[#ebebeb]">
                  <Calendar size={16} />
                  <span>Próxima cobrança: {new Date(currentPlan.nextBilling).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="bg-[#fe2601] hover:bg-[#fe2601]/90 text-white">
                    <ArrowUpRight size={16} className="mr-2" />
                    Fazer Upgrade
                  </Button>
                  <Button variant="outline" onClick={handleCancelPlan}>
                    Cancelar Plano
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
              <CardHeader>
                <CardTitle className="text-[#222222] dark:text-white">Uso dos Recursos</CardTitle>
                <CardDescription className="text-[#7e7e7e] dark:text-[#ebebeb]">
                  Acompanhe o uso dos recursos do seu plano
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#222222] dark:text-white font-medium">Anúncios</span>
                    <span className="text-sm text-[#7e7e7e] dark:text-[#ebebeb]">
                      {usage.announcements.used}/{usage.announcements.limit}
                    </span>
                  </div>
                  <Progress value={(usage.announcements.used / usage.announcements.limit) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#222222] dark:text-white font-medium">Fotos (total)</span>
                    <span className="text-sm text-[#7e7e7e] dark:text-[#ebebeb]">
                      {usage.photos.used} fotos utilizadas
                    </span>
                  </div>
                  <Progress
                    value={Math.min(
                      (usage.photos.used / (usage.announcements.limit * currentPlan.features.maxPhotos)) * 100,
                      100,
                    )}
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#222222] dark:text-white">{usage.views}</div>
                    <div className="text-sm text-[#7e7e7e] dark:text-[#ebebeb]">Visualizações</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#222222] dark:text-white">{usage.clicks}</div>
                    <div className="text-sm text-[#7e7e7e] dark:text-[#ebebeb]">Cliques</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upgrade Options */}
          <div className="space-y-6">
            <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
              <CardHeader>
                <CardTitle className="text-[#222222] dark:text-white">Recursos Atuais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-[#222222] dark:text-white">
                    {currentPlan.features.maxAnnouncements} anúncio
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-[#222222] dark:text-white">
                    Até {currentPlan.features.maxPhotos} fotos
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-[#222222] dark:text-white">Redes sociais</span>
                </div>
                <div className="text-xs text-[#7e7e7e] dark:text-[#ebebeb] pt-2">
                  Vídeos e site próprio não inclusos
                </div>
              </CardContent>
            </Card>

            {availablePlans.map((plan) => (
              <Card
                key={plan.id}
                className={`bg-white dark:bg-[#222] border-2 ${
                  plan.popular ? "border-[#fe2601]" : "border-[#e4e4e7] dark:border-[#454545]"
                }`}
              >
                {plan.popular && (
                  <div className="bg-[#fe2601] text-white text-center py-2 text-sm font-medium">Recomendado</div>
                )}
                <CardHeader>
                  <CardTitle className="text-[#222222] dark:text-white">{plan.name}</CardTitle>
                  <div className="text-2xl font-bold text-[#222222] dark:text-white">
                    R$ {plan.price.toFixed(2).replace(".", ",")}
                    <span className="text-sm font-normal text-[#7e7e7e] dark:text-[#ebebeb]">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-[#222222] dark:text-white">
                      {plan.features.maxAnnouncements} anúncios
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-[#222222] dark:text-white">Até {plan.features.maxPhotos} fotos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-[#222222] dark:text-white">Vídeos do YouTube</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-[#222222] dark:text-white">Site próprio</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-[#222222] dark:text-white">Posição destacada</span>
                  </div>
                  <Button
                    onClick={() => handleUpgrade(plan.id)}
                    className="w-full mt-4 bg-[#fe2601] hover:bg-[#fe2601]/90 text-white"
                  >
                    Fazer Upgrade
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
