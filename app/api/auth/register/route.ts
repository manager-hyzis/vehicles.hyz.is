import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  type: z.enum(["PRIVATE", "RESELLER", "GARAGE", "DEALERSHIP"]),
  phone: z.string().min(10),
  city: z.string().min(2),
  state: z.string().length(2),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "Email já cadastrado" },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(validatedData.password, 10)

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        type: validatedData.type,
        phone: validatedData.phone,
        city: validatedData.city,
        state: validatedData.state,
        country: "Brasil",
      },
    })

    return NextResponse.json(
      { message: "Usuário cadastrado com sucesso", userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Dados inválidos", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Register error:", error)
    return NextResponse.json(
      { message: "Erro ao cadastrar usuário" },
      { status: 500 }
    )
  }
}
