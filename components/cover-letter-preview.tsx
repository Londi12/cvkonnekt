"use client"
import type { CoverLetterData, TemplateType } from "@/types/cv-types"

interface CoverLetterPreviewProps {
  template: TemplateType
  className?: string
  userData?: Partial<CoverLetterData>
}

export function CoverLetterPreview({ template, className = "", userData }: CoverLetterPreviewProps) {
  const getTemplateContent = () => {
    switch (template) {
      case "professional":
        return (
          <div className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="text-right text-xs text-gray-600">
                <p>{userData?.letterContent?.date || "15 December 2024"}</p>
              </div>

              <div className="text-xs text-gray-600">
                <p>{userData?.recipientInfo?.name || "Ms. Jane Doe"}</p>
                <p>{userData?.recipientInfo?.title || "Hiring Manager"}</p>
                <p>{userData?.recipientInfo?.company || "ABC Company"}</p>
                <p>{userData?.recipientInfo?.address || "Johannesburg, SA"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800 mb-3">
                  {userData?.letterContent?.greeting || "Dear Ms. Doe,"}
                </p>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.opening ||
                    "I am writing to express my interest in the Senior Financial Analyst position at ABC Company, as advertised on your website. With over eight years of experience in financial analysis and a proven track record of delivering actionable insights, I am confident in my ability to contribute to your team's success."}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.body ||
                    "Throughout my career, I have developed expertise in financial modeling, data analysis, and investment research. In my current role at XYZ Corporation, I have led the financial analysis for key investment projects worth over R50 million, resulting in a 20% increase in portfolio performance."}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.closing ||
                    "I would welcome the opportunity to discuss how my skills and experience align with your needs. Thank you for considering my application."}
                </p>
              </div>

              <div className="text-sm text-gray-800">
                <p>{userData?.letterContent?.signature || "Sincerely,"}</p>
                <p className="font-medium mt-2">{userData?.personalInfo?.fullName || "John Smith"}</p>
              </div>
            </div>
          </div>
        )

      case "modern":
        return (
          <div className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
            <div className="bg-blue-600 text-white p-4">
              <h1 className="text-lg font-bold">{userData?.personalInfo?.fullName || "Sarah Johnson"}</h1>
              <p className="text-sm opacity-90">
                {userData?.personalInfo?.email || "sarah@email.com"} •{" "}
                {userData?.personalInfo?.phone || "+27 21 987 6543"}
              </p>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-xs text-gray-600">
                <p>{userData?.letterContent?.date || "15 December 2024"}</p>
                <p className="mt-2">
                  {userData?.recipientInfo?.title || "Hiring Team"}
                  <br />
                  {userData?.recipientInfo?.company || "Tech Startup"}
                  <br />
                  {userData?.recipientInfo?.address || "Cape Town, SA"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  {userData?.letterContent?.greeting || "Hello Hiring Team,"}
                </p>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.opening ||
                    "I'm excited to apply for the UX/UI Designer position at Tech Startup. As a designer with 5+ years of experience creating user-centered digital experiences, I was thrilled to see your focus on innovative product development."}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.body ||
                    "In my current role, I led the redesign of our mobile app, which increased user engagement by 27% and received an industry award for excellence in design. I specialize in creating intuitive interfaces that balance aesthetics with functionality."}
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <p className="text-xs text-gray-700">
                  {userData?.letterContent?.closing ||
                    "I would love the opportunity to bring my design expertise to your team and help create exceptional user experiences for your products."}
                </p>
              </div>

              <div className="text-sm text-gray-800">
                <p>{userData?.letterContent?.signature || "Best regards,"}</p>
                <p className="font-medium mt-1 text-blue-600">
                  {userData?.personalInfo?.fullName || "Sarah Johnson"}
                </p>
              </div>
            </div>
          </div>
        )

      case "creative":
        return (
          <div
            className={`bg-gradient-to-br from-purple-50 to-pink-50 border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}
          >
            <div className="p-4 space-y-3">
              {/* Creative Header */}
              <div className="text-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-2"></div>
                <h1 className="text-lg font-bold text-gray-900">
                  {userData?.personalInfo?.fullName || "Alex Creative"}
                </h1>
                <p className="text-sm text-purple-600">
                  {userData?.personalInfo?.email || "alex@creative.com"} •{" "}
                  {userData?.personalInfo?.phone || "+27 82 555 0123"}
                </p>
              </div>

              <div className="text-xs text-gray-600 text-right">
                <p>{userData?.letterContent?.date || "15 December 2024"}</p>
              </div>

              <div className="text-xs text-gray-600">
                <p>{userData?.recipientInfo?.title || "Creative Director"}</p>
                <p>{userData?.recipientInfo?.company || "Design Studio"}</p>
                <p>{userData?.recipientInfo?.address || "Cape Town, SA"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-purple-600 mb-2">
                  {userData?.letterContent?.greeting || "Hello Creative Team!"}
                </p>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.opening ||
                    "I'm reaching out with excitement about the Graphic Designer position at Design Studio. As a creative professional with a passion for visual storytelling and brand identity, I was instantly drawn to your agency's innovative work and distinctive aesthetic."}
                </p>
              </div>

              <div className="bg-white/70 rounded p-2">
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.body ||
                    "My portfolio includes award-winning campaigns for clients across various industries. Most recently, I designed a complete brand identity for a tech startup that increased their brand recognition by 40% within three months of launch."}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.closing ||
                    "I would love the opportunity to bring my creative vision and technical skills to your talented team."}
                </p>
              </div>

              <div className="text-sm text-gray-800">
                <p>{userData?.letterContent?.signature || "Creatively yours,"}</p>
                <p className="font-medium mt-1 text-purple-600">
                  {userData?.personalInfo?.fullName || "Alex Creative"}
                </p>
              </div>
            </div>
          </div>
        )

      case "simple":
        return (
          <div className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
            <div className="p-4 space-y-3">
              <div className="text-xs text-gray-600 text-right">
                <p>{userData?.letterContent?.date || "15 December 2024"}</p>
              </div>

              <div className="text-xs text-gray-600">
                <p>{userData?.recipientInfo?.title || "Hiring Manager"}</p>
                <p>{userData?.recipientInfo?.company || "Company Name"}</p>
                <p>{userData?.recipientInfo?.address || "Johannesburg, SA"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  {userData?.letterContent?.greeting || "Dear Hiring Manager,"}
                </p>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.opening ||
                    "I am writing to apply for the [Position] role at [Company Name] as advertised on your website. With my background in [relevant field] and experience in [relevant skills], I believe I would be a valuable addition to your team."}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.body ||
                    "In my previous role at [Previous Company], I [key achievement or responsibility]. I am particularly skilled in [specific skill relevant to the job], which I believe aligns well with the requirements of this position."}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.closing ||
                    "Thank you for considering my application. I look forward to the possibility of discussing how I can contribute to your organization."}
                </p>
              </div>

              <div className="text-sm text-gray-800">
                <p>{userData?.letterContent?.signature || "Kind regards,"}</p>
                <p className="font-medium mt-2">{userData?.personalInfo?.fullName || "Your Name"}</p>
              </div>
            </div>
          </div>
        )

      case "executive":
        return (
          <div className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
            <div className="bg-gray-900 text-white p-3">
              <h1 className="text-lg font-bold">{userData?.personalInfo?.fullName || "Robert Executive"}</h1>
              <p className="text-sm opacity-90">{userData?.personalInfo?.email || "robert.executive@email.com"}</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-xs text-gray-600 text-right">
                <p>{userData?.letterContent?.date || "15 December 2024"}</p>
              </div>

              <div className="text-xs text-gray-600">
                <p>{userData?.recipientInfo?.title || "Board of Directors"}</p>
                <p>{userData?.recipientInfo?.company || "Global Corporation"}</p>
                <p>{userData?.recipientInfo?.address || "Sandton, SA"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  {userData?.letterContent?.greeting || "Dear Board Members,"}
                </p>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.opening ||
                    "I am writing to express my interest in the Chief Executive Officer position at Global Corporation. With over 15 years of executive leadership experience and a proven track record of driving organizational growth, I am confident in my ability to lead your company into its next phase of success."}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded border-l-4 border-gray-900">
                <p className="text-xs text-gray-700">
                  {userData?.letterContent?.body ||
                    "In my current role as CEO at Current Company, I led a comprehensive digital transformation that resulted in a 45% revenue growth and 30% increase in market share over three years. Additionally, I successfully expanded operations into five new international markets."}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.closing ||
                    "I would welcome the opportunity to discuss my vision for Global Corporation and how my leadership approach aligns with your strategic objectives."}
                </p>
              </div>

              <div className="text-sm text-gray-800">
                <p>{userData?.letterContent?.signature || "Respectfully,"}</p>
                <p className="font-medium mt-2 text-gray-900">
                  {userData?.personalInfo?.fullName || "Robert Executive"}
                </p>
                <p className="text-xs text-gray-600">{userData?.personalInfo?.jobTitle || "Chief Executive Officer"}</p>
              </div>
            </div>
          </div>
        )

      case "technical":
        return (
          <div className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start border-b border-gray-200 pb-2">
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {userData?.personalInfo?.fullName || "David Engineer"}
                  </h1>
                  <p className="text-sm text-blue-600">
                    {userData?.personalInfo?.jobTitle || "Senior Software Engineer"}
                  </p>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p>{userData?.personalInfo?.email || "david.eng@email.com"}</p>
                  <p>{userData?.personalInfo?.phone || "+27 21 123 4567"}</p>
                </div>
              </div>

              <div className="text-xs text-gray-600 text-right">
                <p>{userData?.letterContent?.date || "15 December 2024"}</p>
              </div>

              <div className="text-xs text-gray-600">
                <p>{userData?.recipientInfo?.title || "Technical Hiring Manager"}</p>
                <p>{userData?.recipientInfo?.company || "Tech Solutions Inc."}</p>
                <p>{userData?.recipientInfo?.address || "Cape Town, SA"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  {userData?.letterContent?.greeting || "Dear Technical Team,"}
                </p>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.opening ||
                    "I am applying for the Senior Software Engineer position at Tech Solutions Inc. As a software engineer with extensive experience in building scalable applications and microservices architecture, I was excited to see your focus on innovative technology solutions."}
                </p>
              </div>

              <div className="bg-blue-50 p-2 rounded">
                <p className="text-xs font-medium text-blue-700 mb-1">Technical Expertise:</p>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.body ||
                    "• Proficient in Python, Java, C++, Go, and JavaScript\n• Experience with Django, Spring, React, and Angular frameworks\n• Strong background in AWS, Docker, and Kubernetes"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.closing ||
                    "In my current role, I led the development of a high-traffic web application serving over 1 million users. I architected a microservices infrastructure that improved system reliability to 99.9% uptime."}
                </p>
              </div>

              <div className="text-sm text-gray-800">
                <p>{userData?.letterContent?.signature || "Best regards,"}</p>
                <p className="font-medium mt-1 text-blue-600">{userData?.personalInfo?.fullName || "David Engineer"}</p>
              </div>
            </div>
          </div>
        )

      case "sa-professional":
        return (
          <div className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
            {/* Header with South African flag colors */}
            <div className="bg-gradient-to-r from-green-600 via-yellow-400 to-red-600 h-2"></div>
            <div className="p-4 space-y-3">
              <div className="border-b border-gray-200 pb-3">
                <h1 className="text-lg font-bold text-gray-900">{userData?.personalInfo?.fullName || "Thabo Nkosi"}</h1>
                <p className="text-sm text-gray-600">
                  {userData?.personalInfo?.jobTitle || "Financial Manager"}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-2">
                  <span>{userData?.personalInfo?.email || "thabo.nkosi@email.co.za"}</span>
                  <span>{userData?.personalInfo?.phone || "072 123 4567"}</span>
                  <span>{userData?.personalInfo?.location || "Johannesburg, South Africa"}</span>
                  <span>ID: {userData?.personalInfo?.idNumber || "8001015009087"}</span>
                </div>
              </div>

              <div className="text-xs text-gray-600 text-right">
                <p>{userData?.letterContent?.date || "15 December 2024"}</p>
              </div>

              <div className="text-xs text-gray-600">
                <p>{userData?.recipientInfo?.name || "Ms. Nomsa Dlamini"}</p>
                <p>{userData?.recipientInfo?.title || "Human Resources Manager"}</p>
                <p>{userData?.recipientInfo?.company || "South African Financial Services"}</p>
                <p>{userData?.recipientInfo?.address || "Sandton, Johannesburg"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  {userData?.letterContent?.greeting || "Dear Ms. Dlamini,"}
                </p>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.opening ||
                    "I am writing to express my interest in the Financial Manager position at South African Financial Services, as advertised on Careers24. With my CA(SA) qualification and over eight years of experience in financial management within the South African context, I am confident in my ability to contribute significantly to your organization."}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.body ||
                    "Throughout my career at Standard Bank, I have developed expertise in financial reporting, tax compliance, and strategic financial planning in accordance with South African regulatory requirements. I have successfully led teams through SARS audits and implemented cost-saving measures that resulted in a 15% reduction in operational expenses."}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.closing ||
                    "I would welcome the opportunity to discuss how my skills and experience align with your requirements. Thank you for considering my application."}
                </p>
              </div>

              <div className="text-sm text-gray-800">
                <p>{userData?.letterContent?.signature || "Kind regards,"}</p>
                <p className="font-medium mt-2">{userData?.personalInfo?.fullName || "Thabo Nkosi"}</p>
                <p className="text-xs text-gray-600">{userData?.personalInfo?.professionalRegistration || "CA(SA)"}</p>
              </div>
            </div>
          </div>
        )

      case "sa-modern":
        return (
          <div className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
            {/* Header with South African flag colors */}
            <div className="bg-blue-600 p-4">
              <div className="h-1 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 mb-3"></div>
              <h1 className="text-lg font-bold text-white">{userData?.personalInfo?.fullName || "Lerato Moloi"}</h1>
              <p className="text-sm text-white opacity-90">
                {userData?.personalInfo?.email || "lerato@email.co.za"} •{" "}
                {userData?.personalInfo?.phone || "083 456 7890"}
              </p>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-xs text-gray-600">
                <p>{userData?.letterContent?.date || "15 December 2024"}</p>
                <p className="mt-2">
                  {userData?.recipientInfo?.title || "Talent Acquisition"}
                  <br />
                  {userData?.recipientInfo?.company || "South African Tech"}
                  <br />
                  {userData?.recipientInfo?.address || "Cape Town, Western Cape"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-blue-600 mb-2">
                  {userData?.letterContent?.greeting || "Dear Hiring Team,"}
                </p>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.opening ||
                    "I'm excited to apply for the Project Manager position at South African Tech. As a certified PMP with experience managing technology projects in the South African market, I was thrilled to see your focus on digital transformation initiatives."}
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <p className="text-xs text-gray-700">
                  {userData?.letterContent?.body ||
                    "In my current role at Vodacom, I led the implementation of a new customer management system that improved service delivery times by 30% and received recognition from the Technology Innovation Awards South Africa. I have extensive experience working with diverse teams and stakeholders across multiple provinces."}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.closing ||
                    "I would appreciate the opportunity to discuss how my project management expertise can help South African Tech achieve its strategic objectives."}
                </p>
              </div>

              <div className="text-sm text-gray-800">
                <p>{userData?.letterContent?.signature || "Best regards,"}</p>
                <p className="font-medium mt-1 text-blue-600">
                  {userData?.personalInfo?.fullName || "Lerato Moloi"}
                </p>
                <p className="text-xs text-gray-500">
                  ID: {userData?.personalInfo?.idNumber || "9001020123081"}
                </p>
              </div>
            </div>
          </div>
        )

      case "sa-executive":
        return (
          <div className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
            <div className="bg-gray-900 text-white p-3">
              <div className="h-1 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 mb-3"></div>
              <h1 className="text-lg font-bold">{userData?.personalInfo?.fullName || "Dr. Sipho Mabaso"}</h1>
              <p className="text-sm opacity-90">{userData?.personalInfo?.email || "sipho.mabaso@executive.co.za"}</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-xs text-gray-600 text-right">
                <p>{userData?.letterContent?.date || "15 December 2024"}</p>
              </div>

              <div className="text-xs text-gray-600">
                <p>{userData?.recipientInfo?.title || "Chairperson and Board of Directors"}</p>
                <p>{userData?.recipientInfo?.company || "South African Holdings Ltd"}</p>
                <p>{userData?.recipientInfo?.address || "Sandton, Gauteng"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  {userData?.letterContent?.greeting || "Dear Board Members,"}
                </p>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.opening ||
                    "I am writing to express my interest in the Chief Executive Officer position at South African Holdings Ltd. With over 15 years of executive leadership experience in the South African market and a proven track record of driving organizational growth in challenging economic conditions, I am confident in my ability to lead your company into its next phase of success."}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded border-l-4 border-gray-900">
                <p className="text-xs text-gray-700">
                  {userData?.letterContent?.body ||
                    "In my current role as CEO at Johannesburg Investments, I led a comprehensive transformation strategy that resulted in a 45% revenue growth despite the economic challenges posed by the COVID-19 pandemic. Additionally, I successfully expanded operations into five new African markets, establishing strong partnerships with local businesses and government entities."}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.closing ||
                    "I would welcome the opportunity to discuss my vision for South African Holdings Ltd and how my leadership approach aligns with your strategic objectives for growth across the African continent."}
                </p>
              </div>

              <div className="text-sm text-gray-800">
                <p>{userData?.letterContent?.signature || "Respectfully,"}</p>
                <p className="font-medium mt-2 text-gray-900">
                  {userData?.personalInfo?.fullName || "Dr. Sipho Mabaso"}
                </p>
                <p className="text-xs text-gray-600">{userData?.personalInfo?.jobTitle || "Chief Executive Officer"}</p>
                <p className="text-xs text-gray-600">{userData?.personalInfo?.professionalRegistration || "MBA, PhD"}</p>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <p className="text-xs text-gray-600">{userData?.letterContent?.date || "Date"}</p>
                <p className="text-xs text-gray-600">{userData?.recipientInfo?.name || "Recipient Name"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-gray-600">{userData?.letterContent?.greeting || "Greeting"}</p>
                <p className="text-xs text-gray-600">
                  {userData?.letterContent?.opening || "Opening paragraph of your cover letter..."}
                </p>
              </div>
            </div>
          </div>
        )
    }
  }

  return getTemplateContent()
}
