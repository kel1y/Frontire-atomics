import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Set RESEND_API_KEY in .env.local (get a key at https://resend.com).
// Optional: RESEND_FROM_EMAIL for a custom "from" address after domain verification.
const resend = new Resend(process.env.RESEND_API_KEY)

const CONTACT_EMAIL = 'info@frontieratomics.com'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Frontier Atomics <onboarding@resend.dev>'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 503 }
      )
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL],
      replyTo: email.trim(),
      subject: `Contact form: ${name.trim()}`,
      html: `
        <h2>New message from Frontier Atomics website</h2>
        <p><strong>From:</strong> ${name.trim()} &lt;${email.trim()}&gt;</p>
        <p><strong>Message:</strong></p>
        <p>${message.trim().replace(/\n/g, '<br />')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: error.message ?? 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
