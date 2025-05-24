"use client"

import type React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface MagicButtonProps {
  title: string
  icon?: React.ReactNode
  isBeam?: boolean
  position?: "left" | "right"
  otherClasses?: string
  onClick?: () => void
}

export default function MagicButton({ title, icon, position = "left", otherClasses, onClick, isBeam = false }: MagicButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn("relative h-12 overflow-hidden border dark:border-0 border-black rounded-3xl inline-flex p-0 dark:p-[1px]", otherClasses)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute rounded-3xl z-[-1] inset-[-1000%] dark:animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className={`inline-flex relative h-full w-full cursor-pointer items-center justify-center rounded-3xl  bg-black-100 text-white px-6 py-1 text-base font-semibold backdrop-blur-3xl ${otherClasses}`}>
        {isBeam && (
          <span className="relative mr-2 flex h-3 w-3">
            <span className="btn-ping"></span>
            <span className="btn-ping_dot"></span>
          </span>
        )}
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </motion.button>
  )
}
