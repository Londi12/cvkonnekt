import React from 'react';

export function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Support CVKonnekt
          </h1>
          <p className="text-xl text-gray-600">
            Help us keep CVKonnekt free and accessible to everyone in South Africa
          </p>
        </div>

        {/* Why Support Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Support Us?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-800">Free Access</h3>
                  <p className="text-gray-600">We believe everyone deserves access to professional CV building tools, regardless of their financial situation.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-800">Continuous Improvement</h3>
                  <p className="text-gray-600">Your support helps us add new features, improve existing ones, and maintain the platform.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-800">Server Costs</h3>
                  <p className="text-gray-600">Help us cover the costs of hosting, maintenance, and technical support.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-800">Community Impact</h3>
                  <p className="text-gray-600">Support our mission to help South Africans improve their employment opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Options */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg hover:border-blue-500 transition-colors">
              <div className="text-4xl font-bold text-blue-600 mb-2">R50</div>
              <p className="text-gray-600 mb-4">Basic Support</p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openDonationModal'))}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Donate
              </button>
            </div>
            <div className="text-center p-6 border rounded-lg hover:border-blue-500 transition-colors">
              <div className="text-4xl font-bold text-blue-600 mb-2">R100</div>
              <p className="text-gray-600 mb-4">Standard Support</p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openDonationModal'))}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Donate
              </button>
            </div>
            <div className="text-center p-6 border rounded-lg hover:border-blue-500 transition-colors">
              <div className="text-4xl font-bold text-blue-600 mb-2">R200+</div>
              <p className="text-gray-600 mb-4">Premium Support</p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openDonationModal'))}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Donate
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Is CVKonnekt really free?</h3>
              <p className="text-gray-600">Yes, CVKonnekt is completely free to use. We believe in providing accessible tools for everyone. Your donations help us maintain and improve the platform.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">How are donations used?</h3>
              <p className="text-gray-600">Donations are used to cover server costs, development of new features, maintenance, and technical support. We're committed to transparency in how we use your support.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Can I donate any amount?</h3>
              <p className="text-gray-600">Yes! While we offer suggested amounts, you can donate any amount you're comfortable with. Every contribution helps us keep CVKonnekt running.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 