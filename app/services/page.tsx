'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    budget: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      setSuccess(true)
      setFormData({ name: '', email: '', type: '', budget: '', message: '' })
    }

    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Hai un'idea? Noi la costruiamo per te</h1>
      <p className="mb-8 text-muted-foreground">
        Creiamo siti web professionali e mini-app AI su misura per te. Parlaci del tuo progetto, ti
        ricontatteremo entro 24h.
      </p>

      <div className="grid gap-4 mb-8">
        <Card>
          <CardContent className="p-4">🌐 Siti web responsive</CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">🤖 Mini-app AI personalizzate</CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">⚙️ Integrazioni API e automazioni</CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <Label>Nome</Label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Tipo di progetto</Label>
          <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleziona un tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sito web">Sito web</SelectItem>
              <SelectItem value="Mini-app AI">Mini-app AI</SelectItem>
              <SelectItem value="Altro">Altro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Budget indicativo</Label>
          <Input value={formData.budget} onChange={(e) => handleChange('budget', e.target.value)} />
        </div>
        <div>
          <Label>Messaggio</Label>
          <Textarea
            rows={4}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Invio...' : 'Invia richiesta'}
        </Button>
        {success && <p className="text-green-600">Richiesta inviata con successo!</p>}
      </form>
    </div>
  )
}
