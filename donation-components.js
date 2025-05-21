// Donation components for CVKonnekt

// Donation Button Component
const DonationButton = ({ size = "md" }) => {
  const openDonationModal = () => {
    // Set donation modal to open
    window.openDonationModal();
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      onClick={openDonationModal}
      className={`bg-gradient-to-r from-yellow-500 to-yellow-600 text-white 
      ${sizeClasses[size]} rounded-full font-semibold hover:from-yellow-600 hover:to-yellow-700 
      transition duration-300 flex items-center`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-2 0v1H5a1 1 0 100 2h2v1a2 2 0 104 0V8h2a1 1 0 100-2h-2V5a2 2 0 10-4 0v1z" clipRule="evenodd" />
      </svg>
      Support Us
    </button>
  );
};

// Donation Modal Component
const DonationModal = ({ isOpen, onClose }) => {
  const [donationAmount, setDonationAmount] = React.useState("50");
  const [customAmount, setCustomAmount] = React.useState("");
  const [donorName, setDonorName] = React.useState("");
  const [donorEmail, setDonorEmail] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("card");

  if (!isOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would connect to a payment processor
    const amount = donationAmount === "custom" ? customAmount : donationAmount;
    
    // Show a loading state or disable the button while processing
    const donationData = {
      amount: amount,
      name: donorName,
      email: donorEmail,
      paymentMethod: paymentMethod,
      timestamp: new Date().toISOString()
    };
    
    // Simple mock API request
    fetch('/api/donate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Donation successful:', data);
      alert(`Thank you for your donation of R${amount}! A receipt will be sent to your email if provided.`);
      onClose();
    })
    .catch(error => {
      console.error('Error processing donation:', error);
      alert(`Thank you for your donation of R${amount}! This would connect to a payment processor in production.`);
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Support CVKonnekt</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="mb-4 text-gray-600">
          Your support helps us maintain and improve CVKonnekt, keeping it free for all South African job seekers.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Amount (ZAR)</label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {["20", "50", "100"].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={`py-2 rounded-md ${
                    donationAmount === amount
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => setDonationAmount(amount)}
                >
                  R{amount}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["200", "500", "custom"].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={`py-2 rounded-md ${
                    donationAmount === amount
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => setDonationAmount(amount)}
                >
                  {amount === "custom" ? "Custom" : `R${amount}`}
                </button>
              ))}
            </div>
            
            {donationAmount === "custom" && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Amount</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">R</span>
                  </div>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    min="1"
                    step="1"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (Optional)</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Your Name"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
            <input
              type="email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="your@email.com"
            />
            <p className="mt-1 text-xs text-gray-500">We'll send you a receipt for your donation.</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="card"
                  name="paymentMethod"
                  type="radio"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                />
                <label htmlFor="card" className="ml-2 block text-sm text-gray-700">
                  Credit/Debit Card
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="eft"
                  name="paymentMethod"
                  type="radio"
                  checked={paymentMethod === "eft"}
                  onChange={() => setPaymentMethod("eft")}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                />
                <label htmlFor="eft" className="ml-2 block text-sm text-gray-700">
                  EFT (Bank Transfer)
                </label>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 rounded-md hover:from-yellow-600 hover:to-yellow-700 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
};

// Small inline donation call-to-action
const DonationCallout = () => {
  const openDonationModal = () => {
    // Set donation modal to open
    window.openDonationModal();
  };

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-2 0v1H5a1 1 0 100 2h2v1a2 2 0 104 0V8h2a1 1 0 100-2h-2V5a2 2 0 10-4 0v1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            CVKonnekt is free to use, powered by your donations. 
            <button 
              onClick={openDonationModal} 
              className="ml-1 font-medium text-yellow-700 underline"
            >
              Support us today!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Donation Thank You Dialog
const DonationThankYouDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Thank You For Your Support!</h3>
          <p className="mt-2 text-sm text-gray-500">
            Your donation helps us keep CVKonnekt free for all South African job seekers and continue improving our services.
          </p>
          <div className="mt-4">
            <button
              onClick={onClose}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Make components available globally
window.DonationButton = DonationButton;
window.DonationModal = DonationModal;
window.DonationCallout = DonationCallout;
window.DonationThankYouDialog = DonationThankYouDialog;
