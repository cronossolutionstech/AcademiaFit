'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  icon?: ReactNode
}

export function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  size = 'md',
  disabled = false,
  icon
}: MagneticButtonProps) {

  const variants = {
    primary:
      'bg-gradient-to-r from-white to-white/90 text-black shadow-lg hover:shadow-xl',
    secondary:
      'glass-effect text-white border border-white/10 hover:bg-white/10'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl'
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        overflow-hidden
        font-medium
        flex
        items-center
        justify-center
        transition-all
        duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${className}
        ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer'
        }
      `}
      whileHover={
        !disabled
          ? {
              scale: 1.02,
              transition: {
                duration: 0.18,
                ease: 'easeOut'
              }
            }
          : {}
      }
      whileTap={
        !disabled
          ? {
              scale: 0.98,
              transition: {
                duration: 0.1
              }
            }
          : {}
      }
    >
      {/* Glow suave */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            variant === 'primary'
              ? 'radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)'
              : 'radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(16px)'
        }}
        animate={{
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
        }}
        animate={{
          x: ['-120%', '120%']
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 2
        }}
      />

      {/* Conteúdo */}
      <span className="relative z-10 flex items-center justify-center">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </span>

      {/* Ripple click */}
      {!disabled && (
        <motion.span
          className="absolute inset-0 bg-white/10 rounded-xl"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  )
}