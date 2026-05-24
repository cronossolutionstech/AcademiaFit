'use client'

import { useRef, useState, useEffect, RefObject } from 'react'

interface MagneticPosition {
  x: number
  y: number
}

export function useMagnetic(): { ref: RefObject<HTMLButtonElement | null>; position: MagneticPosition } {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState<MagneticPosition>({ x: 0, y: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect()
      const x = (e.clientX - left - width / 2) * 0.3
      const y = (e.clientY - top - height / 2) * 0.3
      setPosition({ x, y })
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { ref, position }
}