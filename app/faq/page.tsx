import { Metadata } from "next"
import { HelpCircle } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

const faqItems = [
  {
    question: "What makes CVKonnekt different from other CV builders?",
    answer:
      "CVKonnekt is specifically designed for the South African job market. Our templates, content suggestions, and formatting guidelines are all tailored to meet local employer expectations and hiring practices. Plus, we're committed to keeping our platform free to ensure equal access to professional opportunities.",
  },
  {
    question: "Do I need to create an account to use CVKonnekt?",
    answer:
      "While you can browse our templates and examples without an account, creating a free account allows you to save your CVs and cover letters, access them anytime, and make updates as needed. Your data is secure and we never share your information with third parties.",
  },
  {
    question: "How do I choose the right CV template?",
    answer:
      "Consider your industry, experience level, and the type of role you're applying for. Our templates are categorized by industry and experience level to help you find the perfect match. For example, creative industries might prefer more visually striking templates, while corporate roles typically call for more traditional formats.",
  },
  {
    question: "Can I download my CV in different formats?",
    answer:
      "Yes! You can download your CV in PDF format, which is the most widely accepted format by employers. We ensure that the formatting remains consistent across all devices and platforms.",
  },
  {
    question: "Is my data secure on CVKonnekt?",
    answer:
      "Absolutely. We take data security seriously. Your information is encrypted, and we never share your personal data with third parties. You can delete your account and all associated data at any time.",
  },
  {
    question: "Do you offer cover letter templates as well?",
    answer:
      "Yes! We provide a variety of cover letter templates that complement our CV templates. Each template is designed to help you make a strong first impression and highlight your most relevant qualifications for the position.",
  },
  {
    question: "What if I need help writing my CV content?",
    answer:
      "Our AI-powered content suggestions can help you articulate your experience and achievements effectively. We also provide industry-specific examples and tips throughout the CV creation process. For more detailed guidance, check out our CV examples section.",
  },
  {
    question: "Is CVKonnekt really free?",
    answer:
      "Yes, CVKonnekt is completely free to use. We believe that access to professional tools shouldn't be a barrier to employment. While we may introduce premium features in the future, our core CV and cover letter building functionality will remain free.",
  },
]

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about CVKonnekt's CV builder, templates, and features. Learn how to create professional CVs and cover letters for the South African job market.",
  keywords: ["CV FAQ", "resume FAQ", "CV builder help", "South Africa", "job search tips", "CV questions"],
  openGraph: {
    title: "FAQ - CVKonnekt CV Builder",
    description: "Find answers to common questions about CVKonnekt's CV builder, templates, and features. Learn how to create professional CVs and cover letters for the South African job market.",
    url: "/faq",
  },
  alternates: {
    canonical: "/faq",
  },
}

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h1>
              <p className="mt-4 text-gray-600 md:text-xl">
                Find answers to common questions about CVKonnekt and how to make the most of our platform.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full py-12 bg-emerald-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <Card className="border-emerald-200">
                <CardContent className="p-6">
                  <HelpCircle className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
                  <p className="text-gray-600 mb-4">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Contact Support
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 