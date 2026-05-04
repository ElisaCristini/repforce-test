import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryProvider } from "@/providers/query-provider";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </React.StrictMode>,
)
