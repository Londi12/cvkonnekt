const { useState, useEffect } = React;

// Define a global error handler for React rendering errors
window.addEventListener('error', function(event) {
  console.error('Global error caught:', event.error);
  // Hide loading indicator and show error message if React fails to render
  const root = document.getElementById('root');
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator && root) {
    loadingIndicator.style.display = 'none';
    root.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #e53e3e;">
        <h2>Something went wrong</h2>
        <p>We encountered an error while loading the application. Please try refreshing the page.</p>
        <p>Error: ${event.error ? event.error.message : 'Unknown error'}</p>
      </div>
    `;
  }
});

// Main App component that serves as the root component for the application
const App = () => {
  const [page, setPage] = React.useState('home');
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showDonationModal, setShowDonationModal] = React.useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = React.useState(false);
  const [activeTemplate, setActiveTemplate] = React.useState(null);  const [componentsLoaded, setComponentsLoaded] = React.useState(false);

  // Check if components are loaded
  React.useEffect(() => {
    const checkComponents = () => {
      const components = {
        HomePage: window.HomePage,
        AboutPage: window.AboutPage,
        ContactPage: window.ContactPage,
        TemplatesPage: window.TemplatesPage
      };
      return Object.values(components).every(Boolean);
    };

    if (checkComponents()) {
      setComponentsLoaded(true);
    } else {
      const timer = setInterval(() => {
        if (checkComponents()) {
          setComponentsLoaded(true);
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, []);

  // Single Navigation Handler - Using hash-based routing
  React.useEffect(() => {
    const handleHashChange = () => {
      // Get hash without # and normalize
      let hash = window.location.hash.slice(1).toLowerCase();
      
      // Handle empty hash or root path
      if (!hash) {
        hash = 'home';
      }
      
      // Split into page and parameters
      const [page, params] = hash.split('?');
      
      // Handle template parameters if present
      if (page === 'builder' && params) {
        const searchParams = new URLSearchParams(params);
        const template = searchParams.get('template');
        const category = searchParams.get('category');
        
        if (template && category) {
          localStorage.setItem('selectedTemplate', template);
          localStorage.setItem('selectedCategory', category);
          console.log(`Stored template selection: ${template}, category: ${category}`);
        }
      }
      
      setPage(page);
      setShowMobileMenu(false); // Close mobile menu on navigation
    };

    // Set initial page based on hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Show loading state if components aren't ready
  if (!componentsLoaded) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading components...</p>
      </div>
    </div>;
  }

  // Handle navigation
  const navigate = (targetPage) => {
    setPage(targetPage);
    setShowMobileMenu(false);
    window.location.hash = targetPage;
  };

  // Handle donation modal
  const openDonationModal = () => {
    setShowDonationModal(true);
  };

  const closeDonationModal = () => {
    setShowDonationModal(false);
  };

  // Handle feedback form 
  const openFeedbackForm = () => {
    setShowFeedbackForm(true);
  };

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
  };

  // Handle template selection
  const selectTemplate = (template) => {
    setActiveTemplate(template);
    navigate('builder');
  };  // Render different pages based on state
  const renderPage = () => {
    if (page === 'builder') {
      return (
          <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-6 text-blue-700">Build Your CV</h1>
              
              {/* Template selection or resume builder */}
              {!activeTemplate ? (
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Select a Template</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.keys(ResumeTemplates).map((templateName) => (
                        <div 
                          key={templateName}
                          className="border p-3 rounded-md cursor-pointer hover:bg-blue-50 transition-colors"
                          onClick={() => selectTemplate(templateName)}
                        >
                          <div className="h-32 bg-gray-100 mb-2 flex items-center justify-center">
                            <span className="text-lg font-medium">{templateName}</span>
                          </div>
                          <p className="text-sm text-center">{templateName} Template</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <BuilderDonationBanner />
                </div>
              ) : (
                <div className="max-w-6xl mx-auto">
                  {/* Resume form and preview */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-2xl font-semibold mb-6">Enter Your Information</h2>
                      
                      {/* Form sections */}
                      <div className="space-y-6">
                        {/* Personal Information */}
                        <div>
                          <h3 className="text-xl font-medium mb-3 text-blue-600">Personal Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                              <input 
                                type="text" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={resumeData.personalInfo.fullName}
                                onChange={(e) => setResumeData({
                                  ...resumeData,
                                  personalInfo: {
                                    ...resumeData.personalInfo,
                                    fullName: e.target.value
                                  }
                                })}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                              <input 
                                type="text" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={resumeData.personalInfo.jobTitle}
                                onChange={(e) => setResumeData({
                                  ...resumeData,
                                  personalInfo: {
                                    ...resumeData.personalInfo,
                                    jobTitle: e.target.value
                                  }
                                })}
                                placeholder="e.g. Marketing Manager"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <input 
                                type="email" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={resumeData.personalInfo.email}
                                onChange={(e) => setResumeData({
                                  ...resumeData,
                                  personalInfo: {
                                    ...resumeData.personalInfo,
                                    email: e.target.value
                                  }
                                })}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                              <input 
                                type="tel" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={resumeData.personalInfo.phone}
                                onChange={(e) => setResumeData({
                                  ...resumeData,
                                  personalInfo: {
                                    ...resumeData.personalInfo,
                                    phone: e.target.value
                                  }
                                })}
                                placeholder="e.g. 072 123 4567"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Professional Summary */}
                        <div>
                          <h3 className="text-xl font-medium mb-3 text-blue-600">Professional Summary</h3>
                          <textarea
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={resumeData.professionalSummary}
                            onChange={(e) => setResumeData({
                              ...resumeData,
                              professionalSummary: e.target.value
                            })}
                            placeholder="Write a brief summary of your professional background and key qualifications"
                          ></textarea>
                        </div>
                        
                        {/* More form sections would go here */}
                        <div className="flex justify-end">
                          <button 
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            onClick={() => alert("Generate PDF functionality would go here")}
                          >
                            Generate PDF
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-2xl font-semibold mb-6">Resume Preview</h2>
                      <div className="bg-gray-100 p-4 h-[700px] overflow-auto">
                        {/* This would render the selected template with the form data */}
                        {ResumeTemplates[activeTemplate] && React.createElement(ResumeTemplates[activeTemplate], { data: resumeData })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <a href="#" onClick={() => navigate('home')} className="text-2xl font-bold">CVKonnekt</a>
              <nav className="hidden md:block ml-8">
                <ul className="flex space-x-6">
                  <li><a href="#" onClick={() => navigate('home')} className={`hover:text-blue-200 ${page === 'home' ? 'font-semibold' : ''}`}>Home</a></li>
                  <li><a href="#" onClick={() => navigate('templates')} className={`hover:text-blue-200 ${page === 'templates' ? 'font-semibold' : ''}`}>Templates</a></li>
                  <li><a href="#" onClick={() => navigate('about')} className={`hover:text-blue-200 ${page === 'about' ? 'font-semibold' : ''}`}>About</a></li>
                  <li><a href="#" onClick={() => navigate('contact')} className={`hover:text-blue-200 ${page === 'contact' ? 'font-semibold' : ''}`}>Contact</a></li>
                </ul>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="#builder" onClick={() => navigate('builder')} className="hidden md:block bg-white text-blue-700 px-4 py-2 rounded-full font-medium hover:bg-blue-100 transition-colors">
                Create CV
              </a>
              <button 
                className="md:hidden text-white"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-blue-600">
              <ul className="space-y-3">
                <li><a href="#" onClick={() => navigate('home')} className={`block hover:text-blue-200 ${page === 'home' ? 'font-semibold' : ''}`}>Home</a></li>
                <li><a href="#" onClick={() => navigate('templates')} className={`block hover:text-blue-200 ${page === 'templates' ? 'font-semibold' : ''}`}>Templates</a></li>
                <li><a href="#" onClick={() => navigate('about')} className={`block hover:text-blue-200 ${page === 'about' ? 'font-semibold' : ''}`}>About</a></li>
                <li><a href="#" onClick={() => navigate('contact')} className={`block hover:text-blue-200 ${page === 'contact' ? 'font-semibold' : ''}`}>Contact</a></li>
                <li>
                  <a href="#builder" onClick={() => navigate('builder')} className="inline-block bg-white text-blue-700 px-4 py-2 rounded-full font-medium hover:bg-blue-100 transition-colors mt-2">
                    Create CV
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CVKonnekt</h3>
              <p className="text-gray-400">Professional CV builder designed specifically for South African job seekers.</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={() => navigate('home')} className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" onClick={() => navigate('templates')} className="text-gray-400 hover:text-white">Templates</a></li>
                <li><a href="#" onClick={() => navigate('about')} className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" onClick={() => navigate('contact')} className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" onClick={() => navigate('builder')} className="text-gray-400 hover:text-white">CV Builder</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support CVKonnekt</h3>
              <p className="text-gray-400 mb-4">If you find our service valuable, please consider making a small donation to help us maintain and improve CVKonnekt.</p>
              <button
          onClick={openDonationModal}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition duration-300 flex items-center justify-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-2 0v1H5a1 1 0 100 2h2v1a2 2 0 104 0V8h2a1 1 0 100-2h-2V5a2 2 0 10-4 0v1z" clipRule="evenodd" />
            </svg>
            Support Us
          </button>
          <p className="mt-4 text-gray-600">Your donations help us maintain and improve CVKonnekt</p>
        </div>
      </div>
    </div>
  </footer>
</div>
);

// Make the App component globally accessible
window.App = App;

// Note: We're not initializing React DOM here anymore.
// This will be handled by the script in fixed-index.html
// This allows the App component to be properly loaded and recognized
console.log('App component defined and exposed as window.App');
