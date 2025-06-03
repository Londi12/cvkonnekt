import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// This is a simple resume parser that attempts to extract information from PDF/DOCX files
// You'll want to use a more sophisticated parser in production

export async function parseResume(file) {
  try {
    const text = await extractTextFromFile(file);
    return parseTextContent(text);
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw new Error('Failed to parse resume');
  }
}

async function extractTextFromFile(file) {
  const fileType = file.type.toLowerCase();

  if (fileType === 'application/pdf') {
    return extractFromPDF(file);
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return extractFromDOCX(file);
  } else {
    throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
  }
}

async function extractFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(' ') + '\n';
  }

  return text;
}

async function extractFromDOCX(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

function parseTextContent(text) {
  // This is a simple parser - you'd want to use more sophisticated methods
  // like NLP or regex patterns in production
  const sections = {
    personalInfo: extractPersonalInfo(text),
    professionalSummary: extractSummary(text),
    workExperience: extractWorkExperience(text),
    education: extractEducation(text),
    skills: extractSkills(text),
    certifications: extractCertifications(text),
    languages: extractLanguages(text)
  };

  return sections;
}

function extractPersonalInfo(text) {
  // Basic extraction of personal info using regex patterns
  const emailPattern = /[\w.-]+@[\w.-]+\.\w+/;
  const phonePattern = /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/;
  
  return {
    fullName: '', // Would need more sophisticated name detection
    email: (text.match(emailPattern) || [''])[0],
    phone: (text.match(phonePattern) || [''])[0],
    address: '',
    city: '',
    province: '',
    postalCode: '',
    linkedin: '',
    website: ''
  };
}

function extractSummary(text) {
  // Look for common summary section headers
  const summaryHeaders = [
    'Professional Summary',
    'Summary',
    'Profile',
    'About',
    'Overview'
  ];
  
  for (const header of summaryHeaders) {
    const pattern = new RegExp(`${header}[:\\s]+(.*?)(?=[A-Z][a-z]+ \\w+:|$)`, 's');
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return '';
}

function extractWorkExperience(text) {
  // Basic extraction of work experience
  const experiences = [];
  const expPattern = /(?:Work Experience|Employment|Professional Experience)[:\\s]+(.*?)(?=Education|Skills|$)/s;
  const match = text.match(expPattern);
  
  if (match && match[1]) {
    // Split into individual positions (this is a simplified approach)
    const positions = match[1].split(/\n{2,}/);
    
    positions.forEach(position => {
      if (position.trim()) {
        experiences.push({
          id: Date.now() + Math.random(),
          jobTitle: '',
          employer: '',
          city: '',
          startDate: '',
          endDate: '',
          current: false,
          description: position.trim()
        });
      }
    });
  }
  
  return experiences;
}

function extractEducation(text) {
  // Basic extraction of education
  const education = [];
  const eduPattern = /Education[:\\s]+(.*?)(?=Experience|Skills|$)/s;
  const match = text.match(eduPattern);
  
  if (match && match[1]) {
    const degrees = match[1].split(/\n{2,}/);
    
    degrees.forEach(degree => {
      if (degree.trim()) {
        education.push({
          id: Date.now() + Math.random(),
          type: 'degree',
          qualification: '',
          institution: '',
          location: '',
          startDate: '',
          endDate: '',
          description: degree.trim()
        });
      }
    });
  }
  
  return education;
}

function extractSkills(text) {
  // Basic extraction of skills
  const skills = [];
  const skillPattern = /(?:Skills|Technical Skills|Core Competencies)[:\\s]+(.*?)(?=Experience|Education|Languages|$)/s;
  const match = text.match(skillPattern);
  
  if (match && match[1]) {
    const skillsList = match[1].split(/[,•|]/).map(skill => skill.trim());
    
    skillsList.forEach(skill => {
      if (skill) {
        skills.push({
          id: Date.now() + Math.random(),
          skill: skill,
          level: 'Intermediate'
        });
      }
    });
  }
  
  return skills;
}

function extractCertifications(text) {
  // Basic extraction of certifications
  const certifications = [];
  const certPattern = /(?:Certifications|Certificates)[:\\s]+(.*?)(?=Experience|Education|Skills|$)/s;
  const match = text.match(certPattern);
  
  if (match && match[1]) {
    const certList = match[1].split(/\n{2,}/);
    
    certList.forEach(cert => {
      if (cert.trim()) {
        certifications.push({
          id: Date.now() + Math.random(),
          name: cert.trim(),
          issuer: '',
          date: '',
          expiryDate: '',
          credentialId: '',
          description: ''
        });
      }
    });
  }
  
  return certifications;
}

function extractLanguages(text) {
  // Basic extraction of languages
  const languages = [];
  const langPattern = /Languages[:\\s]+(.*?)(?=Experience|Education|Skills|$)/s;
  const match = text.match(langPattern);
  
  if (match && match[1]) {
    const langList = match[1].split(/[,•|]/).map(lang => lang.trim());
    
    langList.forEach(lang => {
      if (lang) {
        languages.push({
          id: Date.now() + Math.random(),
          language: lang,
          proficiency: 'Intermediate'
        });
      }
    });
  }
  
  return languages;
}
