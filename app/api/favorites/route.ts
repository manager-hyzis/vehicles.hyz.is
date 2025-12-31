import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const favoriteSchema = z.object({
  vehicleId: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = favoriteSchema.parse(body)

    // TODO: Adicionar autenticação quando NextAuth estiver configurado
    const userId = "temp-user-id"

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        vehicleId: validatedData.vehicleId,
      },
    })

    return NextResponse.json(favorite, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Dados inválidos" },
        { status: 400 }
      )
    }

    console.error("Create favorite error:", error)
    return NextResponse.json(
      { message: "Erro ao adicionar aos favoritos" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const vehicleId = searchParams.get("vehicleId")

    if (!vehicleId) {
      return NextResponse.json(
        { message: "vehicleId é obrigatório" },
        { status: 400 }
      )
    }

    // TODO: Adicionar autenticação quando NextAuth estiver configurado
    const userId = "temp-user-id"

    await prisma.favorite.delete({
      where: {
        userId_vehicleId: {
          userId,
          vehicleId,
        },
      },
    })

    return NextResponse.json({ message: "Removido dos favoritos" })
  } catch (error) {
    console.error("Delete favorite error:", error)
    return NextResponse.json(
      { message: "Erro ao remover dos favoritos" },
      { status: 500 }
    )
  }
}
