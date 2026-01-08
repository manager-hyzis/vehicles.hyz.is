import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumber, message, vehicleId } = body

    if (!phoneNumber || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    return NextResponse.json({
      success: true,
      url: whatsappUrl,
      message: "WhatsApp link generated successfully",
    })
  } catch (error) {
    console.error("Error generating WhatsApp link:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
