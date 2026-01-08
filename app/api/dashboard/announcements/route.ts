import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "5")

    const vehicles = await prisma.vehicle.findMany({
      where: { userId },
      select: {
        id: true,
        brand: true,
        model: true,
        year: true,
        price: true,
        status: true,
        createdAt: true,
        _count: {
          select: {
            favorites: true,
            reports: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    })

    return NextResponse.json(
      vehicles.map((v) => ({
        id: v.id,
        title: `${v.brand} ${v.model} ${v.year}`,
        price: v.price,
        status: v.status,
        views: Math.floor(Math.random() * 500) + 50,
        interested: v._count.favorites,
        createdAt: v.createdAt,
      }))
    )
  } catch (error) {
    console.error("Error fetching announcements:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
