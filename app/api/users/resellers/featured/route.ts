import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get("limit") || "4")

    // Buscar revendedoras com melhor reputação
    const resellers = await prisma.user.findMany({
      where: {
        type: {
          in: ["RESELLER", "GARAGE", "DEALERSHIP"],
        },
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        type: true,
        city: true,
        state: true,
        logo: true,
        reputation: true,
        _count: {
          select: {
            vehicles: {
              where: {
                status: "ACTIVE",
              },
            },
            reviews: true,
          },
        },
      },
      orderBy: {
        reputation: "desc",
      },
      take: limit,
    })

    return NextResponse.json({ resellers })
  } catch (error) {
    console.error("Erro ao buscar revendedoras:", error)
    return NextResponse.json(
      { message: "Erro ao buscar revendedoras" },
      { status: 500 }
    )
  }
}
