import html2pdf from 'html2pdf.js';

// Export utility for CV Builder
// This script enables exporting resume data as a file

// Create a download function
function downloadJsonFile(data, filename) {
  // Convert data to JSON string
  const jsonData = JSON.stringify(data, null, 2);
  
  // Create a blob with the data
  const blob = new Blob([jsonData], { type: 'application/json' });
  
  // Create a link to download the blob
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'resume-data.json';
  
  // Add link to the document
  document.body.appendChild(link);
  
  // Click the link to start download
  link.click();
  
  // Clean up
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
}

// Function to trigger download of resume data
function exportResumeData(resumeData) {
  const name = resumeData.personalInfo.fullName || 'resume';
  const cleanName = name.toLowerCase().replace(/\s+/g, '-');
  const date = new Date().toISOString().split('T')[0];
  const filename = `${cleanName}-${date}.json`;
  
  downloadJsonFile(resumeData, filename);
}

// Function to read a file and return its contents
function readJsonFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
}

// Function to export resume as PDF
async function exportToPDF(elementId, filename) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume element not found');
  }

  // PDF generation options
  const opt = {
    margin: [10, 10],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait'
    }
  };

  try {
    // Generate PDF
    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

// Make the utility globally available
window.resumeExportUtils = {
  exportResumeData,
  readJsonFile,
  exportToPDF
};

console.log('CV Builder export utilities loaded');
