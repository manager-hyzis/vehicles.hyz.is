import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const contactSchema = z.object({
  vehicleId: z.string(),
  senderName: z.string().min(2),
  senderEmail: z.string().email(),
  senderPhone: z.string().min(10),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: validatedData.vehicleId },
    })

    if (!vehicle) {
      return NextResponse.json(
        { message: "Veículo não encontrado" },
        { status: 404 }
      )
    }

    const contact = await prisma.contact.create({
      data: {
        vehicleId: validatedData.vehicleId,
        senderName: validatedData.senderName,
        senderEmail: validatedData.senderEmail,
        senderPhone: validatedData.senderPhone,
        message: validatedData.message,
      },
    })

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Dados inválidos" },
        { status: 400 }
      )
    }

    console.error("Create contact error:", error)
    return NextResponse.json(
      { message: "Erro ao enviar mensagem" },
      { status: 500 }
    )
  }
}
