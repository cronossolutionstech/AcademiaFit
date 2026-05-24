'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Dumbbell } from 'lucide-react'
import { MagneticButton } from '@/components/buttons/MagneticButton'

const navLinks = [
  { name: 'Início', href: '#hero' },
  { name: 'Benefícios', href: '#benefits' },
  { name: 'Estrutura', href: '#gallery' },
  { name: 'Planos', href: '#pricing' },
  { name: 'Contato', href: '#contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl' : 'bg-transparent'
      }`}>
        {/* Barra de progresso gradiente */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{ width }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.a
              href="#hero"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">
                Sempre<span className="text-gradient">Fit</span>
              </span>
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              <MagneticButton size="sm" variant="primary">
                Agendar Avaliação
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-full glass-effect flex items-center justify-center"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-40 bg-black/95 backdrop-blur-xl md:hidden"
      >
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{ width }}
        />
        
        <div className="flex flex-col pt-24 p-6 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium py-3 border-b border-white/10 hover:border-blue-500/50"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4">
            <MagneticButton size="md" variant="primary" className="w-full">
              Agendar Aula
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </>
  )
}