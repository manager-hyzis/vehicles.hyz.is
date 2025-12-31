import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const plans = await prisma.plan.findMany({
      select: {
        id: true,
        name: true,
        duration: true,
        price: true,
        description: true,
      },
      orderBy: { duration: "asc" },
    })

    return NextResponse.json(plans)
  } catch (error) {
    console.error("Error fetching plans:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
