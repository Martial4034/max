"use client"

import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { NavLinks } from "./nav-links"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useNavbarVisibility } from "@/hooks/use-navbar-visibility"

export function Header() {
  const { setTheme, theme } = useTheme()
  const router = useRouter()
  const { isHidden } = useNavbarVisibility()

  if (isHidden) {
    return (
      <header className="sticky top-0 z-50">
        <div className="flex items-center px-4 h-16">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-900 dark:text-gray-100 transition-colors duration-700 hover:opacity-70 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Retour</span>
          </button>
        </div>
        <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800 transition-colors duration-700" />
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="w-6 h-6 relative cursor-pointer" onClick={() => router.push('/')}>
          <Image
            src="/window.svg"
            alt="Logo"
            fill
            className="object-contain dark:invert"
          />
        </div>
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-900 dark:text-gray-100 transition-colors duration-700 hover:opacity-70"
          >
            <span className="block dark:hidden">Sombre</span>
            <span className="hidden dark:block">Clair</span>
          </button>
        </div>

        <NavLinks />
      </div>
      <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800 transition-colors duration-700" />
    </header>
  )
} 