"use client"

interface CubeFaceProps {
  face: string
  position: "front" | "back" | "right" | "left" | "top" | "bottom"
  isActive: boolean
  onClick: () => void
}

export function CubeFace({ face, position, isActive, onClick }: CubeFaceProps) {
  return (
    <div 
      className={`cube-face face-${position} ${isActive ? "active-face" : ""}`}
      data-face={face}
    >
      <span 
        className="face-title"
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        {face}
      </span>
    </div>
  )
} 