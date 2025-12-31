import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, props: { params: Promise<{ userId: string }> }) {
  const params = await props.params;
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")

    const where: any = {
      userId: params.userId,
    }

    if (status && status !== "TODOS") {
      where.status = status
    }

    const vehicles = await prisma.vehicle.findMany({
      where,
      include: {
        images: { take: 1 },
        _count: {
          select: {
            favorites: true,
            contacts: true,
            reviews: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(vehicles)
  } catch (error) {
    console.error("Get user vehicles error:", error)
    return NextResponse.json(
      { message: "Erro ao buscar anúncios" },
      { status: 500 }
    )
  }
}
