import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface MercadoPagoWebhook {
  id: string
  type: string
  data: {
    id: string
  }
  action: string
}

interface PaymentData {
  id: string
  status: string
  external_reference: string
  payer: {
    email: string
  }
  items: Array<{
    title: string
  }>
}

export async function POST(request: NextRequest) {
  try {
    const body: MercadoPagoWebhook = await request.json()

    if (body.type === "payment") {
      const paymentId = body.data.id

      const paymentResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          },
        }
      )

      if (!paymentResponse.ok) {
        console.error("Error fetching payment from Mercado Pago")
        return NextResponse.json(
          { error: "Failed to fetch payment" },
          { status: 400 }
        )
      }

      const paymentData: PaymentData = await paymentResponse.json()

      if (paymentData.status === "approved") {
        const externalReference = paymentData.external_reference
        const userEmail = paymentData.payer.email
        const service = paymentData.items[0]?.title || "UNKNOWN"

        const user = await prisma.user.findUnique({
          where: { email: userEmail },
        })

        if (!user) {
          console.error(`User not found for email: ${userEmail}`)
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          )
        }

        const transaction = await prisma.transaction.findFirst({
          where: {
            userId: user.id,
            status: "PENDING",
          },
        })

        if (transaction) {
          await prisma.transaction.update({
            where: { id: transaction.id },
            data: {
              status: "COMPLETED",
            },
          })

          if (service.includes("PACOTE")) {
            const subscription = await prisma.subscription.findFirst({
              where: {
                userId: user.id,
                status: "PENDING",
              },
            })

            if (subscription) {
              const startDate = new Date()
              const endDate = new Date()

              if (service.includes("3")) {
                endDate.setMonth(endDate.getMonth() + 3)
              } else if (service.includes("6")) {
                endDate.setMonth(endDate.getMonth() + 6)
              } else if (service.includes("9")) {
                endDate.setMonth(endDate.getMonth() + 9)
              }

              await prisma.subscription.update({
                where: { id: subscription.id },
                data: {
                  status: "ACTIVE",
                  startDate,
                  endDate,
                },
              })
            }
          }

          if (service.includes("DESTAQUE")) {
            const highlight = await prisma.highlight.findFirst({
              where: {
                vehicleId: externalReference,
                status: "PENDING",
              },
            })

            if (highlight) {
              const startDate = new Date()
              const endDate = new Date()
              endDate.setDate(endDate.getDate() + 30)

              await prisma.highlight.update({
                where: { id: highlight.id },
                data: {
                  status: "ACTIVE",
                  startDate,
                  endDate,
                },
              })
            }
          }
        }
      } else if (paymentData.status === "rejected") {
        const transaction = await prisma.transaction.findFirst({
          where: {
            status: "PENDING",
          },
        })

        if (transaction) {
          await prisma.transaction.update({
            where: { id: transaction.id },
            data: {
              status: "FAILED",
            },
          })
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing Mercado Pago webhook:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
