'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Dumbbell, Heart, TrendingUp, Zap, Award } from 'lucide-react'

export function ShowcaseSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  const stats = [
    { value: '500+', label: 'Alunos Ativos', icon: Award },
    { value: '20+', label: 'Personal Trainers', icon: Dumbbell },
    { value: '1000m²', label: 'Área Premium', icon: Zap },
  ]

  return (
    <section id="showcase" className="py-20 sm:py-28 bg-black">
      {/* Background com glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column */}
          <motion.div
            ref={ref}
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
            
            <p className="text-gray-400 mb-8 leading-relaxed">
              Desenvolvemos uma metodologia exclusiva que combina avaliação física 
              detalhada, planejamento personalizado e acompanhamento contínuo para 
              garantir os melhores resultados.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { icon: Heart, text: 'Avaliação física completa', color: 'text-red-500', delay: 0.1 },
                { icon: Dumbbell, text: 'Treino personalizado', color: 'text-blue-500', delay: 0.2 },
                { icon: TrendingUp, text: 'Acompanhamento de resultados', color: 'text-green-500', delay: 0.3 }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: item.delay }}
                  className="group flex items-center gap-4 p-4 rounded-xl glass-effect hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.text}</h4>
                    <p className="text-sm text-gray-500">Acompanhamento especializado</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center p-3 rounded-xl glass-effect"
                >
                  <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right Column - Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glass-effect group">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-purple-900 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070"
                  alt="Treino SempreFit"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Play Button */}
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </motion.button>
                
                {/* Neon border */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-purple-500/50 transition-all duration-300" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}