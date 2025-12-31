import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  street: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().min(2),
  state: z.string().length(2),
  zipCode: z.string().optional(),
  acceptOffers: z.boolean().optional(),
  acceptPartnerOffers: z.boolean().optional(),
})

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = profileSchema.parse(body)

    // TODO: Obter userId da sessão
    const userId = "user-1"

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        street: validatedData.street,
        neighborhood: validatedData.neighborhood,
        city: validatedData.city,
        state: validatedData.state,
        zipCode: validatedData.zipCode,
        acceptOffers: validatedData.acceptOffers,
        acceptPartnerOffers: validatedData.acceptPartnerOffers,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Dados inválidos" },
        { status: 400 }
      )
    }

    console.error("Update profile error:", error)
    return NextResponse.json(
      { message: "Erro ao atualizar perfil" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // TODO: Obter userId da sessão
    const userId = "user-1"

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json(
      { message: "Erro ao buscar perfil" },
      { status: 500 }
    )
  }
}
