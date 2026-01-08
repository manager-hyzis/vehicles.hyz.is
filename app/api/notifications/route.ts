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
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "20")

    const vehicles = await prisma.vehicle.findMany({
      where: { userId },
      select: { id: true, status: true, createdAt: true },
    })

    const reviews = await prisma.review.findMany({
      where: { sellerId: userId },
      select: { createdAt: true, rating: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    })

    const notifications = [
      ...vehicles.map((v, i) => ({
        id: `vehicle-${v.id}`,
        type: v.status === "ACTIVE" ? "APPROVED" : "REJECTED",
        title: v.status === "ACTIVE" ? "Anúncio Aprovado" : "Anúncio Rejeitado",
        message:
          v.status === "ACTIVE"
            ? "Seu anúncio foi aprovado e está visível"
            : "Seu anúncio foi rejeitado",
        timestamp: v.createdAt,
        read: i > 2,
      })),
      ...reviews.map((r, i) => ({
        id: `review-${r.createdAt}`,
        type: "REVIEW",
        title: "Nova Avaliação",
        message: `Você recebeu uma avaliação de ${r.rating} estrelas`,
        timestamp: r.createdAt,
        read: i > 1,
      })),
    ]

    return NextResponse.json(notifications.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, limit))
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { notificationId } = body

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating notification:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
