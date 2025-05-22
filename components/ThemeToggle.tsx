"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/ThemeProvider"
import { Sun, Laptop, MoonStar } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = () => setIsOpen(false)
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  if (!mounted) {
    return (
      <button className="h-7 w-7 rounded-md p-1 text-white/70">
        <Sun className="h-full w-full" />
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="flex h-7 w-7 p-1 items-center justify-center rounded-md text-black/70 transition-colors hover:bg-black/20 hover:text-white dark:text-white/70 dark:hover:text-white"
      >
        {theme === "light" && <Sun className="h-full w-full" />}
        {theme === "dark" && <MoonStar className="h-full w-full" />}
        {theme === "system" && <Laptop className="h-full w-full" />}
      </button>

      {isOpen && (
        <div
          className="absolute -right-10 top-full z-50 mt-4 w-32 overflow-hidden rounded-md border border-white/10 dark:bg-black-100 p-1  bg-black-100/50"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setTheme("light")
              setIsOpen(false)
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-white  hover:bg-white/20 hover:text-black dark:text-white/70 dark:hover:text-white"
          >
            <Sun className="h-4 w-4" />
            <span>Light</span>
            {theme === "light" && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
            )}
          </button>
          <button
            onClick={() => {
              setTheme("dark")
              setIsOpen(false)
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-white/70 hover:bg-white/20 hover:text-black dark:text-white/70 dark:hover:text-white"
          >
            <MoonStar className="h-4 w-4" />
            <span>Dark</span>
            {theme === "dark" && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
            )}
          </button>
          <button
            onClick={() => {
              setTheme("system")
              setIsOpen(false)
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-white/70 hover:bg-white/20 hover:text-black dark:text-white/70 dark:hover:text-white"
          >
            <Laptop className="h-4 w-4" />
            <span>System</span>
            {theme === "system" && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
            )}
          </button>
        </div>
      )}
    </div>
  )
}
