"use client"

import { Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our CV builder? Need help with your resume? We're here to help you succeed in your
            job search journey.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>We're here to help you build your perfect CV.</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-gray-600">info@cvkonnekt.co.za</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 