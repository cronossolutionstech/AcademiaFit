'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
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
  {
    url: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=2070",
    title: "Lounge",
    description: "Área de convivência e descanso"
  }
]

const duplicatedImages = [...galleryImages, ...galleryImages]

// Componente do Interruptor Toggle Moderno
function SpeedToggle({ isFast, onToggle }: { isFast: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      className="relative w-36 h-14 rounded-full p-1 cursor-pointer transition-all duration-300"
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
        className="absolute top-1 w-20 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
        animate={{ x: isFast ? 60 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <span className={`text-xs font-bold ${isFast ? 'text-orange-500' : 'text-blue-500'}`}>
          {isFast ? '⚡ RÁPIDO' : 'DEVAGAR'}
        </span>
      </motion.div>
    </motion.button>
  )
}

// Componente do Modal de Imagem
function ImageModal({ image, onClose }: { image: typeof galleryImages[0] | null; onClose: () => void }) {
  // Fechar com a tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }} // Aumentado de 0.3 para 0.6
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Imagem com animação gradual MAIS LENTA */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ 
              duration: 0.8,        // Duração total da animação (mais lento)
              type: "tween",        // Tipo linear (sem spring)
              ease: "easeOut"       // Suaviza a saída
            }}
            className="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-contain max-h-[85vh] rounded-2xl"
            />
            
            {/* Legenda da imagem com fade in */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
              <p className="text-gray-300">{image.description}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function GalleryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const [isFast, setIsFast] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  const speed = isFast ? 2.0 : 0.8

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollAmount = 0

    const animate = () => {
      if (isPlaying && !isDragging) {
        scrollAmount += speed
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0
        }
        scrollContainer.scrollLeft = scrollAmount
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed, isPlaying, isDragging])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollRef.current) {
      setIsDragging(true)
      setStartX(e.pageX - scrollRef.current.offsetLeft)
      setScrollLeft(scrollRef.current.scrollLeft)
    }
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleImageClick = (image: typeof galleryImages[0]) => {
    setSelectedImage(image)
  }

  return (
    <section id="gallery" className="relative py-20 sm:py-28 lg:py-36 bg-[#050505] overflow-hidden">
      {/* Modal de imagem */}
      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />

      {/* Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/30 to-black" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] animate-pulse delay-500" />
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
      </div>
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-400 bg-blue-400/10 rounded-full mb-4">
            Tour Virtual
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Conheça nossa
            <span className="block text-gradient mt-2">Estrutura Premium</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Passeie pela nossa academia e conheça todos os espaços
          </p>
        </div>
      </div>

      {/* Botões de navegação */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <button
          onClick={() => scroll('left')}
          className="w-12 h-12 rounded-full glass-effect hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>
      
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <button
          onClick={() => scroll('right')}
          className="w-12 h-12 rounded-full glass-effect hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Carrossel Esteira */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-6 px-4 sm:px-6 lg:px-8 pb-8">
          {duplicatedImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: (index % galleryImages.length) * 0.05 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[300px] sm:w-[350px] lg:w-[400px] group cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative rounded-2xl overflow-hidden glass-effect">
                <motion.div
                  className="relative overflow-hidden aspect-[4/3]"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-300">{image.description}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controles */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full glass-effect hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
        >
          {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
        </motion.button>

        <SpeedToggle isFast={isFast} onToggle={() => setIsFast(!isFast)} />
      </div>

      {/* Indicadores de scroll */}
      <div className="flex justify-center gap-2 mt-6">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}