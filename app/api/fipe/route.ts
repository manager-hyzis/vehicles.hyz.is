import { NextRequest, NextResponse } from "next/server"

interface FipeData {
  brand: string
  model: string
  year: number
  fipeCode: string
  fipeValue: number
  referenceMonth: string
}

const mockFipeData: Record<string, FipeData> = {
  "ford-ecosport-2023": {
    brand: "Ford",
    model: "EcoSport",
    year: 2023,
    fipeCode: "003318-9",
    fipeValue: 85000,
    referenceMonth: "Janeiro/2026",
  },
  "ford-ecosport-2022": {
    brand: "Ford",
    model: "EcoSport",
    year: 2022,
    fipeCode: "003318-8",
    fipeValue: 75000,
    referenceMonth: "Janeiro/2026",
  },
  "ford-ecosport-2021": {
    brand: "Ford",
    model: "EcoSport",
    year: 2021,
    fipeCode: "003318-7",
    fipeValue: 65000,
    referenceMonth: "Janeiro/2026",
  },
  "toyota-corolla-2023": {
    brand: "Toyota",
    model: "Corolla",
    year: 2023,
    fipeCode: "007891-2",
    fipeValue: 95000,
    referenceMonth: "Janeiro/2026",
  },
  "toyota-corolla-2022": {
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    fipeCode: "007891-1",
    fipeValue: 85000,
    referenceMonth: "Janeiro/2026",
  },
  "honda-civic-2023": {
    brand: "Honda",
    model: "Civic",
    year: 2023,
    fipeCode: "005234-5",
    fipeValue: 110000,
    referenceMonth: "Janeiro/2026",
  },
  "honda-civic-2022": {
    brand: "Honda",
    model: "Civic",
    year: 2022,
    fipeCode: "005234-4",
    fipeValue: 100000,
    referenceMonth: "Janeiro/2026",
  },
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const brand = searchParams.get("brand")?.toLowerCase()
    const model = searchParams.get("model")?.toLowerCase()
    const year = searchParams.get("year")

    if (!brand || !model || !year) {
      return NextResponse.json(
        { error: "Brand, model, and year are required" },
        { status: 400 }
      )
    }

    const key = `${brand}-${model}-${year}`
    const fipeData = mockFipeData[key]

    if (!fipeData) {
      return NextResponse.json(
        {
          brand,
          model,
          year: parseInt(year),
          fipeCode: "N/A",
          fipeValue: 0,
          referenceMonth: "Janeiro/2026",
          message: "FIPE data not found for this vehicle",
        },
        { status: 404 }
      )
    }

    return NextResponse.json(fipeData)
  } catch (error) {
    console.error("Error fetching FIPE data:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
