import type React from "react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"

import "./globals.css"

export const metadata = {
  title: "CVKonnekt - Professional CV Builder for South Africans",
  description:
    "Create professional CVs and cover letters designed for the South African job market. Free CV builder with templates and examples.",
  generator: 'v0.dev',
  verification: {
    google: 'Om0gBmIjhXZGsSa8CcDA1KDPWJjqLBhCcxQ5Di3JOsw',
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
