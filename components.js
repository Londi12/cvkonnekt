// Reusable InputField component
const InputField = ({ label, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Reusable TextareaField component
const TextareaField = ({ label, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
      rows="4"
    />
  </div>
);

// Navigation bar component
const Navbar = ({ currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [donationModalOpen, setDonationModalOpen] = React.useState(false);
  const [donationThankYouOpen, setDonationThankYouOpen] = React.useState(false);
  
  const handleNavigation = (path, params = {}) => {
    // Close mobile menu when navigating
    setMobileMenuOpen(false);
    
    // Build hash with parameters if any
    let hash = path;
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      searchParams.append(key, value);
    }
    const queryString = searchParams.toString();
    if (queryString) {
      hash += `?${queryString}`;
    }
    
    // Update hash which will trigger the app's hash change handler
    window.location.hash = hash;
  };

  // Make sure the donation modal can be opened globally
  React.useEffect(() => {
    window.openDonationModal = () => setDonationModalOpen(true);
  }, []);

  return (
    <React.Fragment>
      <nav className="bg-gradient-to-r from-blue-700 to-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="flex items-center" onClick={() => handleNavigation('home')} style={{ cursor: 'pointer' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xl font-bold">CVKonnekt</span>
            </div>
          </div>

          <div className="hidden md:flex space-x-6">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'home' ? 'border-b-2 border-white' : ''}`}
            >
              Home
            </a>
            <a 
              href="#builder" 
              onClick={(e) => { e.preventDefault(); handleNavigation('builder'); }}
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'builder' ? 'border-b-2 border-white' : ''}`}
            >
              CV Builder
            </a>
            <a 
              href="#templates" 
              onClick={(e) => { e.preventDefault(); handleNavigation('templates'); }}
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'templates' ? 'border-b-2 border-white' : ''}`}
            >
              Templates
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); handleNavigation('about'); }}
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'about' ? 'border-b-2 border-white' : ''}`}
            >
              About
            </a>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); handleNavigation('contact'); }}
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'contact' ? 'border-b-2 border-white' : ''}`}
            >
              Contact
            </a>
          </div>

          <div className="md:flex items-center space-x-4 hidden">
            <button
              onClick={() => setDonationModalOpen(true)}
              className="flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-2 0v1H5a1 1 0 100 2h2v1a2 2 0 104 0V8h2a1 1 0 100-2h-2V5a2 2 0 10-4 0v1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Support Us</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} pt-4`}>
          <div className="flex flex-col space-y-4">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'home' ? 'font-bold' : ''}`}
            >
              Home
            </a>
            <a 
              href="#builder" 
              onClick={(e) => { e.preventDefault(); handleNavigation('builder'); }}
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'builder' ? 'font-bold' : ''}`}
            >
              CV Builder
            </a>
            <a 
              href="#templates" 
              onClick={(e) => { e.preventDefault(); handleNavigation('templates'); }}
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'templates' ? 'font-bold' : ''}`}
            >
              Templates
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); handleNavigation('about'); }}
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'about' ? 'font-bold' : ''}`}
            >
              About
            </a>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); handleNavigation('contact'); }}
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'contact' ? 'font-bold' : ''}`}
            >
              Contact
            </a>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-600">
            <button
              onClick={() => { setDonationModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-2 0v1H5a1 1 0 100 2h2v1a2 2 0 104 0V8h2a1 1 0 100-2h-2V5a2 2 0 10-4 0v1z" clipRule="evenodd" />
              </svg>
              Support Us
            </button>
          </div>
        </div>
      </nav>

      {/* Donation Modal */}
      <DonationModal 
        isOpen={donationModalOpen} 
        onClose={() => {
          setDonationModalOpen(false);
          // Simulate successful donation sometimes
          if (Math.random() > 0.5) {
            setTimeout(() => setDonationThankYouOpen(true), 300);
          }
        }} 
      />
      
      {/* Donation Thank You Dialog */}
      <DonationThankYouDialog
        isOpen={donationThankYouOpen}
        onClose={() => setDonationThankYouOpen(false)}
      />
    </React.Fragment>
  );
};
