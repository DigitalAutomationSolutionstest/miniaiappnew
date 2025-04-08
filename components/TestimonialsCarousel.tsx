'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    name: 'Mario Rossi',
    role: 'Startup Founder',
    quote: 'Mini Ai App ha trasformato il nostro workflow. Le app sono potenti e facili da usare.',
  },
  {
    name: 'Giulia Bianchi',
    role: 'Marketing Manager',
    quote: 'Il servizio personalizzato è stato incredibile. Hanno realizzato esattamente il sito che volevamo, in tempi record.',
  },
  {
    name: 'Luca Verdi',
    role: 'Sviluppatore Freelance',
    quote: 'Le API sono ben documentate e facili da integrare. Ottimo strumento per aggiungere AI ai miei progetti.',
  },
]

export default function TestimonialsCarousel() {
  // TODO: Implementare un vero carousel con Framer Motion o altra libreria
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Cosa dicono di noi
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Le parole dei nostri utenti e clienti soddisfatti.
          </p>
        </motion.div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="pt-6">
                  <blockquote className="italic text-muted-foreground">
                    " {testimonial.quote} "
                  </blockquote>
                  <div className="mt-4 font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 