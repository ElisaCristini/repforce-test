import type { FastifyInstance } from "fastify";
import { products } from "../data/products.js";
import { productQuerySchema } from "@repforce/shared";
import { z } from "zod";

export async function productRoutes(app: FastifyInstance) {
  app.get("/products", async (request, reply) => {
    const parseResult = productQuerySchema.safeParse(request.query);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Parâmetros inválidos",
        details: parseResult.error.flatten().fieldErrors,
      });
    }

    const { category, brand, minPrice, maxPrice, inStock, search, page, pageSize } =
      parseResult.data;

    let filtered = products;

    if (category) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (brand) {
      filtered = filtered.filter(
        (p) => p.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }

    if (inStock === true) {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(term));
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return reply.send({ items, total, page, pageSize });
  });

  app.get<{ Params: { id: string } }>("/products/:id", async (request, reply) => {
    const product = products.find((p) => p.id === request.params.id);

    if (!product) {
      return reply.status(404).send({ error: "Produto não encontrado" });
    }

    return reply.send(product);
  });

  // Endpoint auxiliar: lista de categorias e marcas disponíveis
  app.get("/products/meta", async (_request, reply) => {
    const categories = [...new Set(products.map((p) => p.category))].sort();
    const brands = [...new Set(products.map((p) => p.brand))].sort();
    return reply.send({ categories, brands });
  });
}