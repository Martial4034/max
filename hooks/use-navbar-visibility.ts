"use client"

import { usePathname } from "next/navigation"

interface NavbarConfig {
  // Pages où la navbar doit être masquée
  hiddenPaths: string[]
  // Pages où la navbar doit toujours être visible (prioritaire sur hiddenPaths)
  alwaysShowPaths?: string[]
  // Fonction personnalisée pour déterminer si la navbar doit être masquée
  shouldHide?: (pathname: string) => boolean
}

const defaultConfig: NavbarConfig = {
  hiddenPaths: ["/infos", "/contact"],
  alwaysShowPaths: ["/", "/dashboard"],
}

export function useNavbarVisibility(config: NavbarConfig = defaultConfig) {
  const pathname = usePathname()
  
  const shouldHideNavbar = () => {
    // Si une fonction personnalisée est fournie, l'utiliser
    if (config.shouldHide) {
      return config.shouldHide(pathname)
    }

    // Vérifier d'abord si la page doit toujours afficher la navbar
    if (config.alwaysShowPaths?.includes(pathname)) {
      return false
    }

    // Sinon, vérifier si la page est dans la liste des pages masquées
    return config.hiddenPaths.includes(pathname)
  }

  return {
    isHidden: shouldHideNavbar(),
    currentPath: pathname,
  }
} 