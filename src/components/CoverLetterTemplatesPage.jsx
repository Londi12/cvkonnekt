import React from 'react';
import { useNavigate } from 'react-router-dom';

export function CoverLetterTemplatesPage() {
  const navigate = useNavigate();
  const templates = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'A clean, formal design perfect for corporate and traditional industries.',
      features: ['Formal layout', 'Professional tone', 'Corporate-friendly', 'Easy to read'],
      preview: {
        style: 'professional',
        accent: 'border-blue-600'
      }
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'A contemporary design with a fresh, creative approach.',
      features: ['Creative layout', 'Modern aesthetics', 'Visual appeal', 'Unique typography'],
      preview: {
        style: 'modern',
        accent: 'border-purple-600'
      }
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'A clean, simple design that puts content first.',
      features: ['Clean layout', 'Focused content', 'Elegant spacing', 'Subtle styling'],
      preview: {
        style: 'minimal',
        accent: 'border-gray-300'
      }
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'A bold design for creative professionals and designers.',
      features: ['Bold design', 'Visual elements', 'Creative layout', 'Eye-catching'],
      preview: {
        style: 'creative',
        accent: 'border-pink-500'
      }
    },
  ];

  const handleTemplateSelect = (template) => {
    navigate(`/cover-letter-builder/${template.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose a Cover Letter Template
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Select a template to get started with your cover letter
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-shrink-0">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {renderTemplatePreview(template)}
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-600">
                    {template.name}
                  </p>
                  <p className="mt-2 text-base text-gray-500">
                    {template.description}
                  </p>
                </div>
                <div className="mt-4">
                  <ul className="text-sm text-gray-500 space-y-1">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleTemplateSelect(template)}
                    className="mt-4 w-full bg-blue-600 border border-transparent rounded-md py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Use This Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to render template preview
function renderTemplatePreview(template) {
  switch (template.preview.style) {
    case 'professional':
      return (
        <div className="w-full h-full p-4 bg-white">
          <div className="h-4 bg-blue-100 mb-2 rounded"></div>
          <div className="h-3 bg-gray-200 mb-1 w-3/4"></div>
          <div className="h-3 bg-gray-200 mb-4 w-1/2"></div>
          <div className="h-2 bg-gray-100 mb-1"></div>
          <div className="h-2 bg-gray-100 mb-1 w-5/6"></div>
          <div className="h-2 bg-gray-100 mb-4 w-2/3"></div>
          <div className="h-2 bg-blue-50 mb-1"></div>
          <div className="h-2 bg-blue-50 mb-1 w-4/5"></div>
        </div>
      );
    case 'modern':
      return (
        <div className="w-full h-full p-4 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="h-5 bg-purple-200 mb-3 rounded-tl-full rounded-br-full w-3/4"></div>
          <div className="h-2 bg-pink-100 mb-2 w-5/6"></div>
          <div className="h-2 bg-pink-100 mb-4 w-2/3"></div>
          <div className="h-1.5 bg-purple-100 mb-1"></div>
          <div className="h-1.5 bg-purple-100 mb-1 w-4/5"></div>
          <div className="h-1.5 bg-purple-100 mb-4 w-1/2"></div>
        </div>
      );
    case 'minimal':
      return (
        <div className="w-full h-full p-6 bg-white">
          <div className="h-6 border-b border-gray-200 mb-4"></div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-100"></div>
            <div className="h-2 bg-gray-100 w-5/6"></div>
            <div className="h-2 bg-gray-100 w-2/3"></div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="h-2 bg-gray-50"></div>
            <div className="h-2 bg-gray-50 w-5/6"></div>
          </div>
        </div>
      );
    case 'creative':
      return (
        <div className="w-full h-full p-4 bg-gradient-to-br from-pink-50 to-yellow-50">
          <div className="h-4 bg-pink-200 mb-3 transform -rotate-1"></div>
          <div className="h-3 bg-yellow-100 mb-2 w-4/5 transform rotate-1"></div>
          <div className="h-8 bg-pink-100 mb-4 w-1/2"></div>
          <div className="h-1.5 bg-pink-50 mb-1"></div>
          <div className="h-1.5 bg-yellow-50 mb-1 w-5/6"></div>
          <div className="h-1.5 bg-pink-50 mb-1 w-2/3"></div>
        </div>
      );
    default:
      return null;
  }
}

export default CoverLetterTemplatesPage;
