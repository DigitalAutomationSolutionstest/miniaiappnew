import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nessun file caricato' },
        { status: 400 }
      )
    }

    // Carica il file su Vercel Blob Storage
    const blob = await put(file.name, file, {
      access: 'public',
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Errore durante il caricamento:', error)
    return NextResponse.json(
      { error: 'Errore durante il caricamento del file' },
      { status: 500 }
    )
  }
} 