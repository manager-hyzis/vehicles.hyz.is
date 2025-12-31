import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID

const client = new S3Client({
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  region: "auto",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
})

export async function generatePresignedUrl(
  fileName: string,
  contentType: string
): Promise<string> {
  const key = `vehicles/${Date.now()}-${fileName}`

  try {
    const signedUrl = await getSignedUrl(
      client,
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: key,
        ContentType: contentType,
      }),
      {
        expiresIn: 3600, // URL válida por 1 hora
      }
    )

    return signedUrl
  } catch (error) {
    console.error("Error generating presigned URL:", error)
    throw error
  }
}

export async function deleteFromR2(fileKey: string): Promise<void> {
  // Implementar deleção se necessário
  // Por enquanto, apenas log
  console.log(`File deletion requested for key: ${fileKey}`)
}
