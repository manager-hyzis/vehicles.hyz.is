import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const body = await request.json()
    const { status } = body

    const vehicle = await prisma.vehicle.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
      },
    })

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error("Update vehicle error:", error)
    return NextResponse.json(
      { message: "Erro ao atualizar anúncio" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await prisma.vehicle.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Anúncio deletado com sucesso" })
  } catch (error) {
    console.error("Delete vehicle error:", error)
    return NextResponse.json(
      { message: "Erro ao deletar anúncio" },
      { status: 500 }
    )
  }
}
