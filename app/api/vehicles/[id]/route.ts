import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
      include: {
        images: { orderBy: { order: "asc" } },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            type: true,
            city: true,
            state: true,
          },
        },
        favorites: { select: { userId: true } },
        reviews: { select: { rating: true, comment: true, createdAt: true } },
      },
    })

    if (!vehicle) {
      return NextResponse.json(
        { message: "Veículo não encontrado" },
        { status: 404 }
      )
    }

    // Incrementar contador de visualizações
    await prisma.vehicle.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error("Get vehicle error:", error)
    return NextResponse.json(
      { message: "Erro ao buscar veículo" },
      { status: 500 }
    )
  }
}
