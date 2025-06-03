import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './utils/AuthContext';
import HomePage from './components/HomePage';
import { TemplatesPage } from './components/TemplatesPage';
import BuilderPage from './components/BuilderPage';
import SignInForm from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import { DonationModal } from './components/DonationModal';
import { getResumes } from './lib/supabase';
import { getTemplateComponent } from './utils/templateUtils.jsx';

function AppRoutes() {
  const { user, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(() => {
    const saved = localStorage.getItem('activeTemplate');
    return saved ? JSON.parse(saved) : { id: 'modern', name: 'Modern' };
  });
  const [activeSection, setActiveSection] = useState(() => {
    const saved = localStorage.getItem('activeSection');
    return saved ? JSON.parse(saved) : 'personal';
  });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : { personal: {}, education: [], experience: [], skills: [], projects: [] };
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setCurrentPage(hash);
    } else {
      setCurrentPage('home');
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        isAuthenticated={isAuthenticated}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/builder" element={
          <BuilderPage 
            activeTemplate={activeTemplate}
            setActiveTemplate={setActiveTemplate}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            resumeData={resumeData}
            setResumeData={setResumeData}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            saving={saving}
            setSaving={setSaving}
            lastSaved={lastSaved}
            setLastSaved={setLastSaved}
          />
        } />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
      <Footer />
      <DonationModal 
        open={donationModalOpen}
        setOpen={setDonationModalOpen}
      />
    </div>
  );

  useEffect(() => {
    const fetchResumes = async () => {
      if (isAuthenticated) {
        try {
          const resumes = await getResumes();
          if (resumes && resumes.length > 0) {
            const latest = resumes[0];
            setResumeData(latest.data);
            localStorage.setItem('resumeData', JSON.stringify(latest.data));
          }
        } catch (err) {
          console.error("Error fetching resume data:", err);
        }
      }
    };
    fetchResumes();
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('activeTemplate', JSON.stringify(activeTemplate));
  }, [activeTemplate]);

  useEffect(() => {
    localStorage.setItem('activeSection', JSON.stringify(activeSection));
  }, [activeSection]);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const handleNav = (page) => {
    setCurrentPage(page);
    navigate(`#${page}`);
  };

  const TemplateComponent = getTemplateComponent(activeTemplate.id);

  // Render the appropriate page (or builder) based on currentPage.
  let pageComponent = null;
  switch (currentPage) {
    case 'home':
      pageComponent = <HomePage onNav={handleNav} />;
      break;
    case 'templates':
      pageComponent = <TemplatesPage onNav={handleNav} onSelectTemplate={setActiveTemplate} />;
      break;
    case 'builder':
      pageComponent = (
        <BuilderPage
          activeTemplate={activeTemplate}
          activeSection={activeSection}
          resumeData={resumeData}
          onUpdateResumeData={setResumeData}
          onSetActiveSection={setActiveSection}
          onSetFormErrors={setFormErrors}
          onSaving={setSaving}
          onLastSaved={setLastSaved}
        />
      );
      break;
    case 'signin':
      pageComponent = <SignInForm onNav={handleNav} />;
      break;
    case 'signup':
      pageComponent = <SignUpForm onNav={handleNav} />;
      break;
    default:
      pageComponent = <HomePage onNav={handleNav} />;
  }

  // Render the donation modal (if open) and the app (with Navbar, Footer, and the page (or builder) component).
  return (
    <>
      {donationModalOpen && <DonationModal onClose={() => setDonationModalOpen(false)} />}
      <Navbar
        onNav={handleNav}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onOpenDonationModal={() => setDonationModalOpen(true)}
      />
      {currentPage === 'builder' ? (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {pageComponent}
          {TemplateComponent && <TemplateComponent resumeData={resumeData} />}
        </div>
      ) : ( pageComponent )}
      <Footer onOpenDonationModal={() => setDonationModalOpen(true)} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
