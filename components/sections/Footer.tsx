'use client'

import { motion } from 'framer-motion'
import { ArrowUp, Clock, MapPin, Phone, Mail } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contato" className="relative bg-black border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Coluna 1 - Logo e Informações */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo - apenas a imagem, maior */}
              <div className="mb-6">
                <Image
                  src="/images/logo_sf.png"
                  alt="SempreFit"
                  width={200}
                  height={200}
                  className="w-auto h-20 object-contain"
                  priority
                />
              </div>
              
              <p className="text-gray-400 mb-6 max-w-md">
                Academia premium com estrutura de ponta e profissionais qualificados 
                para transformar sua vida através do esporte e bem-estar.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-400">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Seg-Sex: 5h às 23h | Sáb-Dom: 8h às 18h</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Av. Paulista, 1000 - São Paulo, SP</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">(11) 3000-0000</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">contato@semprefit.com.br</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Coluna 2 - Links Rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Início</a></li>
              <li><a href="#beneficios" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Benefícios</a></li>
              <li><a href="#estrutura" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Estrutura</a></li>
              <li><a href="#treinamentos" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Treinamentos</a></li>
              <li><a href="#depoimentos" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Depoimentos</a></li>
              <li><a href="#planos" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Planos</a></li>
            </ul>
          </motion.div>
          
          {/* Coluna 3 - Redes Sociais e Atendimento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-4">Redes Sociais</h4>
            <div className="flex flex-wrap gap-3">
              <div className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <span className="text-white text-xs font-bold">IG</span>
              </div>
              <div className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <span className="text-white text-xs font-bold">FB</span>
              </div>
              <div className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <span className="text-white text-xs font-bold">X</span>
              </div>
              <div className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <span className="text-white text-xs font-bold">YT</span>
              </div>
            </div>
            
            {/* Halter animado */}
            <motion.div
              className="mt-6 flex justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
            </motion.div>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SempreFit Academia. Todos os direitos reservados.
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Termos de Uso
            </a>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}