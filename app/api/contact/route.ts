import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, type, budget, message } = await req.json()

    console.log('Richiesta ricevuta:', { name, email, type, budget, message })

    // Email con Resend
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@tuodominio.com',
        to: 'tuaemail@esempio.com',
        subject: `Nuova richiesta da ${name}`,
        html: `
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Tipo progetto:</strong> ${type}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Messaggio:</strong><br/>${message}</p>
        `,
      }),
    })

    // Webhook (Zapier / Airtable / Notion)
    await fetch(process.env.WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, type, budget, message }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Errore nella richiesta:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
} 