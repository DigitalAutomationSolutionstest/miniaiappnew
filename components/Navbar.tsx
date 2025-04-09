'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Mini Ai App Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="font-bold text-lg">Mini Ai App</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Mini App AI
            </Link>
            <Link
              href="/services"
              className="text-sm font-bold text-primary underline underline-offset-4 decoration-wavy transition-colors hover:text-primary/80"
            >
              Richiedi Progetto
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
