// Pages
const HomePage = () => (
  <div className="bg-gradient-to-br from-blue-700 to-green-600 min-h-screen text-white">
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Welcome to CVKonnekt</h1>
        <p className="text-xl">South Africa's premier CV builder tailored for the local job market</p>
        <button 
          onClick={() => window.location.hash = '#builder'}
          className="mt-8 bg-white text-blue-700 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300"
        >
          Build Your CV Now
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-filter backdrop-blur-sm">
          <div className="text-yellow-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">South African Focused</h2>
          <p>Templates and suggestions tailored specifically for the South African job market and industries.</p>
        </div>
        
        <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-filter backdrop-blur-sm">
          <div className="text-yellow-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Professional Templates</h2>
          <p>Multiple professional templates designed to impress top South African employers and recruitment agencies.</p>
        </div>
        
        <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-filter backdrop-blur-sm">
          <div className="text-yellow-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Easy Exporting</h2>
          <p>Export your CV in multiple formats, perfectly sized for South African standards and ready to impress employers.</p>
        </div>
      </div>
      
      <div className="bg-white bg-opacity-10 p-8 rounded-lg mb-16 backdrop-filter backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose CVKonnekt?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Built specifically for the South African job market</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Industry-specific templates for all sectors</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Supports all 11 official South African languages</span>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free basic version with premium features available</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Local job market insights and tips</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>South African-focused skills suggestions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="bg-white min-h-screen">
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-700">About CVKonnekt</h1>
      
      <div className="bg-blue-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Our Mission</h2>
        <p className="mb-4 text-lg">
          CVKonnekt was founded with a singular focus: to help South Africans create professional, 
          impactful CVs that stand out in a competitive job market. We understand the unique challenges 
          and opportunities in the South African employment landscape, and we've built our platform 
          specifically to address these needs.
        </p>
        <p className="text-lg">
          Our mission is to empower every South African job seeker with the tools they need to 
          showcase their skills, experience, and potential to employers effectively.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Made in South Africa, For South Africa</h2>
          <p className="mb-4">
            Unlike generic CV builders, CVKonnekt was developed in South Africa by a team that 
            understands the local job market. Our templates are designed to meet South African 
            standards and expectations, and our advice is tailored to local hiring practices.
          </p>
          <p>
            We regularly consult with HR professionals and recruiters from top South African 
            companies to ensure our platform reflects current best practices and preferences.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Supporting South African Diversity</h2>
          <p className="mb-4">
            South Africa's strength lies in its diversity, and we're proud to support job seekers 
            from all backgrounds, cultures, and languages. Our platform is designed to be inclusive 
            and accessible to everyone.
          </p>
          <p>
            We're committed to helping reduce unemployment in South Africa by giving job seekers 
            the tools they need to succeed in their job search.
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Accessibility</h3>
            <p>Making professional CV creation accessible to all South Africans</p>
          </div>
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality</h3>
            <p>Providing professional-grade tools for impressive results</p>
          </div>
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p>Continuously improving to meet the evolving needs of the SA job market</p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Join Thousands of Successful South African Job Seekers</h2>
        <p className="text-lg mb-8">
          CVKonnekt has helped job seekers across all nine provinces land interviews and secure jobs 
          in every industry. Start building your professional South African CV today!
        </p>
        <button 
          onClick={() => window.location.hash = '#builder'}
          className="bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-800 transition duration-300"
        >
          Create Your CV Now
        </button>
      </div>
    </div>
  </div>
);

// Contact Page Component
const ContactPage = () => (
  <div className="bg-white min-h-screen">
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-700">Contact Us</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Reach Out</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">support@cvkonnekt.co.za</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">+27 (0)11 123 4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-medium">Office</p>
                  <p className="text-gray-600">50 Sandton Drive, Sandton</p>
                  <p className="text-gray-600">Johannesburg, 2196</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-gray-600">Monday - Friday: 8:00 - 17:00</p>
                  <p className="text-gray-600">Saturday: 9:00 - 13:00</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
                  </svg>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.co.za"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="072 123 4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select a subject</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Business Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Is CVKonnekt free to use?</h3>
              <p className="text-gray-600 mt-1">Yes, CVKonnekt offers a free basic version with essential features. We also offer premium plans with additional templates and advanced features.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">How do I download my CV?</h3>
              <p className="text-gray-600 mt-1">After completing your CV, you can download it as a PDF by clicking the "Download PDF" button on the final step of the CV builder.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Can I create multiple CVs?</h3>
              <p className="text-gray-600 mt-1">Yes, you can create multiple CVs tailored for different job applications by creating a free account.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Are the templates ATS-friendly?</h3>
              <p className="text-gray-600 mt-1">Yes, all our templates are designed to be ATS (Applicant Tracking System) friendly to ensure your CV gets past automated screening systems used by many South African employers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Templates Page Component
const TemplatesPage = () => (
  <div className="bg-white min-h-screen">
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-700">CV Templates</h1>
      
      <div className="max-w-5xl mx-auto">
          <p className="text-xl text-center text-gray-600 mb-12">
          Choose from our professionally designed CV templates, 
          including specialized Harvard Style templates for academic professionals.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Professional Category */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 bg-gradient-to-b from-blue-700 to-blue-500 flex items-center justify-center">
              <div className="w-32 h-44 bg-white mx-auto p-4 shadow-lg">
                <div className="h-6 w-full bg-blue-700 mb-2"></div>
                <div className="h-3 w-3/4 bg-gray-300 mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-300 mb-4"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-3/4 bg-gray-200 mb-3"></div>
                <div className="h-4 w-full bg-blue-200 mb-2"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">Executive</h3>
              <p className="text-gray-600 text-sm">Professional template ideal for corporate and management positions</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Professional</span>
                <a href="#builder?category=professional&template=Executive" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Use Template</a>
              </div>
            </div>
          </div>
            {/* Harvard Academic Template */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 bg-gradient-to-b from-red-700 to-red-500 flex items-center justify-center">
              <div className="w-32 h-44 bg-white mx-auto p-4 shadow-lg">
                <div className="h-6 w-full bg-red-700 mb-2"></div>
                <div className="h-3 w-3/4 bg-gray-300 mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-300 mb-4"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-3/4 bg-gray-200 mb-3"></div>
                <div className="h-4 w-full bg-red-200 mb-2"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">Academic</h3>
              <p className="text-gray-600 text-sm">Harvard-styled template with professional academic formatting</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Harvard Style</span>
                <a href="#builder?category=harvard&template=Academic" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Use Template</a>
              </div>
            </div>
          </div>
          
          {/* Contemporary */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 bg-gradient-to-b from-purple-600 to-purple-400 flex items-center justify-center">
              <div className="w-32 h-44 bg-white mx-auto p-4 shadow-lg">
                <div className="h-6 w-full bg-purple-600 mb-2"></div>
                <div className="h-3 w-3/4 bg-gray-300 mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-300 mb-4"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-3/4 bg-gray-200 mb-3"></div>
                <div className="h-4 w-full bg-purple-200 mb-2"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">Modern</h3>
              <p className="text-gray-600 text-sm">Contemporary design perfect for creative and tech industries</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Creative</span>
                <a href="#builder?category=creative&template=Modern" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Use Template</a>
              </div>
            </div>
          </div>
          
          {/* Traditional */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 bg-gradient-to-b from-gray-700 to-gray-500 flex items-center justify-center">
              <div className="w-32 h-44 bg-white mx-auto p-4 shadow-lg">
                <div className="h-6 w-full bg-gray-700 mb-2"></div>
                <div className="h-3 w-3/4 bg-gray-300 mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-300 mb-4"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-3/4 bg-gray-200 mb-3"></div>
                <div className="h-4 w-full bg-gray-200 mb-2"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">Classic</h3>
              <p className="text-gray-600 text-sm">Traditional format suitable for conservative industries</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Traditional</span>
                <a href="#builder?category=professional&template=Classic" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Use Template</a>
              </div>
            </div>
          </div>
          
          {/* Harvard Research Template */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 bg-gradient-to-b from-blue-600 to-blue-400 flex items-center justify-center">
              <div className="w-32 h-44 bg-white mx-auto p-4 shadow-lg">
                <div className="h-6 w-full bg-blue-600 mb-2"></div>
                <div className="h-3 w-3/4 bg-gray-300 mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-300 mb-4"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-3/4 bg-gray-200 mb-3"></div>
                <div className="h-4 w-full bg-blue-200 mb-2"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
                <div className="h-2 w-full bg-gray-200 mb-1"></div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">Research</h3>
              <p className="text-gray-600 text-sm">Harvard-styled template ideal for research and publications</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Harvard Style</span>
                <a href="#builder?category=harvard&template=Research" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Use Template</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">Premium Templates</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Unlock our premium templates designed by professional CV experts with experience in academic and research publishing.
          </p>
          <button className="bg-gradient-to-r from-blue-700 to-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition duration-300">
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Make them available globally
window.HomePage = HomePage;
window.AboutPage = AboutPage;
window.ContactPage = ContactPage;
window.TemplatesPage = TemplatesPage;
