import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get("type") // DESTAQUE, SUPER_DESTAQUE, OFERTAO
    const limit = parseInt(searchParams.get("limit") || "6")

    const now = new Date()

    // Buscar veículos com highlights ativos
    const highlights = await prisma.highlight.findMany({
      where: {
        type: type as any,
        startDate: { lte: now },
        endDate: { gte: now },
        vehicle: {
          status: "ACTIVE",
        },
      },
      include: {
        vehicle: {
          include: {
            images: {
              orderBy: { order: "asc" },
              take: 1,
            },
            user: {
              select: {
                id: true,
                name: true,
                type: true,
                city: true,
                state: true,
              },
            },
          },
        },
      },
      take: limit,
      orderBy: { createdAt: "desc" },
    })

    const vehicles = highlights.map((h) => ({
      ...h.vehicle,
      highlightType: h.type,
    }))

    return NextResponse.json({ vehicles })
  } catch (error) {
    console.error("Erro ao buscar veículos em destaque:", error)
    return NextResponse.json(
      { message: "Erro ao buscar veículos em destaque" },
      { status: 500 }
    )
  }
}
