import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    })

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      )
    }

    const reviews = await prisma.review.findMany({
      where: {
        sellerId: params.id,
        tokenUsed: true, // Apenas reviews que foram confirmados
      },
      include: {
        vehicle: {
          select: {
            brand: true,
            model: true,
            year: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Get reviews error:", error)
    return NextResponse.json(
      { message: "Erro ao buscar reviews" },
      { status: 500 }
    )
  }
}
