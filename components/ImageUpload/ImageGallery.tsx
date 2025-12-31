"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, GripVertical, Check, Loader2 } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface ImageItem {
  url: string
  fileName: string
  isCover?: boolean
}

interface ImageGalleryProps {
  images: ImageItem[]
  onRemove: (index: number) => void
  onSetCover: (index: number) => void
  onReorder?: (images: ImageItem[]) => void
  isDarkMode?: boolean
  maxImages?: number
}

export function ImageGallery({
  images,
  onRemove,
  onSetCover,
  onReorder,
  isDarkMode = false,
  maxImages = 15,
}: ImageGalleryProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newImages = [...images]
    const draggedItem = newImages[draggedIndex]
    newImages.splice(draggedIndex, 1)
    newImages.splice(index, 0, draggedItem)

    setDraggedIndex(index)
    onReorder?.(newImages)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const handleDeleteImage = async (index: number) => {
    setDeletingIndex(index)
    try {
      const image = images[index]
      const fileName = image.fileName

      // Deletar do R2
      const response = await fetch("/api/images/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.error || "Erro ao deletar imagem")
        return
      }

      toast.success("Imagem deletada com sucesso!")
      onRemove(index)
    } catch (error) {
      console.error("Error deleting image:", error)
      toast.error("Erro ao deletar imagem")
    } finally {
      setDeletingIndex(null)
    }
  }

  if (images.length === 0) {
    return (
      <div
        className={`text-center py-8 rounded-lg border-2 border-dashed ${
          isDarkMode ? "border-[#454545] bg-[#111]" : "border-[#e4e4e7] bg-[#f5f5f5]"
        }`}
      >
        <p className={isDarkMode ? "text-[#7e7e7e]" : "text-[#52525b]"}>
          Nenhuma imagem adicionada
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-[#222]"}`}>
          Imagens ({images.length}/{maxImages})
        </h3>
        {images.length < maxImages && (
          <p className={`text-sm ${isDarkMode ? "text-[#7e7e7e]" : "text-[#52525b]"}`}>
            Você pode adicionar mais {maxImages - images.length} imagem(ns)
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Card
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`relative group cursor-move overflow-hidden ${
              isDarkMode ? "bg-[#222] border-[#454545]" : "bg-white border-[#e4e4e7]"
            } ${draggedIndex === index ? "opacity-50" : ""}`}
          >
            <CardContent className="p-0 h-40 relative">
              <Image
                src={image.url}
                alt={image.fileName}
                fill
                className="object-cover"
              />

              {image.isCover && (
                <div className="absolute top-2 right-2 bg-[#dc2626] text-white px-2 py-1 rounded text-xs font-semibold">
                  Capa
                </div>
              )}

              {/* Overlay com ações */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className={`${
                    isDarkMode
                      ? "bg-[#222] border-[#454545] text-white hover:bg-[#333]"
                      : "bg-white border-[#e4e4e7] text-black hover:bg-[#f5f5f5]"
                  }`}
                  onClick={() => onSetCover(index)}
                  title="Definir como capa"
                  disabled={deletingIndex === index}
                >
                  <Check className="w-4 h-4" />
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => handleDeleteImage(index)}
                  title="Remover imagem"
                  disabled={deletingIndex === index}
                >
                  {deletingIndex === index ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Ícone de drag */}
              <div className="absolute top-2 left-2 bg-black/50 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className={`text-xs ${isDarkMode ? "text-[#7e7e7e]" : "text-[#52525b]"}`}>
        💡 Dica: Arraste as imagens para reordenar. Clique no ícone de check para definir como capa.
      </p>
    </div>
  )
}
