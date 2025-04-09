'use client'

import { motion } from 'framer-motion'
import { CustomProjectForm } from '@/components/CustomProjectForm'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="py-10 text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="text-4xl font-bold mb-4 leading-tight sm:text-5xl bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Progetti su misura con potenza AI
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl mb-6">
            Richiedi un sito web, una piattaforma o una mini-app AI completamente personalizzata.
            Ti guideremo passo passo, dal concept alla pubblicazione.
          </p>
          <ul className="text-left text-base font-medium space-y-3 mb-10 list-disc list-inside marker:text-primary">
            <li>✅ Sviluppo ultra-veloce (garantito in 3–10 giorni)</li>
            <li>✅ Design professionale e responsive, curato nei minimi dettagli</li>
            <li>✅ Intelligenza Artificiale integrata (OpenAI, Whisper, Hugging Face)</li>
            <li>✅ Preventivo chiaro e dettagliato, senza sorprese</li>
            <li>✅ Supporto umano dedicato, via chat o email, sempre disponibile</li>
          </ul>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-3xl mx-auto px-4"
        >
          <CustomProjectForm />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
