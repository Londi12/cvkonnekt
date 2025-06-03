import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './utils/AuthContext';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
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
  const [currentPage, setCurrentPage] = useState('home');
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
    const path = location.pathname.slice(1) || 'home';
    setCurrentPage(path);
  }, [location]);

  const handleSave = async () => {
    // implement save logic here
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        isAuthenticated={isAuthenticated}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <HomePage
              onGetStarted={() => navigate('/templates')}
              onDonate={() => setDonationModalOpen(true)}
            />
          }
        />
        <Route
          path="/templates"
          element={
            <TemplatesPage
              onTemplateSelect={(template) => {
                setActiveTemplate(template);
                navigate('/builder');
              }}
            />
          }
        />
        <Route
          path="/builder"
          element={
            <BuilderPage
              activeTemplate={activeTemplate}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              saving={saving}
              lastSaved={lastSaved}
              resumeData={resumeData}
              setResumeData={setResumeData}
              onSave={handleSave}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
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
