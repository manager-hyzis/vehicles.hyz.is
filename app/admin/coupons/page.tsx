"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Copy } from "lucide-react"
import { toast } from "sonner"

interface Coupon {
  id: string
  code: string
  type: "PERCENTAGE" | "FIXED"
  value: number
  maxUses: number
  usedCount: number
  expiresAt: string
  active: boolean
  createdAt: string
}

export default function CouponsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    code: "",
    type: "PERCENTAGE",
    value: 0,
    maxUses: 100,
    expiresAt: "",
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }
    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/")
      return
    }
    if (status === "authenticated") {
      fetchCoupons()
    }
  }, [status, session])

  const fetchCoupons = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/coupons")
      if (response.ok) {
        const data = await response.json()
        setCoupons(data)
      }
    } catch (error) {
      console.error("Error fetching coupons:", error)
      toast.error("Erro ao carregar cupons")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Cupom criado com sucesso")
        setFormData({
          code: "",
          type: "PERCENTAGE",
          value: 0,
          maxUses: 100,
          expiresAt: "",
        })
        setShowForm(false)
        fetchCoupons()
      }
    } catch (error) {
      console.error("Error creating coupon:", error)
      toast.error("Erro ao criar cupom")
    }
  }

  const handleDeleteCoupon = async (id: string) => {
    try {
      await fetch(`/api/admin/coupons/${id}`, {
        method: "DELETE",
      })
      setCoupons(coupons.filter((c) => c.id !== id))
      toast.success("Cupom deletado")
    } catch (error) {
      console.error("Error deleting coupon:", error)
      toast.error("Erro ao deletar cupom")
    }
  }

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success("Código copiado!")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6 flex items-center justify-center">
        <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Carregando cupons...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#222] dark:text-white mb-2">
              Gestão de Cupons
            </h1>
            <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
              {coupons.length} cupom(ns) ativo(s)
            </p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#fe2601] hover:bg-[#fe2601]/90 text-white"
          >
            <Plus size={18} className="mr-2" />
            Novo Cupom
          </Button>
        </div>

        {/* Formulário de Criação */}
        {showForm && (
          <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545] mb-6">
            <CardHeader>
              <CardTitle className="text-[#222] dark:text-white">Criar Novo Cupom</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateCoupon} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#222] dark:text-white mb-2">
                      Código
                    </label>
                    <Input
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value.toUpperCase() })
                      }
                      placeholder="EX: DESCONTO10"
                      className="bg-[#f5f5f5] dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#222] dark:text-white mb-2">
                      Tipo
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as "PERCENTAGE" | "FIXED",
                        })
                      }
                      className="w-full p-2 rounded border bg-[#f5f5f5] dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545] text-[#222] dark:text-white"
                    >
                      <option value="PERCENTAGE">Percentual (%)</option>
                      <option value="FIXED">Valor Fixo (R$)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#222] dark:text-white mb-2">
                      Valor
                    </label>
                    <Input
                      type="number"
                      value={formData.value}
                      onChange={(e) =>
                        setFormData({ ...formData, value: parseFloat(e.target.value) })
                      }
                      placeholder="10"
                      className="bg-[#f5f5f5] dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#222] dark:text-white mb-2">
                      Usos Máximos
                    </label>
                    <Input
                      type="number"
                      value={formData.maxUses}
                      onChange={(e) =>
                        setFormData({ ...formData, maxUses: parseInt(e.target.value) })
                      }
                      placeholder="100"
                      className="bg-[#f5f5f5] dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545]"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#222] dark:text-white mb-2">
                      Data de Expiração
                    </label>
                    <Input
                      type="datetime-local"
                      value={formData.expiresAt}
                      onChange={(e) =>
                        setFormData({ ...formData, expiresAt: e.target.value })
                      }
                      className="bg-[#f5f5f5] dark:bg-[#111] border-[#e4e4e7] dark:border-[#454545]"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="bg-[#fe2601] hover:bg-[#fe2601]/90 text-white"
                  >
                    Criar Cupom
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowForm(false)}
                    variant="outline"
                    className="border-[#e4e4e7] dark:border-[#454545]"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Lista de Cupons */}
        <div className="space-y-4">
          {coupons.length === 0 ? (
            <Card className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]">
              <CardContent className="py-12 text-center">
                <p className="text-[#7e7e7e] dark:text-[#ebebeb]">
                  Nenhum cupom criado ainda
                </p>
              </CardContent>
            </Card>
          ) : (
            coupons.map((coupon) => (
              <Card
                key={coupon.id}
                className="bg-white dark:bg-[#222] border-[#e4e4e7] dark:border-[#454545]"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-[#222] dark:text-white">
                          {coupon.code}
                        </h3>
                        <Badge
                          className={
                            coupon.active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {coupon.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Tipo</p>
                          <p className="font-semibold text-[#222] dark:text-white">
                            {coupon.type === "PERCENTAGE" ? "Percentual" : "Valor Fixo"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Valor</p>
                          <p className="font-semibold text-[#222] dark:text-white">
                            {coupon.type === "PERCENTAGE"
                              ? `${coupon.value}%`
                              : `R$ ${coupon.value.toFixed(2)}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Usos</p>
                          <p className="font-semibold text-[#222] dark:text-white">
                            {coupon.usedCount} / {coupon.maxUses}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#7e7e7e] dark:text-[#ebebeb]">Expira em</p>
                          <p className="font-semibold text-[#222] dark:text-white">
                            {new Date(coupon.expiresAt).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleCopyCoupon(coupon.code)}
                        className="p-2 rounded hover:bg-[#f5f5f5] dark:hover:bg-[#111] text-[#7e7e7e] dark:text-[#ebebeb]"
                      >
                        <Copy size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(coupon.id)}
                        className="p-2 rounded hover:bg-[#f5f5f5] dark:hover:bg-[#111] text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
