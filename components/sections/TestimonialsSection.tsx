'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote, Dumbbell, Heart, TrendingUp } from 'lucide-react'
import { AnimatedCounter } from '@/components/effects/AnimatedCounter'

const testimonials = [
  {
    name: 'Ana Rodrigues',
    role: 'Aluna há 6 meses',
    content: 'Em 6 meses de treino, já perdi 12kg e ganhei muita massa muscular. Os profissionais são incríveis e a estrutura é de primeira!',
    rating: 5,
    avatar: 'AR',
    result: '-12kg',
    icon: Heart
  },
  {
    name: 'Carlos Eduardo',
    role: 'Aluno há 1 ano',
    content: 'A SempreFit transformou minha vida. Saí do sedentarismo para uma rotina ativa. Melhor decisão que tomei!',
    rating: 5,
    avatar: 'CE',
    result: '+15kg massa magra',
    icon: TrendingUp
  },
  {
    name: 'Marina Costa',
    role: 'Aluna há 3 meses',
    content: 'Equipamentos novos, ambiente motivador e personal trainers atenciosos. Finalmente encontrei uma academia que me faz querer ir todos os dias.',
    rating: 5,
    avatar: 'MC',
    result: 'Resultados visíveis',
    icon: Dumbbell
  }
]

export function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="depoimentos" className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-black">
      {/* Background gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium text-pink-400 bg-pink-400/10 rounded-full mb-4">
              Resultados Reais
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
          >
            O que nossos alunos
            <span className="block text-gradient mt-2">
              estão conquistando
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Histórias reais de transformação que inspiram e motivam
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative h-full p-6 sm:p-8 rounded-2xl glass-effect hover:bg-white/10 transition-all duration-500">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-white/10 transition-all duration-300" />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-4">
                  "{testimonial.content}"
                </p>
                
                {/* Resultado destaque */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <testimonial.icon className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-sm text-green-400 font-medium">
                    Resultado: {testimonial.result}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Linha divisória com gradiente vibratório */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full h-[1px] my-12 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Estatísticas com contadores animados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {/* Alunos Ativos */}
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="text-3xl sm:text-4xl font-bold text-white">
              <AnimatedCounter target={500} suffix="+" duration={2000} />
            </div>
            <div className="text-xs text-gray-500 mt-1">Alunos Ativos</div>
          </motion.div>

          {/* Satisfação */}
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="text-3xl sm:text-4xl font-bold text-white">
              <AnimatedCounter target={98} suffix="%" duration={1500} />
            </div>
            <div className="text-xs text-gray-500 mt-1">Satisfação</div>
          </motion.div>

          {/* Aulas Semanais */}
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="text-3xl sm:text-4xl font-bold text-white">
              <AnimatedCounter target={50} suffix="+" duration={1500} />
            </div>
            <div className="text-xs text-gray-500 mt-1">Aulas Semanais</div>
          </motion.div>

          {/* Personal Trainers */}
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="text-3xl sm:text-4xl font-bold text-white">
              <AnimatedCounter target={10} suffix="+" duration={1000} />
            </div>
            <div className="text-xs text-gray-500 mt-1">Personal Trainers</div>
          </motion.div>
        </motion.div>

        {/* Segunda linha divisória com gradiente vibratório */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full h-[1px] mt-12 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            animate={{
              x: ['100%', '-100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}