import React, { useCallback } from 'react';
import { parseResume } from '../utils/resumeParser';

export function ResumeForm({ activeSection, setActiveSection, resumeData, setResumeData, formErrors }) {
  const handleInputChange = (section, field, value) => {
    setResumeData(prev => {
      if (section === 'personalInfo') {
        return {
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            [field]: value
          }
        };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });
  };

  const handleArrayItemChange = (section, index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section) => {
    const newItem = {
      id: Date.now(),
      ...getEmptyItem(section)
    };
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const getEmptyItem = (section) => {
    switch (section) {
      case 'workExperience':
        return {
          jobTitle: '',
          employer: '',
          city: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        };
      case 'education':
        return {
          type: 'degree', // 'degree', 'diploma', 'certificate', 'course'
          qualification: '',
          institution: '',
          location: '',
          startDate: '',
          endDate: '',
          description: ''
        };
      case 'skills':
        return { skill: '', level: 'Intermediate' };
      case 'certifications':
        return { 
          name: '', 
          issuer: '', 
          date: '', 
          description: '',
          credentialId: '',
          expiryDate: ''
        };
      case 'languages':
        return { language: '', proficiency: 'Fluent' };
      case 'references':
        return { name: '', position: '', company: '', email: '', phone: '' };
      default:
        return {};
    }
  };

  const handleResumeUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const parsedData = await parseResume(file);
      
      // Merge parsed data with existing data
      setResumeData(prevData => ({
        ...prevData,
        personalInfo: {
          ...prevData.personalInfo,
          ...parsedData.personalInfo
        },
        professionalSummary: parsedData.professionalSummary || prevData.professionalSummary,
        workExperience: [
          ...prevData.workExperience,
          ...parsedData.workExperience
        ],
        education: [
          ...prevData.education,
          ...parsedData.education
        ],
        skills: [
          ...prevData.skills,
          ...parsedData.skills
        ],
        certifications: [
          ...prevData.certifications,
          ...parsedData.certifications
        ],
        languages: [
          ...prevData.languages,
          ...parsedData.languages
        ]
      }));

      alert('Resume imported successfully! Please review and edit the imported information.');
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to parse resume. Please try again or fill in the information manually.');
    }

    // Reset file input
    event.target.value = '';
  }, [setResumeData]);

  const renderPersonalInfo = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
        
        {/* Resume Import Section */}
        <div className="p-4 bg-blue-50 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Import Existing Resume</h3>
          <p className="text-sm text-blue-600 mb-4">
            Upload your existing resume (PDF or DOCX) to automatically fill in your information.
          </p>
          <div className="flex items-center justify-center w-full">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-200">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base">Select a file</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleResumeUpload}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={resumeData.personalInfo?.fullName || ''}
              onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              value={resumeData.personalInfo?.jobTitle || ''}
              onChange={(e) => handleInputChange('personalInfo', 'jobTitle', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={resumeData.personalInfo?.email || ''}
              onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={resumeData.personalInfo?.phone || ''}
              onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={resumeData.personalInfo?.address || ''}
              onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={resumeData.personalInfo?.city || ''}
              onChange={(e) => handleInputChange('personalInfo', 'city', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Province</label>
            <input
              type="text"
              value={resumeData.personalInfo?.province || ''}
              onChange={(e) => handleInputChange('personalInfo', 'province', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              value={resumeData.personalInfo?.postalCode || ''}
              onChange={(e) => handleInputChange('personalInfo', 'postalCode', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
            <input
              type="url"
              value={resumeData.personalInfo?.linkedin || ''}
              onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input
              type="url"
              value={resumeData.personalInfo?.website || ''}
              onChange={(e) => handleInputChange('personalInfo', 'website', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderProfessionalSummary = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
      <textarea
        value={resumeData.professionalSummary}
        onChange={(e) => handleInputChange('professionalSummary', '', e.target.value)}
        rows={6}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );

  const renderWorkExperience = () => (
    <div className="space-y-4">
      {resumeData.workExperience.map((job, index) => (
        <div key={job.id} className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Work Experience {index + 1}</h3>
            <button
              onClick={() => removeArrayItem('workExperience', index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                value={job.jobTitle}
                onChange={(e) => handleArrayItemChange('workExperience', index, 'jobTitle', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Employer</label>
              <input
                type="text"
                value={job.employer}
                onChange={(e) => handleArrayItemChange('workExperience', index, 'employer', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                value={job.city}
                onChange={(e) => handleArrayItemChange('workExperience', index, 'city', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={job.startDate}
                  onChange={(e) => handleArrayItemChange('workExperience', index, 'startDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={job.endDate}
                  onChange={(e) => handleArrayItemChange('workExperience', index, 'endDate', e.target.value)}
                  disabled={job.current}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={job.current}
                onChange={(e) => handleArrayItemChange('workExperience', index, 'current', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">I currently work here</span>
            </label>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={job.description}
              onChange={(e) => handleArrayItemChange('workExperience', index, 'description', e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => addArrayItem('workExperience')}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Add Work Experience
      </button>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      {resumeData.education.map((edu, index) => (
        <div key={edu.id} className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Education {index + 1}</h3>
            <button
              onClick={() => removeArrayItem('education', index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={edu.type}
                onChange={(e) => handleArrayItemChange('education', index, 'type', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="degree">Degree</option>
                <option value="diploma">Diploma</option>
                <option value="certificate">Certificate</option>
                <option value="course">Course</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Qualification</label>
              <input
                type="text"
                value={edu.qualification}
                onChange={(e) => handleArrayItemChange('education', index, 'qualification', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={edu.type === 'degree' ? 'e.g., Bachelor of Science' : 
                           edu.type === 'diploma' ? 'e.g., Advanced Diploma' :
                           edu.type === 'certificate' ? 'e.g., Professional Certificate' :
                           'e.g., Course Name'}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleArrayItemChange('education', index, 'institution', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) => handleArrayItemChange('education', index, 'location', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={edu.startDate}
                onChange={(e) => handleArrayItemChange('education', index, 'startDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={edu.endDate}
                onChange={(e) => handleArrayItemChange('education', index, 'endDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={edu.description}
              onChange={(e) => handleArrayItemChange('education', index, 'description', e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Add any relevant details about your qualification, achievements, or coursework"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => addArrayItem('education')}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Add Education
      </button>
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-4">
      {resumeData.certifications.map((cert, index) => (
        <div key={cert.id} className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Certification {index + 1}</h3>
            <button
              onClick={() => removeArrayItem('certifications', index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => handleArrayItemChange('certifications', index, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., AWS Certified Solutions Architect"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => handleArrayItemChange('certifications', index, 'issuer', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Amazon Web Services"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date Earned</label>
              <input
                type="date"
                value={cert.date}
                onChange={(e) => handleArrayItemChange('certifications', index, 'date', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="date"
                value={cert.expiryDate}
                onChange={(e) => handleArrayItemChange('certifications', index, 'expiryDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Credential ID</label>
            <input
              type="text"
              value={cert.credentialId}
              onChange={(e) => handleArrayItemChange('certifications', index, 'credentialId', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., AWS-123456"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={cert.description}
              onChange={(e) => handleArrayItemChange('certifications', index, 'description', e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Add any relevant details about your certification"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => addArrayItem('certifications')}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Add Certification
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      {resumeData.skills.map((skill, index) => (
        <div key={skill.id} className="flex items-center gap-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700">Skill</label>
            <input
              type="text"
              value={skill.skill}
              onChange={(e) => handleArrayItemChange('skills', index, 'skill', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700">Level</label>
            <select
              value={skill.level}
              onChange={(e) => handleArrayItemChange('skills', index, 'level', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <button
            onClick={() => removeArrayItem('skills', index)}
            className="mt-6 text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => addArrayItem('skills')}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Add Skill
      </button>
    </div>
  );

  const renderLanguages = () => (
    <div className="space-y-4">
      {resumeData.languages.map((language, index) => (
        <div key={language.id} className="flex items-center gap-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <input
              type="text"
              value={language.language}
              onChange={(e) => handleArrayItemChange('languages', index, 'language', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700">Proficiency</label>
            <select
              value={language.proficiency}
              onChange={(e) => handleArrayItemChange('languages', index, 'proficiency', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Basic">Basic</option>
              <option value="Conversational">Conversational</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>
          </div>
          <button
            onClick={() => removeArrayItem('languages', index)}
            className="mt-6 text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => addArrayItem('languages')}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Add Language
      </button>
    </div>
  );

  const renderReferences = () => (
    <div className="space-y-4">
      {resumeData.references.map((ref, index) => (
        <div key={ref.id} className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Reference {index + 1}</h3>
            <button
              onClick={() => removeArrayItem('references', index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={ref.name}
                onChange={(e) => handleArrayItemChange('references', index, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                value={ref.position}
                onChange={(e) => handleArrayItemChange('references', index, 'position', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={ref.company}
                onChange={(e) => handleArrayItemChange('references', index, 'company', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={ref.email}
                onChange={(e) => handleArrayItemChange('references', index, 'email', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={ref.phone}
              onChange={(e) => handleArrayItemChange('references', index, 'phone', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => addArrayItem('references')}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Add Reference
      </button>
    </div>
  );

  const sections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'skills', label: 'Skills' },
    { id: 'languages', label: 'Languages' },
    { id: 'references', label: 'References' }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfo();
      case 'summary':
        return renderProfessionalSummary();
      case 'experience':
        return renderWorkExperience();
      case 'education':
        return renderEducation();
      case 'certifications':
        return renderCertifications();
      case 'skills':
        return renderSkills();
      case 'languages':
        return renderLanguages();
      case 'references':
        return renderReferences();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeSection === section.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Section Content */}
      <div className="mt-6">
        {renderSection()}
      </div>
    </div>
  );
}