'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogoUploader } from '@/components/LogoUploader'

export const dynamic = 'force-dynamic'

const tools = [
  {
    name: 'Chatbot AI',
    description: 'Chatta con un assistente AI intelligente',
    href: '/app/chatbot',
    icon: '🤖',
  },
  {
    name: 'Generatore Siti',
    description: 'Crea siti web in pochi click',
    href: '/app/sitegen',
    icon: '🌐',
  },
  {
    name: 'Assistente Codice',
    description: 'Ottieni aiuto con il tuo codice',
    href: '/app/code',
    icon: '💻',
  },
  {
    name: 'Trascrizione Audio',
    description: 'Trascrivi audio in testo',
    href: '/app/transcribe',
    icon: '🎤',
  },
  {
    name: 'Analisi CSV',
    description: 'Analizza i tuoi dati CSV',
    href: '/app/csv',
    icon: '📊',
  },
]

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Caricamento...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4">{user?.email}</span>
              <Button onClick={() => signOut()}>Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(tool.href)}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{tool.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Gestione Logo</h2>
          <LogoUploader />
        </div>
      </main>
    </div>
  )
}
