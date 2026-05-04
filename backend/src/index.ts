import Fastify from "fastify";
import cors from "@fastify/cors";
import { productRoutes } from "./routes/products.js";
import { quoteRoutes } from "./routes/quotes.js";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: true,
});

await app.register(productRoutes);
await app.register(quoteRoutes);

app.get("/health", async () => ({ status: "ok" }));

try {
  await app.listen({ port: 3333, host: "0.0.0.0" });
  console.log("Backend rodando em http://localhost:3333");
} catch (err) {
  app.log.error(err);
  process.exit(1);
}