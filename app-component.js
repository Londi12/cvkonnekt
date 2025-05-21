// App Component with proper hash change logic
const App = () => {
  const [currentPage, setCurrentPage] = React.useState('home');
  
  React.useEffect(() => {
    const handleHashChange = () => {
      // Get the hash without the #
      const hashParts = window.location.hash.slice(1).split('?');
      const hash = hashParts[0] || 'home';
      
      console.log(`Hash changed to: ${hash}, full hash: ${window.location.hash}`);
      
      // Check for URL parameters
      if (hashParts.length > 1 && hash === 'builder') {
        const params = new URLSearchParams(hashParts[1]);
        const template = params.get('template');
        const category = params.get('category');
        
        console.log(`Found template parameters: category=${category}, template=${template}`);
        
        // Store the template selection in localStorage if provided
        if (template && category) {
          localStorage.setItem('selectedTemplate', template);
          localStorage.setItem('selectedCategory', category);
          console.log('Stored template selection in localStorage');
        }
      }
      
      setCurrentPage(hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial call to handle page load with hash
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  return (
    <React.Fragment>
      <Navbar currentPage={currentPage} />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'builder' && <ResumeBuilder />}
      {currentPage === 'templates' && <TemplatesPage />}
      {currentPage === 'contact' && <ContactPage />}
    </React.Fragment>
  );
};
