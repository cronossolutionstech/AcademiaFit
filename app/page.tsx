'use client'

import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/sections/HeroSection'
import { BenefitsSection } from '@/components/sections/BenefitsSection'
import { ShowcaseSection } from '@/components/sections/ShowcaseSection'
import { GalleryCarousel } from '@/components/sections/GalleryCarousel'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { CTASection } from '@/components/sections/CTASection'
import { Footer } from '@/components/sections/Footer'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export default function Home() {
  useSmoothScroll()
  
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />      {/* Já tem id="inicio" */}
      <BenefitsSection />   {/* Já tem id="beneficios" */}
      <ShowcaseSection />   {/* Já tem id="treinamentos" */}
      <GalleryCarousel />   {/* Já tem id="estrutura" */}
      <TestimonialsSection /> {/* Já tem id="depoimentos" */}
      <PricingSection />
      <CTASection />
      <Footer />           {/* Já tem id="contato" */}
    </main>
  )
}