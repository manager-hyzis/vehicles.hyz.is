import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const state = searchParams.get("state")
    const city = searchParams.get("city")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")

    const where: any = {
      type: {
        in: ["RESELLER", "GARAGE", "DEALERSHIP"],
      },
      status: "ACTIVE",
    }

    if (state) where.state = state
    if (city) where.city = { contains: city, mode: "insensitive" }
    if (search) {
      where.name = { contains: search, mode: "insensitive" }
    }

    const resellers = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        type: true,
        logo: true,
        city: true,
        state: true,
        reputation: true,
        _count: {
          select: {
            vehicles: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    })

    const total = await prisma.user.count({ where })

    return NextResponse.json({
      resellers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching resellers:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
