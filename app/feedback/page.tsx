'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function FeedbackPage() {
  const [form, setForm] = useState({
    email: '',
    feedback: '',
    rating: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Errore nell'invio del feedback")

      toast.success('Grazie per il tuo feedback!')
      setForm({ email: '', feedback: '', rating: '' })
    } catch (err) {
      toast.error("Errore durante l'invio del feedback")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-6">Lascia un feedback</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              placeholder="La tua email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Valutazione (1-5)</Label>
            <Input
              id="rating"
              type="number"
              min="1"
              max="5"
              value={form.rating}
              onChange={(e) => handleChange('rating', e.target.value)}
              required
              placeholder="Da 1 a 5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Il tuo feedback</Label>
            <Textarea
              id="feedback"
              rows={4}
              value={form.feedback}
              onChange={(e) => handleChange('feedback', e.target.value)}
              required
              placeholder="Scrivi qui il tuo feedback..."
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Invio in corso...
              </>
            ) : (
              'Invia feedback'
            )}
          </Button>
        </form>
      </Card>
    </div>
  )
}
