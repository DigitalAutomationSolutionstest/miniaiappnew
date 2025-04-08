import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, result } = await request.json()

    if (!email || !result) {
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Mini Ai App <noreply@miniaiapps.tech>',
      to: email,
      subject: 'Analisi CSV completata',
      html: `
        <h1>La tua analisi CSV è pronta!</h1>
        <p>Ecco il risultato dell'analisi:</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <pre style="white-space: pre-wrap; font-family: monospace;">${result}</pre>
        </div>
        <p>Puoi copiare il risultato e utilizzarlo come preferisci.</p>
        <p>Se hai bisogno di altre analisi, non esitare a tornare sul nostro sito!</p>
        <p>A presto!<br>Il Team di Mini Ai App</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Errore invio email:', error)
    return NextResponse.json({ error: "Errore nell'invio dell'email" }, { status: 500 })
  }
}
