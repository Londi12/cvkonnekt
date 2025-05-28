import React from 'react';

export const BuilderDonationBanner = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-1 mb-4 md:mb-0 md:mr-6">
          <h3 className="text-xl font-bold text-amber-800 mb-2">Support CVKonnekt</h3>
          <p className="text-amber-700 mb-2">
            We're committed to providing free CV building tools to help South Africans secure better employment opportunities.
          </p>
          <p className="text-amber-700">
            If you find our service valuable, please consider making a small donation to help us maintain and improve CVKonnekt.
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openDonationModal'))}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition duration-300 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-2 0v1H5a1 1 0 100 2h2v1a2 2 0 104 0V8h2a1 1 0 100-2h-2V5a2 2 0 10-4 0v1z" clipRule="evenodd" />
            </svg>
            Support Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuilderDonationBanner;
