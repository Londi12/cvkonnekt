import React from 'react';

export function ResumeActions({ resumeData, setResumeData }) {
  // Save resume to local storage
  const saveToLocalStorage = () => {
    try {
      const json = JSON.stringify(resumeData);
      localStorage.setItem('savedResume', json);
      alert('Your resume has been saved locally');
    } catch (error) {
      alert('Error saving resume: ' + error.message);
    }
  };

  // Load resume from local storage
  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('savedResume');
      if (saved) {
        const parsed = JSON.parse(saved);
        setResumeData(parsed);
        alert('Resume loaded successfully');
      } else {
        alert('No saved resume found');
      }
    } catch (error) {
      alert('Error loading saved resume: ' + error.message);
    }
  };

  // Export resume to a file
  const exportToFile = () => {
    try {
      if (window.resumeExportUtils) {
        window.resumeExportUtils.exportResumeData(resumeData);
      } else {
        // Fallback if utils aren't available
        const json = JSON.stringify(resumeData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `resume-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          URL.revokeObjectURL(url);
          document.body.removeChild(link);
        }, 100);
      }
    } catch (error) {
      alert('Error exporting resume: ' + error.message);
    }
  };

  // Handle file input change for importing
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setResumeData(data);
        alert('Resume imported successfully');
      } catch (error) {
        alert('Error importing resume: Invalid file format');
      }
    };
    reader.onerror = () => {
      alert('Error reading file');
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
  };
  // Generate PDF using html2pdf
  const generatePDF = async () => {
    try {
      if (window.resumeExportUtils && window.resumeExportUtils.exportToPDF) {
        const fileName = `${resumeData.personalInfo?.fullName || 'resume'}-${new Date().toISOString().split('T')[0]}.pdf`;
        await window.resumeExportUtils.exportToPDF('resume-preview', fileName);
      } else {
        // Fallback to browser print
        window.print();
      }
    } catch (error) {
      alert('Error generating PDF: ' + error.message);
    }
  };

  return (
    <div className="resume-actions mt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button 
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          onClick={saveToLocalStorage}
        >
          Save Resume
        </button>
        <button 
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          onClick={loadFromLocalStorage}
        >
          Load Saved
        </button>
        <button 
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          onClick={exportToFile}
        >
          Export File
        </button>
        <div className="relative">
          <input
            type="file"
            id="resumeImport"
            className="hidden"
            accept=".json"
            onChange={handleFileImport}
          />
          <button 
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => document.getElementById('resumeImport').click()}
          >
            Import File
          </button>
        </div>
      </div>
      <div className="mt-4">
        <button 
          className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors print-cv-button"
          onClick={generatePDF}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}
