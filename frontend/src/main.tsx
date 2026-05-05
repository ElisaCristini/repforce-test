import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryProvider } from "@/providers/query-provider";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { ThemeProvider } from "@/providers/theme-provider";
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
