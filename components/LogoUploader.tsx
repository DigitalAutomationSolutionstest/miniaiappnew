'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function LogoUploader() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Il file è troppo grande. Dimensione massima: 5MB')
        return
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Per favore seleziona un file immagine')
        return
      }
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Per favore seleziona un file prima di caricare')
      return
    }

    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Errore durante il caricamento')
      }

      const data = await response.json()
      toast.success('Logo caricato con successo!')
      
      // Aggiorna l'URL del logo nella navbar
      window.location.reload()
    } catch (error) {
      console.error('Errore durante il caricamento:', error)
      toast.error(error instanceof Error ? error.message : 'Errore durante il caricamento del logo')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isLoading}
          className="max-w-[200px]"
        />
        <Button 
          onClick={handleUpload}
          disabled={isLoading || !selectedFile}
          className="min-w-[120px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Caricamento...
            </>
          ) : (
            'Carica Logo'
          )}
        </Button>
      </div>
      {selectedFile && (
        <p className="text-sm text-muted-foreground">
          File selezionato: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
        </p>
      )}
    </div>
  )
} 