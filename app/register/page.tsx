"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Building, User } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [accountType, setAccountType] = useState<"PF" | "PJ">("PF")
  const [formData, setFormData] = useState({
    name: "",
    document: "",
    phone: "",
    email: "",
    password: "",
  })

  const formatDocument = (value: string, type: "PF" | "PJ") => {
    const numbers = value.replace(/\D/g, "")
    if (type === "PF") {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    } else {
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    }
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    const newType = value.length <= 11 ? "PF" : "PJ"
    setAccountType(newType)
    setFormData({ ...formData, document: formatDocument(value, newType) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock registration - redirect to dashboard
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
          <CardTitle className="text-2xl text-[#222222] dark:text-white">Criar Conta</CardTitle>
          <CardDescription className="text-[#7e7e7e] dark:text-[#ebebeb]">
            Cadastre-se para anunciar no Guiaponto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6 bg-[#fafafa] dark:bg-[#111] rounded-lg p-1">
            <button
              type="button"
              onClick={() => setAccountType("PF")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                accountType === "PF"
                  ? "bg-white dark:bg-[#222] text-[#222222] dark:text-white shadow-sm"
                  : "text-[#7e7e7e] dark:text-[#ebebeb]"
              }`}
            >
              <User size={16} />
              Pessoa Física
            </button>
            <button
              type="button"
              onClick={() => setAccountType("PJ")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                accountType === "PJ"
                  ? "bg-white dark:bg-[#222] text-[#222222] dark:text-white shadow-sm"
                  : "text-[#7e7e7e] dark:text-[#ebebeb]"
              }`}
            >
              <Building size={16} />
              Pessoa Jurídica
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#222222] dark:text-white">
                {accountType === "PF" ? "Nome Completo" : "Nome da Empresa"}
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={accountType === "PF" ? "Seu nome completo" : "Nome da sua empresa"}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222222] dark:text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="document" className="text-[#222222] dark:text-white">
                {accountType === "PF" ? "CPF" : "CNPJ"}
              </Label>
              <Input
                id="document"
                type="text"
                placeholder={accountType === "PF" ? "000.000.000-00" : "00.000.000/0000-00"}
                value={formData.document}
                onChange={handleDocumentChange}
                className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222222] dark:text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#222222] dark:text-white">
                Telefone
              </Label>
              <Input
                id="phone"
                type="text"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222222] dark:text-white"
                required
              />
            </div>

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
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222222] dark:text-white pr-10"
                  minLength={8}
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

            <Button type="submit" className="w-full bg-[#fe2601] hover:bg-[#fe2601]/90 text-white">
              Criar Conta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#7e7e7e] dark:text-[#ebebeb]">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-[#fe2601] hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
