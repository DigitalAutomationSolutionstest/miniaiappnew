import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Mini Ai App <noreply@miniaiapps.tech>',
      to: email,
      subject: 'Benvenuto su Mini Ai App!',
      html: `
        <h1>Benvenuto su Mini Ai App!</h1>
        <p>Ciao ${name},</p>
        <p>Siamo entusiasti di averti con noi! Ora hai accesso a tutte le nostre mini-app AI.</p>
        <p>Ecco alcune cose che puoi fare:</p>
        <ul>
          <li>Generare immagini con DALL-E</li>
          <li>Trascrivere audio con Whisper</li>
          <li>Analizzare CSV con GPT-4</li>
          <li>E molto altro ancora!</li>
        </ul>
        <p>Se hai domande o bisogno di aiuto, non esitare a contattarci.</p>
        <p>Buon divertimento!<br>Il Team di Mini Ai App</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Errore invio email:', error)
    return NextResponse.json({ error: "Errore nell'invio dell'email" }, { status: 500 })
  }
}
