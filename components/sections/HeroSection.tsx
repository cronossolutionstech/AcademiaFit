'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Dumbbell, Activity, Flame } from 'lucide-react'
import { MagneticButton } from '@/components/buttons/MagneticButton'
import { AuroraBackground } from '@/components/effects/AuroraBackground'
import { FloatingParticles } from '@/components/effects/FloatingParticles'
import { LightBeams } from '@/components/effects/LightBeams'

export function HeroSection() {
  return (

    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Background Effects */}
      <AuroraBackground />
      <FloatingParticles />
      <LightBeams />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563EB10_1px,transparent_1px),linear-gradient(to_bottom,#2563EB10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
      
      {/* Video Background Placeholder - Substituir por vídeo real */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')] bg-cover bg-center opacity-30" />
      
      {/* Neon glow effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column */}
          <div>
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect-neon mb-8"
            >
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Academia Premium</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              Transforme seu corpo.
              <span className="block text-gradient mt-2">Evolua sua mente.</span>
              <span className="block text-gradient-fit mt-2">Supere seus limites.</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-400 max-w-lg mb-8 leading-relaxed"
            >
              Equipamentos premium, personal trainers especializados e um ambiente 
              motivacional para você alcançar seus objetivos.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <MagneticButton size="lg" variant="primary">
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary">
                <Play className="w-5 h-5 mr-2 inline" />
                Ver Estrutura
              </MagneticButton>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 sm:gap-8"
            >
              {[
                { value: '500+', label: 'Alunos Ativos', icon: Activity },
                { value: '20+', label: 'Personal Trainers', icon: Dumbbell },
                { value: '1000m²', label: 'Área Premium', icon: Flame }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold text-white">
                    <stat.icon className="w-5 h-5 text-blue-500" />
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Right Column - Atleta em Movimento */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[400px] lg:max-w-[500px]">
              {/* Neon glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-full" />
              
              {/* Imagem do atleta */}
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070"
                  alt="Atleta SempreFit"
                  className="w-full h-auto object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Video button overlay */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg"
                >
                  <Play className="w-6 h-6 text-white ml-1" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-blue-500/50 flex justify-center">
          <div className="w-1 h-2 bg-blue-500 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}