import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  thumbnail: z.string().url(),
  images: z.array(z.string().url()),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  sku: z.string(),
  brand: z.string(),
  weightKg: z.number().positive(),
  warrantyMonths: z.number().int().positive(),
  createdAt: z.string(),
  description: z.string(),
});

export const createQuoteSchema = z.object({
  productId: z.string(),
  fullName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos numéricos"),
  company: z.string().min(1, "Empresa é obrigatória"),
  quantity: z.number().int().min(1, "Quantidade mínima é 1"),
  notes: z
    .string()
    .max(500, "Observações devem ter no máximo 500 caracteres")
    .optional(),
});

export const quoteSchema = createQuoteSchema.extend({
  id: z.string(),
  createdAt: z.string(),
});

export const productQuerySchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  inStock: z
    .union([z.literal("true"), z.literal("false")])
    .transform((v) => v === "true")
    .optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(12),
});

export const paginatedProductsSchema = z.object({
  items: z.array(productSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});