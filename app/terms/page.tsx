"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#222] dark:text-white mb-4">
            Termos de Serviço
          </h1>
          <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
            Última atualização: 31 de dezembro de 2025
          </p>
        </div>

        {/* Content */}
        <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
          <CardContent className="prose prose-invert max-w-none pt-6">
            <div className="space-y-6 text-[#7e7e7e] dark:text-[#ebebeb]">
              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  1. Aceitação dos Termos
                </h2>
                <p>
                  Ao acessar e usar o Vehicles, você concorda em cumprir estes Termos de Serviço. Se
                  você não concorda com qualquer parte destes termos, não use o serviço.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  2. Uso da Plataforma
                </h2>
                <p>
                  Você concorda em usar o Vehicles apenas para fins legais e de forma que não
                  infrinja os direitos de terceiros ou restrinja seu uso e gozo.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Não postar conteúdo ofensivo, ilegal ou enganoso</li>
                  <li>Não tentar acessar áreas restritas da plataforma</li>
                  <li>Não usar a plataforma para spam ou phishing</li>
                  <li>Não violar direitos de propriedade intelectual</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  3. Contas de Usuário
                </h2>
                <p>
                  Você é responsável por manter a confidencialidade de sua senha e por todas as
                  atividades que ocorrem em sua conta. Você concorda em notificar-nos imediatamente
                  sobre qualquer uso não autorizado de sua conta.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  4. Anúncios
                </h2>
                <p>
                  Ao criar um anúncio, você garante que:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Você é o proprietário ou tem autorização para vender o veículo</li>
                  <li>Todas as informações fornecidas são precisas e verdadeiras</li>
                  <li>As imagens são do veículo anunciado</li>
                  <li>O veículo não é roubado ou tem problemas legais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  5. Moderação de Conteúdo
                </h2>
                <p>
                  Reservamos o direito de remover qualquer conteúdo que viole estes termos ou
                  nossas políticas. Podemos suspender ou encerrar contas que violem repetidamente
                  nossas regras.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  6. Limitação de Responsabilidade
                </h2>
                <p>
                  O Vehicles é fornecido "como está" sem garantias de qualquer tipo. Não somos
                  responsáveis por perdas diretas, indiretas ou consequentes resultantes do uso da
                  plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  7. Pagamentos
                </h2>
                <p>
                  Todos os pagamentos são processados através do Mercado Pago. Você concorda com
                  seus termos e condições. Não há reembolsos após a conclusão da transação.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  8. Propriedade Intelectual
                </h2>
                <p>
                  Todo o conteúdo da plataforma, incluindo textos, gráficos, logos e imagens, é
                  propriedade do Vehicles ou de seus fornecedores de conteúdo e é protegido por
                  leis de direitos autorais.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  9. Alterações dos Termos
                </h2>
                <p>
                  Podemos alterar estes termos a qualquer momento. O uso continuado da plataforma
                  após alterações constitui aceitação dos novos termos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  10. Contato
                </h2>
                <p>
                  Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco
                  através da página de contato.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
