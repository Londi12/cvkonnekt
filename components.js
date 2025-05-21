// filepath: c:\Users\Londi\Desktop\projects\resumebuilder\components.js
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

// LoginModal component
const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Sign In</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(email, password); }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
            </div>
            <div>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

// RegisterModal component
const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Create Account</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={(e) => { 
          e.preventDefault(); 
          if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
          }
          onRegister(name, email, password); 
        }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

// Navbar component
const Navbar = ({ currentPage = 'home' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [donationModalOpen, setDonationModalOpen] = React.useState(false);
  const [donationThankYouOpen, setDonationThankYouOpen] = React.useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Set up a global function to open the donation modal from anywhere
  window.openDonationModal = () => {
    setDonationModalOpen(true);
  };
  
  return (    <React.Fragment>
      <nav className="bg-gradient-to-r from-blue-700 to-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xl font-bold">CVKonnekt</span>
          </div>          <div className="hidden md:flex space-x-6">
            <a 
              href="#home" 
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'home' ? 'border-b-2 border-white' : ''}`}
            >
              Home
            </a>
            <a 
              href="#builder" 
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'builder' ? 'border-b-2 border-white' : ''}`}
            >
              CV Builder
            </a>
            <a 
              href="#templates" 
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'templates' ? 'border-b-2 border-white' : ''}`}
            >
              Templates
            </a>
            <a 
              href="#about" 
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'about' ? 'border-b-2 border-white' : ''}`}
            >
              About
            </a>
            <a 
              href="#contact" 
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'contact' ? 'border-b-2 border-white' : ''}`}
            >
              Contact
            </a>
          </div>          <div className="flex items-center">
            <div className="md:hidden mr-4">
              <button className="focus:outline-none" onClick={toggleMobileMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            {/* Donation Button */}
            <button 
              onClick={() => setDonationModalOpen(true)}
              className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-2 0v1H5a1 1 0 100 2h2v1a2 2 0 104 0V8h2a1 1 0 100-2h-2V5a2 2 0 10-4 0v1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Support Us</span>
            </button>
          </div>
        </div>
          {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>          <div className="flex flex-col space-y-4">
            <a 
              href="#home" 
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'home' ? 'font-bold' : ''}`}
            >
              Home
            </a>
            <a 
              href="#builder" 
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'builder' ? 'font-bold' : ''}`}
            >
              CV Builder
            </a>
            <a 
              href="#templates" 
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'templates' ? 'font-bold' : ''}`}
            >
              Templates
            </a>
            <a 
              href="#about" 
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'about' ? 'font-bold' : ''}`}
            >
              About
            </a>
            <a 
              href="#contact" 
              className={`hover:text-blue-200 transition duration-300 ${currentPage === 'contact' ? 'font-bold' : ''}`}
            >
              Contact
            </a>
            <button
              onClick={() => setDonationModalOpen(true)}
              className="flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-2 0v1H5a1 1 0 100 2h2v1a2 2 0 104 0V8h2a1 1 0 100-2h-2V5a2 2 0 10-4 0v1z" clipRule="evenodd" />
              </svg>
              Support Us
            </button>
          </div>
        </div>      </nav>
      
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
