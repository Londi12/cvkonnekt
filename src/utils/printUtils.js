// Print utility for CV Builder
// This script enhances print functionality for the CV Builder

document.addEventListener('DOMContentLoaded', function() {
  // Add print button functionality
  const printButton = document.querySelector('.print-cv-button');
  if (printButton) {
    printButton.addEventListener('click', function() {
      preparePrint();
      setTimeout(() => {
        window.print();
      }, 300);
    });
  }

  // Listen for print events
  window.addEventListener('beforeprint', preparePrint);
  window.addEventListener('afterprint', cleanupAfterPrint);
});

// Prepare the document for printing
function preparePrint() {
  // Add print-mode class to body
  document.body.classList.add('print-mode');
  
  // Find all sections in the resume preview and add print classes
  const previewContainer = document.querySelector('.resume-preview');
  if (previewContainer) {
    const sections = previewContainer.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('resume-section');
    });
    
    // Make the preview container full screen for printing
    previewContainer.classList.add('print-focused');
    
    // Ensure the container is visible and expanded
    previewContainer.style.height = 'auto';
    previewContainer.style.overflow = 'visible';
  }
}

// Clean up after printing
function cleanupAfterPrint() {
  document.body.classList.remove('print-mode');
  
  const previewContainer = document.querySelector('.resume-preview');
  if (previewContainer) {
    previewContainer.classList.remove('print-focused');
    previewContainer.style.height = '';
    previewContainer.style.overflow = '';
  }
}

// Make the utility globally available
window.resumePrintUtils = {
  preparePrint,
  cleanupAfterPrint,
  printResume: function() {
    preparePrint();
    window.print();
  }
};

console.log('CV Builder print utilities loaded');
