import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validazione
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tutti i campi sono obbligatori' },
        { status: 400 }
      )
    }

    // Email con Resend
    await fetch('https://api.resend.com/emails', {
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
          <p><strong>Messaggio:</strong><br/>${message}</p>
        `,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Errore durante l\'invio dell\'email:', error)
    return NextResponse.json(
      { error: 'Errore durante l\'invio dell\'email' },
      { status: 500 }
    )
  }
}
