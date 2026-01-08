import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const plans = await prisma.plan.findMany({
      orderBy: { duration: "asc" },
    })

    const highlights = await prisma.highlight.findMany({
      orderBy: { duration: "asc" },
    })

    return NextResponse.json({
      plans: plans.map((p) => ({
        id: p.id,
        name: p.name,
        duration: p.duration,
        price: p.price,
        description: p.description,
        activeContracts: 0,
      })),
      highlights: highlights.map((h) => ({
        id: h.id,
        name: h.name,
        duration: h.duration,
        price: h.price,
        description: h.description,
        activeContracts: 0,
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
