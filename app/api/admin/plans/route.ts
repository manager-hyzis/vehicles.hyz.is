import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.type !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const plans = await prisma.plan.findMany({
      select: {
        id: true,
        name: true,
        duration: true,
        price: true,
        description: true,
        _count: {
          select: {
            subscriptions: true,
          },
        },
      },
      orderBy: { duration: "asc" },
    })

    const highlights = await prisma.highlight.findMany({
      select: {
        id: true,
        name: true,
        duration: true,
        price: true,
        description: true,
        _count: {
          select: {
            subscriptions: true,
          },
        },
      },
      orderBy: { duration: "asc" },
    })

    return NextResponse.json({
      plans: plans.map((p) => ({
        ...p,
        activeContracts: p._count.subscriptions,
      })),
      highlights: highlights.map((h) => ({
        ...h,
        activeContracts: h._count.subscriptions,
      })),
    })
  } catch (error) {
    console.error("Error fetching plans:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
