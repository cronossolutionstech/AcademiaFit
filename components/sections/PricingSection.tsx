'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, Dumbbell, Zap, Crown } from 'lucide-react'
import { MagneticButton } from '@/components/buttons/MagneticButton'

const plans = [
  {
    name: 'Plano Basic',
    price: '89',
    period: 'mês',
    description: 'Para começar sua jornada fitness',
    features: [
      'Acesso total à academia',
      'Horário comercial (8h-18h)',
      'Avaliação física inicial',
      'App de treino básico',
      'Área de musculação',
      'Cardio Zone'
    ],
    popular: false,
    icon: Dumbbell
  },
  {
    name: 'Plano Premium',
    price: '149',
    period: 'mês',
    description: 'Experiência fitness completa',
    features: [
      'Acesso 24/7 à academia',
      'Todas as modalidades',
      'Avaliação mensal',
      'App de treino premium',
      'Acompanhamento nutricional',
      'Toalha e vestiário premium',
      'Aulas de grupo ilimitadas',
      'Personal 1x por semana'
    ],
    popular: true,
    icon: Crown
  },
  {
    name: 'Plano Black',
    price: '199',
    period: 'mês',
    description: 'Para quem quer o melhor',
    features: [
      'Tudo do plano Premium',
      'Personal Trainer exclusivo',
      'Consulta com nutricionista',
      'Acesso a todas as unidades',
      'Estacionamento VIP',
      'Lockers premium',
      'Guest pass para convidados',
      'Prioridade nas aulas'
    ],
    popular: false,
    icon: Zap
  }
]

export function PricingSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative overflow-hidden bg-black py-20 sm:py-28 lg:py-36"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />

      <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-block rounded-full bg-green-400/10 px-3 py-1 text-xs font-medium text-green-400 sm:text-sm">
              Planos e Preços
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Escolha o plano
            <span className="text-gradient mt-2 block">
              ideal para você
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg"
          >
            Invista em você com planos flexíveis que se adaptam à sua rotina e objetivos.
            Comece sua transformação hoje mesmo!
          </motion.p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">

          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
              whileHover={{
                scale: 1.015,
                transition: {
                  duration: 0.2
                }
              }}
              className="relative"
            >

              {/* Badge */}
              {plan.popular && (
                <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                  🔥 Mais Popular
                </div>
              )}

              {/* Card */}
              <div
                className={`
                  glass-effect
                  h-full
                  rounded-2xl
                  p-6
                  sm:p-8
                  transition-colors
                  duration-200
                  hover:bg-white/10
                  ${
                    plan.popular
                      ? 'border border-purple-500/40 shadow-xl shadow-purple-500/10'
                      : 'border border-white/5'
                  }
                `}
              >

                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div
                    className={`
                      flex h-16 w-16 items-center justify-center rounded-full
                      bg-gradient-to-r from-blue-500 to-purple-500
                      ${
                        plan.popular
                          ? 'shadow-lg shadow-purple-500/30'
                          : ''
                      }
                    `}
                  >
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Title */}
                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {plan.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {plan.description}
                  </p>

                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">
                      R${plan.price}
                    </span>

                    <span className="text-gray-500">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8 space-y-3">

                  {plan.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4 flex-shrink-0 text-green-500" />

                      <span className="text-sm text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}

                </div>

                {/* Button */}
                <MagneticButton
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className={`
                    w-full
                    ${
                      plan.popular
                        ? '!bg-white !text-black'
                        : ''
                    }
                  `}
                >
                  Começar Agora
                </MagneticButton>

              </div>
            </motion.div>
          ))}

        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          *Todos os planos incluem acesso ilimitado durante o horário contratado.
          Consulte condições e taxas adicionais.
        </motion.p>

      </div>
    </section>
  )
}