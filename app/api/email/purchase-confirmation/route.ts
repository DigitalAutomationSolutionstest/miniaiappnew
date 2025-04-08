import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, credits, amount } = await request.json()

    if (!email || !credits || !amount) {
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Mini Ai App <noreply@miniaiapps.tech>',
      to: email,
      subject: 'Acquisto crediti confermato!',
      html: `
        <h1>Grazie per il tuo acquisto!</h1>
        <p>Il tuo acquisto è stato confermato con successo.</p>
        <p>Dettagli:</p>
        <ul>
          <li>Crediti acquistati: ${credits}</li>
          <li>Importo: €${(amount / 100).toFixed(2)}</li>
        </ul>
        <p>Puoi iniziare a utilizzare i tuoi crediti subito!</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">
            Vai alla tua Dashboard
          </a>
        </p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Errore invio email:', error)
    return NextResponse.json({ error: "Errore nell'invio dell'email" }, { status: 500 })
  }
}
