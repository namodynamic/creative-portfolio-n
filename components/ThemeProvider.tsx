"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  const getSystemTheme = (): "dark" | "light" => {
    if (typeof window === "undefined") return "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  const applyTheme = (currentTheme: Theme) => {
    if (typeof window === "undefined") return

    const root = window.document.documentElement
    const body = window.document.body

    root.classList.remove("light", "dark")
    body.classList.remove("light", "dark")

    const themeToApply = currentTheme === "system" ? getSystemTheme() : currentTheme

    root.classList.add(themeToApply)
    body.classList.add(themeToApply)

    // Force a repaint to ensure the theme is applied immediately
    root.style.colorScheme = themeToApply
  }

  // Initialize theme from localStorage when component mounts
 useEffect(() => {
  let isMounted = true

  const savedTheme = localStorage.getItem(storageKey) as Theme | null
  if (savedTheme) {
    if (isMounted) setTheme(savedTheme)
    applyTheme(savedTheme)
  } else {
    applyTheme(defaultTheme)
  }

  if (isMounted) setMounted(true)

  return () => {
    isMounted = false
  }
}, [storageKey, defaultTheme])

  // Update theme when it changes
  useEffect(() => {
    if (!mounted) return
    applyTheme(theme)
  }, [theme, mounted])

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
  applyTheme(getSystemTheme())
}

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, mounted])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {mounted && children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
