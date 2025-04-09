'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export function LogoUploader() {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Errore durante il caricamento')
      }

      const data = await response.json()
      toast.success('Logo caricato con successo!')
      
      // Aggiorna l'URL del logo nella navbar
      window.location.reload()
    } catch (error) {
      toast.error('Errore durante il caricamento del logo')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={isLoading}
        className="max-w-[200px]"
      />
      <Button disabled={isLoading}>
        {isLoading ? 'Caricamento...' : 'Carica Logo'}
      </Button>
    </div>
  )
} 