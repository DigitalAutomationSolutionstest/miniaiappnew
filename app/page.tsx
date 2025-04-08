'use client'

import { motion } from 'framer-motion'
import { Hero } from '@/components/Hero'
import { Card } from '@/components/Card'
import { Footer } from '@/components/Footer'

const apps = [
  {
    title: 'Chatbot AI',
    description: 'Chatta con un assistente AI intelligente',
    icon: '🤖',
    href: '/app/chatbot',
  },
  {
    title: 'Generatore Siti',
    description: 'Crea siti web in pochi click',
    icon: '🌐',
    href: '/app/sitegen',
  },
  {
    title: 'Assistente Codice',
    description: 'Ottieni aiuto con il tuo codice',
    icon: '💻',
    href: '/app/code',
  },
  {
    title: 'Trascrizione Audio',
    description: 'Trascrivi audio in testo',
    icon: '🎤',
    href: '/app/transcribe',
  },
  {
    title: 'Analisi CSV',
    description: 'Analizza i tuoi dati CSV',
    icon: '📊',
    href: '/app/csv',
  },
]

const steps = [
  {
    title: 'Registrati',
    description: 'Crea il tuo account in pochi secondi',
    icon: '✨',
  },
  {
    title: 'Scegli l\'app',
    description: 'Seleziona lo strumento AI che ti serve',
    icon: '🎯',
  },
  {
    title: 'Usa l\'AI',
    description: 'Inizia a utilizzare l\'intelligenza artificiale',
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
    description: 'Risultati istantanei con l\'AI',
    icon: '⚡',
  },
  {
    title: 'Accessibilità',
    description: 'Disponibile ovunque, sempre',
    icon: '🌍',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Apps Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Le tue mini-app AI preferite
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Accedi a 5 potenti strumenti AI in un'unica dashboard. Scegli quello che ti serve e inizia subito.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {apps.map((app, index) => (
              <Card key={app.title} {...app} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Come funziona
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Inizia a utilizzare Mini Ai App in tre semplici passaggi
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative rounded-lg border bg-background p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Perché Mini Ai App
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              La piattaforma AI più semplice e potente per le tue esigenze
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="relative rounded-lg border bg-background p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 