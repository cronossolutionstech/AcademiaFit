'use client'

import { useEffect, useRef } from 'react'

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawAurora = () => {
      if (!ctx || !canvas) return
      
      const width = canvas.width
      const height = canvas.height
      
      const gradient = ctx.createLinearGradient(0, 0, width * 0.5, height)
      
      const hue1 = (time * 0.03) % 360
      const hue2 = (hue1 + 60) % 360
      const hue3 = (hue2 + 60) % 360
      
      gradient.addColorStop(0, `hsla(${hue1}, 100%, 30%, 0.15)`)
      gradient.addColorStop(0.3, `hsla(${hue2}, 100%, 25%, 0.1)`)
      gradient.addColorStop(0.6, `hsla(${hue3}, 100%, 20%, 0.05)`)
      gradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)')
      
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      
      ctx.filter = 'blur(40px)'
      
      time += 1
      animationId = requestAnimationFrame(drawAurora)
    }

    setCanvasSize()
    drawAurora()

    window.addEventListener('resize', setCanvasSize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" />
}