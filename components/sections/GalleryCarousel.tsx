'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn, Play, Pause, X } from 'lucide-react'

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
    title: "Área de Musculação",
    description: "Equipamentos premium para seu treino"
  },
  {
    url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070",
    title: "Studio Funcional",
    description: "Espaço dedicado para treinos funcionais"
  },
  {
    url: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=2070",
    title: "Cardio Zone",
    description: "Esteiras modernas para seu cardio"
  },
  {
    url: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=2070",
    title: "Spinning",
    description: "Aulas de spinning com instrutores qualificados"
  },
  {
    url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070",
    title: "Área de Alongamento",
    description: "Espaço dedicado para mobilidade"
  },
  {
    url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070",
    title: "Vestiários Premium",
    description: "Estrutura completa para seu conforto"
  },
  {
    url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2070",
    title: "Personal Training",
    description: "Acompanhamento profissional especializado"
  },
]

// QUADRUPLICADO para loop infinito
const QUADRUPLED_IMAGES = [...galleryImages, ...galleryImages, ...galleryImages, ...galleryImages]

function SpeedToggle({ isFast, onToggle }: { isFast: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      className="relative w-32 sm:w-36 h-12 sm:h-14 rounded-full p-1 cursor-pointer transition-all duration-300"
      style={{
        background: isFast 
          ? 'linear-gradient(135deg, #f59e0b, #ef4444)' 
          : 'linear-gradient(135deg, #3b82f6, #06b6d4)'
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 rounded-full opacity-20 bg-black/50" />
      
      <motion.div
        className="absolute top-1 w-[5.5rem] sm:w-20 h-10 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
        animate={{ x: isFast ? 60 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <span className={`text-[10px] sm:text-xs font-bold ${isFast ? 'text-orange-500' : 'text-blue-500'}`}>
          {isFast ? '⚡ RÁPIDO' : 'DEVAGAR'}
        </span>
      </motion.div>
    </motion.button>
  )
}

function ImageModal({ image, onClose }: { image: typeof galleryImages[0] | null; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [image])

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.8, type: "tween", ease: "easeOut" }}
            className="relative w-[95vw] sm:w-[90vw] max-h-[90vh] overflow-hidden rounded-xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-contain max-h-[85vh] rounded-xl sm:rounded-2xl"
              loading="lazy"
              decoding="async"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl sm:rounded-b-2xl"
            >
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2">{image.title}</h3>
              <p className="text-xs sm:text-sm text-gray-300">{image.description}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function GalleryCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  
  // Refs para drag
  const startXRef = useRef(0)
  const startTranslateRef = useRef(0)
  const movedRef = useRef(false)
  
  const [isFast, setIsFast] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)
  const [translateX, setTranslateX] = useState(0)
  const [singleSetWidth, setSingleSetWidth] = useState(0)

  const speed = isFast ? 2.0 : 1.0

  // Mede a largura REAL do DOM após renderização
  useEffect(() => {
    const measureWidth = () => {
      if (trackRef.current) {
        // scrollWidth total do track quadriplicado
        const totalWidth = trackRef.current.scrollWidth
        // Largura de UM conjunto (1/4 do total)
        const widthOfOneSet = totalWidth / 4
        setSingleSetWidth(widthOfOneSet)
        
        // Inicia no MEIO (segundo conjunto)
        setTranslateX(-widthOfOneSet)
      }
    }
    
    measureWidth()
    window.addEventListener('resize', measureWidth)
    
    return () => window.removeEventListener('resize', measureWidth)
  }, [])

  // Autoplay com translateX - APENAS UMA TRANSFORM
  useEffect(() => {
    if (!isPlaying || isDragging || singleSetWidth === 0) return

    let lastTimestamp = 0

    const animate = (timestamp: number) => {
      if (!isPlaying || isDragging) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      if (lastTimestamp === 0) {
        lastTimestamp = timestamp
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const delta = Math.min(timestamp - lastTimestamp, 32)
      const deltaInSeconds = delta / 1000
      const moveAmount = speed * deltaInSeconds * 60
      
      setTranslateX((prev) => {
        let newX = prev - moveAmount
        
        // Loop infinito: quando passa de um conjunto, volta exatamente um conjunto
        if (Math.abs(newX) >= singleSetWidth) {
          newX = newX + singleSetWidth
        }
        if (newX > 0) {
          newX = -singleSetWidth + newX
        }
        
        return newX
      })

      lastTimestamp = timestamp
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, isDragging, speed, singleSetWidth])

  // Scroll manual com botões
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (singleSetWidth === 0) return
    
    setIsPlaying(false)
    const scrollAmount = direction === 'left' ? singleSetWidth : -singleSetWidth
    
    setTranslateX((prev) => {
      let newX = prev + scrollAmount
      
      if (Math.abs(newX) >= singleSetWidth) {
        newX = newX + singleSetWidth
      }
      if (newX > 0) {
        newX = -singleSetWidth + newX
      }
      
      return newX
    })
    
    setTimeout(() => {
      setIsPlaying(true)
    }, 500)
  }, [singleSetWidth])

  // Handlers de drag
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    movedRef.current = false
    
    let clientX: number
    if ('touches' in e) {
      clientX = e.touches[0].clientX
      e.preventDefault() // Previne scroll da página
    } else {
      clientX = e.clientX
    }
    
    startXRef.current = clientX
    startTranslateRef.current = translateX
  }, [translateX])

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    
    let clientX: number
    if ('touches' in e) {
      clientX = e.touches[0].clientX
      e.preventDefault()
    } else {
      clientX = e.clientX
    }
    
    const deltaX = clientX - startXRef.current
    
    if (Math.abs(deltaX) > 5) {
      movedRef.current = true
    }
    
    let newX = startTranslateRef.current + deltaX
    
    // Aplica limites para loop infinito
    if (Math.abs(newX) >= singleSetWidth) {
      newX = newX + singleSetWidth
    }
    if (newX > 0) {
      newX = -singleSetWidth + newX
    }
    
    setTranslateX(newX)
  }, [isDragging, startXRef, startTranslateRef, singleSetWidth])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleImageClick = useCallback((image: typeof galleryImages[0]) => {
    if (movedRef.current) {
      movedRef.current = false
      return
    }
    setSelectedImage(image)
  }, [])

  return (
    <section id="gallery" className="relative py-16 sm:py-20 lg:py-28 bg-[#050505] overflow-hidden">
      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />

      {/* Aurora Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-500/20 rounded-full blur-[60px] sm:blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-purple-500/20 rounded-full blur-[60px] sm:blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-pink-500/10 rounded-full blur-[60px] sm:blur-[100px] animate-pulse delay-500" />
      </div>
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium text-blue-400 bg-blue-400/10 rounded-full mb-3 sm:mb-4">
            Tour Virtual
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
            Conheça nossa
            <span className="block text-gradient mt-1 sm:mt-2">Estrutura Premium</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-400 px-4">
            Passeie pela nossa academia e conheça todos os espaços
          </p>
        </div>
      </div>

      {/* Botões de navegação */}
      <div className="absolute left-2 md:left-4 top-[50%] -translate-y-1/2 z-30 hidden md:block">
        <button
          onClick={() => scroll('left')}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </div>
      
      <div className="absolute right-2 md:right-4 top-[50%] -translate-y-1/2 z-30 hidden md:block">
        <button
          onClick={() => scroll('right')}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </div>

      {/* CARROSSEL COM TRANSLATEX - ARQUITETURA CORRETA */}
      <div 
        ref={containerRef}
        className="relative z-20 w-full overflow-hidden"
        style={{ touchAction: 'pan-y' }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <motion.div
          ref={trackRef}
          className="flex w-max gap-4 will-change-transform"
          animate={{ x: translateX }}
          transition={{ ease: "linear", duration: 0 }}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {QUADRUPLED_IMAGES.map((image, index) => (
            <div
              key={`${image.title}-${index}`}
              className="flex-none w-[85vw] sm:w-[320px] md:w-[360px] lg:w-[420px] group cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-[1.02]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-110"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-sm sm:text-base md:text-xl font-bold text-white mb-0.5 sm:mb-1">{image.title}</h3>
                    <p className="text-xs text-gray-300 hidden sm:block">{image.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controles */}
      <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8 relative z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
          aria-label={isPlaying ? "Pausar" : "Play"}
        >
          {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" />}
        </motion.button>

        <SpeedToggle isFast={isFast} onToggle={() => setIsFast(!isFast)} />
      </div>

      {/* Indicadores de scroll */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 relative z-20">
        {galleryImages.map((_, index) => (
          <div
            key={`indicator-${index}`}
            className="h-1 sm:h-1.5 rounded-full transition-all duration-300 bg-white/20 w-1.5 sm:w-2"
          />
        ))}
      </div>
      
      <style jsx>{`
        .text-gradient {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </section>
  )
}