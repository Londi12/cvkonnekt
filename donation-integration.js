// Script to add donation elements to pages after they load
// This will run after the components are loaded

document.addEventListener('DOMContentLoaded', function() {
  // Create donation callout for About page
  const addDonationToAbout = () => {
    if (window.location.hash === '#about') {
      // Wait for the about page to render
      setTimeout(() => {
        const aboutContainer = document.querySelector('.container.mx-auto.px-4.py-16');
        if (aboutContainer) {
          // Create the donation callout element
          const donationCallout = document.createElement('div');
          donationCallout.className = 'bg-yellow-50 border-yellow-200 border-2 p-8 rounded-lg mb-12';
          donationCallout.innerHTML = `
            <div class="flex flex-col md:flex-row items-center">
              <div class="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                <h2 class="text-2xl font-bold mb-4 text-yellow-700">Support CVKonnekt</h2>
                <p class="mb-4">
                  CVKonnekt is completely free to use because we believe everyone deserves access to 
                  professional CV tools regardless of their financial situation. We're supported entirely 
                  by donations from users like you who value our service.
                </p>
                <p>
                  Your donations help us maintain the platform, develop new features, and keep 
                  CVKonnekt available for all South African job seekers. Even a small contribution 
                  makes a big difference!
                </p>
              </div>
              <div class="md:w-1/3 text-center">
                <button 
                  id="about-donate-button"
                  class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition duration-300 shadow-md"
                >
                  <div class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-2 0v1H5a1 1 0 100 2h2v1a2 2 0 104 0V8h2a1 1 0 100-2h-2V5a2 2 0 10-4 0v1z" clipRule="evenodd" />
                    </svg>
                    Donate Now
                  </div>
                </button>
                <p class="mt-4 text-sm text-yellow-700">Every donation helps!</p>
              </div>
            </div>
          `;
          
          // Insert after the values section
          const valuesSection = aboutContainer.querySelector('.bg-gradient-to-r.from-blue-700.to-green-600');
          if (valuesSection && valuesSection.parentNode) {
            valuesSection.parentNode.insertBefore(donationCallout, valuesSection.nextSibling);
            
            // Add click handler for the donate button
            document.getElementById('about-donate-button').addEventListener('click', function() {
              if (window.openDonationModal) {
                window.openDonationModal();
              }
            });
          }
        }
      }, 500);
    }
  };

  // Add donation banner to builder page
  const addDonationBannerToBuilder = () => {
    if (window.location.hash === '#builder') {
      // Wait for the builder page to render
      setTimeout(() => {
        const builderContainer = document.querySelector('#root');
        if (builderContainer && window.BuilderDonationBanner) {
          // Create a container for the banner
          const bannerContainer = document.createElement('div');
          bannerContainer.id = 'builder-donation-banner-container';
          document.body.appendChild(bannerContainer);
          
          // Render the banner component
          ReactDOM.render(React.createElement(window.BuilderDonationBanner), bannerContainer);
        }
      }, 500);
    }
  };

  // Update FAQ section
  const updateFaqSection = () => {
    if (window.location.hash === '#contact') {
      setTimeout(() => {
        const faqContainer = document.querySelector('.bg-gray-100.p-6.rounded-lg .space-y-4');
        if (faqContainer && window.UpdatedFaqs) {
          // Render the updated FAQs
          const tempDiv = document.createElement('div');
          ReactDOM.render(React.createElement(window.UpdatedFaqs), tempDiv);
          faqContainer.innerHTML = tempDiv.innerHTML;
        }
      }, 500);
    }
  };

  // Run when hash changes
  window.addEventListener('hashchange', function() {
    addDonationToAbout();
    addDonationBannerToBuilder();
    updateFaqSection();
  });

  // Run on initial load
  addDonationToAbout();
  addDonationBannerToBuilder();
  updateFaqSection();
});
