import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Firma mancante' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Errore verifica firma:', err)
      return NextResponse.json({ error: 'Firma non valida' }, { status: 400 })
    }

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

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const credits = parseInt(session.metadata?.credits || '0')

        if (!userId || !credits) {
          throw new Error('Dati mancanti nella sessione')
        }

        // Aggiorna i crediti dell'utente
        const { data: currentUser } = await supabase
          .from('users')
          .select('credits')
          .eq('id', userId)
          .single()

        const { error: updateError } = await supabase
          .from('users')
          .update({
            credits: (currentUser?.credits || 0) + credits,
          })
          .eq('id', userId)

        if (updateError) {
          console.error('Errore aggiornamento crediti:', updateError)
          throw updateError
        }

        // Invia email di conferma
        const { data: userData } = await supabase
          .from('users')
          .select('email')
          .eq('id', userId)
          .single()

        if (userData?.email) {
          await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/purchase-confirmation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userData.email,
              credits,
              amount: session.amount_total,
            }),
          })
        }

        break
      }

      case 'payment_intent.succeeded': {
        // Gestisci il pagamento completato
        break
      }

      case 'payment_intent.payment_failed': {
        // Gestisci il pagamento fallito
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Errore webhook:', error)
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 })
  }
}
