'use client'

import { motion } from 'framer-motion'

export function LightBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Feixe 1 */}
      <motion.div
        className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-white/15 to-transparent"
        animate={{ 
          x: ['0%', '100%', '0%'],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "linear",
          times: [0, 0.5, 1]
        }}
      />
      
      {/* Feixe 2 */}
      <motion.div
        className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"
        animate={{ 
          x: ['0%', '-100%', '0%'],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "linear", 
          delay: 2,
          times: [0, 0.5, 1]
        }}
      />
      
      {/* Feixe 3 */}
      <motion.div
        className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-500/15 to-transparent"
        animate={{ 
          x: ['0%', '50%', '0%'],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "linear", 
          delay: 4,
          times: [0, 0.5, 1]
        }}
      />
      
      {/* Feixe 4 - horizontal */}
      <motion.div
        className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent"
        animate={{ 
          y: ['0%', '100%', '0%'],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear", 
          delay: 1,
          times: [0, 0.5, 1]
        }}
      />
    </div>
  )
}