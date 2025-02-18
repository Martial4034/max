"use client"

import { useEffect, useRef, useState } from "react"
import { CubeFace } from "./cube-face"
import { GridOverlay } from "../grid/grid-overlay"
import { useRouter } from "next/navigation"

const FACES = {
  FRONT: { name: "DESSINS", rotation: { x: 0, y: 0 }, path: "/dessins" },
  BACK: { name: "VIDEOS", rotation: { x: 0, y: 180 }, path: "/videos" },
  RIGHT: { name: "MUSIQUE", rotation: { x: 0, y: -90 }, path: "/musique" },
  LEFT: { name: "PHOTOS", rotation: { x: 0, y: 90 }, path: "/photos" },
  TOP: { name: "OBJETS", rotation: { x: -90, y: 0 }, path: "/objets" },
  BOTTOM: { name: "WEB", rotation: { x: 90, y: 0 }, path: "/web" },
}

export function Cube() {
  const router = useRouter()
  const [rotation, setRotation] = useState({ x: -25, y: 25 })
  const [isDragging, setIsDragging] = useState(false)
  const [activeFace, setActiveFace] = useState<string | null>(null)
  const [isGridOpen, setIsGridOpen] = useState(false)
  const [selectedFace, setSelectedFace] = useState<string | null>(null)
  const startPosition = useRef({ x: 0, y: 0 })
  const cubeRef = useRef<HTMLDivElement>(null)
  const savedRotation = useRef({ x: 0, y: 0 })

  // Calcule la face la plus visible
  const updateFaceVisibility = (rotX: number, rotY: number) => {
    const faces = document.querySelectorAll('.cube-face')
    let maxDot = -Infinity
    let activeFaceName = null
    let visibilityData = []

    const radY = rotY * Math.PI / 180
    const radX = rotX * Math.PI / 180

    faces.forEach(face => {
      // Définir la normale selon la face
      let normal = [0, 0, 1]
      if(face.classList.contains('face-front')) normal = [0, 0, 1]
      if(face.classList.contains('face-back')) normal = [0, 0, -1]
      if(face.classList.contains('face-right')) normal = [1, 0, 0]
      if(face.classList.contains('face-left')) normal = [-1, 0, 0]
      if(face.classList.contains('face-top')) normal = [0, -1, 0]
      if(face.classList.contains('face-bottom')) normal = [0, 1, 0]

      // Appliquer une rotation sur Y puis sur X
      const x1 = normal[0] * Math.cos(radY) + normal[2] * Math.sin(radY)
      const y1 = normal[1]
      const z1 = -normal[0] * Math.sin(radY) + normal[2] * Math.cos(radY)
      const x2 = x1
      const y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX)
      const z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX)

      const dot = z2
      if(dot > maxDot) {
        maxDot = dot
        activeFaceName = face.getAttribute('data-face')
      }

      // Mettre à jour le style de la face
      if (dot > 0) {
        face.classList.add('active-face')
      } else {
        face.classList.remove('active-face')
      }
    })

    setActiveFace(activeFaceName)
  }

  // Gestionnaires d'événements pour la rotation
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isGridOpen) return
    setIsDragging(true)
    const pos = "touches" in e ? e.touches[0] : e
    startPosition.current = { x: pos.clientX, y: pos.clientY }
    if (cubeRef.current) cubeRef.current.style.cursor = "grabbing"
  }

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || isGridOpen) return
    const pos = "touches" in e ? e.touches[0] : e
    const deltaX = pos.clientX - startPosition.current.x
    const deltaY = pos.clientY - startPosition.current.y

    setRotation(prev => {
      const newX = prev.x - deltaY * 0.5
      const newY = prev.y + deltaX * 0.5
      
      // Limiter la rotation en X pour éviter le retournement
      const clampedX = Math.max(-89, Math.min(89, newX))
      
      updateFaceVisibility(clampedX, newY)
      return { x: clampedX, y: newY }
    })

    startPosition.current = { x: pos.clientX, y: pos.clientY }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    if (cubeRef.current) cubeRef.current.style.cursor = "grab"
  }

  const handleWheel = (e: WheelEvent) => {
    if (isGridOpen) return
    e.preventDefault()
    setRotation(prev => {
      const newY = prev.y + e.deltaY * 0.5
      updateFaceVisibility(prev.x, newY)
      return { ...prev, y: newY }
    })
  }

  // Gestion des événements
  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return

    cube.addEventListener("wheel", handleWheel, { passive: false })
    document.addEventListener("mousemove", handleDragMove)
    document.addEventListener("mouseup", handleDragEnd)
    document.addEventListener("touchmove", handleDragMove)
    document.addEventListener("touchend", handleDragEnd)

    return () => {
      cube.removeEventListener("wheel", handleWheel)
      document.removeEventListener("mousemove", handleDragMove)
      document.removeEventListener("mouseup", handleDragEnd)
      document.removeEventListener("touchmove", handleDragMove)
      document.removeEventListener("touchend", handleDragEnd)
    }
  }, [isDragging, isGridOpen])

  // Initialisation
  useEffect(() => {
    updateFaceVisibility(rotation.x, rotation.y)
  }, [])

  const getMinimalRotation = (current: number, target: number) => {
    let delta = ((target - current + 540) % 360) - 180
    return current + delta
  }

  const handleFaceClick = (face: string) => {
    const targetFace = FACES[face as keyof typeof FACES]
    if (!targetFace) return

    // Sauvegarde la rotation actuelle
    savedRotation.current = { ...rotation }

    // Calcule la rotation minimale
    const newX = getMinimalRotation(rotation.x, targetFace.rotation.x)
    const newY = getMinimalRotation(rotation.y, targetFace.rotation.y)

    setRotation({ x: newX, y: newY })
    setSelectedFace(targetFace.name)

    // Ouvre la grille après un délai pour la transition
    setTimeout(() => {
      setIsGridOpen(true)
      // Navigation vers la page après l'animation de la grille
      setTimeout(() => {
        router.push(targetFace.path)
      }, 2000)
    }, 600)
  }

  const handleGridClose = () => {
    setIsGridOpen(false)
    // Restaure la rotation précédente
    setTimeout(() => {
      setRotation(savedRotation.current)
      setSelectedFace(null)
    }, 800)
  }

  return (
    <>
      <div className="cube-wrapper">
        <div
          ref={cubeRef}
          className="cube-container"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {Object.entries(FACES).map(([position, { name }]) => (
            <CubeFace
              key={position}
              face={name}
              position={position.toLowerCase() as any}
              isActive={activeFace === name}
              onClick={() => handleFaceClick(position)}
            />
          ))}
        </div>
      </div>

      <GridOverlay
        isOpen={isGridOpen}
        onClose={handleGridClose}
        faceType={selectedFace || ""}
      />
    </>
  )
} 