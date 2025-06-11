import { NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend only if we have an API key
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    // Check if Resend is properly initialized
    if (!resend) {
      console.error("Resend API key is not configured")
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 503 }
      )
    }

    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: "CVKonnekt Contact Form <contact@cvkonnekt.com>",
      to: "londwe.shibe@gmail.com",
      reply_to: email,
      subject: `Contact Form: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    })

    if (error) {
      console.error("Failed to send email:", error)
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    // Check if it's a validation error
    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    )
  }
} 