import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.miniaiapps.tech'

export async function POST(request: Request, { params }: { params: { tool: string } }) {
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

    // Verifica crediti
    const { data: userData } = await supabase
      .from('users')
      .select('credits')
      .eq('id', user.id)
      .single()

    if (!userData?.credits || userData.credits < 1) {
      return NextResponse.json({ error: 'Crediti insufficienti' }, { status: 402 })
    }

    const { input } = await request.json()

    if (!input?.trim()) {
      return NextResponse.json({ error: 'Input mancante' }, { status: 400 })
    }

    // Chiamata all'API FastAPI
    const response = await fetch(`${API_URL}/${params.tool}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({ input }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }

    const data = await response.json()

    // Deduci un credito
    const { error: updateError } = await supabase
      .from('users')
      .update({ credits: userData.credits - 1 })
      .eq('id', user.id)

    if (updateError) {
      console.error('Errore aggiornamento crediti:', updateError)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Errore route AI ${params.tool}:`, error)
    return NextResponse.json({ error: 'Errore nella chiamata AI' }, { status: 500 })
  }
}
