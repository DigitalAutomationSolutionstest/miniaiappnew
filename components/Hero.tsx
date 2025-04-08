'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { WaitlistForm } from './WaitlistForm'

interface CtaProps {
  text: string
  href: string
}

interface HeroProps {
  title: string
  subtitle: string
  cta1?: CtaProps
  cta2?: CtaProps
}

export function Hero({ title, subtitle, cta1, cta2 }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-14 pb-20 sm:pb-32">
      <div className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-background shadow-xl shadow-primary/10 ring-1 ring-primary/5 sm:-mr-80 lg:-mr-96" />
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1"
        >
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl lg:col-span-2 xl:col-auto bg-gradient-to-r from-foreground to-muted-foreground text-transparent bg-clip-text">
            {title}
          </h1>
          <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <p className="text-lg leading-8 text-muted-foreground">{subtitle}</p>
            <div className="mt-10 flex items-center gap-x-6">
              {cta1 && (
                <Button asChild size="lg">
                  <Link href={cta1.href}>{cta1.text}</Link>
                </Button>
              )}
              {cta2 && (
                <Button asChild variant="outline" size="lg">
                  <Link href={cta2.href}>{cta2.text}</Link>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-background sm:h-32" />
    </section>
  )
}
