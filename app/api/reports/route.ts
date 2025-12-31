import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const reportSchema = z.object({
  vehicleId: z.string(),
  type: z.enum(["GOLPE", "CONTEUDO_INADEQUADO", "VEICULO_ROUBADO", "OUTRO"]),
  description: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = reportSchema.parse(body)

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: validatedData.vehicleId },
    })

    if (!vehicle) {
      return NextResponse.json(
        { message: "Veículo não encontrado" },
        { status: 404 }
      )
    }

    // TODO: Obter userId da sessão
    const userId = "temp-user-id"

    // Verificar se o usuário já denunciou este anúncio
    const existingReport = await prisma.report.findFirst({
      where: {
        vehicleId: validatedData.vehicleId,
        userId,
      },
    })

    if (existingReport) {
      return NextResponse.json(
        { message: "Você já denunciou este anúncio" },
        { status: 400 }
      )
    }

    const report = await prisma.report.create({
      data: {
        vehicleId: validatedData.vehicleId,
        userId,
        type: validatedData.type,
        description: validatedData.description,
        status: "PENDING",
      },
    })

    return NextResponse.json(report, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Dados inválidos" },
        { status: 400 }
      )
    }

    console.error("Create report error:", error)
    return NextResponse.json(
      { message: "Erro ao criar denúncia" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const vehicleId = searchParams.get("vehicleId")
    const status = searchParams.get("status")

    const where: any = {}

    if (vehicleId) where.vehicleId = vehicleId
    if (status) where.status = status

    const reports = await prisma.report.findMany({
      where,
      include: {
        vehicle: { select: { title: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(reports)
  } catch (error) {
    console.error("Get reports error:", error)
    return NextResponse.json(
      { message: "Erro ao buscar denúncias" },
      { status: 500 }
    )
  }
}
