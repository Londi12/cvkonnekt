import React from 'react';

// Modern Template Component
function ModernTemplate({ data = {}, customStyle = {} }) {
  const {
    personalInfo = {},
    professionalSummary = '',
    workExperience = [],
    education = [],
    skills = [],
    certifications = [],
    languages = [],
    references = []
  } = data || {};

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          {personalInfo.fullName?.toUpperCase() || 'YOUR NAME'}
        </h1>
        <p className="text-sm text-purple-600 font-medium">
          {personalInfo.jobTitle?.toUpperCase() || 'YOUR JOB TITLE'}
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.linkedIn && <span>• {personalInfo.linkedIn}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {professionalSummary && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm text-gray-700">{professionalSummary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1 mb-3">
            WORK EXPERIENCE
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp, index) => (
              <div key={exp.id || index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">
                    {exp.jobTitle?.toUpperCase()}
                    {exp.employer && ` @ ${exp.employer.toUpperCase()}`}
                  </h3>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.city && <p className="text-xs text-gray-500">{exp.city}</p>}
                {exp.description && (
                  <p className="mt-1 text-sm text-gray-700">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1 mb-3">
            EDUCATION
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={edu.id || index}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">
                    {edu.qualification}
                    {edu.institution && `, ${edu.institution}`}
                  </h3>
                  <div className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </div>
                </div>
                {edu.location && <p className="text-xs text-gray-500">{edu.location}</p>}
                {edu.description && (
                  <p className="mt-1 text-sm text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1 mb-3">
            SKILLS
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={skill.id || index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {skill.skill}
                {skill.level && ` (${skill.level})`}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Professional Template Component
function ProfessionalTemplate({ data = {}, customStyle = {} }) {
  const {
    personalInfo = {},
    professionalSummary = '',
    workExperience = [],
    education = [],
    skills = [],
    certifications = [],
    languages = [],
    references = []
  } = data || {};

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-lg text-gray-600">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="mt-1 text-sm text-gray-500">
          {personalInfo.email || ''}
          {personalInfo.phone && ` • ${personalInfo.phone}`}
          {personalInfo.linkedIn && ` • ${personalInfo.linkedIn}`}
        </div>
      </div>

      {/* Professional Summary */}
      {professionalSummary && (
        <div className="mb-6">
          <h2 className="text-base font-medium text-gray-700 border-b border-gray-200 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-600">{professionalSummary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-medium text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp, index) => (
              <div key={exp.id || index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">
                    {exp.jobTitle}
                    {exp.employer && `, ${exp.employer}`}
                  </h3>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.city && <p className="text-xs text-gray-500">{exp.city}</p>}
                {exp.description && (
                  <p className="mt-1 text-sm text-gray-700">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-medium text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={edu.id || index}>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">
                    {edu.qualification}
                    {edu.institution && `, ${edu.institution}`}
                  </h3>
                  <div className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </div>
                </div>
                {edu.location && <p className="text-xs text-gray-500">{edu.location}</p>}
                {edu.description && (
                  <p className="mt-1 text-sm text-gray-600">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-medium text-gray-700 border-b border-gray-200 pb-1 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={skill.id || index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {skill.skill}
                {skill.level && ` (${skill.level})`}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Minimal Template Component
function MinimalTemplate({ data = {}, customStyle = {} }) {
  const {
    personalInfo = {},
    professionalSummary = '',
    workExperience = [],
    education = [],
    skills = [],
    certifications = [],
    languages = [],
    references = []
  } = data || {};

  const {
    headerBorder = 'border-gray-300',
    accentColor = 'text-gray-800',
    sectionSpacing = 'mb-6'
  } = customStyle;
  
  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-gray-800 mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-gray-600 font-light">
          {personalInfo.jobTitle || 'Your Job Title'}
        </p>
        <div className="flex flex-wrap justify-center gap-x-3 text-sm text-gray-500 mt-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.linkedIn && <span>• {personalInfo.linkedIn}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {professionalSummary && (
        <div className="mb-8">
          <h2 className="text-base font-light text-gray-700 mb-2">
            Summary
          </h2>
          <p className="text-sm text-gray-600">{professionalSummary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-light text-gray-700 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp, index) => (
              <div key={exp.id || index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-light text-gray-800">
                    {exp.jobTitle}
                    {exp.employer && `, ${exp.employer}`}
                  </h3>
                  <div className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.city && <p className="text-xs text-gray-500">{exp.city}</p>}
                {exp.description && (
                  <p className="mt-1 text-sm text-gray-600">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-light text-gray-700 mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={edu.id || index}>
                <div className="flex justify-between">
                  <h3 className="font-light text-gray-800">
                    {edu.qualification}
                    {edu.institution && `, ${edu.institution}`}
                  </h3>
                  <div className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </div>
                </div>
                {edu.location && <p className="text-xs text-gray-500">{edu.location}</p>}
                {edu.description && (
                  <p className="mt-1 text-sm text-gray-600">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div>
          <h2 className="text-base font-light text-gray-700 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={skill.id || index}
                className="px-3 py-1 bg-gray-50 rounded-full text-sm text-gray-600"
              >
                {skill.skill}
                {skill.level && ` (${skill.level})`}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Template mapping object
const ResumeTemplates = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  minimal: MinimalTemplate,
  classic: ProfessionalTemplate,
  technical: (props) => (
    <ModernTemplate 
      {...props} 
      customStyle={{
        headerGradient: 'from-green-100 to-blue-100',
        accentColor: 'text-green-700',
        sectionBackground: 'bg-opacity-60'
      }}
    />
  ),
  graduate: (props) => (
    <MinimalTemplate 
      {...props}
      customStyle={{
        headerBorder: 'border-yellow-500',
        accentColor: 'text-yellow-700',
        sectionSpacing: 'mb-5'
      }}
    />
  )
};

// Main template component
function ResumeTemplatesComponent({ data, activeTemplate }) {
  // Ensure we have a valid template ID, default to 'modern' if not provided
  const templateId = activeTemplate?.id?.toLowerCase() || 'modern';
  // Get the template component or fall back to ModernTemplate
  const TemplateComponent = ResumeTemplates[templateId] || ModernTemplate;
  
  // Apply template-specific styles if defined in the active template
  const templateStyle = activeTemplate?.style || {};
  
  return (
    <div id="resume-preview" className="resume-preview h-full">
      <div className="h-full">
        <TemplateComponent data={data} customStyle={templateStyle} />
      </div>
    </div>
  );
}

// Export all components
export {
  ModernTemplate,
  ProfessionalTemplate,
  MinimalTemplate,
  ResumeTemplatesComponent
};
