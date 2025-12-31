import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const vehicleSchema = z.object({
  brand: z.string().min(2),
  model: z.string().min(2),
  year: z.number().min(1900),
  mileage: z.number().nonnegative(),
  fuel: z.string(),
  transmission: z.string(),
  color: z.string(),
  engineSize: z.number().positive(),
  title: z.string().min(5),
  description: z.string().min(10),
  price: z.number().positive(),
  city: z.string().min(2),
  state: z.string().length(2),
  category: z.string().optional(),
  version: z.string().optional(),
  features: z.record(z.any()).optional(),
  observations: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = vehicleSchema.parse(body)

    // TODO: Obter userId da sessão
    const userId = "user-1"

    const vehicle = await prisma.vehicle.create({
      data: {
        userId,
        brand: validatedData.brand,
        model: validatedData.model,
        year: validatedData.year,
        mileage: validatedData.mileage,
        fuel: validatedData.fuel,
        transmission: validatedData.transmission,
        color: validatedData.color,
        engineSize: validatedData.engineSize,
        title: validatedData.title,
        description: validatedData.description,
        price: validatedData.price,
        city: validatedData.city,
        state: validatedData.state,
        category: validatedData.category || "Carro",
        version: validatedData.version || "",
        features: validatedData.features || {},
        observations: validatedData.observations || [],
      },
    })

    return NextResponse.json(vehicle, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Dados inválidos", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Create vehicle error:", error)
    return NextResponse.json(
      { message: "Erro ao criar anúncio" },
      { status: 500 }
    )
  }
}
