import React, { useRef, useState, useEffect } from 'react';
import { ResumeForm } from './ResumeForm';
import { ResumeTemplatesComponent } from './ResumeTemplates';
import BuilderDonationBanner from './BuilderDonationBanner';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  ArrowDownTrayIcon,
  Bars3Icon,
  XMarkIcon,
  PencilIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// Custom hook to detect mobile viewport
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

// Stepper component for mobile navigation
const Stepper = ({ steps, currentStep, onStepClick, className = '' }) => {
  return (
    <div className={`flex items-center justify-between mb-6 overflow-x-auto pb-2 ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <button
            onClick={() => onStepClick(step)}
            className={`flex flex-col items-center flex-shrink-0 px-2 ${
              currentStep === step ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                currentStep === step ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs font-medium capitalize">
              {step.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          </button>
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-gray-200 mx-1"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const BuilderPage = ({
  activeTemplate,
  setActiveTemplate,
  activeSection,
  setActiveSection,
  resumeData,
  setResumeData,
  formErrors,
  setFormErrors,
  saving,
  setSaving,
  lastSaved,
  setLastSaved
}) => {
  const resumePreviewRef = useRef(null);
  const sections = [
    'personalInfo',
    'professionalSummary',
    'workExperience',
    'education',
    'skills',
    'certifications',
    'languages',
    'references'
  ];

  const currentSectionIndex = sections.indexOf(activeSection);
  const hasNext = currentSectionIndex < sections.length - 1;
  const hasPrevious = currentSectionIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      setActiveSection(sections[currentSectionIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      setActiveSection(sections[currentSectionIndex - 1]);
    }
  };

  const downloadPDF = async () => {
    if (!resumePreviewRef.current) return;
    
    try {
      const previewElement = resumePreviewRef.current;
      if (!previewElement) return;
      
      // Store original styles and content
      const originalHTML = previewElement.innerHTML;
      const originalStyles = {
        width: previewElement.style.width,
        minHeight: previewElement.style.minHeight,
        transform: previewElement.style.transform,
      };
      
      // Create a clone of the preview element for PDF generation
      const clonedElement = previewElement.cloneNode(true);
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.width = '210mm';
      clonedElement.style.minHeight = '297mm';
      clonedElement.style.transform = 'none';
      document.body.appendChild(clonedElement);
      
      // Wait for the clone to be rendered
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Create PDF with proper DPI (96 DPI for screen, 300 DPI for print)
      const printScale = 300 / 96; // Scale factor for 300 DPI
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      
      // Calculate dimensions in pixels at 96 DPI
      const widthPx = (pageWidth * 96) / 25.4; // mm to pixels at 96 DPI
      const heightPx = (pageHeight * 96) / 25.4;
      
      // Create canvas with proper dimensions
      const canvas = await html2canvas(clonedElement, {
        scale: 1, // No additional scaling
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        width: widthPx,
        height: heightPx,
        windowWidth: widthPx,
        windowHeight: heightPx,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
      });
      
      // Add image to PDF
      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
      
      // Clean up
      document.body.removeChild(clonedElement);
      
      // Save the PDF
      pdf.save(`${resumeData.personalInfo?.fullName || 'resume'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(!isMobile);

  // Toggle between form and preview on mobile
  const togglePreview = () => {
    setShowPreview(!showPreview);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  // Handle step navigation from stepper
  const handleStepClick = (step) => {
    setActiveSection(step);
    if (isMobile) {
      setShowPreview(false);
    }
  };

  // Auto-close mobile menu when section changes
  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [activeSection]);

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BuilderDonationBanner />
      
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">
            {activeSection.replace(/([A-Z])/g, ' $1').trim()}
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePreview}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label={showPreview ? 'Show Form' : 'Show Preview'}
            >
              {showPreview ? (
                <span className="text-sm font-medium">Edit</span>
              ) : (
                <span className="text-sm font-medium">Preview</span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Stepper */}
        <div className="px-4 pb-2 border-b border-gray-200">
          <Stepper 
            steps={sections} 
            currentStep={activeSection} 
            onStepClick={handleStepClick}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        {/* Left side - Form */}
        <div 
          className={`lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
            isMobile && !showPreview ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="p-4 border-b border-gray-200 hidden lg:block">
            <h2 className="text-lg font-semibold text-gray-800">Resume Builder</h2>
          </div>
          
          <div className="p-4 space-y-4">
            <ResumeForm
              activeSection={activeSection}
              resumeData={resumeData}
              setResumeData={setResumeData}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              saving={saving}
              setSaving={setSaving}
              lastSaved={lastSaved}
              setLastSaved={setLastSaved}
            />
          </div>
        </div>
        
        {/* Right side - Preview */}
        <div 
          className={`lg:col-span-2 bg-white rounded-xl shadow-md flex flex-col overflow-hidden h-full transition-all duration-300 ${
            isMobile && !showPreview ? 'hidden' : 'block'
          }`}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Resume Preview
            </h2>
            <span className="text-sm text-gray-500">
              Template: {activeTemplate?.name || 'Modern'}
            </span>
          </div>
          <div className="flex-1 overflow-auto p-2 sm:p-4 bg-gray-100 flex items-start justify-center">
            <div 
              ref={resumePreviewRef} 
              className="bg-white shadow-lg"
              style={{
                width: '210mm',
                minHeight: '297mm',
                transform: isMobile ? 'scale(0.4) translateY(-15%)' : 'scale(0.5) translateY(0)',
                transformOrigin: 'top center',
                margin: '0 auto',
                position: 'relative',
                overflow: 'visible',
                boxSizing: 'border-box',
                maxWidth: '100%',
                marginTop: isMobile ? '2rem' : '0',
                marginBottom: isMobile ? '2rem' : '0'
              }}
              key={`resume-preview-${activeTemplate?.id || 'modern'}`}
            >
              <ResumeTemplatesComponent
                activeTemplate={activeTemplate}
                data={resumeData}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 z-20">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={handlePrevious}
            disabled={!hasPrevious}
            className={`flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              hasPrevious
                ? 'text-blue-600 hover:bg-blue-50'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="ml-1 hidden sm:inline">Previous</span>
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={togglePreview}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hidden lg:flex items-center"
              aria-label={showPreview ? 'Show Form' : 'Show Preview'}
            >
              {showPreview ? (
                <>
                  <span>Edit</span>
                  <PencilIcon className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  <span>Preview</span>
                  <EyeIcon className="h-4 w-4 ml-1" />
                </>
              )}
            </button>
            
            <button
              onClick={downloadPDF}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              <span className="ml-1 hidden sm:inline">Download PDF</span>
            </button>
          </div>
          
          <button
            onClick={handleNext}
            disabled={!hasNext}
            className={`flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              hasNext
                ? 'text-blue-600 hover:bg-blue-50'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <span className="mr-1 hidden sm:inline">Next</span>
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Action Bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 z-20">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <button
              onClick={handlePrevious}
              disabled={!hasPrevious}
              className={`flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                hasPrevious
                  ? 'text-blue-600 hover:bg-blue-50'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={togglePreview}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                aria-label={showPreview ? 'Show Form' : 'Show Preview'}
              >
                {showPreview ? 'Edit' : 'Preview'}
              </button>
              
              <button
                onClick={downloadPDF}
                className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                <span className="ml-1 hidden sm:inline">Download</span>
              </button>
            </div>
            
            <button
              onClick={handleNext}
              disabled={!hasNext}
              className={`flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                hasNext
                  ? 'text-blue-600 hover:bg-blue-50'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="sr-only">Next</span>
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderPage;