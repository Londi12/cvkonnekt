import React from 'react';
import { ResumeForm } from './ResumeForm';
import { ResumeTemplates } from './ResumeTemplates';
import BuilderDonationBanner from './BuilderDonationBanner';

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
  return (
    <div className="min-h-screen bg-gray-50">
      <BuilderDonationBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
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
          
          {/* Right side - Preview */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ResumeTemplates
              activeTemplate={activeTemplate}
              setActiveTemplate={setActiveTemplate}
              resumeData={resumeData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage; 