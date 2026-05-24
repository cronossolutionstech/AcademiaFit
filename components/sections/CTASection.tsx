'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react'
import { MagneticButton } from '@/components/buttons/MagneticButton'

export function CTASection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium">Comece sua transformação hoje</span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Pronto para
            <span className="block text-gradient mt-2">
              transformar seu corpo?
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-12">
            Agende uma aula experimental gratuita e conheça nossa estrutura premium. 
            O primeiro passo para uma nova vida começa aqui.
          </p>
          
          {/* CTA Buttons  */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Botão Principal */}
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-5 h-5" />
              <span>Agendar Aula Grátis</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </a>

            {/* Botão Secundário - Falar com Consultor */}
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass-effect text-white font-medium hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Falar com Consultor</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto mt-12 sm:mt-16">
            {[
              { value: '500+', label: 'Alunos Ativos' },
              { value: '98%', label: 'Satisfação' },
              { value: '24/7', label: 'Suporte' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}