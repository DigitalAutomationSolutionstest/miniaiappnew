import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email mancante' }, { status: 400 })
    }

    // Invia email all'utente
    await resend.emails.send({
      from: 'Mini Ai App <noreply@miniaiapps.tech>',
      to: email,
      subject: "Benvenuto nella lista d'attesa di Mini Ai App!",
      html: `
        <h1>Grazie per il tuo interesse!</h1>
        <p>Ciao,</p>
        <p>Grazie per esserti iscritto alla lista d'attesa di Mini Ai App. Ti terremo aggiornato sui nostri progressi e ti notificheremo non appena saremo pronti per il lancio.</p>
        <p>Nel frattempo, puoi seguirci sui nostri social media per rimanere aggiornato sulle novità.</p>
        <p>A presto!<br>Il Team di Mini Ai App</p>
      `,
    })

    // Invia notifica al team
    await resend.emails.send({
      from: 'Mini Ai App <noreply@miniaiapps.tech>',
      to: process.env.TEAM_EMAIL || 'team@miniaiapps.tech',
      subject: "Nuovo iscritto alla lista d'attesa",
      html: `
        <h1>Nuovo iscritto alla lista d'attesa</h1>
        <p>Un nuovo utente si è iscritto alla lista d'attesa:</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Errore invio email:', error)
    return NextResponse.json({ error: "Errore nell'invio dell'email" }, { status: 500 })
  }
}
