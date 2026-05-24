'use client'

import { motion } from 'framer-motion'

export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}