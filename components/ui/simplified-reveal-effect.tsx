"use client"

import { cn } from "@/utils/cn"
import { useEffect, useRef } from "react"

export const SimplifiedCanvasReveal = ({
  animationSpeed = 0.4,
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize = 3,
  showGradient = true,
}: {
  animationSpeed?: number
  colors?: number[][]
  containerClassName?: string
  dotSize?: number
  showGradient?: boolean
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let animationFrameId: number
    const startTime = Date.now()
    const totalSize = 12
    const dotSizeActual = dotSize

    // Animation function
    const animate = () => {
      const time = (Date.now() - startTime) / 1000

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw dots
      for (let x = 0; x < canvas.width; x += totalSize) {
        for (let y = 0; y < canvas.height; y += totalSize) {
          // Generate a pseudo-random value for this position
          const randomValue = Math.sin(x * 0.1 + y * 0.1) * 0.5 + 0.5

          // Calculate animation offset based on distance from center
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const dx = x - centerX
          const dy = y - centerY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const animationOffset = distance * 0.001 + randomValue * 0.15

          // Only draw if animation time has passed the offset
          if (time * animationSpeed > animationOffset) {
            // Choose color
            const colorIndex = Math.floor(randomValue * colors.length)
            const color = colors[colorIndex] || colors[0]

            // Set opacity based on animation
            const opacity = Math.min(1, (time * animationSpeed - animationOffset) * 5)

            // Draw dot
            ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`
            ctx.fillRect(x, y, dotSizeActual, dotSizeActual)
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [animationSpeed, colors, dotSize])

  return (
    <div className={cn("h-full relative bg-white w-full", containerClassName)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {showGradient && <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />}
    </div>
  )
}
