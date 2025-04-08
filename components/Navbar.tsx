'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Mini AI Apps</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link
              href="/services"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Servizi
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contatti
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
