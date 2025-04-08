'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function PricingPage() {
  const router = useRouter()

  const handleCheckout = async (plan: string) => {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    })
    const data = await res.json()
    if (data.url) router.push(data.url)
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Scegli il tuo piano</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Free</h2>
          <p className="mb-4 text-gray-500">Accesso limitato a tutte le mini-app</p>
          <ul className="mb-6 text-sm">
            <li>✓ Fino a 5 richieste/giorno</li>
            <li>✓ Accesso a tutte le mini-app</li>
          </ul>
          <Button onClick={() => handleCheckout('free')} disabled>
            Gratis
          </Button>
        </div>
        <div className="border p-6 rounded-2xl shadow-md bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Pro</h2>
          <p className="mb-4 text-gray-500">Accesso illimitato + funzionalità avanzate</p>
          <ul className="mb-6 text-sm">
            <li>✓ Accesso illimitato</li>
            <li>✓ Priorità API + salvataggio dati</li>
            <li>✓ Supporto diretto</li>
          </ul>
          <Button onClick={() => handleCheckout('pro')}>Attiva Pro – €9.99/mese</Button>
        </div>
        <div className="border p-6 rounded-2xl shadow-md bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Team</h2>
          <p className="mb-4 text-gray-500">Perfetto per piccoli team</p>
          <ul className="mb-6 text-sm">
            <li>✓ Fino a 3 utenti</li>
            <li>✓ Esportazione dati</li>
            <li>✓ Supporto prioritario</li>
          </ul>
          <Button onClick={() => handleCheckout('team')}>Attiva Team – €29.00/mese</Button>
        </div>
      </div>
    </div>
  )
}
