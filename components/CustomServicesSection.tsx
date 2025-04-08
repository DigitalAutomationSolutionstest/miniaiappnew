'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CustomServicesSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className="py-20 text-center bg-gradient-to-r from-primary/5 to-secondary/5"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 leading-tight sm:text-5xl bg-gradient-to-r from-foreground to-muted-foreground text-transparent bg-clip-text">
          Hai un'idea? La costruiamo per te
        </h2>
        <p className="max-w-3xl mx-auto mb-6 text-muted-foreground text-lg sm:text-xl">
          Non hai tempo o conoscenze per sviluppare un sito o un'app AI? Ci pensiamo noi.
          Progetti su misura, realizzati con intelligenza artificiale all'avanguardia e attenzione maniacale al design e alla performance.
        </p>
        <p className="max-w-2xl mx-auto mb-10 text-lg font-medium text-primary">
          Il nostro team usa modelli AI di ultima generazione (OpenAI, Hugging Face, Whisper) integrati in soluzioni semplici, potenti e accessibili.
        </p>
        <div className="flex justify-center gap-4 flex-col sm:flex-row">
          <Button asChild size="lg">
            <Link href="/services">Richiedi un progetto</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/#features">Scopri le mini-app</Link>
          </Button>
        </div>
      </div>
    </motion.section>
  )
} 