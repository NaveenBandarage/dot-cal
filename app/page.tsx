"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoadingScreen } from "@/components/loading-screen"

export default function CalendarDots() {
  const [daysInYear, setDaysInYear] = useState<Date[]>([])
  const [daysLeft, setDaysLeft] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const days: Date[] = []
    const start = new Date(currentYear, 0, 1)
    const end = new Date(currentYear, 11, 31)

    const currentDate = start
    while (currentDate <= end) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    setDaysInYear(days)

    const today = new Date()
    const remaining = days.filter((day) => day > today).length
    setDaysLeft(remaining)

    // Simulate loading time to match counter animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5500) // Slightly longer than the time it takes to count to 365

    return () => clearTimeout(timer)
  }, [currentYear])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 flex items-center justify-center">
        <div className="w-full max-w-[95vw] xl:max-w-5xl space-y-8">
          <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-19 gap-1 sm:gap-2">
            {daysInYear.map((day, index) => {
              const isPast = day < new Date()
              return (
                <div key={index} className="relative group">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300",
                      "group-hover:scale-150 group-hover:shadow-glow",
                      isPast ? "bg-white group-hover:bg-primary" : "bg-gray-600 group-hover:bg-gray-400",
                    )}
                  />
                  <div
                    className={cn(
                      "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2",
                      "hidden group-hover:block",
                      "bg-gradient-to-b from-gray-800 to-gray-900",
                      "text-white text-xs md:text-sm",
                      "py-2 px-3 rounded-lg shadow-xl",
                      "border border-gray-700",
                      "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                      "z-10 whitespace-nowrap",
                      "before:content-[''] before:absolute before:left-1/2 before:-bottom-2",
                      "before:transform before:-translate-x-1/2",
                      "before:border-8 before:border-transparent",
                      "before:border-t-gray-900",
                    )}
                  >
                    {format(day, "MMMM d, yyyy")}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex flex-col sm:flex-row justify-between text-gray-400 gap-4 sm:gap-0">
            <div className="text-2xl md:text-3xl lg:text-4xl font-light text-white">{currentYear}</div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-light">
              <span className="text-white">{daysLeft}</span>
              <span className="ml-2">days left</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800">
        <div className="max-w-[95vw] xl:max-w-5xl mx-auto py-6 px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              Made with ♥️ by{" "}
              <a
                href="https://naveenbandarage.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Naveen Bandarage
              </a>
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10" asChild>
                <a
                  href="https://github.com/naveenbandarage"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10" asChild>
                <a
                  href="https://twitter.com/naveenbandarage"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

