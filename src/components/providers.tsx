"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "next-themes"

import { Toaster } from "@/components/ui/toast"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
