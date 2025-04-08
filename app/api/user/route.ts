import { NextResponse } from 'next/server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      )
    }

    // Recupera i dati dell'utente
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('credits, last_login')
      .eq('id', user.id)
      .single()

    if (userError) {
      console.error('Errore recupero dati utente:', userError)
      return NextResponse.json(
        { error: 'Errore nel recupero dei dati' },
        { status: 500 }
      )
    }

    // Aggiorna last_login
    const { error: updateError } = await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id)

    if (updateError) {
      console.error('Errore aggiornamento last_login:', updateError)
    }

    return NextResponse.json({
      email: user.email,
      credits: userData?.credits || 0,
      lastLogin: userData?.last_login || new Date().toISOString()
    })
  } catch (error) {
    console.error('Errore route user:', error)
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    )
  }
} 