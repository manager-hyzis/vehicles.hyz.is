"use client"

import { useState, useRef, ChangeEvent, DragEvent } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Upload, X, Loader2 } from "lucide-react"

interface ImageUploadFieldProps {
  onUploadComplete: (imageUrl: string, fileName: string) => void
  isDarkMode?: boolean
  maxSize?: number // em bytes, padrão 5MB
}

export function ImageUploadField({
  onUploadComplete,
  isDarkMode = false,
  maxSize = 5 * 1024 * 1024,
}: ImageUploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFile = async (file: File) => {
    // Validar tipo de arquivo
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      toast.error("Tipo de arquivo inválido. Apenas JPEG, PNG e WebP são permitidos.")
      return
    }

    // Validar tamanho
    if (file.size > maxSize) {
      toast.error(`Arquivo muito grande. Máximo de ${maxSize / 1024 / 1024}MB permitido.`)
      return
    }

    setIsUploading(true)

    try {
      // Criar FormData para upload
      const formData = new FormData()
      formData.append("file", file)

      // Upload para a rota de API
      const uploadResponse = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      })

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json()
        toast.error(error.error || "Erro ao fazer upload da imagem")
        return
      }

      const { imageUrl, fileName } = await uploadResponse.json()

      toast.success("Imagem enviada com sucesso!")
      onUploadComplete(imageUrl, fileName)

      // Limpar input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Erro ao fazer upload da imagem")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? isDarkMode
              ? "border-[#dc2626] bg-[#dc2626]/10"
              : "border-[#dc2626] bg-[#dc2626]/5"
            : isDarkMode
            ? "border-[#454545] bg-[#111]"
            : "border-[#e4e4e7] bg-[#f5f5f5]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-[#dc2626] animate-spin" />
              <p className={isDarkMode ? "text-white" : "text-[#222]"}>
                Enviando imagem...
              </p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-[#dc2626]" />
              <div>
                <p className={`font-semibold ${isDarkMode ? "text-white" : "text-[#222]"}`}>
                  Arraste uma imagem aqui
                </p>
                <p className={`text-sm ${isDarkMode ? "text-[#7e7e7e]" : "text-[#52525b]"}`}>
                  ou clique para selecionar
                </p>
              </div>
              <p className={`text-xs ${isDarkMode ? "text-[#7e7e7e]" : "text-[#52525b]"}`}>
                Máximo 5MB • JPEG, PNG ou WebP
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  )
}
