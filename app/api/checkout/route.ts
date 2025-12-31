import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { planId, paymentMethod } = body

    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    })

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 })
    }

    // TODO: Integrar com Mercado Pago para gerar checkout URL
    // Por enquanto, retornar sucesso simulado
    const checkoutUrl = `https://mercadopago.com/checkout/${planId}`

    return NextResponse.json({
      success: true,
      checkoutUrl,
      plan: {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
      },
    })
  } catch (error) {
    console.error("Error processing checkout:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
