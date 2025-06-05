import React, { useRef, useState, useEffect } from 'react';
import { ResumeForm } from './ResumeForm';
import { ResumeTemplatesComponent } from './ResumeTemplates';
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
  const isMobile = useIsMobile();
  const [showPreview, setShowPreview] = useState(!isMobile);
  const [isSaving, setIsSaving] = useState(false);

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

  const toggleEdit = () => {
    setShowPreview(!showPreview);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date().toLocaleTimeString());
    }, 1000);
  };

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-0"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="flex space-x-3 w-full sm:w-auto">
            <button
              onClick={toggleEdit}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {showPreview ? (
                <>
                  <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                  Edit
                </>
              ) : (
                <>
                  <EyeIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                  Preview
                </>
              )}
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            
            <button
              onClick={downloadPDF}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="mb-6 sm:hidden">
          <div className="bg-white p-2 rounded-lg shadow-sm mb-4">
            <Stepper 
              steps={sections} 
              currentStep={activeSection} 
              onStepClick={(section) => {
                setActiveSection(section);
                setShowPreview(false);
              }}
            />
            
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevious}
                disabled={!hasPrevious}
                className={`flex-1 mr-2 py-2 px-3 rounded-md text-sm font-medium ${
                  hasPrevious
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ArrowLeftIcon className="h-5 w-5 inline-block" />
              </button>
              
              <button
                onClick={handleNext}
                disabled={!hasNext}
                className={`flex-1 ml-2 py-2 px-3 rounded-md text-sm font-medium ${
                  hasNext
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ArrowRightIcon className="h-5 w-5 inline-block" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Desktop Navigation */}
          <div className="hidden sm:flex border-b border-gray-200">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-3 text-sm font-medium ${
                  activeSection === section
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {section.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 min-h-[60vh]">
            <div className={!showPreview ? 'block' : 'hidden'}>
              <ResumeForm
                activeSection={activeSection}
                setActiveSection={setActiveSection}
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
            <div className={showPreview ? 'block' : 'hidden'}>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div 
                  ref={resumePreviewRef}
                  className="bg-white shadow-lg mx-auto"
                  style={{
                    width: '210mm',
                    minHeight: '297mm',
                    transform: isMobile ? 'scale(0.5) translateX(-50%)' : 'scale(0.8)',
                    transformOrigin: isMobile ? 'top left' : 'top center',
                    margin: isMobile ? '0 0 0 50%' : '0 auto',
                    position: 'relative',
                    overflow: 'visible',
                    boxSizing: 'border-box',
                    maxWidth: '100%',
                  }}
                >
                  <ResumeTemplatesComponent
                    activeTemplate={activeTemplate}
                    data={resumeData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 z-10 sm:hidden">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <button
              onClick={toggleEdit}
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {showPreview ? (
                <>
                  <PencilIcon className="h-5 w-5 mr-1" />
                  <span>Edit</span>
                </>
              ) : (
                <>
                  <EyeIcon className="h-5 w-5 mr-1" />
                  <span>Preview</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            
            <button
              onClick={downloadPDF}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              title="Download PDF"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;