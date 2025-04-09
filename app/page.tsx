'use client'

import { motion } from 'framer-motion'
import { Hero } from '@/components/Hero'
import { Card } from '@/components/Card'
import { Footer } from '@/components/Footer'
import CustomServicesSection from '@/components/CustomServicesSection'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero 
        title="L'intelligenza artificiale o il sito dei tuoi sogni, creati su misura per te."
        subtitle="Mini App AI potenti + Progetti Web e AI personalizzati."
      />
      <CustomServicesSection />
      <TestimonialsCarousel />
      <Footer />
    </div>
  )
}
