"use client"

import { useEffect } from "react"

export function ThemeScript() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "system"
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const finalTheme = theme === "system" ? system : theme

    const root = document.documentElement
    root.classList.add(finalTheme)
    root.style.colorScheme = finalTheme
  }, [])

  return null
}
