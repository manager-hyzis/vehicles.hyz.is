import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { randomBytes } from "crypto"

const reviewSchema = z.object({
  sellerId: z.string(),
  vehicleId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(500).optional(),
  recommend: z.boolean(),
})

const submitReviewSchema = z.object({
  token: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(500).optional(),
  recommend: z.boolean(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = reviewSchema.parse(body)

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: validatedData.vehicleId },
    })

    if (!vehicle) {
      return NextResponse.json(
        { message: "Veículo não encontrado" },
        { status: 404 }
      )
    }

    // Gerar token único para review
    const reviewToken = randomBytes(32).toString("hex")

    const review = await prisma.review.create({
      data: {
        sellerId: validatedData.sellerId,
        vehicleId: validatedData.vehicleId,
        rating: 0, // Será preenchido quando o link for usado
        comment: "",
        recommend: false,
        reviewToken,
        tokenUsed: false,
      },
    })

    return NextResponse.json(
      {
        message: "Link de review gerado com sucesso",
        reviewToken,
        reviewLink: `/review/${reviewToken}`,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Dados inválidos" },
        { status: 400 }
      )
    }

    console.error("Create review error:", error)
    return NextResponse.json(
      { message: "Erro ao gerar link de review" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json(
        { message: "Token é obrigatório" },
        { status: 400 }
      )
    }

    const review = await prisma.review.findUnique({
      where: { reviewToken: token },
      include: {
        vehicle: { select: { brand: true, model: true, year: true } },
        seller: { select: { name: true } },
      },
    })

    if (!review) {
      return NextResponse.json(
        { message: "Link de review não encontrado ou expirado" },
        { status: 404 }
      )
    }

    if (review.tokenUsed) {
      return NextResponse.json(
        { message: "Este link de review já foi utilizado" },
        { status: 400 }
      )
    }

    return NextResponse.json(review)
  } catch (error) {
    console.error("Get review error:", error)
    return NextResponse.json(
      { message: "Erro ao validar link de review" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = submitReviewSchema.parse(body)

    const review = await prisma.review.findUnique({
      where: { reviewToken: validatedData.token },
    })

    if (!review) {
      return NextResponse.json(
        { message: "Link de review não encontrado" },
        { status: 404 }
      )
    }

    if (review.tokenUsed) {
      return NextResponse.json(
        { message: "Este link de review já foi utilizado" },
        { status: 400 }
      )
    }

    const updatedReview = await prisma.review.update({
      where: { reviewToken: validatedData.token },
      data: {
        rating: validatedData.rating,
        comment: validatedData.comment || "",
        recommend: validatedData.recommend,
        tokenUsed: true,
      },
    })

    return NextResponse.json({
      message: "Avaliação enviada com sucesso",
      review: updatedReview,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Dados inválidos" },
        { status: 400 }
      )
    }

    console.error("Submit review error:", error)
    return NextResponse.json(
      { message: "Erro ao enviar avaliação" },
      { status: 500 }
    )
  }
}
