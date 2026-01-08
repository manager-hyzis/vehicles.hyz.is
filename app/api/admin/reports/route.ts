import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const status = request.nextUrl.searchParams.get("status") || "all"
    const type = request.nextUrl.searchParams.get("type") || "all"
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "50")

    const where: any = {}
    if (status !== "all") where.status = status
    if (type !== "all") where.type = type

    const reports = await prisma.report.findMany({
      where,
      include: {
        vehicle: {
          select: {
            id: true,
            brand: true,
            model: true,
            year: true,
            price: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            reports: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    })

    return NextResponse.json(
      reports.map((r) => ({
        id: r.id,
        vehicleId: r.vehicle.id,
        vehicleTitle: `${r.vehicle.brand} ${r.vehicle.model} ${r.vehicle.year}`,
        reportType: r.type,
        description: r.description || "",
        status: r.status,
        reportCount: r._count.reports,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      }))
    )
  } catch (error) {
    console.error("Error fetching reports:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { reportId, status } = body

    const report = await prisma.report.update({
      where: { id: reportId },
      data: { status },
    })

    return NextResponse.json(report)
  } catch (error) {
    console.error("Error updating report:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
