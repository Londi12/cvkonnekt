import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './utils/AuthContext';
import HomePage from './components/HomePage';
import { ContactPage } from './components/ContactPage';
import { TemplatesPage } from './components/TemplatesPage';
import BuilderPage from './components/BuilderPage';
import { CoverLetterTemplatesPage } from './components/CoverLetterTemplatesPage';
import CoverLetterBuilder from './components/CoverLetterBuilder';
import SignInForm from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';
import { Navbar } from './components/Navbar';
import PricingPage from './pages/PricingPage';
import SubscribePage from './pages/SubscribePage';
import AuthCallback from './pages/AuthCallback';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { getResumes } from './lib/supabase';
import { getTemplateComponent } from './utils/templateUtils.jsx';

function AppRoutes() {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState({ id: 'modern', name: 'Modern' });
  const [activeSection, setActiveSection] = useState('personal');
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [resumeData, setResumeData] = useState({
    personalInfo: {},
    professionalSummary: '',
    workExperience: [],
    education: [],
    certifications: [],
    skills: [],
    languages: [],
    references: [],
    projects: []
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleSave = async () => {
    // implement save logic here
  };

  // Fetch resumes when authenticated
  useEffect(() => {
    const fetchResumes = async () => {
      if (!isAuthenticated) return;
      
      try {
        console.log('Fetching resumes for authenticated user...');
        const resumes = await getResumes();
        console.log('Fetched resumes:', resumes);
        
        if (resumes && resumes.length > 0) {
          const latest = resumes[0];
          console.log('Setting resume data:', latest);
          setResumeData(latest.data);
        } else {
          console.log('No resumes found for user');
          // Reset to default empty state if no resumes found
          setResumeData({
            personal: {},
            education: [],
            experience: [],
            skills: [],
            projects: []
          });
        }
      } catch (err) {
        console.error("Error fetching resume data:", err);
        // Reset to default empty state on error
        setResumeData({
          personal: {},
          education: [],
          experience: [],
          skills: [],
          projects: []
        });
      }
    };
    
    // Add a small delay to ensure auth state is fully initialized
    const timer = setTimeout(fetchResumes, 300);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  // State is now managed in-memory only

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar 
        isAuthenticated={isAuthenticated}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="flex-1 pt-16 relative z-10">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/signin"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" state={{ from: location }} replace />
              ) : (
                <SignInForm onSuccess={() => {
                  const from = location.state?.from?.pathname || '/dashboard';
                  navigate(from, { replace: true });
                }} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" state={{ from: location }} replace />
              ) : (
                <SignUpForm onSuccess={() => {
                  const from = location.state?.from?.pathname || '/dashboard';
                  navigate(from, { replace: true });
                }} />
              )
            }
          />
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
            path="/cover-letters"
            element={
              <CoverLetterTemplatesPage />
            }
          />
          <Route
            path="/cover-letter-builder/:templateId"
            element={
              <CoverLetterBuilder />
            }
          />
          <Route
            path="/builder"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <BuilderPage
                  activeTemplate={activeTemplate}
                  setActiveTemplate={setActiveTemplate}
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  formErrors={formErrors}
                  onSave={handleSave}
                  saving={saving}
                  lastSaved={lastSaved}
                />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/subscribe/:planId" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SubscribePage />
            </ProtectedRoute>
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
