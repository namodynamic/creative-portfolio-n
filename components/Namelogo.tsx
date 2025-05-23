"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

interface PhotoNameLogoProps {
  name?: string
  photoUrl?: string
  href?: string
}

export default function NameLogo({
  name = "",
  photoUrl = "/logo.png",
  href = "/",
}: PhotoNameLogoProps) {
  return (
    <Link href={href} aria-label="Home page" className="flex items-center z-50">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
        <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white/30 dark:border-black-100">
          <div className="h-full w-full overflow-hidden rounded-full">
            <Image
              src={photoUrl || ""}
              alt={`${name} profile photo`}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <span className="text-lg font-semibold text-black-100 dark:text-white">{name}</span>
      </motion.div>
    </Link>
  )
}
