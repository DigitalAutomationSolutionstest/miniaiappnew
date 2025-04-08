'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const toolConfigs = {
  chat: {
    title: 'Chat AI',
    description: 'Chatta con un assistente AI intelligente',
    placeholder: 'Scrivi il tuo messaggio...',
    outputPlaceholder: 'La risposta apparirà qui...'
  },
  code: {
    title: 'Generatore di Codice',
    description: 'Genera codice in vari linguaggi di programmazione',
    placeholder: 'Descrivi cosa vuoi che il codice faccia...',
    outputPlaceholder: 'Il codice generato apparirà qui...'
  },
  transcribe: {
    title: 'Trascrittore Audio',
    description: 'Trascrivi audio in testo',
    placeholder: 'Inserisci il link dell\'audio...',
    outputPlaceholder: 'La trascrizione apparirà qui...'
  },
  sitegen: {
    title: 'Generatore di Siti',
    description: 'Genera siti web completi',
    placeholder: 'Descrivi il sito che vuoi creare...',
    outputPlaceholder: 'Il codice del sito apparirà qui...'
  },
  csv: {
    title: 'Analizzatore CSV',
    description: 'Analizza e visualizza dati CSV',
    placeholder: 'Inserisci il tuo CSV...',
    outputPlaceholder: 'L\'analisi apparirà qui...'
  }
}

export default function MiniAppPage() {
  const { tool } = useParams()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const config = toolConfigs[tool as keyof typeof toolConfigs]

  const handleSubmit = async () => {
    if (!input.trim()) {
      toast.error('Inserisci un input valido')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/ai/${tool}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      })

      if (!res.ok) {
        throw new Error('Errore nella richiesta')
      }

      const data = await res.json()
      setOutput(data.result)
      toast.success('Operazione completata con successo!')
    } catch (error) {
      toast.error('Si è verificato un errore')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
        <p className="text-muted-foreground mb-6">{config.description}</p>
        
        <div className="space-y-4">
          <Textarea 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder={config.placeholder}
            className="min-h-[150px]"
          />
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Elaborazione...
                </>
              ) : (
                'Esegui'
              )}
            </Button>
          </div>

          <Textarea 
            readOnly 
            value={output} 
            placeholder={config.outputPlaceholder}
            className="min-h-[200px] bg-muted"
          />
        </div>
      </Card>
    </div>
  )
} 