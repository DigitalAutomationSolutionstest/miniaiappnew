'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function LogoUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Seleziona un file da caricare')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Errore durante il caricamento')
      }

      toast.success('Logo caricato con successo!')
      setFile(null)
    } catch (error) {
      toast.error('Errore durante il caricamento del logo')
      console.error('Errore:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={loading}
      />
      <Button onClick={handleUpload} disabled={!file || loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Caricamento...
          </>
        ) : (
          'Carica Logo'
        )}
      </Button>
    </div>
  )
} 