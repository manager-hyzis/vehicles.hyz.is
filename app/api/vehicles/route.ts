import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const brand = searchParams.get("brand")
    const model = searchParams.get("model")
    const city = searchParams.get("city")
    const state = searchParams.get("state")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    const skip = (page - 1) * limit

    const where: any = {
      status: "ACTIVE",
    }

    if (brand) where.brand = { contains: brand, mode: "insensitive" }
    if (model) where.model = { contains: model, mode: "insensitive" }
    if (city) where.city = { contains: city, mode: "insensitive" }
    if (state) where.state = state
    if (minPrice) where.price = { gte: parseFloat(minPrice) }
    if (maxPrice) {
      if (where.price) {
        where.price.lte = parseFloat(maxPrice)
      } else {
        where.price = { lte: parseFloat(maxPrice) }
      }
    }

    const [vehicles, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        include: {
          images: { take: 1 },
          user: { select: { id: true, name: true, type: true } },
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.vehicle.count({ where }),
    ])

    return NextResponse.json({
      vehicles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get vehicles error:", error)
    return NextResponse.json(
      { message: "Erro ao buscar veículos" },
      { status: 500 }
    )
  }
}
