"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Erro ao enviar mensagem")
      }

      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#222] dark:text-white mb-4">
            Entre em Contato
          </h1>
          <p className="text-lg text-[#7e7e7e] dark:text-[#ebebeb]">
            Tem dúvidas? Estamos aqui para ajudar. Entre em contato conosco.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Info Cards */}
          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-[#fe2601]/10">
                  <Mail className="text-[#fe2601]" size={24} />
                </div>
              </div>
              <h3 className="font-semibold text-[#222] dark:text-white mb-2">E-mail</h3>
              <p className="text-[#7e7e7e] dark:text-[#ebebeb]">contato@vehicles.com.br</p>
              <p className="text-xs text-[#7e7e7e] dark:text-[#ebebeb] mt-2">
                Responderemos em até 24 horas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-[#fe2601]/10">
                  <Phone className="text-[#fe2601]" size={24} />
                </div>
              </div>
              <h3 className="font-semibold text-[#222] dark:text-white mb-2">Telefone</h3>
              <p className="text-[#7e7e7e] dark:text-[#ebebeb]">(11) 3000-0000</p>
              <p className="text-xs text-[#7e7e7e] dark:text-[#ebebeb] mt-2">
                Seg-Sex: 9h às 18h
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-[#fe2601]/10">
                  <MapPin className="text-[#fe2601]" size={24} />
                </div>
              </div>
              <h3 className="font-semibold text-[#222] dark:text-white mb-2">Endereço</h3>
              <p className="text-[#7e7e7e] dark:text-[#ebebeb] text-sm">
                São Paulo, SP<br />
                Brasil
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
          <CardHeader>
            <CardTitle className="text-[#222] dark:text-white">Envie uma Mensagem</CardTitle>
            <CardDescription className="text-[#7e7e7e] dark:text-[#ebebeb]">
              Preencha o formulário abaixo e entraremos em contato em breve
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-[#222] dark:text-white">
                    Nome Completo
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222] dark:text-white"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-[#222] dark:text-white">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222] dark:text-white"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-[#222] dark:text-white">
                    Telefone (Opcional)
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222] dark:text-white"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-[#222] dark:text-white">
                    Assunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Assunto da mensagem"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222] dark:text-white"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-[#222] dark:text-white">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Descreva sua mensagem aqui..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 rounded border bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222] dark:text-white"
                  rows={6}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#fe2601] hover:bg-[#fe2601]/90 text-white flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                <Send size={18} />
                {isLoading ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-6">
            Perguntas Frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
              <CardHeader>
                <CardTitle className="text-lg text-[#222] dark:text-white">
                  Como criar um anúncio?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
                  Faça login em sua conta, clique em "Novo Anúncio" e siga o passo a passo para
                  criar seu anúncio de veículo.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
              <CardHeader>
                <CardTitle className="text-lg text-[#222] dark:text-white">
                  Quanto custa anunciar?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
                  Pessoas Físicas podem anunciar 1 veículo gratuitamente. Revendedoras têm
                  pacotes a partir de R$ 39,00/mês.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
              <CardHeader>
                <CardTitle className="text-lg text-[#222] dark:text-white">
                  Como aumentar minhas vendas?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
                  Use os serviços de destaque para aumentar a visibilidade do seu anúncio. Oferecemos
                  Destaque, Super Destaque e Ofertão.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
              <CardHeader>
                <CardTitle className="text-lg text-[#222] dark:text-white">
                  Como funciona a segurança?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
                  Todos os anúncios são moderados antes de serem publicados. Temos um sistema de
                  denúncias para garantir a segurança dos usuários.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
