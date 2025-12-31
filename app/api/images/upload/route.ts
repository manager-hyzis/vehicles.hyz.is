import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import sharp from "sharp"
import { r2 } from "@/lib/r2"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validar tipo de arquivo
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WebP are allowed" },
        { status: 400 }
      )
    }

    // Validar tamanho (máx 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB" },
        { status: 400 }
      )
    }

    // Converter arquivo para buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Otimizar imagem com Sharp
    const optimized = await sharp(buffer)
      .webp({ quality: 90 })
      .toBuffer()

    // Gerar nome único do arquivo
    const fileName = `vehicles/${Date.now()}-${Math.random().toString(36).substring(7)}.webp`

    // Upload para R2
    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
        Key: fileName,
        Body: optimized,
        ContentType: "image/webp",
      })
    )

    // Gerar URL pública
    const imageUrl = `https://${process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN}/${fileName}`

    return NextResponse.json({
      success: true,
      imageUrl,
      fileName,
    })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
