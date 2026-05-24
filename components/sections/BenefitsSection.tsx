'use client'

import { useState } from 'react'
import { 
  Dumbbell, 
  Clock, 
  MapPin, 
  Users, 
  Trophy, 
  Heart
} from 'lucide-react'

const benefits = [
  {
    icon: Dumbbell,
    title: 'Equipamentos Premium',
    description: 'Aparelhos de última geração das melhores marcas do mercado fitness mundial.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Clock,
    title: 'Horário Estendido',
    description: 'Funcionamos das 5h às 23h para caber na sua rotina, inclusive finais de semana.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: MapPin,
    title: 'Localização Premium',
    description: 'Unidades em pontos nobres da cidade, com fácil acesso e estacionamento.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Users,
    title: 'Comunidade Ativa',
    description: 'Eventos, desafios e uma comunidade motivadora que incentiva seu progresso.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Trophy,
    title: 'Resultados Garantidos',
    description: 'Metodologia comprovada com acompanhamento profissional para seus objetivos.',
    gradient: 'from-yellow-500 to-amber-500'
  },
  {
    icon: Heart,
    title: 'Saúde Integral',
    description: 'Cuide do corpo e da mente com nossos programas de bem-estar e nutrição.',
    gradient: 'from-red-500 to-pink-500'
  }
]

function BenefitCard({ benefit, index }: { benefit: typeof benefits[0], index: number }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * 10
    const rotateX = ((centerY - y) / centerY) * 10
    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.05s linear'
      }}
      className="group cursor-pointer"
    >
      <div className="relative h-full p-6 sm:p-8 rounded-2xl glass-effect hover:bg-white/10 transition-all duration-500">
        {/* Ícone com gradiente e glow */}
        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${benefit.gradient} p-0.5 mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
          <div className="w-full h-full rounded-xl bg-black/90 flex items-center justify-center group-hover:bg-black/70 transition-all duration-300">
            <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
        
        {/* Título com gradiente no hover */}
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
          {benefit.title}
        </h3>
        
        {/* Descrição */}
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-all duration-300">
          {benefit.description}
        </p>
        
        {/* Glow gradiente animado no hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} opacity-10 blur-xl rounded-2xl`} />
        </div>
        
        {/* Brilho na borda */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${benefit.gradient} opacity-20`} style={{ padding: '1px' }} />
        </div>
        
        {/* Efeito de elevação */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  )
}

export function BenefitsSection() {
  return (
    <section id="benefits" className="relative py-20 sm:py-28 lg:py-36 overflow-hidden bg-black">
      {/* Background com gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium text-purple-400 bg-purple-400/10 rounded-full mb-4">
            Por que escolher a SempreFit
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Benefícios da
            <span className="block text-gradient mt-2">
              Academia Premium
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Uma experiência completa que vai além do treino, com estrutura premium 
            e profissionais qualificados para sua evolução.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}