import React from 'react';

// Modern Template Component
export const ModernTemplate = ({ data = {} }) => {
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
  
  const renderEducation = (education) => {
    if (!education || education.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Education</h2>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={edu.id || index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.qualification || ''}</h3>
                  <p className="text-gray-600">{edu.institution || ''}</p>
                  <p className="text-sm text-gray-500">{edu.location || ''}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {edu.startDate || ''} - {edu.endDate || 'Present'}
                  </p>
                </div>
              </div>
              {edu.description && (
                <p className="mt-2 text-gray-700">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCertifications = (certifications) => {
    if (!certifications || certifications.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Certifications</h2>
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={cert.id || index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{cert.name || ''}</h3>
                  <p className="text-gray-600">{cert.issuer || ''}</p>
                  {cert.credentialId && (
                    <p className="text-sm text-gray-500">Credential ID: {cert.credentialId}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {cert.date || ''}
                    {cert.expiryDate && ` - ${cert.expiryDate}`}
                  </p>
                </div>
              </div>
              {cert.description && (
                <p className="mt-2 text-gray-700">{cert.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 shadow-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extrabold text-purple-800">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-xl text-gray-600">{personalInfo.jobTitle || 'Your Job Title'}</p>
        <div className="mt-2 text-gray-600">
          <p>{personalInfo.email || ''} {personalInfo.phone ? `• ${personalInfo.phone}` : ''}</p>
          <p>
            {[
              personalInfo.address,
              personalInfo.city,
              personalInfo.province,
              personalInfo.postalCode
            ].filter(Boolean).join(', ')}
          </p>
          {personalInfo.linkedin && (
            <p>LinkedIn: {personalInfo.linkedin}</p>
          )}
          {personalInfo.website && (
            <p>Website: {personalInfo.website}</p>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {professionalSummary && (
        <div className="mb-8 bg-white bg-opacity-50 p-3 rounded">
          <h2 className="text-xl font-bold text-purple-700 mb-4">Professional Summary</h2>
          <p className="text-gray-700">{professionalSummary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <div className="mb-8 bg-white bg-opacity-50 p-3 rounded">
          <h2 className="text-xl font-bold text-purple-700 mb-4">Work Experience</h2>
          <div className="space-y-6">
            {workExperience.map((exp, index) => (
              <div key={exp.id || index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{exp.jobTitle || ''}</h3>
                    <p className="text-gray-600">{exp.employer || ''}</p>
                    <p className="text-sm text-gray-500">{exp.city || ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {exp.startDate || ''} - {exp.current ? 'Present' : (exp.endDate || '')}
                    </p>
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {renderEducation(education)}

      {/* Certifications */}
      {renderCertifications(certifications)}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-8 bg-white bg-opacity-50 p-3 rounded">
          <h2 className="text-xl font-bold text-purple-700 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={skill.id || index}
                className="px-3 py-1 bg-white bg-opacity-70 rounded-full text-gray-700"
              >
                {skill.skill || ''} {skill.level && `(${skill.level})`}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang, index) => (
              <span
                key={lang.id || index}
                className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
              >
                {lang.language || ''} {lang.proficiency && `(${lang.proficiency})`}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">References</h2>
          <div className="space-y-4">
            {references.map((ref, index) => (
              <div key={ref.id || index} className="mb-4">
                <h3 className="font-semibold">{ref.name || ''}</h3>
                <p className="text-gray-600">
                  {ref.position || ''} {ref.company ? `at ${ref.company}` : ''}
                </p>
                <p className="text-sm text-gray-500">
                  {ref.email || ''} {ref.phone ? `• ${ref.phone}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Professional Template Component
export const ProfessionalTemplate = ({ data }) => {
  const { personalInfo, professionalSummary, workExperience, education, skills, certifications, languages, references } = data;
  
  return (
    <div className="bg-white p-8 shadow-md">
      {/* Header */}
      <header className="border-b-2 border-blue-800 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">{personalInfo.fullName}</h1>
        <p className="text-xl text-gray-700 mb-2">{personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap justify-center text-sm text-gray-600">
          {personalInfo.email && (
            <div className="mx-2 mb-1">
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="mx-2 mb-1">
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.address && (
            <div className="mx-2 mb-1">
              {personalInfo.address}, {personalInfo.city}, {personalInfo.province} {personalInfo.postalCode}
            </div>
          )}
        </div>
      </header>
      
      {/* Professional Summary */}
      {professionalSummary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Professional Summary</h2>
          <p className="text-gray-700">{professionalSummary}</p>
        </section>
      )}
      
      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Experience</h2>
          {workExperience.map((job) => (
            <div key={job.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold text-gray-800">{job.jobTitle}</h3>
                <span className="text-sm text-gray-600">
                  {job.startDate} - {job.current ? 'Present' : job.endDate}
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-1">{job.employer}, {job.city}</p>
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>
          ))}
        </section>
      )}
      
      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold text-gray-800">{edu.qualification}</h3>
                <span className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </span>
              </div>
              <p className="text-gray-700 font-medium">{edu.institution}, {edu.location}</p>
              {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}
      
      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
              >
                {skill.skill} {skill.level && `(${skill.level})`}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// Minimal Template Component
export const MinimalTemplate = ({ data }) => {
  const { personalInfo, professionalSummary, workExperience, education, skills, certifications, languages, references } = data;
  
  return (
    <div className="bg-white p-8 shadow-md">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{personalInfo.fullName}</h1>
        <p className="text-lg text-gray-600 mb-3">{personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap justify-center text-sm text-gray-600 border-t border-b border-gray-200 py-2">
          {personalInfo.email && (
            <div className="mx-2 mb-1">
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="mx-2 mb-1">
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.address && (
            <div className="mx-2 mb-1">
              {personalInfo.address}, {personalInfo.city}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="mx-2 mb-1">
              {personalInfo.linkedin}
            </div>
          )}
        </div>
      </header>
      
      {/* Professional Summary */}
      {professionalSummary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Summary</h2>
          <p className="text-gray-700">{professionalSummary}</p>
        </section>
      )}
      
      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Experience</h2>
          {workExperience.map((job) => (
            <div key={job.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-medium text-gray-800">{job.jobTitle} • {job.employer}</h3>
                <span className="text-sm text-gray-600">
                  {job.startDate} – {job.current ? 'Present' : job.endDate}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{job.city}</p>
              <p className="text-gray-700 text-sm whitespace-pre-line">{job.description}</p>
            </div>
          ))}
        </section>
      )}
      
      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-medium text-gray-800">{edu.qualification} • {edu.institution}</h3>
                <span className="text-sm text-gray-600">
                  {edu.startDate} – {edu.endDate || 'Present'}
                </span>
              </div>
              <p className="text-sm text-gray-600">{edu.location}</p>
              {edu.description && <p className="text-gray-700 text-sm mt-1">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}
      
      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm"
              >
                {skill.skill} {skill.level && `(${skill.level})`}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// Create and export all templates as an object
export const ResumeTemplates = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  minimal: MinimalTemplate
};

// Main ResumeTemplates component
export const ResumeTemplatesComponent = ({ activeTemplate, resumeData }) => {
  const TemplateComponent = ResumeTemplates[activeTemplate.id.toLowerCase()] || ModernTemplate;
  
  return (
    <div className="resume-preview">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
        <p className="text-sm text-gray-600">Template: {activeTemplate.name}</p>
      </div>
      <div className="resume-container">
        <TemplateComponent data={resumeData} />
      </div>
    </div>
  );
};
