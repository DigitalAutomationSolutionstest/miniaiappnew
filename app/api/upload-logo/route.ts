import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // Necessario per Vercel Blob

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { message: 'Nessun file trovato nel FormData' },
        { status: 400 }
      )
    }

    // Usa il nome del file originale per il blob
    const filename = file.name

    const blob = await put(filename, file, { // Passa l'oggetto File
      access: 'public',
    })

    return NextResponse.json(blob)

  } catch (error: any) {
    console.error('Errore durante l\'upload su Vercel Blob:', error)
    return NextResponse.json(
      { message: error.message || 'Errore interno del server' },
      { status: 500 }
    )
  }
} 