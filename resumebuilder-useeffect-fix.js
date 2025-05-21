// Clear localStorage after using the saved values and advance to next step if template is loaded
useEffect(() => {
  // Check if a template was selected from the templates page
  const selectedTemplate = localStorage.getItem('selectedTemplate');
  const wasTemplateSelected = selectedTemplate !== null;
  
  // Log the template selection status for debugging
  console.log(`Template selected: ${wasTemplateSelected ? 'YES - ' + selectedTemplate : 'NO'}`);
  
  // Clear localStorage after using the values
  localStorage.removeItem('selectedTemplate');
  localStorage.removeItem('selectedCategory');
  
  // If a template was selected, automatically advance to the next step
  if (wasTemplateSelected) {
    console.log('Advancing to Personal Information step');
    setCurrentStep(1); // Go to Personal Information step
  }
}, []);
