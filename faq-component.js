/* Modified CV FAQ section */
const UpdatedFaqs = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-medium text-gray-900">Is CVKonnekt free to use?</h3>
      <p className="text-gray-600 mt-1">Yes, CVKonnekt is completely free to use with all features available to everyone. We're supported by donations from users who value our service.</p>
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-900">How do I download my CV?</h3>
      <p className="text-gray-600 mt-1">After completing your CV, you can download it as a PDF by clicking the "Download PDF" button on the final step of the CV builder.</p>
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-900">Can I create multiple CVs?</h3>
      <p className="text-gray-600 mt-1">Yes, you can create multiple CVs tailored for different job applications. Simply start a new CV from the builder page when you need another version.</p>
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-900">Are the templates ATS-friendly?</h3>
      <p className="text-gray-600 mt-1">Yes, all our templates are designed to be ATS (Applicant Tracking System) friendly to ensure your CV gets past automated screening systems used by many South African employers.</p>
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-900">How can I support CVKonnekt?</h3>
      <p className="text-gray-600 mt-1">If you find our service valuable, please consider making a donation. Your support helps us maintain the platform and keep it free for everyone. Click the "Support Us" button in the navigation bar to donate.</p>
    </div>
  </div>
);

// Make it available globally
window.UpdatedFaqs = UpdatedFaqs;
