import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// Regular expressions for extracting information
const patterns = {
  email: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
  phone: /(?:\+?\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
  // Look for dates in various formats (improved)
  dates: /(?:(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)[,.\s]+)?(?:\d{1,2}[,.\s]+)?\d{4}|(?:\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/gi,
  // Look for education keywords (expanded)
  education: /(?:Bachelor|Master|PhD|BSc|MSc|BA|MA|MBA|BBA|MD|JD|BS|MS|Associates?|Diploma|Certificate|Degree)[,\s]+(?:of|in|on)?\s+([^,\n]+)/gi,
  // Look for job titles (expanded)
  jobTitle: /(?:Senior|Lead|Junior|Principal|Staff)?\s*(?:Software Engineer|Developer|Programmer|Architect|Manager|Director|Consultant|Analyst|Designer|Specialist|Coordinator|Administrator|Engineer|Supervisor|Executive|Officer|Associate|Professional|Expert)/gi,
  // Look for section headers
  sectionHeaders: /(?:^|\n\n)(?:PROFILE|SUMMARY|OBJECTIVE|EXPERIENCE|EMPLOYMENT|WORK HISTORY|EDUCATION|SKILLS|CERTIFICATIONS|AWARDS|LANGUAGES|VOLUNTEER)(?:\:|\n)/gi,
  // Look for skills (common programming languages, tools, and frameworks)
  skills: /(?:JavaScript|Python|Java|C\+\+|C#|Ruby|PHP|Swift|Kotlin|Go|SQL|HTML|CSS|React|Angular|Vue|Node\.js|Express|Django|Spring|AWS|Azure|GCP|Docker|Kubernetes|Git|Agile|Scrum|DevOps)/gi,
  // Look for locations
  location: /(?:[A-Z][a-z]+(?:[\s-]+[A-Z][a-z]+)*,\s+[A-Z]{2}|[A-Z][a-z]+(?:[\s-]+[A-Z][a-z]+)*)/g
};

class ParsingError extends Error {
  constructor(message, section) {
    super(message);
    this.name = 'ParsingError';
    this.section = section;
  }
}

// Main parser class
export class ResumeParser {
  constructor() {
    this.text = '';
    this.sections = {};
  }

  // Extract text from PDF with enhanced error handling
  async parsePDF(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      
      if (pdf.numPages === 0) {
        throw new ParsingError('The PDF file appears to be empty.', 'general');
      }

      let text = '';
      let failedPages = [];
      
      for (let i = 1; i <= pdf.numPages; i++) {
        try {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(' ') + '\n';
        } catch (error) {
          failedPages.push(i);
          console.warn(`Failed to parse page ${i}:`, error);
        }
      }

      if (text.trim().length === 0) {
        throw new ParsingError('Could not extract any text from the PDF. The file may be scanned or protected.', 'general');
      }

      if (failedPages.length > 0) {
        console.warn(`Failed to parse pages: ${failedPages.join(', ')}`);
      }
      
      this.text = text;
      this.splitIntoSections();
      return this.extractInformation();
    } catch (error) {
      if (error instanceof ParsingError) {
        throw error;
      }
      throw new ParsingError(`Failed to parse PDF: ${error.message}`, 'general');
    }
  }

  // Extract text from DOCX with enhanced error handling
  async parseDOCX(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      if (!result.value) {
        throw new ParsingError('Could not extract any text from the DOCX file.', 'general');
      }

      if (result.messages.length > 0) {
        console.warn('DOCX parsing warnings:', result.messages);
      }

      this.text = result.value;
      this.splitIntoSections();
      return this.extractInformation();
    } catch (error) {
      if (error instanceof ParsingError) {
        throw error;
      }
      throw new ParsingError(`Failed to parse DOCX: ${error.message}`, 'general');
    }
  }

  // Split text into sections based on headers
  splitIntoSections() {
    this.sections = {};
    const sectionMatches = Array.from(this.text.matchAll(patterns.sectionHeaders));
    
    if (sectionMatches.length === 0) {
      // If no section headers found, try to infer sections from content
      this.inferSections();
      return;
    }

    for (let i = 0; i < sectionMatches.length; i++) {
      const currentMatch = sectionMatches[i];
      const nextMatch = sectionMatches[i + 1];
      
      const sectionName = currentMatch[0].trim().replace(/[:]/g, '').toLowerCase();
      const startIndex = currentMatch.index + currentMatch[0].length;
      const endIndex = nextMatch ? nextMatch.index : this.text.length;
      
      this.sections[sectionName] = this.text.slice(startIndex, endIndex).trim();
    }
  }

  // Infer sections when no clear headers are found
  inferSections() {
    // Try to identify sections based on content patterns
    const lines = this.text.split('\n');
    let currentSection = null;
    
    for (const line of lines) {
      if (patterns.email.test(line) || patterns.phone.test(line)) {
        this.sections.personal = this.sections.personal || '';
        this.sections.personal += line + '\n';
      } else if (patterns.dates.test(line) && patterns.jobTitle.test(line)) {
        this.sections.experience = this.sections.experience || '';
        this.sections.experience += line + '\n';
      } else if (patterns.education.test(line)) {
        this.sections.education = this.sections.education || '';
        this.sections.education += line + '\n';
      } else if (patterns.skills.test(line)) {
        this.sections.skills = this.sections.skills || '';
        this.sections.skills += line + '\n';
      }
    }
  }

  // Extract structured information from text
  extractInformation() {
    try {
      const info = {
        personalInfo: this.extractPersonalInfo(),
        professionalSummary: this.extractSummary(),
        workExperience: this.extractWorkExperience(),
        education: this.extractEducation(),
        skills: this.extractSkills()
      };

      // Validate extracted information
      this.validateExtractedInfo(info);

      return info;
    } catch (error) {
      throw new ParsingError(`Failed to extract resume information: ${error.message}`, error.section || 'general');
    }
  }

  validateExtractedInfo(info) {
    if (!info.personalInfo.email && !info.personalInfo.phone) {
      throw new ParsingError('Could not find contact information (email or phone).', 'personal');
    }

    if (info.workExperience.length === 0 && info.education.length === 0) {
      throw new ParsingError('Could not find any work experience or education information.', 'experience');
    }
  }

  extractPersonalInfo() {
    const personalInfo = {
      fullName: this.extractFullName(),
      email: this.extractEmail(),
      phone: this.extractPhone(),
      jobTitle: this.extractJobTitle(),
      location: this.extractLocation()
    };

    return personalInfo;
  }

  extractFullName() {
    // Look for potential name at the start of the document
    const firstLines = this.text.split('\n').slice(0, 3);
    for (let line of firstLines) {
      line = line.trim();
      // Look for a line with 2-3 words that could be a name (improved regex)
      if (/^[A-Z][a-z]{1,20}(?:[\s-][A-Z][a-z]{1,20}){1,2}$/.test(line)) {
        return line;
      }
    }
    return '';
  }

  extractEmail() {
    const matches = this.text.match(patterns.email);
    return matches ? matches[0].toLowerCase() : '';
  }

  extractPhone() {
    const matches = this.text.match(patterns.phone);
    return matches ? matches[0].replace(/[^\d+]/g, '') : '';
  }

  extractJobTitle() {
    const matches = this.text.match(patterns.jobTitle);
    return matches ? matches[0].replace(/^\s+|\s+$/g, '') : '';
  }

  extractLocation() {
    const matches = this.text.match(patterns.location);
    return matches ? matches[0] : '';
  }

  extractSummary() {
    // First check if we have a dedicated summary section
    if (this.sections.summary || this.sections.profile || this.sections.objective) {
      const summarySection = this.sections.summary || this.sections.profile || this.sections.objective;
      return summarySection.slice(0, 500).trim();
    }

    // Otherwise look for sections that might contain a summary
    const sections = this.text.split(/\n{2,}/);
    for (let section of sections) {
      if (
        /summary|profile|objective/i.test(section) &&
        section.length > 50 &&
        section.length < 500
      ) {
        // Remove the heading and return the content
        return section.replace(/^[^:]*:/, '').trim();
      }
    }
    return '';
  }

  extractWorkExperience() {
    const experiences = [];
    
    // First try to use the dedicated experience section
    const experienceText = this.sections.experience || this.sections['work history'] || this.sections.employment;
    
    if (experienceText) {
      const entries = experienceText.split(/\n{2,}/);
      
      for (const entry of entries) {
        const lines = entry.split('\n').filter(line => line.trim());
        if (lines.length < 2) continue;

        const dates = entry.match(patterns.dates) || [];
        const jobTitle = entry.match(patterns.jobTitle)?.[0] || lines[0].trim();
        
        experiences.push({
          jobTitle: jobTitle,
          employer: lines[1]?.replace(jobTitle, '').trim() || '',
          location: this.extractLocation(entry) || '',
          startDate: dates[0] || '',
          endDate: dates[1] || 'Present',
          description: lines.slice(2).join('\n').trim()
        });
      }
    }

    return experiences;
  }

  extractEducation() {
    const education = [];
    
    // First try to use the dedicated education section
    const educationText = this.sections.education || this.sections.academics;
    
    if (educationText) {
      const entries = educationText.split(/\n{2,}/);
      
      for (const entry of entries) {
        const lines = entry.split('\n').filter(line => line.trim());
        if (lines.length < 2) continue;

        const degreeMatch = entry.match(patterns.education);
        const dates = entry.match(patterns.dates) || [];
        
        if (degreeMatch) {
          education.push({
            type: this.getEducationType(degreeMatch[0]),
            qualification: degreeMatch[0],
            institution: lines[1]?.trim() || '',
            location: this.extractLocation(entry) || '',
            startDate: dates[0] || '',
            endDate: dates[1] || '',
            description: lines.slice(2).join('\n').trim()
          });
        }
      }
    }

    return education;
  }

  getEducationType(degree) {
    const lowerDegree = degree.toLowerCase();
    if (/bachelor|bsc|ba|bs/i.test(lowerDegree)) return 'degree';
    if (/master|msc|ma|mba|ms/i.test(lowerDegree)) return 'degree';
    if (/phd|doctorate/i.test(lowerDegree)) return 'degree';
    if (/diploma/i.test(lowerDegree)) return 'diploma';
    if (/certificate/i.test(lowerDegree)) return 'certificate';
    if (/course/i.test(lowerDegree)) return 'course';
    return 'degree';
  }

  extractSkills() {
    const skillsSet = new Set();
    
    // First try to use the dedicated skills section
    const skillsText = this.sections.skills || this.sections.technologies || this.sections.competencies;
    
    if (skillsText) {
      // Extract skills listed after the heading
      const matches = skillsText.match(patterns.skills) || [];
      matches.forEach(skill => skillsSet.add(skill.trim()));
      
      // Also look for bullet points or comma-separated lists
      skillsText
        .split(/[,|•]/)
        .map(skill => skill.trim())
        .filter(skill => skill.length > 2)
        .forEach(skill => skillsSet.add(skill));
    }
    
    // Also look for skills mentioned in experience sections
    if (this.sections.experience) {
      const matches = this.sections.experience.match(patterns.skills) || [];
      matches.forEach(skill => skillsSet.add(skill.trim()));
    }
    
    return Array.from(skillsSet)
      .filter(skill => skill.length > 0)
      .map(skill => ({ skill, level: 'Intermediate' }));
  }
}

// Factory function to create parser instance
export async function parseResume(file) {
  if (!file) {
    throw new ParsingError('No file provided.', 'general');
  }

  const parser = new ResumeParser();
  
  if (file.name.toLowerCase().endsWith('.pdf')) {
    return await parser.parsePDF(file);
  } else if (file.name.toLowerCase().endsWith('.docx')) {
    return await parser.parseDOCX(file);
  } else {
    throw new ParsingError('Unsupported file format. Please upload a PDF or DOCX file.', 'general');
  }
}
