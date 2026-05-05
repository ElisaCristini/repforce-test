# Repforce Test — Catálogo de Produtos

Aplicação full stack de catálogo de produtos para representantes comerciais, desenvolvida como teste técnico para estágio Full Stack na Repforce.

## Tecnologias

### Frontend
- React 18 + TypeScript
- Vite
- TanStack Router
- TanStack Query (React Query)
- Tailwind CSS v4
- shadcn/ui (Base + Nova preset)
- react-hook-form + zod
- axios
- lucide-react
- next-themes (dark/light mode)

### Backend
- Node.js + TypeScript
- Fastify
- @fastify/cors
- zod

### Shared
- Tipos e schemas zod compartilhados entre frontend e backend

## Como rodar

### Pré-requisitos
- Node.js v18+
- npm v9+

### 1. Clone o repositório
```bash
git clone https://github.com/ElisaCristini/repforce-test.git
cd repforce-test
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o frontend
```bash
cp frontend/.env.example frontend/.env
```

### 4. Rode o backend
```bash
npm run dev:backend
```
O backend estará disponível em `http://localhost:3333`

### 5. Rode o frontend
```bash
npm run dev:frontend
```
O frontend estará disponível em `http://localhost:5173`

## Funcionalidades

- Catálogo de produtos com grid responsivo (4/2/1 colunas)
- Filtros combinados: categoria, marca, faixa de preço, estoque, busca por texto
- Filtros sincronizados com a URL (query params) — navegação restaurável
- Skeleton loader durante carregamento
- Paginação (12 itens por página)
- Página de detalhes com galeria de imagens
- Formulário de cotação com validação (react-hook-form + zod)
- Dark/light mode com toggle
- API REST com filtros e paginação no backend

## Arquitetura

O projeto é um monorepo com npm workspaces dividido em três pacotes:

- `frontend/` — React + Vite
- `backend/` — Fastify + Node.js
- `shared/` — tipos e schemas zod compartilhados

### Decisões de arquitetura

- **Filtros no backend:** os filtros são aplicados no servidor. O frontend monta a query string e o backend filtra e pagina, mantendo o frontend leve e sem lógica de dados.
- **Shared package:** os schemas zod são definidos uma única vez no pacote `shared` e importados tanto no frontend (validação do formulário) quanto no backend (validação dos endpoints), evitando duplicação e garantindo consistência.
- **TanStack Query:** usado para todo o server state — sem `useEffect + fetch` manual, aproveitando cache e estados de loading/error automáticos.
- **TanStack Router:** escolhido pelo suporte nativo a search params tipados, essencial para sincronizar os filtros com a URL.
- **Fastify:** escolhido por ser moderno, performático e ter excelente suporte a TypeScript.
- **/products/meta antes de /products/:id:** decisão técnica importante — a rota de metadados foi posicionada antes da rota parametrizada para evitar conflito de matching no Fastify, onde `meta` seria interpretado como um `:id`.

## Endpoints da API

| Método | Path | Descrição |
|--------|------|-----------|
| GET | /products | Lista produtos com filtros e paginação |
| GET | /products/meta | Retorna categorias e marcas disponíveis |
| GET | /products/:id | Retorna produto por id |
| POST | /quotes | Cria solicitação de cotação |
| GET | /quotes | Lista cotações (debug) |

## Uso de IA

Ferramenta utilizada: **Claude (Anthropic)**

A IA foi utilizada como ferramenta de apoio em partes específicas do desenvolvimento, sempre com revisão, adaptação e validação manual de tudo que foi gerado.

### Onde a IA ajudou
- Geração de boilerplate e configurações iniciais (tsconfig, vite.config, package.json)
- Seed de 20 produtos com dados fictícios
- Sugestões de estrutura para os schemas zod

### O que foi desenvolvido e revisado manualmente
- Todas as decisões de arquitetura (monorepo, shared package, filtros no backend, escolha do Fastify)
- Identificação e correção do bug de ordem das rotas no Fastify (/products/meta x /products/:id)
- Configuração e debug do ThemeProvider para dark mode funcionar corretamente no Windows
- Resolução de conflitos de imports e aliases entre os pacotes do monorepo
- Ajuste fino dos componentes de UI para atender os requisitos do teste
- Sincronização dos filtros com a URL via TanStack Router search params
- Integração entre frontend, backend e shared package
- Debug de todos os erros de ambiente e configuração

### Como foi validado
- Teste manual completo de todas as funcionalidades no navegador
- Verificação de todos os endpoints da API
- Revisão linha a linha de cada arquivo antes de commitar
- Validação do formulário com casos de erro e sucesso
