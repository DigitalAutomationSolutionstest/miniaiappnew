'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Mini AI App Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-bold">Mini AI App</span>
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
              href="/pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Prezzi
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Accedi
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
