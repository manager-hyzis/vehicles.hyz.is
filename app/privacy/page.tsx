"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#222] dark:text-white mb-4">
            Política de Privacidade
          </h1>
          <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
            Última atualização: 31 de dezembro de 2025
          </p>
        </div>

        {/* Content */}
        <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
          <CardContent className="pt-6">
            <div className="space-y-6 text-[#7e7e7e] dark:text-[#ebebeb]">
              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  1. Introdução
                </h2>
                <p>
                  O Vehicles ("nós", "nosso" ou "nos") opera a plataforma Vehicles.com.br. Esta
                  página informa você sobre nossas políticas sobre coleta, uso e divulgação de dados
                  pessoais quando você usa nosso serviço.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  2. Coleta de Dados
                </h2>
                <p>
                  Coletamos vários tipos de informações para fins diversos para fornecer e melhorar
                  nosso serviço:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Dados de Identificação: Nome, email, telefone, endereço</li>
                  <li>Dados de Conta: Senha (criptografada), tipo de usuário</li>
                  <li>Dados de Anúncio: Informações sobre veículos, imagens, preços</li>
                  <li>Dados de Uso: Páginas visitadas, tempo gasto, cliques</li>
                  <li>Dados de Localização: Cidade, estado (opcional)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  3. Uso de Dados
                </h2>
                <p>
                  Usamos os dados coletados para:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Fornecer e manter nosso serviço</li>
                  <li>Notificá-lo sobre alterações em nosso serviço</li>
                  <li>Permitir que você participe de recursos interativos</li>
                  <li>Fornecer suporte ao cliente</li>
                  <li>Coletar análises para melhorar nosso serviço</li>
                  <li>Monitorar o uso de nosso serviço</li>
                  <li>Detectar, prevenir e abordar problemas técnicos e fraudes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  4. Segurança de Dados
                </h2>
                <p>
                  A segurança de seus dados é importante para nós. Usamos criptografia SSL/TLS para
                  proteger suas informações em trânsito. No entanto, nenhum método de transmissão
                  pela Internet é 100% seguro.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  5. Compartilhamento de Dados
                </h2>
                <p>
                  Não vendemos, negociamos ou transferimos seus dados pessoais identificáveis para
                  terceiros. Podemos compartilhar informações agregadas e não identificáveis com
                  parceiros para fins de pesquisa e marketing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  6. Cookies
                </h2>
                <p>
                  Usamos cookies para melhorar sua experiência. Você pode optar por desativar cookies
                  em seu navegador, mas isso pode afetar a funcionalidade do site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  7. Seus Direitos
                </h2>
                <p>
                  Você tem o direito de:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados imprecisos</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Optar por não receber comunicações de marketing</li>
                  <li>Solicitar uma cópia de seus dados</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  8. Retenção de Dados
                </h2>
                <p>
                  Retemos seus dados pessoais pelo tempo necessário para fornecer nosso serviço e
                  cumprir obrigações legais. Você pode solicitar a exclusão de seus dados a qualquer
                  momento.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  9. Alterações nesta Política
                </h2>
                <p>
                  Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você
                  sobre alterações significativas por email ou por um aviso proeminente em nosso site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  10. Contato
                </h2>
                <p>
                  Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco
                  através da página de contato ou envie um email para privacy@vehicles.com.br.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#222] dark:text-white mb-3">
                  11. Conformidade com LGPD
                </h2>
                <p>
                  Estamos em conformidade com a Lei Geral de Proteção de Dados (LGPD) do Brasil.
                  Processamos dados pessoais apenas com base legal apropriada e respeitamos seus
                  direitos sob a LGPD.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
