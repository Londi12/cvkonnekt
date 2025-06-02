import React, { useState, useEffect, useCallback } from 'react';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { TemplatesPage } from './components/TemplatesPage';
import { SupportPage } from './components/SupportPage';
import { ModernTemplate, ProfessionalTemplate, MinimalTemplate } from './components/ResumeTemplates';
import { BuilderDonationBanner } from './components/BuilderDonationBanner';
import { ResumeActions } from './components/ResumeActions';
import { Navbar } from './components/Navbar';
import { DonationModal } from './components/DonationModal';
import { AuthProvider } from './utils/AuthContext';
import html2pdf from 'html2pdf.js';
import { ResumeForm } from './components/ResumeForm';
import { SignUpForm } from './components/SignUpForm';

// Form validation functions
const validatePersonalInfo = (info) => {
  const errors = {};
  if (!info.fullName.trim()) errors.fullName = 'Full name is required';
  if (!info.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) errors.email = 'Invalid email format';
  return errors;
};

// Helper function for skill proficiency visualization
const getProficiencyWidth = (level) => {
  switch (level) {
    case 'Beginner': return 25;
    case 'Intermediate': return 50;
    case 'Advanced': return 75;
    case 'Expert': return 100;
    default: return 50;
  }
};

// Helper function for language proficiency visualization
const getLanguageProficiencyWidth = (proficiency) => {
  switch (proficiency) {
    case 'Basic': return 25;
    case 'Conversational': return 50;
    case 'Fluent': return 75;
    case 'Native': return 100;
    default: return 50;
  }
};

// PDF export helper function
const generatePDF = async () => {
  const element = document.querySelector('.resume-preview');
  if (!element) {
    console.error('Resume preview element not found');
    return;
  }

  // Add print mode class to body
  document.body.classList.add('print-mode');

  const opt = {
    margin: [10, 10, 10, 10],
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    },
    pagebreak: { mode: 'avoid-all' }
  };

  try {
    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true);
    
    // Add print-specific styles
    clonedElement.style.width = '210mm';
    clonedElement.style.minHeight = '297mm';
    clonedElement.style.padding = '20mm';
    clonedElement.style.backgroundColor = '#ffffff';
    
    // Temporarily append to body
    document.body.appendChild(clonedElement);
    
    // Generate PDF
    await html2pdf().set(opt).from(clonedElement).save();
    
    // Clean up
    document.body.removeChild(clonedElement);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    // Remove print mode class
    document.body.classList.remove('print-mode');
  }
};

// Main App component that serves as the root component for the application
function App() {
  const [page, setPage] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [donationAmount, setDonationAmount] = useState(100);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [formErrors, setFormErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      linkedin: '',
      website: ''
    },
    professionalSummary: '',
    workExperience: [
      {
        id: 1,
        jobTitle: '',
        employer: '',
        city: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    skills: [
      { id: 1, skill: '', level: 'Intermediate' }
    ],
    certifications: [
      { id: 1, name: '', issuer: '', date: '', description: '' }
    ],
    languages: [
      { id: 1, language: 'English', proficiency: 'Fluent' }
    ],
    references: [
      { id: 1, name: '', position: '', company: '', email: '', phone: '' }
    ]
  });
  const [newSkill, setNewSkill] = useState({ skill: '', level: 'Intermediate' });
  const [newLanguage, setNewLanguage] = useState({ language: '', proficiency: 'Fluent' });

  // Handle navigation
  const navigate = (targetPage) => {
    // Redirect builder to templates
    if (targetPage === 'builder') {
      targetPage = 'templates';
    }
    setPage(targetPage);
    setShowMobileMenu(false);
    window.location.hash = targetPage;
  };

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      const [page, params] = hash.split('?');
      
      // Redirect builder to templates
      if (page === 'builder') {
        window.location.hash = 'templates';
        return;
      }
      
      setPage(page);
    };

    // Set initial page based on hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Listen for donation modal open event
  useEffect(() => {
    const handleOpenDonationModal = () => {
      setShowDonationModal(true);
    };

    window.addEventListener('openDonationModal', handleOpenDonationModal);
    return () => window.removeEventListener('openDonationModal', handleOpenDonationModal);
  }, []);

  // Handle donation
  const handleDonate = async (amount, paymentMethod) => {
    try {
      // Here you would typically integrate with a payment gateway
      // For now, we'll just show a success message
      alert(`Thank you for your donation of R${amount}! We'll process your ${paymentMethod} payment shortly.`);
      setShowDonationModal(false);
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('There was an error processing your donation. Please try again.');
    }
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
  };

  // Get the appropriate template component
  const getTemplateComponent = (templateName) => {
    switch (templateName) {
      case 'Modern':
        return ModernTemplate;
      case 'Professional':
        return ProfessionalTemplate;
      case 'Minimal':
        return MinimalTemplate;
      default:
        return ModernTemplate;
    }
  };

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (!resumeData) return;
    
    setIsSaving(true);
    try {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving resume:', error);
    } finally {
      setIsSaving(false);
    }
  }, [resumeData]);

  // Load saved data
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved resume:', error);
      }
    }
  }, []);

  // Auto-save on data changes
  useEffect(() => {
    const saveTimeout = setTimeout(autoSave, 1000);
    return () => clearTimeout(saveTimeout);
  }, [resumeData, autoSave]);

  // Form section navigation
  const formSections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Professional Summary' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'languages', label: 'Languages' },
    { id: 'references', label: 'References' }
  ];

  // Render the appropriate page component
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'templates':
        return <TemplatesPage navigate={navigate} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'support':
        return <SupportPage />;
      case 'signup':
        return <SignUpForm navigate={navigate} />;
      case 'builder':
        return <ResumeForm />;
      default:
        return <HomePage />;
    }
  };

  // Render the builder page
  const renderBuilder = () => {
    const TemplateComponent = getTemplateComponent(activeTemplate);

    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-700">Build Your CV</h1>
            {lastSaved && (
              <span className="text-sm text-gray-600">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
          
          {!activeTemplate ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Select a Template</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Modern', 'Professional', 'Minimal'].map((templateName) => (
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
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex space-x-2 mb-6 overflow-x-auto">
                    {formSections.map(section => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                          activeSection === section.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                  
                  <ResumeForm
                    activeSection={activeSection}
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                    formErrors={formErrors}
                  />
                </div>
                
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-6">Resume Preview</h2>
                    <div className="bg-gray-100 p-4 h-[700px] overflow-auto resume-preview">
                      {React.createElement(getTemplateComponent(activeTemplate), { data: resumeData })}
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <ResumeActions 
                      resumeData={resumeData}
                      activeTemplate={activeTemplate}
                      exportToPDF={generatePDF}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button 
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      onClick={generatePDF}
                    >
                      Generate PDF
                    </button>
                  </div>
                  <BuilderDonationBanner />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar page={page} navigate={navigate} />
        <main className="pt-16">
          {renderPage()}
        </main>
        {showDonationModal && (
          <DonationModal
            onClose={() => setShowDonationModal(false)}
            onDonate={handleDonate}
            amount={donationAmount}
            onAmountChange={setDonationAmount}
          />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
