import React, { useRef } from 'react';
import { ResumeForm } from './ResumeForm';
import { ResumeTemplatesComponent } from './ResumeTemplates';
import BuilderDonationBanner from './BuilderDonationBanner';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ArrowLeftIcon, ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

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

  return (
    <div className="min-h-screen bg-gray-100">
      <BuilderDonationBanner />
      <div className="container mx-auto px-4 py-6 h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Left side - Form */}
          <div className="bg-white rounded-xl shadow-md flex flex-col h-full">
            <div className="p-6 overflow-y-auto flex-1">
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
            
            {/* Navigation Buttons - Sticky to bottom */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between space-x-3">
                  <button
                    onClick={handlePrevious}
                    disabled={!hasPrevious}
                    className={`flex-1 flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      hasPrevious
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!hasNext}
                    className={`flex-1 flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      hasNext
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-100 text-white cursor-not-allowed'
                    }`}
                  >
                    Next
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </button>
                </div>
                
                <button
                  onClick={downloadPDF}
                  className="w-full flex items-center justify-center px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
          
          {/* Right side - Preview */}
          <div className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden h-full">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                {activeTemplate?.name || 'Modern'} Template Preview
              </h2>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-gray-100 flex items-start justify-center">
              <div 
                ref={resumePreviewRef} 
                className="bg-white shadow-lg"
                style={{
                  width: '210mm',
                  minHeight: '297mm',
                  transform: 'scale(0.5) translateY(0)',
                  transformOrigin: 'top center',
                  margin: '0 auto',
                  position: 'relative',
                  overflow: 'visible',
                  boxSizing: 'border-box'
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
    </div>
  );
};

export default BuilderPage;