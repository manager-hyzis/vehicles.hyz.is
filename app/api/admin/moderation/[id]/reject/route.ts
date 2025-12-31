import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.type !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const vehicle = await prisma.vehicle.update({
      where: { id: params.id },
      data: {
        status: "REJECTED",
      },
      select: {
        id: true,
        brand: true,
        model: true,
        status: true,
      },
    })

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error("Error rejecting vehicle:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
