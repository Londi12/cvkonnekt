// Builder Donation Banner Component
const BuilderDonationBanner = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-2 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-2 0v1H5a1 1 0 100 2h2v1a2 2 0 104 0V8h2a1 1 0 100-2h-2V5a2 2 0 10-4 0v1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm md:text-base">Enjoying CVKonnekt? Your donation helps us keep this service free for everyone!</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => window.openDonationModal()}
            className="bg-white text-yellow-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-yellow-100 transition duration-300"
          >
            Support Us
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-yellow-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Make component available globally
window.BuilderDonationBanner = BuilderDonationBanner;
