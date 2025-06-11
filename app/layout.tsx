import type React from "react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"

import "./globals.css"

export const metadata = {
  title: {
    default: "CVKonnekt - Professional CV Builder for South Africans",
    template: "%s | CVKonnekt"
  },
  description: "Create professional CVs and cover letters designed for the South African job market. Free CV builder with templates and examples. Stand out with ATS-friendly CVs.",
  keywords: ["CV builder", "resume builder", "South Africa", "job search", "career", "professional CV", "cover letter", "ATS friendly"],
  authors: [{ name: "Londiwe Shibe", url: "https://cvkonnekt.com" }],
  creator: "CVKonnekt",
  publisher: "CVKonnekt",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cvkonnekt.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://cvkonnekt.com",
    title: "CVKonnekt - Professional CV Builder for South Africans",
    description: "Create professional CVs and cover letters designed for the South African job market. Free CV builder with templates and examples.",
    siteName: "CVKonnekt",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CVKonnekt - Professional CV Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CVKonnekt - Professional CV Builder for South Africans",
    description: "Create professional CVs and cover letters designed for the South African job market. Free CV builder with templates and examples.",
    images: ["/twitter-image.jpg"],
    creator: "@cvkonnekt",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "Om0gBmIjhXZGsSa8CcDA1KDPWJjqLBhCcxQ5Di3JOsw",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="Om0gBmIjhXZGsSa8CcDA1KDPWJjqLBhCcxQ5Di3JOsw" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
