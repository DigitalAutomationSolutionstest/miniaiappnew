import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email e messaggio obbligatori' },
        { status: 400 }
      )
    }

    // Invia email al team
    await resend.emails.send({
      from: 'Mini Ai App <noreply@miniaiapps.tech>',
      to: process.env.TEAM_EMAIL || 'info.digitalautomatonsolutions@gmail.com',
      subject: `Contatto da ${name}`,
      html: `
        <h1>Nuovo messaggio di contatto</h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${message}</p>
      `
    })

    // Invia email di conferma all'utente
    await resend.emails.send({
      from: 'Mini Ai App <noreply@miniaiapps.tech>',
      to: email,
      subject: 'Conferma richiesta contatto',
      html: `
        <h1>Grazie per averci contattato!</h1>
        <p>Ciao ${name},</p>
        <p>Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.</p>
        <p>Ecco un riepilogo del tuo messaggio:</p>
        <p>${message}</p>
        <p>A presto!<br>Il Team di Mini Ai App</p>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Errore invio email:', error)
    return NextResponse.json(
      { error: 'Errore nell\'invio dell\'email' },
      { status: 500 }
    )
  }
} 