import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { randomBytes } from "crypto"

const markSoldSchema = z.object({
  saleDate: z.string().datetime().optional(),
  salePrice: z.number().positive().optional(),
  paymentMethod: z.string().optional(),
  observations: z.string().optional(),
})

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const body = await request.json()
    const validatedData = markSoldSchema.parse(body)

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
    })

    if (!vehicle) {
      return NextResponse.json(
        { message: "Veículo não encontrado" },
        { status: 404 }
      )
    }

    // Gerar token único para review
    const reviewToken = randomBytes(32).toString("hex")

    // Criar review com token
    await prisma.review.create({
      data: {
        sellerId: vehicle.userId,
        vehicleId: params.id,
        rating: 0,
        comment: "",
        recommend: false,
        reviewToken,
        tokenUsed: false,
      },
    })

    // Atualizar status do veículo para SOLD
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: params.id },
      data: {
        status: "SOLD",
      },
    })

    return NextResponse.json({
      message: "Anúncio marcado como vendido",
      vehicle: updatedVehicle,
      reviewLink: `/review/${reviewToken}`,
      reviewToken,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Dados inválidos" },
        { status: 400 }
      )
    }

    console.error("Mark sold error:", error)
    return NextResponse.json(
      { message: "Erro ao marcar anúncio como vendido" },
      { status: 500 }
    )
  }
}
