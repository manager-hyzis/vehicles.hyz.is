"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login - redirect to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-[#fe2601] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-[#222222] dark:text-white">Entrar no Guiaponto</CardTitle>
          <CardDescription className="text-[#7e7e7e] dark:text-[#ebebeb]">
            Acesse sua conta para gerenciar seus anúncios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#222222] dark:text-white">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222222] dark:text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#222222] dark:text-white">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222222] dark:text-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7e7e7e] dark:text-[#ebebeb]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Link href="/forgot-password" className="text-sm text-[#fe2601] hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <Button type="submit" className="w-full bg-[#fe2601] hover:bg-[#fe2601]/90 text-white">
              Entrar
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-[#7e7e7e] dark:text-[#ebebeb]">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-[#fe2601] hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
