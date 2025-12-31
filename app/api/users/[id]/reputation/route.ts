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

    // Obter reviews do usuário
    const reviews = await prisma.review.findMany({
      where: { sellerId: params.id },
    })

    // Obter veículos vendidos
    const soldVehicles = await prisma.vehicle.findMany({
      where: {
        userId: params.id,
        status: "SOLD",
      },
    })

    // Calcular métricas
    const totalReviews = reviews.length
    const totalSales = soldVehicles.length
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0
    const recommendationPercentage =
      totalReviews > 0
        ? (reviews.filter((r) => r.recommend).length / totalReviews) * 100
        : 0

    // Calcular tempo médio de resposta (simplificado)
    const averageResponseTime = 24 // horas (placeholder)

    return NextResponse.json({
      userId: params.id,
      userName: user.name,
      userType: user.type,
      totalReviews,
      totalSales,
      averageRating: parseFloat(averageRating.toFixed(1)),
      recommendationPercentage: parseFloat(recommendationPercentage.toFixed(1)),
      averageResponseTime,
    })
  } catch (error) {
    console.error("Get reputation error:", error)
    return NextResponse.json(
      { message: "Erro ao buscar reputação" },
      { status: 500 }
    )
  }
}
