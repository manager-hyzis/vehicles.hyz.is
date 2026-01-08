"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Trash2, Archive } from "lucide-react"
import { toast } from "sonner"

interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  timestamp: string
  read: boolean
}

interface Conversation {
  id: string
  participantName: string
  participantId: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: Message[]
}

export default function MessagesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messageText, setMessageText] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }
    if (status === "authenticated") {
      fetchConversations()
    }
  }, [status, session])

  const fetchConversations = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/messages")
      if (response.ok) {
        const data = await response.json()
        setConversations(data)
        if (data.length > 0) {
          setSelectedConversation(data[0])
        }
      }
    } catch (error) {
      console.error("Error fetching conversations:", error)
      toast.error("Erro ao carregar mensagens")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation) return

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: selectedConversation.id,
          content: messageText,
        }),
      })

      if (response.ok) {
        setMessageText("")
        await fetchConversations()
        toast.success("Mensagem enviada")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Erro ao enviar mensagem")
    }
  }

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      await fetch(`/api/messages/${conversationId}`, {
        method: "DELETE",
      })
      setConversations(conversations.filter((c) => c.id !== conversationId))
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(conversations[0] || null)
      }
      toast.success("Conversa deletada")
    } catch (error) {
      console.error("Error deleting conversation:", error)
      toast.error("Erro ao deletar conversa")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6 flex items-center justify-center">
        <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Carregando mensagens...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#222] dark:text-white mb-2">Mensagens</h1>
          <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
            {conversations.length} conversa(s) ativa(s)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Conversas */}
          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardHeader>
              <CardTitle className="text-[#222] dark:text-white">Conversas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {conversations.length === 0 ? (
                  <p className="text-sm text-[#7e7e7e] dark:text-[#ebebeb]">Nenhuma conversa</p>
                ) : (
                  conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation?.id === conv.id
                          ? "bg-[#fe2601] text-white"
                          : "bg-[#f5f5f5] dark:bg-[#111] text-[#222] dark:text-white hover:bg-[#ebebeb] dark:hover:bg-[#222]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{conv.participantName}</h4>
                          <p className="text-xs opacity-75 truncate">{conv.lastMessage}</p>
                        </div>
                        {conv.unreadCount > 0 && (
                          <span className="bg-[#fe2601] text-white text-xs rounded-full px-2 py-1">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chat */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545] h-[600px] flex flex-col">
                <CardHeader className="border-b border-[#e4e4e7] dark:border-[#454545]">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#222] dark:text-white">
                      {selectedConversation.participantName}
                    </CardTitle>
                    <button
                      onClick={() => handleDeleteConversation(selectedConversation.id)}
                      className="p-2 rounded hover:bg-[#f5f5f5] dark:hover:bg-[#111] text-[#7e7e7e] dark:text-[#ebebeb]"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.length === 0 ? (
                    <p className="text-center text-[#7e7e7e] dark:text-[#ebebeb]">
                      Nenhuma mensagem ainda
                    </p>
                  ) : (
                    selectedConversation.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.senderId === session?.user?.id ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.senderId === session?.user?.id
                              ? "bg-[#fe2601] text-white"
                              : "bg-[#f5f5f5] dark:bg-[#111] text-[#222] dark:text-white"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-75 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString("pt-BR")}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>

                <div className="border-t border-[#e4e4e7] dark:border-[#454545] p-4 flex gap-2">
                  <Input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                    placeholder="Digite sua mensagem..."
                    className="bg-[#f5f5f5] dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545]"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-[#fe2601] hover:bg-[#fe2601]/90 text-white"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545] h-[600px] flex items-center justify-center">
                <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
                  Selecione uma conversa para começar
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
