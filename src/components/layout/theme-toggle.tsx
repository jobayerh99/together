"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

/**
 * Icons are swapped purely with CSS (`dark:` variant), so the rendered markup
 * is identical on server and client — no hydration mismatch.
 */
const themeIcons = (
  <>
    <Sun className="size-4 dark:hidden" />
    <Moon className="hidden size-4 dark:inline" />
  </>
)

interface ThemeToggleProps {
  /** "icon" for the navbar, "item" for the mobile sheet menu. */
  variant?: "icon" | "item"
  className?: string
}

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (variant === "item") {
    return (
      <Button
        variant="ghost"
        onClick={toggleTheme}
        aria-label="Toggle light and dark theme"
        className={cn(
          "h-10 w-full justify-start gap-3 px-3 text-sm font-medium",
          className,
        )}
      >
        {themeIcons}
        <span>Switch theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      title="Toggle light and dark theme"
      className={cn("transition-colors duration-200", className)}
    >
      {themeIcons}
    </Button>
  )
}
