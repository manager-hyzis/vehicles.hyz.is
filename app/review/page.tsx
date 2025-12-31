"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Star } from "lucide-react"
import { toast } from "sonner"

export default function ReviewPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [recommend, setRecommend] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const handleThemeToggle = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      toast.error("Token de avaliação inválido")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          rating,
          comment,
          recommend,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.message || "Erro ao enviar avaliação")
        return
      }

      toast.success("Avaliação enviada com sucesso!")
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Erro ao enviar avaliação")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <section className={`py-12 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
        <div className="max-w-2xl mx-auto">
          <Card className={`${isDarkMode ? 'bg-[#222] border-[#454545]' : 'bg-white border-[#e4e4e7]'}`}>
            <CardHeader>
              <CardTitle className={`text-3xl text-center ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                Avaliar Compra
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                    Obrigado pela avaliação!
                  </h2>
                  <p className={isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}>
                    Sua avaliação foi registrada com sucesso e ajudará outros compradores.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Avaliação em Estrelas */}
                  <div>
                    <label className={`block text-sm font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Como foi sua experiência?
                    </label>
                    <div className="flex gap-2 justify-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-12 h-12 ${
                              star <= rating
                                ? "fill-[#dc2626] text-[#dc2626]"
                                : isDarkMode
                                ? "text-[#454545]"
                                : "text-[#e4e4e7]"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <p className={`text-center text-sm ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                      {rating === 1 && "Muito insatisfeito"}
                      {rating === 2 && "Insatisfeito"}
                      {rating === 3 && "Neutro"}
                      {rating === 4 && "Satisfeito"}
                      {rating === 5 && "Muito satisfeito"}
                    </p>
                  </div>

                  {/* Comentário */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Comentário (opcional)
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      maxLength={500}
                      rows={4}
                      placeholder="Compartilhe sua experiência com este vendedor..."
                      className={`w-full p-3 rounded border ${isDarkMode ? 'bg-[#111] border-[#454545] text-white' : 'bg-white border-[#e4e4e7] text-black'}`}
                    />
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#7e7e7e]' : 'text-[#52525b]'}`}>
                      {comment.length}/500
                    </p>
                  </div>

                  {/* Recomendação */}
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="recommend"
                      checked={recommend}
                      onCheckedChange={(checked) => setRecommend(checked as boolean)}
                    />
                    <label htmlFor="recommend" className={`text-sm cursor-pointer ${isDarkMode ? 'text-white' : 'text-[#222]'}`}>
                      Eu recomendaria este vendedor para outros compradores
                    </label>
                  </div>

                  {/* Botão de Envio */}
                  <div className="flex gap-4 pt-6 border-t border-[#454545]">
                    <Button
                      type="submit"
                      className="flex-1 bg-[#dc2626] hover:bg-[#991b1b]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Enviando..." : "Enviar Avaliação"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
