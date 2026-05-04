import type { z } from "zod";
import type {
  productSchema,
  quoteSchema,
  createQuoteSchema,
  productQuerySchema,
  paginatedProductsSchema,
} from "./schemas.js";

export type Product = z.infer<typeof productSchema>;
export type Quote = z.infer<typeof quoteSchema>;
export type CreateQuote = z.infer<typeof createQuoteSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
export type PaginatedProducts = z.infer<typeof paginatedProductsSchema>;