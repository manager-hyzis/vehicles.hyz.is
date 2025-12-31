import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = forgotPasswordSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (!user) {
      return NextResponse.json(
        { message: "Se o email existe, você receberá um link de recuperação" },
        { status: 200 }
      )
    }

    // TODO: Implementar envio de email com link de recuperação
    // Por enquanto, apenas retornamos sucesso
    console.log(`Password reset requested for: ${validatedData.email}`)

    return NextResponse.json(
      { message: "Se o email existe, você receberá um link de recuperação" },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Dados inválidos" },
        { status: 400 }
      )
    }

    console.error("Forgot password error:", error)
    return NextResponse.json(
      { message: "Erro ao processar solicitação" },
      { status: 500 }
    )
  }
}
