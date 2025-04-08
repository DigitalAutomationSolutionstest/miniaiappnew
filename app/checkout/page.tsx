'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 9.99,
    credits: 100,
    features: ['100 crediti', 'Accesso a tutte le mini-app', 'Supporto email']
  },
  {
    name: 'Pro',
    price: 19.99,
    credits: 250,
    features: ['250 crediti', 'Accesso a tutte le mini-app', 'Supporto prioritario', 'Funzionalità avanzate']
  },
  {
    name: 'Business',
    price: 49.99,
    credits: 1000,
    features: ['1000 crediti', 'Accesso a tutte le mini-app', 'Supporto dedicato', 'Funzionalità avanzate', 'API access']
  }
]

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!selectedPlan) {
      toast.error('Seleziona un piano')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: selectedPlan,
          price: plans[selectedPlan].price,
          credits: plans[selectedPlan].credits
        }),
      })

      if (!res.ok) {
        throw new Error('Errore nella richiesta')
      }

      const data = await res.json()
      window.location.href = data.url
    } catch (error) {
      toast.error('Si è verificato un errore durante il checkout')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Scegli il tuo piano</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card 
            key={plan.name}
            className={`p-6 cursor-pointer transition-all ${
              selectedPlan === index 
                ? 'border-primary shadow-lg' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedPlan(index)}
          >
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-3xl font-bold mb-4">€{plan.price}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button 
              className="w-full"
              variant={selectedPlan === index ? 'default' : 'outline'}
            >
              Seleziona
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button 
          size="lg"
          onClick={handleCheckout}
          disabled={loading || selectedPlan === null}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Reindirizzamento...
            </>
          ) : (
            'Procedi al pagamento'
          )}
        </Button>
      </div>
    </div>
  )
} 