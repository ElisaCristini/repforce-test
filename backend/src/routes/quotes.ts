import type { FastifyInstance } from "fastify";
import { createQuoteSchema, type Quote } from "@repforce/shared";
import { products } from "../data/products.js";
import { randomUUID } from "crypto";

const quotes: Quote[] = [];

export async function quoteRoutes(app: FastifyInstance) {
  app.post("/quotes", async (request, reply) => {
    const parseResult = createQuoteSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Dados inválidos",
        details: parseResult.error.flatten().fieldErrors,
      });
    }

    const data = parseResult.data;

    // Validar se produto existe
    const product = products.find((p) => p.id === data.productId);
    if (!product) {
      return reply.status(404).send({ error: "Produto não encontrado" });
    }

    // Validar quantidade vs estoque
    if (data.quantity > product.stock) {
      return reply.status(400).send({
        error: "Dados inválidos",
        details: {
          quantity: [
            `Quantidade solicitada (${data.quantity}) excede o estoque disponível (${product.stock})`,
          ],
        },
      });
    }

    const quote: Quote = {
      ...data,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };

    quotes.push(quote);

    return reply.status(201).send(quote);
  });

  app.get("/quotes", async (_request, reply) => {
    return reply.send(quotes);
  });
}