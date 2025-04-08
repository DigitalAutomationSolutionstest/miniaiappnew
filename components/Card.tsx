'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface CardProps {
  title: string
  description: string
  icon: string
  href: string
  delay?: number
}

export function Card({ title, description, icon, href, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg"
    >
      <Link href={href}>
        <div className="flex flex-col items-center text-center">
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </Link>
    </motion.div>
  )
}
