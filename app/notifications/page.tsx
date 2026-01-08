"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Heart, Star, AlertCircle, CheckCircle, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface Notification {
  id: string
  type: "VIEW" | "INTERESTED" | "REVIEW" | "EXPIRING" | "APPROVED" | "REJECTED"
  title?: string
  message: string
  timestamp: string
  read: boolean
  relatedId?: string
}

const notificationConfig = {
  VIEW: { icon: Eye, color: "bg-blue-100 text-blue-800", bgColor: "bg-blue-50" },
  INTERESTED: { icon: Heart, color: "bg-red-100 text-red-800", bgColor: "bg-red-50" },
  REVIEW: { icon: Star, color: "bg-yellow-100 text-yellow-800", bgColor: "bg-yellow-50" },
  EXPIRING: { icon: AlertCircle, color: "bg-orange-100 text-orange-800", bgColor: "bg-orange-50" },
  APPROVED: { icon: CheckCircle, color: "bg-green-100 text-green-800", bgColor: "bg-green-50" },
  REJECTED: { icon: AlertCircle, color: "bg-red-100 text-red-800", bgColor: "bg-red-50" },
}

const typeLabels = {
  VIEW: "Visualização",
  INTERESTED: "Interessado",
  REVIEW: "Avaliação",
  EXPIRING: "Vencimento",
  APPROVED: "Aprovado",
  REJECTED: "Rejeitado",
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filterType, setFilterType] = useState<string>("all")
  const [filterRead, setFilterRead] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/notifications?limit=50")
        if (response.ok) {
          const data = await response.json()
          setNotifications(data)
        }
      } catch (error) {
        console.error("Error fetching notifications:", error)
        toast.error("Erro ao carregar notificações")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const filteredNotifications = notifications.filter((notif) => {
    const matchType = filterType === "all" || notif.type === filterType
    const matchRead =
      filterRead === "all" || (filterRead === "unread" ? !notif.read : notif.read)
    return matchType && matchRead
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: id }),
      })
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      )
    } catch (error) {
      console.error("Error marking notification as read:", error)
      toast.error("Erro ao atualizar notificação")
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await Promise.all(
        notifications
          .filter((n) => !n.read)
          .map((n) =>
            fetch("/api/notifications", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ notificationId: n.id }),
            })
          )
      )
      setNotifications(notifications.map((n) => ({ ...n, read: true })))
      toast.success("Todas as notificações marcadas como lidas")
    } catch (error) {
      console.error("Error marking all as read:", error)
      toast.error("Erro ao atualizar notificações")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      })
      setNotifications(notifications.filter((n) => n.id !== id))
      toast.success("Notificação deletada")
    } catch (error) {
      console.error("Error deleting notification:", error)
      toast.error("Erro ao deletar notificação")
    }
  }

  const handleDeleteAll = async () => {
    try {
      await Promise.all(
        notifications.map((n) =>
          fetch(`/api/notifications/${n.id}`, {
            method: "DELETE",
          })
        )
      )
      setNotifications([])
      toast.success("Todas as notificações deletadas")
    } catch (error) {
      console.error("Error deleting all notifications:", error)
      toast.error("Erro ao deletar notificações")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6 flex items-center justify-center">
        <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Carregando notificações...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#222] dark:text-white mb-2">
              Notificações
            </h1>
            <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
              {unreadCount > 0 ? `${unreadCount} notificação(ões) não lida(s)` : "Todas as notificações lidas"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              onClick={handleMarkAllAsRead}
              className="bg-[#fe2601] hover:bg-[#fe2601]/90 text-white"
            >
              Marcar Tudo como Lido
            </Button>
          )}
        </div>

        {/* Filtros */}
        <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545] mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-[#222] dark:text-white mb-2 block">
                  Tipo de Notificação
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full p-2 rounded border bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222] dark:text-white"
                >
                  <option value="all">Todas as Notificações</option>
                  <option value="INTERESTED">Interessados</option>
                  <option value="REVIEW">Avaliações</option>
                  <option value="VIEW">Visualizações</option>
                  <option value="APPROVED">Aprovadas</option>
                  <option value="REJECTED">Rejeitadas</option>
                  <option value="EXPIRING">Vencimentos</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#222] dark:text-white mb-2 block">
                  Status
                </label>
                <select
                  value={filterRead}
                  onChange={(e) => setFilterRead(e.target.value)}
                  className="w-full p-2 rounded border bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222] dark:text-white"
                >
                  <option value="all">Todas</option>
                  <option value="unread">Não Lidas</option>
                  <option value="read">Lidas</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Notificações */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
              <CardContent className="py-12 text-center">
                <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
                  Nenhuma notificação encontrada
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {filteredNotifications.map((notif) => {
                const config = notificationConfig[notif.type]
                const Icon = config.icon
                return (
                  <Card
                    key={notif.id}
                    className={`bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545] cursor-pointer transition-colors ${
                      !notif.read ? "border-[#fe2601]" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${config.color} flex-shrink-0`}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-[#222] dark:text-white">
                              {notif.title}
                            </h3>
                            <Badge className={config.color}>
                              {typeLabels[notif.type]}
                            </Badge>
                          </div>
                          <p className="text-sm text-[#7e7e7e] dark:text-[#ebebeb] mb-2">
                            {notif.message}
                          </p>
                          <p className="text-xs text-[#7e7e7e] dark:text-[#ebebeb]">
                            {new Date(notif.timestamp).toLocaleDateString("pt-BR", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!notif.read && (
                            <button
                              onClick={() => handleMarkAsRead(notif.id)}
                              className="px-3 py-1 text-xs rounded bg-[#fe2601] hover:bg-[#fe2601]/90 text-white"
                            >
                              Marcar como Lido
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notif.id)}
                            className="p-2 rounded hover:bg-[#f5f5f5] dark:hover:bg-[#111] text-[#7e7e7e] dark:text-[#ebebeb]"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
              {filteredNotifications.length > 0 && (
                <div className="text-center pt-4">
                  <Button
                    onClick={handleDeleteAll}
                    variant="outline"
                    className="border-[#e4e4e7] dark:border-[#454545] text-[#7e7e7e] dark:text-[#ebebeb] hover:bg-[#f5f5f5] dark:hover:bg-[#111]"
                  >
                    Deletar Todas as Notificações
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
