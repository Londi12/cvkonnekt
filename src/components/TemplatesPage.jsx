import React from 'react';
import { useNavigate } from 'react-router-dom';

export function TemplatesPage() {
  const navigate = useNavigate();
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'A contemporary design with bold elements, ideal for creative fields.',
      features: ['Bold design', 'Creative layout', 'Visual emphasis', 'Unique typography'],
      preview: {
        style: 'modern',
        accent: 'border-purple-600'
      }
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'A sophisticated design emphasizing experience and skills for executives.',
      features: ['Executive style', 'Emphasis on experience', 'Formal presentation', 'Detailed sections'],
      preview: {
        style: 'professional',
        accent: 'border-gray-800'
      }
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'A clean, simple design that puts content first with elegant spacing.',
      features: ['Spacious layout', 'Elegant design', 'Content-focused', 'Subtle styling'],
      preview: {
        style: 'minimal',
        accent: 'border-gray-300'
      }
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'A timeless design with a clean layout, perfect for traditional industries.',
      features: ['Clean layout', 'Professional look', 'Traditional formatting', 'Easy to read'],
      preview: {
        style: 'traditional',
        accent: 'border-blue-700'
      }
    },
    {
      id: 'technical',
      name: 'Technical',
      description: 'Designed for IT and engineering professionals to highlight technical skills.',
      features: ['Skills emphasis', 'Technical sections', 'Project showcase', 'Achievement-focused'],
      preview: {
        style: 'technical',
        accent: 'border-green-700'
      }
    },
    {
      id: 'graduate',
      name: 'Graduate',
      description: 'Perfect for recent graduates with limited work experience.',
      features: ['Education focus', 'Skills showcase', 'Extracurricular sections', 'Modern design'],
      preview: {
        style: 'graduate',
        accent: 'border-yellow-500'
      }
    }
  ];

  const handleTemplateSelect = (templateId) => {
    try {
      const template = templates.find(t => t.id === templateId);
      if (!template) {
        console.error('Template not found:', templateId);
        return;
      }

      // Store the selected template in localStorage
      const templateData = {
        id: template.id,
        name: template.name,
        description: template.description,
        features: template.features,
        preview: template.preview
      };
      
      localStorage.setItem('activeTemplate', JSON.stringify(templateData));
      
      // Navigate to the builder page
      navigate('/builder', { 
        state: { 
          fromTemplate: true,
          template: templateData
        }
      });
    } catch (error) {
      console.error('Error selecting template:', error);
      // Fallback to hash-based navigation if navigate fails
      window.location.hash = `builder?template=${templateId}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Resume Template
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Select a template that best represents your professional style
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{template.description}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                  <ul className="mt-2 space-y-1">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-500">
                        <svg
                          className="flex-shrink-0 mr-2 h-4 w-4 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => handleTemplateSelect(template.id)}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Use This Template
                  </button>
                </div>
              </div>
              <div className={`px-6 py-4 bg-gray-50 border-t ${template.preview.accent}`}>
                {renderTemplatePreview(template)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to render template preview
const renderTemplatePreview = (template) => {
  const getPreviewContent = (style) => {
    switch (style) {
      case 'traditional':
        return (
          <div className="bg-white p-4 border-l-4 border-blue-700">
            <div className="border-b border-gray-200 pb-2 mb-3">
              <div className="text-xl font-bold text-gray-800">John Smith</div>
              <div className="text-sm text-gray-600">Software Developer</div>
              <div className="text-xs text-gray-500 mt-1">john.smith@email.com • (555) 123-4567</div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-semibold text-gray-700">Professional Summary</div>
                <div className="text-sm text-gray-600">Experienced software developer with 5+ years in full-stack development</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-700">Experience</div>
                <div className="text-sm text-gray-600">Senior Developer • Tech Corp • 2020-Present</div>
                <div className="text-xs text-gray-500">Led development of enterprise applications</div>
              </div>
            </div>
          </div>
        );
      case 'modern':
        return (
          <div className="bg-white p-4">
            <div className="mb-4">
              <div className="text-2xl font-bold text-gray-800 tracking-tight">JOHN SMITH</div>
              <div className="text-sm text-purple-600 font-medium">SOFTWARE DEVELOPER</div>
              <div className="text-xs text-gray-500 mt-1">john.smith@email.com • (555) 123-4567</div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-bold text-gray-800">PROFESSIONAL SUMMARY</div>
                <div className="text-sm text-gray-600">Full-stack developer passionate about creating innovative solutions</div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-800">EXPERIENCE</div>
                <div className="text-sm text-gray-600">SENIOR DEVELOPER @ TECH CORP</div>
                <div className="text-xs text-gray-500">2020 - Present</div>
              </div>
            </div>
          </div>
        );
      case 'professional':
        return (
          <div className="bg-white p-4 border-t-4 border-gray-800">
            <div className="mb-4">
              <div className="text-lg font-semibold text-gray-800">John Smith</div>
              <div className="text-sm text-gray-600">Senior Software Developer</div>
              <div className="text-xs text-gray-500 mt-1">john.smith@email.com • (555) 123-4567</div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-700">Professional Summary</div>
                <div className="text-xs text-gray-600">Experienced developer with 5+ years in enterprise solutions</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Work Experience</div>
                <div className="text-xs text-gray-600">Senior Developer, Tech Corp (2020-Present)</div>
              </div>
            </div>
          </div>
        );
      case 'minimal':
        return (
          <div className="bg-white p-4">
            <div className="mb-4">
              <div className="text-lg font-light text-gray-800">John Smith</div>
              <div className="text-sm font-light text-gray-600">Developer</div>
              <div className="text-xs font-light text-gray-500 mt-1">john.smith@email.com • (555) 123-4567</div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-light text-gray-700">Summary</div>
                <div className="text-sm font-light text-gray-600">Software developer focused on clean code and user experience</div>
              </div>
              <div>
                <div className="text-sm font-light text-gray-700">Experience</div>
                <div className="text-sm font-light text-gray-600">Senior Developer, Tech Corp</div>
                <div className="text-xs font-light text-gray-500">2020 - Present</div>
              </div>
            </div>
          </div>
        );
      case 'technical':
        return (
          <div className="bg-white p-4 border-l-4 border-green-700">
            <div className="mb-4">
              <div className="text-lg font-mono text-gray-800">John Smith</div>
              <div className="text-sm font-mono text-gray-600">Full Stack Developer</div>
              <div className="text-xs font-mono text-gray-500 mt-1">john.smith@email.com • (555) 123-4567</div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-mono text-gray-700">Technical Summary</div>
                <div className="text-sm font-mono text-gray-600">Full-stack developer with focus on scalable applications</div>
              </div>
              <div>
                <div className="text-sm font-mono text-gray-700">Languages:</div>
                <div className="text-sm font-mono text-gray-600">JavaScript, Python, Java, TypeScript</div>
              </div>
            </div>
          </div>
        );
      case 'graduate':
        return (
          <div className="bg-white p-4 border-t-4 border-yellow-500">
            <div className="mb-4">
              <div className="text-lg font-semibold text-gray-800">John Smith</div>
              <div className="text-sm text-gray-600">Computer Science Graduate</div>
              <div className="text-xs text-gray-500 mt-1">john.smith@email.com • (555) 123-4567</div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-700">Education</div>
                <div className="text-sm text-gray-600">BSc Computer Science, University of Technology</div>
                <div className="text-xs text-gray-500">2019 - 2023</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Projects</div>
                <div className="text-sm text-gray-600">Web Development • Mobile Apps • Machine Learning</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return getPreviewContent(template.preview.style);
};
