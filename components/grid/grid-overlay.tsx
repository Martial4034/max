"use client"

import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

interface GridOverlayProps {
  isOpen: boolean
  onClose: () => void
  faceType: string
}

export function GridOverlay({ isOpen, onClose, faceType }: GridOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Séquence d'animation
      setTimeout(() => setIsExpanded(true), 500)
      setTimeout(() => setIsVisible(true), 1400)
    } else {
      // Séquence inverse
      setIsVisible(false)
      setTimeout(() => setIsExpanded(false), 300)
    }
  }, [isOpen])

  const getItemClass = (faceType: string) => {
    switch (faceType) {
      case "MUSIQUE":
      case "OBJETS":
        return "square"
      case "PHOTOS":
      case "VIDEOS":
      case "WEB":
        return "portrait"
      case "DESSINS":
        return "landscape"
      default:
        return "square"
    }
  }

  const generateGrid = () => {
    const cols = window.innerWidth < 600 ? 2 : window.innerWidth < 1024 ? 4 : 5
    const items = Array.from({ length: cols * 3 }, (_, i) => i)
    const itemClass = getItemClass(faceType)

    return (
      <div
        className="grid-container"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {items.map((i) => (
          <div
            key={i}
            className={`grid-item ${itemClass} ${i === 0 ? "" : "empty"}`}
          >
            {i === 0 && (
              <div className="content">
                {faceType} Contenu
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div className={`grid-overlay ${isOpen ? "active" : ""}`}>
      <button
        onClick={onClose}
        className="absolute top-4 left-4 flex items-center space-x-2 text-foreground hover:opacity-70 transition-opacity group"
      >
        <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
        <span>Retour</span>
      </button>

      <div className={`grid-square ${isExpanded ? "expanded" : ""}`}>
        <div className={`grid-container ${isVisible ? "visible" : ""}`}>
          {generateGrid()}
        </div>
      </div>
    </div>
  )
} 