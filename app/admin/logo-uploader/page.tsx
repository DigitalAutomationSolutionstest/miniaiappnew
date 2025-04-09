'use client'

import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, Copy } from 'lucide-react'
import type { PutBlobResult } from '@vercel/blob'
import { motion } from 'framer-motion'

export default function LogoUploaderPage() {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setBlob(null)

    try {
      const input = inputFileRef.current
      if (!input?.files?.[0]) {
        throw new Error('Nessun file selezionato')
      }

      const formData = new FormData()
      formData.append('file', input.files[0])

      const res = await fetch('/api/upload-logo', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('Errore nella richiesta')
      }

      const newBlob: PutBlobResult = await res.json()
      setBlob(newBlob)
      toast.success('Logo caricato con successo!')
    } catch (error: any) {
      toast.error(`Errore upload: ${error.message}`)
      console.error('Errore dettaglio:', error)
    } finally {
      setLoading(false)
      if (inputFileRef.current) {
        inputFileRef.current.value = ''
      }
    }
  }

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      toast.info('URL copiato negli appunti!')
    } catch (err) {
      toast.error("Errore nel copiare l'URL")
      console.error('Errore clipboard:', err)
    }
  }

  return (
    <div className="container mx-auto max-w-xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Carica Logo Progetto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <Label htmlFor="logoFile">Seleziona file logo (.png, .jpg, .svg)</Label>
              <Input
                id="logoFile"
                type="file"
                ref={inputFileRef}
                required
                accept="image/png, image/jpeg, image/svg+xml, image/webp"
                className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Caricamento...
                </>
              ) : (
                'Carica Logo'
              )}
            </Button>
          </form>

          {blob && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 p-4 border rounded-md bg-muted/50"
            >
              <h3 className="font-semibold mb-2">Logo Caricato con Successo:</h3>
              <div className="flex items-center justify-between gap-2 break-all bg-background p-2 rounded border">
                <a
                  href={blob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline truncate"
                >
                  {blob.url}
                </a>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(blob.url)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                <strong>Istruzioni:</strong> Dopo l'upload, copia l'URL del logo qui sopra e incollalo nel file <code>frontend/components/Navbar.tsx</code>, sostituendo il valore dell'attributo <code>src</code> nel tag <code>&lt;Image /&gt;</code>.
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 