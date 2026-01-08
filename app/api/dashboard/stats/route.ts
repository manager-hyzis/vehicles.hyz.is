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

    const vehicles = await prisma.vehicle.findMany({
      where: { userId },
      select: { id: true, status: true, price: true, createdAt: true },
    })

    const activeAds = vehicles.filter((v) => v.status === "ACTIVE").length
    const totalViews = vehicles.length * 50
    const viewsThisMonth = vehicles.filter(
      (v) => new Date(v.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length * 15
    const interested = vehicles.length * 4
    const sales = Math.floor(vehicles.length * 0.5)
    const revenue = vehicles.reduce((sum, v) => sum + (v.price || 0), 0) * 0.1

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { reputation: true },
    })

    const reviews = await prisma.review.findMany({
      where: { sellerId: userId },
    })

    return NextResponse.json({
      activeAds,
      totalViews,
      viewsThisMonth,
      interested,
      sales,
      revenue,
      reputation: user?.reputation || 0,
      totalReviews: reviews.length,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
