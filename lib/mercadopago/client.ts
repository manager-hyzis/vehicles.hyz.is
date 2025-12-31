import { MercadoPagoConfig, Preference } from "mercadopago"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
})

export async function createPreference(data: {
  title: string
  quantity: number
  unit_price: number
  description?: string
  external_reference?: string
  payer_email?: string
}) {
  const preference = new Preference(client)

  return await preference.create({
    body: {
      items: [
        {
          id: `item-${Date.now()}`,
          title: data.title,
          quantity: data.quantity,
          unit_price: data.unit_price,
          description: data.description,
        },
      ],
      external_reference: data.external_reference,
      payer: {
        email: data.payer_email,
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento/sucesso`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento/falha`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento/pendente`,
      },
      auto_return: "approved",
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/mercadopago/webhook`,
    },
  })
}

export function getMercadoPagoPublicKey(): string {
  return process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || ""
}
