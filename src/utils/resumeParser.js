import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';

// Initialize PDF.js worker
const pdfjsWorker = new URL('pdfjs-dist/build/pdf.worker.js', import.meta.url);
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Regular expressions for extracting information
const patterns = {
  email: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
  phone: /(?:\+?\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
  // Look for dates in various formats (improved)
  dates: /(?:(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)[,\.\s]+)?(?:\d{1,2}[,\.\s]+)?\d{4}|(?:\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})|(?:\d{4})/gi,
  // Look for education keywords (expanded)
  education: /(?:Bachelor|Master|PhD|BSc|MSc|BA|MA|MBA|BBA|MD|JD|BS|MS|Associates?|Diploma|Certificate|Degree)[,\s]+(?:of|in|on)?\s+([^,\n]+)/gi,
  // Look for job titles (expanded)
  jobTitle: /(?:Senior|Lead|Junior|Principal|Staff|Chief|Head|Assistant|Associate|Intern|Officer|Director|Manager|Supervisor|Coordinator|Specialist|Consultant|Analyst|Engineer|Developer|Programmer|Architect|Designer|Administrator|Teacher|Professor|Instructor|Accountant|Auditor|Nurse|Doctor|Physician|Therapist|Scientist|Researcher|Writer|Editor|Reporter|Producer|Artist|Photographer|Chef|Cook|Waiter|Bartender|Driver|Mechanic|Technician|Operator|Agent|Representative|Advisor|Planner|Buyer|Seller|Trader|Broker|Attorney|Lawyer|Paralegal|Clerk|Receptionist|Secretary|Assistant|Executive|President|Vice President|Chair|Member|Volunteer|Student|Graduate|Fellow|Scholar|Mentor|Coach|Trainer|Leader|Member|Partner|Owner|Founder|Co-Founder|Entrepreneur|Consultant|Freelancer|Contractor|Temp|Seasonal|Part-time|Full-time|Remote|Hybrid|Onsite)/gi,
  // Look for section headers
  sectionHeaders: /(?:^|\n\n)(?:PROFILE|SUMMARY|OBJECTIVE|EXPERIENCE|EMPLOYMENT|WORK HISTORY|EDUCATION|SKILLS|CERTIFICATIONS|AWARDS|LANGUAGES|VOLUNTEER|ABOUT|CAREER|PROFESSIONAL|ACADEMIC|TECHNICAL|PROJECTS|ACHIEVEMENTS|INTERESTS|REFERENCES)(?:\:|\n|$)/gi,
  // Look for skills (common programming languages, tools, and frameworks)
  skills: /(?:JavaScript|Python|Java|C\+\+|C#|Ruby|PHP|Swift|Kotlin|Go|SQL|HTML|CSS|React|Angular|Vue|Node\.js|Express|Django|Spring|AWS|Azure|GCP|Docker|Kubernetes|Git|Agile|Scrum|DevOps|Excel|Word|PowerPoint|Outlook|Photoshop|Illustrator|Figma|Canva|Communication|Leadership|Teamwork|Problem-solving|Critical thinking|Time management|Organization|Creativity|Adaptability|Attention to detail|Customer service|Sales|Marketing|Negotiation|Presentation|Writing|Editing|Research|Data analysis|Project management|Public speaking|Collaboration|Self-motivation|Multitasking|Conflict resolution|Decision making|Networking|Mentoring|Coaching|Training|Planning|Budgeting|Scheduling|Supervision|Delegation|Strategy|Analytics|Compliance|Risk management|Quality assurance|Testing|Support|Troubleshooting|Documentation|Reporting|Sourcing|Procurement|Logistics|Inventory|Supply chain|Operations|Maintenance|Security|Safety|Health|Wellness|Caregiving|Teaching|Tutoring|Instruction|Counseling|Therapy|Medical|Nursing|Healthcare|Legal|Finance|Accounting|Bookkeeping|Auditing|Tax|Investment|Banking|Insurance|Real estate|Construction|Manufacturing|Production|Design|Art|Music|Film|Photography|Writing|Editing|Translation|Transcription|Interpretation|Travel|Hospitality|Food service|Retail|E-commerce|Transportation|Driving|Delivery|Warehouse|Cleaning|Janitorial|Landscaping|Agriculture|Farming|Gardening|Animal care|Child care|Elder care|Personal care|Fitness|Sports|Recreation|Event planning|Fundraising|Advocacy|Community service|Volunteering)/gi,
  // Look for locations
  location: /(?:[A-Z][a-z]+(?:[\s-]+[A-Z][a-z]+)*,\s+[A-Z]{2}|[A-Z][a-z]+(?:[\s-]+[A-Z][a-z]+)*)/g,
  // Additional patterns for section detection
  sectionIndicators: {
    experience: /(?:work|employment|experience|career|professional|job|position|role)/i,
    education: /(?:education|academic|university|college|school|degree|qualification)/i,
    skills: /(?:skills|technologies|tools|frameworks|languages|competencies|expertise)/i,
    summary: /(?:summary|profile|objective|about|introduction|overview)/i
  }
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
    this.warnings = [];
  }

  addWarning(message, section) {
    this.warnings.push({ message, section });
    console.warn(`Parser Warning [${section}]:`, message);
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
      this.addWarning('No clear section headers found, attempting to infer sections', 'general');
      this.inferSections();
      return;
    }

    // Process each section
    for (let i = 0; i < sectionMatches.length; i++) {
      const currentMatch = sectionMatches[i];
      const nextMatch = sectionMatches[i + 1];
      
      const headerText = currentMatch[0].trim().replace(/[:]/g, '').toLowerCase();
      const startIndex = currentMatch.index + currentMatch[0].length;
      const endIndex = nextMatch ? nextMatch.index : this.text.length;
      
      // Normalize section name
      const sectionName = this.normalizeSectionName(headerText);
      const sectionContent = this.text.slice(startIndex, endIndex).trim();
      
      if (sectionContent.length > 0) {
        this.sections[sectionName] = sectionContent;
      } else {
        this.addWarning(`Empty section found: ${headerText}`, 'sections');
      }
    }

    // Validate essential sections
    this.validateSections();
  }

  normalizeSectionName(header) {
    // Map variations to standard section names
    const sectionMap = {
      'profile': 'summary',
      'objective': 'summary',
      'about': 'summary',
      'employment': 'experience',
      'work history': 'experience',
      'career': 'experience',
      'professional': 'experience',
      'academic': 'education',
      'qualifications': 'education',
      'technologies': 'skills',
      'tools': 'skills',
      'frameworks': 'skills',
      'languages': 'skills',
      'competencies': 'skills',
      'expertise': 'skills'
    };

    return sectionMap[header] || header;
  }

  validateSections() {
    const essentialSections = ['experience', 'education'];
    const missingSections = essentialSections.filter(section => !this.sections[section]);
    
    if (missingSections.length > 0) {
      this.addWarning(`Missing essential sections: ${missingSections.join(', ')}`, 'sections');
    }
  }

  // Infer sections when no clear headers are found
  inferSections() {
    const lines = this.text.split('\n');
    let currentSection = null;
    let buffer = '';
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      // Check for section indicators
      for (const [section, pattern] of Object.entries(patterns.sectionIndicators)) {
        if (pattern.test(trimmedLine)) {
          if (currentSection && buffer) {
            this.sections[currentSection] = buffer.trim();
            buffer = '';
          }
          currentSection = this.normalizeSectionName(section);
          break;
        }
      }

      // Categorize content based on patterns
      if (!currentSection) {
        if (patterns.email.test(trimmedLine) || patterns.phone.test(trimmedLine)) {
          currentSection = 'personal';
        } else if (patterns.dates.test(trimmedLine) && patterns.jobTitle.test(trimmedLine)) {
          currentSection = 'experience';
        } else if (patterns.education.test(trimmedLine)) {
          currentSection = 'education';
        } else if (patterns.skills.test(trimmedLine)) {
          currentSection = 'skills';
        }
      }

      if (currentSection) {
        buffer += trimmedLine + '\n';
      }
    }

    // Add any remaining buffer
    if (currentSection && buffer) {
      this.sections[currentSection] = buffer.trim();
    }

    this.validateSections();
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
    // Only warn, don't throw
    if (!info.personalInfo.email && !info.personalInfo.phone) {
      this.addWarning('No contact information (email or phone) found', 'personal');
    }
    if (!info.personalInfo.fullName) {
      this.addWarning('Could not detect full name', 'personal');
    }
    if (info.workExperience.length === 0) {
      this.addWarning('No work experience found', 'experience');
    }
    if (info.education.length === 0) {
      this.addWarning('No education information found', 'education');
    }
    // Only throw if everything is missing
    if (!info.personalInfo.email && !info.personalInfo.phone && info.workExperience.length === 0 && info.education.length === 0) {
      throw new ParsingError('Could not find any contact, work experience, or education information.', 'general');
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

// TODO: Next steps:
// - Improve extractWorkExperience and extractEducation to better handle various formats
// - Make section detection more robust for different resume layouts
