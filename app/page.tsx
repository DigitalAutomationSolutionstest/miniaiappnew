'use client'

import { motion } from 'framer-motion'
import { Hero } from '@/components/Hero'
import { Card } from '@/components/Card'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Importa i nuovi componenti
import CustomServicesSection from '@/components/CustomServicesSection'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'

const apps = [
  {
    title: 'Chat AI',
    description: 'Chatta con un assistente AI personalizzato',
    icon: '💬',
    href: '/chat',
  },
  {
    title: 'Generatore di Immagini',
    description: 'Crea immagini con l\'intelligenza artificiale',
    icon: '🎨',
    href: '/image-generator',
  },
  {
    title: 'Assistente di Scrittura',
    description: 'Scrivi contenuti con l\'aiuto dell\'AI',
    icon: '✍️',
    href: '/writing-assistant',
  },
]

const steps = [
  {
    title: 'Registrati',
    description: 'Crea il tuo account in pochi secondi',
    icon: '✨',
  },
  {
    title: "Scegli l'app o il servizio",
    description: 'Seleziona lo strumento AI che ti serve o richiedi un progetto personalizzato',
    icon: '🎯',
  },
  {
    title: "Usa o Richiedi",
    description: "Inizia subito a usare le app AI o invia la tua richiesta su misura",
    icon: '🚀',
  },
]

const benefits = [
  {
    title: 'Semplicità',
    description: 'Interfaccia intuitiva e facile da usare',
    icon: '🎨',
  },
  {
    title: 'Velocità',
    description: "Risultati istantanei con l'AI",
    icon: '⚡',
  },
  {
    title: 'Accessibilità',
    description: 'Disponibile ovunque, sempre',
    icon: '🌍',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HERO PRINCIPALE */}
      <Hero
        title="L'intelligenza artificiale o il sito dei tuoi sogni, creati su misura per te."
        subtitle="Mini App AI potenti + Progetti Web e AI personalizzati."
        cta1={{ text: 'Inizia Gratis', href: '/signup' }}
        cta2={{ text: 'Richiedi un progetto', href: '/services' }}
      />

      {/* SEZIONE NUOVO SERVIZIO */}
      <CustomServicesSection />

      {/* Apps Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Le tue mini-app AI preferite
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Accedi a strumenti AI potenti e facili da usare, pronti all'uso.
            </p>
          </motion.div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {apps.map((app, index) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card {...app} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Come funziona</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Inizia a utilizzare Mini Ai App o richiedi un progetto in tre semplici passaggi.
            </p>
          </motion.div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative rounded-lg border bg-background/70 p-8 text-center shadow-lg backdrop-blur-sm hover:shadow-primary/20 transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-6">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-base text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Testimonianze */}
      <TestimonialsCarousel />

      <Footer />
    </div>
  )
}
