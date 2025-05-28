import React from 'react';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">About CVKonnekt</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-md mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Our Mission</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            At CVKonnekt, our mission is to help South African job seekers create professional, standout CVs that increase their chances of landing interviews and securing their dream jobs. We understand the unique challenges of the South African job market and have designed our platform specifically to address these needs.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We believe that everyone deserves access to tools that can help them present their skills and experience effectively. That's why we've created a user-friendly platform that makes CV creation simple, accessible, and affordable for all South Africans.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Our Story</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            CVKonnekt was founded in May 2025 by Londiwe Shibe, with a passion for tech and social impact. After witnessing how many talented South Africans struggled to create CVs that truly represented their capabilities, Londiwe set out to build a solution tailored to the local market.
          </p>
          <p className="text-gray-700 leading-relaxed">
            What began as a solo project quickly gained traction and has grown into a trusted platform used by job seekers across the country. We continue to evolve based on user feedback and the changing demands of the job market.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">What Sets Us Apart</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-800">South African Focus</h3>
              <p className="text-gray-700">Our templates and guidance are specifically designed for the South African job market, with appropriate formatting, terminology, and content suggestions.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800">User-Friendly Platform</h3>
              <p className="text-gray-700">We've created an intuitive interface that makes building a professional CV simple and straightforward, even for those with limited technical skills.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800">Professional Templates</h3>
              <p className="text-gray-700">Our templates are designed by HR professionals and graphic designers to ensure they meet current industry standards while looking polished and professional.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800">Accessible to All</h3>
              <p className="text-gray-700">We believe everyone deserves access to quality CV building tools, regardless of their financial situation. That's why we offer free basic services with affordable upgrades.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Our Team</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            CVKonnekt is powered by a dedicated team of professionals passionate about helping South Africans advance their careers.
          </p>
          
          <div className="grid md:grid-cols-1 gap-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-lg">Londiwe Shibe</h3>
              <p className="text-gray-600">Founder & Lead Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
