import { Users, Heart } from "lucide-react"
import { Metadata } from "next"

import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About CVKonnekt",
  description: "Learn about CVKonnekt's mission to help South Africans create professional CVs and advance their careers. Discover our story, values, and commitment to empowering job seekers.",
  keywords: ["about CVKonnekt", "CV builder story", "South Africa", "career development", "job search", "professional CV"],
  openGraph: {
    title: "About CVKonnekt | Our Story",
    description: "Learn about CVKonnekt's mission to help South Africans create professional CVs and advance their careers. Discover our story, values, and commitment to empowering job seekers.",
    url: "/about",
  },
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section - Simplified */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Built by a South African, for South Africans
              </h1>
              <p className="mt-4 text-gray-600 md:text-xl">
                A vision to democratize access to professional CV building tools, one CV at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Mission & Values</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  CVKonnekt was built on the belief that everyone deserves access to professional opportunities,
                  regardless of their economic background.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-8 lg:grid-cols-2 lg:gap-12">
              <Card className="border-emerald-200">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Built for SA</h3>
                  <p className="text-gray-600">
                    Every template, every feature, every piece of advice is tailored specifically for the South African
                    job market and hiring practices.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-emerald-200">
                <CardContent className="p-6">
                  <Heart className="h-12 w-12 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Empowerment</h3>
                  <p className="text-gray-600">
                    We believe that when people have the right tools, they can achieve anything. CVKonnekt is about
                    empowering dreams and opening doors.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Free Section - Simplified */}
        <section className="w-full py-12 md:py-16 bg-emerald-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-6">
                Why We're Committed to Staying Free
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  In South Africa, where unemployment affects over 30% of our population, we believe that access to
                  professional tools shouldn't be another barrier to employment.
                </p>
                <p>
                  "Every time someone gets a job using a CV they created on our platform, we've succeeded," says
                  Londiwe. "That's worth more than any subscription fee could ever be."
                </p>
                <p>
                  CVKonnekt operates on the principle that technology should be a bridge, not a wall. The platform is
                  self-funded and we're committed to keeping it that way for as long as possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="w-full py-12 md:py-16 bg-emerald-600">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <blockquote className="text-2xl md:text-3xl font-bold text-white max-w-4xl">
                "Ubuntu teaches us that we are all connected. When we lift each other up, we all rise together.
                CVKonnekt is my way of living that philosophy through technology."
              </blockquote>
              <cite className="text-emerald-100 text-lg">— Londiwe Shibe, Founder</cite>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
