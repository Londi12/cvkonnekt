import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowDownTrayIcon, PencilIcon, EyeIcon, DocumentArrowUpIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CoverLetterParser } from '../utils/coverLetterParser';

export function CoverLetterBuilder() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState({ loading: false, error: null });
  
  const [coverLetterData, setCoverLetterData] = useState({
    recipient: {
      name: '',
      position: '',
      company: '',
      address: ''
    },
    date: '',
    salutation: '',
    body: '',
    closing: '',
    signature: '',
    isEditing: true
  });

  const [isEditing, setIsEditing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);


  const handleInputChange = (section, field, value) => {
    setCoverLetterData(prev => ({
      ...prev,
      [section]: field === 'recipient' ? {
        ...prev.recipient,
        ...value
      } : value
    }));
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setCoverLetterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['.pdf', '.docx', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.some(type => file.type.includes(type) || file.name.toLowerCase().endsWith(type))) {
      setUploadStatus({
        loading: false,
        error: 'Invalid file type. Please upload a PDF, DOCX, or TXT file.'
      });
      event.target.value = '';
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setUploadStatus({
        loading: false,
        error: 'File is too large. Maximum size is 5MB.'
      });
      event.target.value = '';
      return;
    }

    setUploadStatus({ loading: true, error: null });

    try {
      const parsedData = await CoverLetterParser.parseCoverLetter(file);
      
      // Update the form with parsed data
      setCoverLetterData(prev => ({
        ...prev,
        recipient: {
          ...prev.recipient,
          name: parsedData.recipient?.name || prev.recipient.name,
          company: parsedData.recipient?.company || prev.recipient.company,
          address: parsedData.recipient?.address || prev.recipient.address
        },
        date: parsedData.date || prev.date,
        salutation: parsedData.salutation || prev.salutation,
        body: parsedData.body || prev.body,
        closing: parsedData.closing || prev.closing,
        signature: parsedData.signature || prev.signature
      }));
      
      setUploadStatus({ loading: false, error: null });
    } catch (error) {
      console.error('Error parsing cover letter:', error);
      setUploadStatus({
        loading: false,
        error: error.message || 'Failed to parse cover letter. Please try another file.'
      });
    }
    
    // Reset file input
    event.target.value = '';
  }, []);

  const handleDownload = async () => {
    const element = document.getElementById('cover-letter-preview');
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('cover-letter.pdf');
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 'professional':
        return renderProfessionalTemplate();
      case 'modern':
        return renderModernTemplate();
      case 'minimal':
        return renderMinimalTemplate();
      case 'creative':
        return renderCreativeTemplate();
      default:
        return renderProfessionalTemplate();
    }
  };

  const renderProfessionalTemplate = () => (
    <div className="bg-white p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        {isEditing ? (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  value={coverLetterData.recipient.name || ''}
                  onChange={(e) => handleInputChange('recipient', 'name', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="text"
                  value={coverLetterData.date}
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Recipient's Name</label>
                <input
                  type="text"
                  value={coverLetterData.recipient.name || ''}
                  onChange={(e) => handleInputChange('recipient', 'name', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  value={coverLetterData.recipient.company || ''}
                  onChange={(e) => handleInputChange('recipient', 'company', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  value={coverLetterData.recipient.address || ''}
                  onChange={(e) => handleInputChange('recipient', 'address', e.target.value)}
                  rows="2"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-right">{coverLetterData.date}</div>
            <div className="mt-6">
              <div>{coverLetterData.recipient.name || 'Hiring Manager'}</div>
              <div>{coverLetterData.recipient.position}</div>
              <div>{coverLetterData.recipient.company}</div>
              <div className="whitespace-pre-line">{coverLetterData.recipient.address}</div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Salutation</label>
              <input
                type="text"
                name="salutation"
                value={coverLetterData.salutation}
                onChange={handleTextareaChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Body</label>
              <textarea
                name="body"
                value={coverLetterData.body}
                onChange={handleTextareaChange}
                rows="12"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Closing</label>
              <input
                type="text"
                name="closing"
                value={coverLetterData.closing}
                onChange={handleTextareaChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mt-8">
              <div className="h-px bg-gray-200 my-4"></div>
              <input
                type="text"
                name="signature"
                value={coverLetterData.signature}
                onChange={handleTextareaChange}
                placeholder="Your name"
                className="mt-1 block w-full border-b border-gray-300 py-1 px-0 focus:outline-none focus:ring-0 focus:border-gray-400 text-lg"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="font-medium">{coverLetterData.salutation}</div>
            <div className="whitespace-pre-line">{coverLetterData.body}</div>
            <div className="mt-8">
              <div>{coverLetterData.closing}</div>
              <div className="mt-8">
                <div className="h-px bg-gray-200 my-4 w-32"></div>
                <div className="text-lg">{coverLetterData.signature || 'Your Name'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderModernTemplate = () => (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 max-w-3xl mx-auto">
      {/* Similar structure as professional but with modern styling */}
      {renderProfessionalTemplate()}
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className="bg-white p-12 max-w-3xl mx-auto">
      {/* Similar structure as professional but with minimal styling */}
      {renderProfessionalTemplate()}
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className="bg-gradient-to-br from-pink-50 to-yellow-50 p-8 max-w-3xl mx-auto">
      {/* Similar structure as professional but with creative styling */}
      {renderProfessionalTemplate()}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/templates/cover-letter')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Templates
          </button>
          <div className="flex space-x-3">
            <div className="relative">
              <input
                type="file"
                id="coverLetterImport"
                accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="coverLetterImport"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                title="Import existing cover letter"
              >
                <DocumentArrowUpIcon className="h-5 w-5 mr-2 text-gray-500" />
                Import Cover Letter
              </label>
              {uploadStatus.loading && (
                <div className="absolute -bottom-6 left-0 right-0 text-center text-sm text-blue-600">
                  Processing...
                </div>
              )}
              {uploadStatus.error && (
                <div className="absolute -bottom-6 left-0 right-0 text-center text-sm text-red-600">
                  {uploadStatus.error}
                </div>
              )}
            </div>
            <button
              onClick={toggleEdit}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isEditing ? (
                <>
                  <EyeIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                  Preview
                </>
              ) : (
                <>
                  <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                  Edit
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
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" />
              Download
            </button>
          </div>
        </div>

        <div id="cover-letter-preview" className="shadow-lg">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}

export default CoverLetterBuilder;
