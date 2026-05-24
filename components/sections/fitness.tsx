'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Dumbbell, Heart, TrendingUp } from 'lucide-react'

export function ShowcaseSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 bg-[#050505]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-purple-400 bg-purple-400/10 rounded-full mb-4">
              Método SempreFit
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Como funciona
              <span className="block text-gradient mt-2">nosso treinamento</span>
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Desenvolvemos uma metodologia exclusiva que combina avaliação física 
              detalhada, planejamento personalizado e acompanhamento contínuo para 
              garantir os melhores resultados.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { icon: Heart, text: 'Avaliação física completa' },
                { icon: Dumbbell, text: 'Treino personalizado' },
                { icon: TrendingUp, text: 'Acompanhamento de resultados' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-white">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glass-effect">
              <video
                className="w-full h-auto"
                poster="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070"
                src=""
                controls
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}