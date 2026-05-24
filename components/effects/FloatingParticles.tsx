'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let animationId: number
    let isMobile = window.innerWidth < 768
    
    const particleCount = isMobile ? 30 : 80

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      isMobile = window.innerWidth < 768
      initParticles()
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (isMobile ? 1.5 : 2.5) + 0.5,
          speedX: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
          speedY: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
          opacity: Math.random() * 0.3 + 0.1
        })
      }
    }

    const drawParticles = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.fill()
        
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })
      
      animationId = requestAnimationFrame(drawParticles)
    }

    setCanvasSize()
    drawParticles()

    window.addEventListener('resize', setCanvasSize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" />
}