import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, feedback, rating } = await request.json()

    if (!email || !feedback || !rating) {
      return NextResponse.json(
        { error: 'Dati mancanti' },
        { status: 400 }
      )
    }

    // Invia email al team
    await resend.emails.send({
      from: 'Mini Ai App <noreply@miniaiapps.tech>',
      to: process.env.TEAM_EMAIL || 'info.digitalautomatonsolutions@gmail.com',
      subject: 'Nuovo feedback ricevuto',
      html: `
        <h1>Nuovo feedback ricevuto</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Rating:</strong> ${rating}/5</p>
        <p><strong>Feedback:</strong></p>
        <p>${feedback}</p>
      `
    })

    // Invia email di conferma all'utente
    await resend.emails.send({
      from: 'Mini Ai App <noreply@miniaiapps.tech>',
      to: email,
      subject: 'Grazie per il tuo feedback!',
      html: `
        <h1>Grazie per il tuo feedback!</h1>
        <p>Abbiamo ricevuto il tuo feedback e lo apprezziamo molto.</p>
        <p>Il tuo rating: ${rating}/5</p>
        <p>Il tuo feedback:</p>
        <p>${feedback}</p>
        <p>Il nostro team lo esaminerà e lo utilizzerà per migliorare i nostri servizi.</p>
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