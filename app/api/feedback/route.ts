import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    const { email, feedback, rating } = await request.json()

    // Validazione
    if (!email || !feedback || !rating) {
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Valutazione non valida' }, { status: 400 })
    }

    // Salva il feedback
    const { error: insertError } = await supabase.from('feedback').insert([
      {
        user_id: user.id,
        email,
        feedback,
        rating: parseInt(rating),
        created_at: new Date().toISOString(),
      },
    ])

    if (insertError) {
      console.error('Errore salvataggio feedback:', insertError)
      return NextResponse.json({ error: 'Errore nel salvataggio del feedback' }, { status: 500 })
    }

    // Invia email di conferma
    await resend.emails.send({
      from: 'Mini Ai App <feedback@miniaiapps.tech>',
      to: email,
      subject: 'Grazie per il tuo feedback!',
      html: `
        <h1>Grazie per il tuo feedback!</h1>
        <p>Abbiamo ricevuto il tuo feedback e lo apprezziamo molto.</p>
        <p>La tua opinione è importante per migliorare i nostri servizi.</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Errore route feedback:', error)
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 })
  }
}
