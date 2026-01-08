"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "otp" | "password">("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simular envio de OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep("otp")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) {
      alert("OTP deve ter 6 dígitos")
      return
    }
    setIsLoading(true)
    try {
      // Simular validação de OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep("password")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("Senhas não conferem")
      return
    }
    if (newPassword.length < 8) {
      alert("Senha deve ter no mínimo 8 caracteres")
      return
    }
    setIsLoading(true)
    try {
      // Simular atualização de senha
      await new Promise((resolve) => setTimeout(resolve, 1000))
      window.location.href = "/login"
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    if (step === "otp") {
      setStep("email")
      setOtp("")
    } else if (step === "password") {
      setStep("otp")
      setNewPassword("")
      setConfirmPassword("")
    }
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
          <CardTitle className="text-2xl text-[#222222] dark:text-white">
            {step === "email" && "Recuperar Senha"}
            {step === "otp" && "Verificar Código"}
            {step === "password" && "Nova Senha"}
          </CardTitle>
          <CardDescription className="text-[#7e7e7e] dark:text-[#ebebeb]">
            {step === "email" && "Digite seu e-mail para receber um código de recuperação"}
            {step === "otp" && "Insira o código de 6 dígitos enviado para seu e-mail"}
            {step === "password" && "Crie uma nova senha para sua conta"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#222222] dark:text-white">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222222] dark:text-white"
                  required
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#fe2601] hover:bg-[#fe2601]/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar Código"}
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-[#222222] dark:text-white">
                  Código de Verificação (6 dígitos)
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                    setOtp(value)
                  }}
                  maxLength={6}
                  className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222222] dark:text-white text-center text-2xl tracking-widest font-mono"
                  required
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              <p className="text-xs text-[#7e7e7e] dark:text-[#ebebeb] text-center">
                Código enviado para {email}
              </p>
              <Button
                type="submit"
                className="w-full bg-[#fe2601] hover:bg-[#fe2601]/90 text-white"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? "Verificando..." : "Verificar Código"}
              </Button>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-[#222222] dark:text-white">
                  Nova Senha
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222222] dark:text-white"
                  required
                  disabled={isLoading}
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#222222] dark:text-white">
                  Confirmar Senha
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222222] dark:text-white"
                  required
                  disabled={isLoading}
                  minLength={8}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#fe2601] hover:bg-[#fe2601]/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Atualizando..." : "Atualizar Senha"}
              </Button>
            </form>
          )}

          <div className="mt-6 flex items-center justify-between">
            {step !== "email" && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-sm text-[#fe2601] hover:underline"
              >
                <ArrowLeft size={16} />
                Voltar
              </button>
            )}
            <Link href="/login" className="text-sm text-[#fe2601] hover:underline ml-auto">
              Voltar ao Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
