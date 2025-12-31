import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const reorderSchema = z.object({
  vehicleId: z.string(),
  images: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
      isCover: z.boolean().optional(),
    })
  ),
})

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = reorderSchema.parse(body)

    // Atualizar ordem de todas as imagens
    for (const image of validatedData.images) {
      await prisma.vehicleImage.update({
        where: { id: image.id },
        data: {
          order: image.order,
          isCover: image.isCover || false,
        },
      })
    }

    // Se houver uma nova capa, remover capa das outras
    const coverImage = validatedData.images.find((img) => img.isCover)
    if (coverImage) {
      await prisma.vehicleImage.updateMany({
        where: {
          vehicleId: validatedData.vehicleId,
          id: { not: coverImage.id },
        },
        data: { isCover: false },
      })
    }

    return NextResponse.json({ message: "Imagens reordenadas com sucesso" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Dados inválidos" },
        { status: 400 }
      )
    }

    console.error("Reorder images error:", error)
    return NextResponse.json(
      { message: "Erro ao reordenar imagens" },
      { status: 500 }
    )
  }
}
