"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function LoadingScreen() {
  const [count, setCount] = useState(0)
  const numDots = 36 // Number of dots in the circle
  const radius = 50 // Radius of the circle in pixels

  useEffect(() => {
    const counterInterval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 365) {
          clearInterval(counterInterval)
          return 365
        }
        return prev + 1
      })
    }, 15)

    return () => clearInterval(counterInterval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-48 h-48">
        {/* Rotating dots container */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {Array.from({ length: numDots }).map((_, index) => {
            const angle = (index * 360) / numDots
            const delay = (index * 0.1) % 1

            return (
              <motion.div
                key={index}
                className="absolute w-1.5 h-1.5 rounded-full bg-white"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${angle}deg) translateY(-${radius}px)`,
                }}
              />
            )
          })}
        </motion.div>

        {/* Counter */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            key={count}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-light text-white tabular-nums"
          >
            {count}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

