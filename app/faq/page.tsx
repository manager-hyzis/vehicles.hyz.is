"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqItems: FAQItem[] = [
  {
    id: "1",
    category: "Geral",
    question: "O que é o Vehicles?",
    answer:
      "Vehicles é uma plataforma de classificados de veículos que conecta vendedores e compradores. Oferecemos uma forma segura e fácil de comprar e vender veículos.",
  },
  {
    id: "2",
    category: "Anúncios",
    question: "Como criar um anúncio?",
    answer:
      "Faça login em sua conta, clique em 'Novo Anúncio' e siga o passo a passo de 7 etapas para criar seu anúncio. Você pode adicionar fotos, descrição, preço e outras informações do veículo.",
  },
  {
    id: "3",
    category: "Anúncios",
    question: "Quanto custa anunciar?",
    answer:
      "Pessoas Físicas podem anunciar 1 veículo gratuitamente. Revendedoras têm pacotes a partir de R$ 39,00/mês para 3 meses, com descontos para períodos maiores.",
  },
  {
    id: "4",
    category: "Anúncios",
    question: "Qual é o limite de imagens por anúncio?",
    answer:
      "Você pode adicionar até 15 imagens por anúncio. Recomendamos usar fotos de boa qualidade para aumentar as chances de venda.",
  },
  {
    id: "5",
    category: "Pagamento",
    question: "Quais são as formas de pagamento?",
    answer:
      "Aceitamos cartão de crédito (Visa, Mastercard, Elo, Hipercard, Amex), cartão de débito, PIX e boleto bancário através do Mercado Pago.",
  },
  {
    id: "6",
    category: "Pagamento",
    question: "Há renovação automática?",
    answer:
      "Não. Todos os pagamentos são únicos. Você receberá uma notificação 7 dias antes do vencimento do seu pacote para renovar manualmente se desejar.",
  },
  {
    id: "7",
    category: "Segurança",
    question: "Como funciona a moderação de anúncios?",
    answer:
      "Todos os anúncios são revisados por nossa equipe antes de serem publicados. Verificamos fotos, informações do veículo e dados do vendedor para garantir a segurança.",
  },
  {
    id: "8",
    category: "Segurança",
    question: "Como denunciar um anúncio suspeito?",
    answer:
      "Você pode denunciar um anúncio clicando no botão 'Denunciar' na página do anúncio. Sua denúncia é anônima e ajuda a manter a plataforma segura.",
  },
  {
    id: "9",
    category: "Destaque",
    question: "O que são os serviços de destaque?",
    answer:
      "Oferecemos 3 tipos de destaque: Destaque (R$ 50), Super Destaque (R$ 150) e Ofertão (R$ 1.500). Cada um oferece diferentes níveis de visibilidade para seu anúncio.",
  },
  {
    id: "10",
    category: "Conta",
    question: "Como alterar meus dados?",
    answer:
      "Acesse 'Dashboard > Editar Perfil' para alterar suas informações pessoais, telefone, endereço e preferências de comunicação.",
  },
  {
    id: "11",
    category: "Conta",
    question: "Como recuperar minha senha?",
    answer:
      "Clique em 'Esqueceu a senha?' na página de login. Você receberá um código de 6 dígitos no seu e-mail para criar uma nova senha.",
  },
  {
    id: "12",
    category: "Revendedoras",
    question: "Como criar um perfil de revendedora?",
    answer:
      "Ao se registrar, selecione 'Pessoa Jurídica'. Você terá acesso a recursos adicionais como pacotes de anúncios, dashboard com estatísticas e perfil público.",
  },
]

const categories = ["Geral", "Anúncios", "Pagamento", "Segurança", "Destaque", "Conta", "Revendedoras"]

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("Geral")

  const filteredItems = faqItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#222] dark:text-white mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-lg text-[#7e7e7e] dark:text-[#ebebeb]">
            Encontre respostas para as perguntas mais comuns
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setExpandedId(null)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-[#fe2601] text-white"
                  : "bg-white dark:bg-[#222] text-[#222] dark:text-white border border-[#e4e4e7] dark:border-[#454545] hover:border-[#fe2601]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545] cursor-pointer"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <CardContent className="p-0">
                <div className="p-6 flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-[#222] dark:text-white text-lg">
                    {item.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`text-[#fe2601] flex-shrink-0 transition-transform ${
                      expandedId === item.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedId === item.id && (
                  <div className="px-6 pb-6 border-t border-[#e4e4e7] dark:border-[#454545] pt-4">
                    <p className="text-[#7e7e7e] dark:text-[#ebebeb] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-[#fe2601]/10 dark:bg-[#fe2601]/20 border-[#fe2601]">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                Não encontrou sua resposta?
              </h2>
              <p className="text-[#7e7e7e] dark:text-[#ebebeb] mb-6">
                Entre em contato conosco e nossa equipe responderá em breve.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-[#fe2601] hover:bg-[#fe2601]/90 text-white font-semibold rounded-lg transition-colors"
              >
                Enviar Mensagem
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
