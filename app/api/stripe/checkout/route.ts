import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(req: Request) {
  try {
    const { plan } = await req.json()
    
    // Ottieni l'utente corrente
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    // Mappa dei piani e loro prezzi
    const priceIds = {
      free: 'price_1RBiR2Jt2p1HKJxdpU5HTshf',
      pro: 'price_1RBiR3Jt2p1HKJxdkExtp5rq',
      team: 'price_1RBiR4Jt2p1HKJxdt3nN2J5c'
    }

    // Crea la sessione di checkout
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.access_token}`
      },
      body: JSON.stringify({
        price_id: priceIds[plan as keyof typeof priceIds] || priceIds.free
      })
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.detail || 'Errore nella creazione della sessione')
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Errore nel checkout:', error)
    return NextResponse.json(
      { error: 'Errore nella creazione della sessione di checkout' },
      { status: 500 }
    )
  }
} 