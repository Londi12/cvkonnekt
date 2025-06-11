"use client"

import { useState } from "react"
import { ArrowRight, FileText, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  const [showComingSoon, setShowComingSoon] = useState(false)
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr] lg:gap-12 xl:grid-cols-[1fr]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block text-sm text-emerald-600 mb-2">
                  <span className="font-medium">Build your professional CV today</span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Write your story with the ultimate CV builder
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Only 2% of CVs win. Yours will be one of them. Let's build you a CV that works.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/cv-templates">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                      Create my CV
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-600">39%</div>
                    <p className="text-sm text-gray-600">more likely to get hired</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="text-3xl font-bold text-amber-600">8%</div>
                    <p className="text-sm text-gray-600">better pay with your next job</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need to Land Your Dream Job
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed specifically for the South African job market, with features that help you
                  stand out from the competition.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-emerald-600" />
                  <CardTitle>AI-Powered Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Our AI suggests relevant content based on your industry and experience level, helping you articulate
                    your achievements effectively.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 text-emerald-600" />
                  <CardTitle>SA-Specific Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Choose from professionally designed templates that align with South African hiring practices and
                    employer expectations.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-emerald-600" />
                  <CardTitle>Instant Download</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Download your CV in multiple formats (PDF, Word) instantly. No waiting, no hassle - just
                    professional results.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-600">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Build Your Professional CV?
                </h2>
                <p className="max-w-[600px] text-emerald-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of South Africans who have successfully landed their dream jobs with CVKonnekt.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        {showComingSoon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-2">Coming Soon!</h3>
              <p className="text-gray-600 mb-4">
                CV upload and parsing functionality is currently in development. For now, you can create your CV from
                scratch using our templates.
              </p>
              <div className="flex gap-2">
                <Button onClick={() => setShowComingSoon(false)} variant="outline" size="sm">
                  Close
                </Button>
                <Link href="/cv-templates">
                  <Button
                    onClick={() => setShowComingSoon(false)}
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Browse Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-600">© 2024 CVKonnekt. All rights reserved. Made with ❤️ for South Africa.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
