import React from 'react';
// Import templates from the root templates.js
// eslint-disable-next-line import/no-relative-parent-imports
import { templates as templatesData } from '../../templates.js';

// Helper to flatten all templates into a map by name
const templateMap = {};
Object.values(templatesData).forEach(categoryList => {
  categoryList.forEach(template => {
    templateMap[template.name] = template;
  });
});

export function getTemplateComponent(templateName) {
  const template = templateMap[templateName];
  if (!template) return null;
  // Return a React component that renders the template
  return function TemplateComponent({ resumeData }) {
    return (
      <div className={template.className}>
        <div className={template.headerClass}>{resumeData?.personalInfo?.fullName || ''}</div>
        <div className="text-sm">
          {resumeData?.personalInfo?.email || ''} • {resumeData?.personalInfo?.phone || ''}
        </div>
        <div className={template.sectionClass}>
          {resumeData?.professionalSummary || ''}
        </div>
      </div>
    );
  };
} 