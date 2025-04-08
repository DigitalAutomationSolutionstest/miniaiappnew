'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const projectTypes = [
  'Sito vetrina',
  'Landing Page',
  'App AI',
  'Ecommerce',
  'Piattaforma Web',
  'Altro',
]

const features = [
  { id: 'blog', label: 'Blog' },
  { id: 'auth', label: 'Autenticazione Utenti' },
  { id: 'backend', label: 'Backend Dedicato' },
  { id: 'ai', label: 'Integrazione AI' },
  { id: 'dashboard', label: 'Dashboard Analitica' },
  { id: 'payments', label: 'Pagamenti Online' },
]

const budgetOptions = [
  '< 500€',
  '500 - 1.000€',
  '1.000 - 3.000€',
  '> 3.000€',
]

export default function CustomProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    features: [] as string[],
    budget: '',
    startDate: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (featureId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: checked
        ? [...prev.features, featureId]
        : prev.features.filter((id) => id !== featureId),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL
      if (!webhookUrl) {
        throw new Error('Webhook URL non configurato')
      }

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Errore invio dati')
      }

      toast.success('Richiesta inviata con successo! Ti ricontatteremo presto.')
      setFormData({
        name: '',
        email: '',
        projectType: '',
        features: [],
        budget: '',
        startDate: '',
        message: '',
      })
    } catch (error: any) {
      toast.error(`Errore: ${error.message || 'Si è verificato un problema.'}`)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">Descrivi il tuo progetto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                placeholder="Mario Rossi"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                placeholder="mario.rossi@email.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="projectType">Tipo di progetto</Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => handleChange('projectType', value)}
            >
              <SelectTrigger id="projectType">
                <SelectValue placeholder="Seleziona un tipo di progetto" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Funzionalità richieste</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature.id}
                    checked={formData.features.includes(feature.id)}
                    onCheckedChange={(checked) => handleCheckboxChange(feature.id, Boolean(checked))}
                  />
                  <label
                    htmlFor={feature.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {feature.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="budget">Budget indicativo</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => handleChange('budget', value)}
              >
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Seleziona il budget" />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate">Data di partenza</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="message">Descrivi la tua idea</Label>
            <Textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              required
              placeholder="Parlaci del tuo progetto, obiettivi, funzionalità chiave, ecc."
            />
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Invio in corso...
              </>
            ) : (
              'Invia Richiesta Progetto'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 