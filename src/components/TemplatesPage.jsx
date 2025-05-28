import React from 'react';
import { useNavigate } from 'react-router-dom';

export function TemplatesPage() {
  const navigate = useNavigate();

  const templates = [
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
      id: 'minimalist',
      name: 'Minimalist',
      description: 'A clean, simple design that puts content first with elegant spacing.',
      features: ['Spacious layout', 'Elegant design', 'Content-focused', 'Subtle styling'],
      preview: {
        style: 'minimalist',
        accent: 'border-gray-300'
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
      // Store the selected template in localStorage
      localStorage.setItem('selectedTemplate', templateId);
      
      // Navigate to the builder page
      navigate('builder', { state: { templateId } });
    } catch (error) {
      console.error('Error selecting template:', error);
      // Fallback to hash-based navigation if navigate fails
      window.location.hash = `builder?template=${templateId}`;
    }
  };

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
                <div>
                  <div className="text-sm font-semibold text-gray-700">Skills</div>
                  <div className="text-sm text-gray-600">JavaScript, React, Node.js, Python, SQL</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700">Education</div>
                  <div className="text-sm text-gray-600">BSc Computer Science • University of Technology • 2015-2019</div>
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
                <div>
                  <div className="text-sm font-bold text-gray-800">SKILLS</div>
                  <div className="text-sm text-gray-600">JavaScript • React • Node.js • Python • SQL</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">EDUCATION</div>
                  <div className="text-sm text-gray-600">BSc Computer Science • University of Technology</div>
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
                  <div className="text-xs text-gray-500">• Led development of enterprise applications</div>
                  <div className="text-xs text-gray-500">• Managed team of 5 developers</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Key Skills</div>
                  <div className="text-xs text-gray-600">Leadership • Architecture • Development • Project Management</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Education</div>
                  <div className="text-xs text-gray-600">BSc Computer Science, University of Technology (2015-2019)</div>
                </div>
              </div>
            </div>
          );
        case 'minimalist':
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
                <div>
                  <div className="text-sm font-light text-gray-700">Skills</div>
                  <div className="text-sm font-light text-gray-600">JavaScript, React, Node.js, Python</div>
                </div>
                <div>
                  <div className="text-sm font-light text-gray-700">Education</div>
                  <div className="text-sm font-light text-gray-600">BSc Computer Science, University of Technology</div>
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
                <div>
                  <div className="text-sm font-mono text-gray-700">Frameworks:</div>
                  <div className="text-sm font-mono text-gray-600">React, Node.js, Django, Spring Boot</div>
                </div>
                <div>
                  <div className="text-sm font-mono text-gray-700">Experience:</div>
                  <div className="text-sm font-mono text-gray-600">Senior Developer @ Tech Corp (2020-Present)</div>
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
                <div>
                  <div className="text-sm font-medium text-gray-700">Skills</div>
                  <div className="text-sm text-gray-600">JavaScript, React, Python, SQL, Git</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Internships</div>
                  <div className="text-sm text-gray-600">Software Development Intern, Tech Corp (2022)</div>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="h-64 bg-gray-50 p-4 flex flex-col justify-between overflow-y-auto">
        {getPreviewContent(template.preview.style)}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">CV Templates</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Choose from our professionally designed templates, each crafted to help you stand out in the South African job market.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
              {renderTemplatePreview(template)}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-blue-700">{template.name}</h2>
                <p className="text-gray-600 mb-4">{template.description}</p>
                
                <h3 className="text-lg font-medium mb-2">Features:</h3>
                <ul className="list-disc pl-5 mb-6 text-gray-700">
                  {template.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handleTemplateSelect(template.id)}
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-100 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-center">Can't Find What You're Looking For?</h2>
          <p className="text-gray-700 mb-6 text-center">
            We're constantly adding new templates. Let us know what you're looking for, and we'll consider adding it in our next update.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => navigate('contact')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Request a Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
