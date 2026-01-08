import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
})

export const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string(),
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  type: z.enum(["PRIVATE", "RESELLER", "GARAGE", "DEALERSHIP"]),
  phone: z.string().min(10, "Telefone inválido"),
  city: z.string().min(2, "Cidade inválida"),
  state: z.string().length(2, "Estado inválido"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"],
})

export const vehicleSchema = z.object({
  title: z.string().min(5, "Título deve ter no mínimo 5 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  price: z.number().positive("Preço deve ser positivo"),
  brand: z.string().min(2, "Marca inválida"),
  model: z.string().min(2, "Modelo inválido"),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  mileage: z.number().nonnegative("Quilometragem inválida"),
  fuel: z.enum(["GASOLINA", "DIESEL", "ELETRICO", "HIBRIDO", "ALCOOL"]),
  transmission: z.enum(["MANUAL", "AUTOMATICA"]),
  color: z.string().min(2, "Cor inválida"),
  city: z.string().min(2, "Cidade inválida"),
  state: z.string().length(2, "Estado inválido"),
})

export const reportSchema = z.object({
  type: z.enum(["GOLPE", "CONTEUDO_INADEQUADO", "VEICULO_ROUBADO", "OUTRO"]),
  description: z.string().optional(),
})

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().max(500).optional(),
  recommend: z.boolean(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type VehicleInput = z.infer<typeof vehicleSchema>
export type ReportInput = z.infer<typeof reportSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
