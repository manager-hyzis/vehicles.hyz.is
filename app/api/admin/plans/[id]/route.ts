import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await auth()

    if (!session || session.user.type !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const plan = await prisma.plan.update({
      where: { id: params.id },
      data: {
        price: body.price,
      },
      select: {
        id: true,
        name: true,
        price: true,
      },
    })

    return NextResponse.json(plan)
  } catch (error) {
    console.error("Error updating plan price:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
