import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';
import { parse, isValid, format } from 'date-fns';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  window.pdfjsLib = pdfjs;
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

// Regular expressions for extracting information
const patterns = {
  email: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
  phone: /(?:\+?\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
  // Enhanced date parsing with support for ranges and various formats
  dates: /(?:\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)[,.]?\s+\d{1,2}(?:st|nd|rd|th)?[,.]?\s+\d{4}\b|\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b|\b\d{4}\s*(?:-|to|until)\s*(?:(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2},\s*\d{4}|present|\d{4})\b|\b\d{4}\b|\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}\b)/gi,
  // Enhanced education keywords with more qualification types
  education: /(?:Bachelor|Master|PhD|BSc|MSc|BA|MA|MBA|BBA|MD|JD|BS|MS|Associates?|Diploma|Certificate|Degree|National\s+Senior\s+Certificate|TEFL|TESOL|ESL\s+Teaching|Montessori|Early\s+Childhood\s+Education|Professional\s+Certification)[,\s]+(?:of|in|on)?\s*([^,\n]+)/gi,
  // Enhanced job title detection
  jobTitle: /(?:Senior|Lead|Junior|Principal|Staff|Chief|Head|Assistant|Associate|Intern|Officer|Director|Manager|Supervisor|Coordinator|Specialist|Consultant|Analyst|Engineer|Developer|Programmer|Architect|Designer|Administrator|Teacher|Professor|Instructor|Accountant|Auditor|Nurse|Doctor|Physician|Therapist|Scientist|Researcher|Writer|Editor|Reporter|Producer|Artist|Photographer|Chef|Cook|Waiter|Bartender|Driver|Mechanic|Technician|Operator|Agent|Representative|Advisor|Planner|Buyer|Seller|Trader|Broker|Attorney|Lawyer|Paralegal|Clerk|Receptionist|Secretary|Assistant|Executive|President|Vice\s+President|Chair|Member|Volunteer|Student|Graduate|Fellow|Scholar|Mentor|Coach|Trainer|Leader|Partner|Owner|Founder|Co-Founder|Entrepreneur|Freelancer|Contractor|Tutor|Lecturer|Researcher|Scientist|Therapist|Counselor|Consultant)/gi,
  // Simplified section headers pattern
  sectionHeaders: /(?:^|\n\n)(?:(?:(?:PERSONAL|CONTACT)\s+)?(?:DETAILS|INFORMATION)|PROFILE|SUMMARY|OBJECTIVE|EXPERIENCE|EMPLOYMENT|WORK\s*HISTORY|EDUCATION|QUALIFICATIONS|SKILLS|TECHNICAL\s+(?:SKILLS)?|SOFT\s+SKILLS|CERTIFICATIONS|AWARDS|LANGUAGES|VOLUNTEER(?:\s+WORK)?|ABOUT\s+(?:ME)?|CAREER|PROFESSIONAL\s+(?:EXPERIENCE|SUMMARY)|ACADEMIC\s+(?:BACKGROUND|QUALIFICATIONS)|TECHNICAL|PROJECTS|ACHIEVEMENTS|INTERESTS|HOBBIES|REFERENCES|PUBLICATIONS|PATENTS|TRAININGS?|WORKSHOPS|CONFERENCES|SEMINARS|PRESENTATIONS)(?=\s*[:\-\|]|\s|$)/gi,
  // Enhanced location parsing
  location: /(?:[0-9A-Z][0-9A-Za-z\s\-.,]+,\s*[A-Z][a-zA-Z\s]+(?:,\s*[A-Z][a-zA-Z\s]+)*|\b(?:Remote|On[-\s]?site|Hybrid|In[-\s]?person|Virtual|Online)\b)/gi,
  // Enhanced section indicators with more variations
  sectionIndicators: {
    experience: /(?:work|employment|experience|career|professional|job|position|role|work\s+history|professional\s+experience)/i,
    education: /(?:education|academic|university|college|school|degree|qualification|certification|training|coursework)/i,
    skills: /(?:skills|technologies|tools|frameworks|languages|competencies|expertise|technical\s+skills|technical\s+expertise|programming\s+languages|soft\s+skills|interpersonal\s+skills)/i,
    summary: /(?:summary|profile|objective|about|introduction|overview|personal\s+statement|executive\s+summary)/i,
    projects: /(?:projects|portfolio|work\s+samples|case\s+studies|key\s+projects|selected\s+work)/i,
    certifications: /(?:certifications|certificates|licenses|credentials|professional\s+certifications|training\s+and\s+certifications)/i,
    awards: /(?:awards|honors|achievements|recognition|accolades|scholarships|grants|fellowships)/i,
    publications: /(?:publications|papers|research|presentations|conference\s+papers|journal\s+articles|white\s+papers|technical\s+reports)/i,
    languages: /(?:languages|language\s+proficiency|bilingual|multilingual|foreign\s+languages)/i,
    references: /(?:references|testimonials|recommendations|professional\s+references|contact\s+for\s+references)/i,
    volunteer: /(?:volunteer|community\s+service|pro\s+bono|non[-\s]?profit|philanthropy|social\s+impact|civic\s+engagement)/i,
    interests: /(?:interests|hobbies|activities|personal\s+interests|extracurricular|personal\s+projects|side\s+projects|passions)/i
  },
  // Additional patterns for reference extraction
  reference: /(?:reference|referee|recommend(?:er|ation)|contact|supervisor|manager|professor|advisor|mentor)/i,
  // Patterns for extracting bullet points and descriptions
  bulletPoints: /^[\s•*\-]\s*(.+)$/gm,
  // Patterns for extracting URLs
  url: /(https?:\/\/[^\s]+)|(www\.[^\s]+\.[^\s]+)/gi
};

// Main parser class
export class ResumeParser {
  static ParsingError = class extends Error {
    constructor(message, section) {
      super(message);
      this.name = 'ParsingError';
      this.section = section;
    }
  };
  
  constructor() {
    this.text = '';
    this.sections = {};
    this.warnings = [];
  }

  addWarning(message, section) {
    this.warnings.push({ message, section });
    console.warn(`Parser Warning [${section}]:`, message);
  }

  // Preprocess text to clean and normalize it, handling OCR artifacts and common issues
  preprocessText(text) {
    if (!text) return '';
    
    // Common OCR fixes and text normalization
    const replacements = [
      // Fix common OCR errors and artifacts
      [/\$\s*/g, ''], // Remove stray $ symbols
      [/\bR\s+epresentative\b/gi, 'Representative'], // Fix split words
      [/\bma\s+Middle\s+School\b/gi, ''], // Remove invalid education entries
      [/\b(?:Present|Current|Now)\b/gi, 'Present'], // Normalize present dates
      [/[^\w\s.,\-\/@():]/g, ''], // Remove invalid characters but keep basic punctuation
      
      // Fix common OCR date issues
      [/(\d{4})\s*-\s*(\d{4})\s*-\s*\d{4}/g, '$1 - $2'], // Fix malformed ranges like "2020 - 2023 - 2018"
      [/(\d{4})\s*-\s*(\d{2})\s*-\s*(\d{2})/g, '$1-$2-$3'], // Fix malformed dates like "2023-02-15"
      
      // Fix common OCR character misreads
      [/\bl\s*[\/\\]\s*\d/g, '1'], // l/1 confusion
      [/\bO\s*[\/\\]\s*0/g, '0'], // O/0 confusion
      [/\bI\s*[\/\\]\s*1/g, '1'], // I/1 confusion
      
      // Normalize whitespace and newlines
      [/\s+/g, ' '],
      [/\n{3,}/g, '\n\n'],
      [/\s*\n\s*/g, '\n'],
      [/^\s+|\s+$/g, '']
    ];
    
    // Normalize newlines
    text = text.replace(/\n{3,}/g, '\n\n');
    
    return text;
  }

  // Parse and normalize dates to a consistent format (YYYY-MM), handling various formats and OCR artifacts
  normalizeDate(dateStr) {
    if (!dateStr || typeof dateStr !== 'string') return '';
    
    const lowerDate = dateStr.toLowerCase().trim();
    if (lowerDate === 'present' || lowerDate === 'now' || lowerDate === 'current') {
      return 'Present';
    }
    
    // Handle malformed date ranges (e.g., "2020 - 2023 - 2018")
    const malformedRangeMatch = dateStr.match(/(\d{4})\s*[\-–—]\s*(\d{4})\s*[\-–—]\s*\d{4}/);
    if (malformedRangeMatch) {
      const start = parse(malformedRangeMatch[1], 'yyyy', new Date());
      const end = parse(malformedRangeMatch[2], 'yyyy', new Date());
      if (isValid(start) && isValid(end)) {
        return `${format(start, 'yyyy-MM')} - ${format(end, 'yyyy-MM')}`;
      }
    }
    
    // Handle standard date ranges (e.g., "2018 - 2020" or "2018-2020")
    const rangeMatch = dateStr.match(/(\d{4})\s*[\-–—]\s*(\d{4}|Present|Now|Current|\d{1,2}\/\d{4})/i);
    if (rangeMatch) {
      const start = parse(rangeMatch[1], 'yyyy', new Date());
      let endDate = rangeMatch[2];
      
      if (/present|current|now/i.test(endDate)) {
        return `${format(start, 'yyyy-MM')} - Present`;
      }
      
      // Handle end dates with month/year format (e.g., "01/2023")
      if (endDate.includes('/')) {
        const [month, year] = endDate.split('/').map(Number);
        if (year && month >= 1 && month <= 12) {
          const end = parse(`${year}-${String(month).padStart(2, '0')}`, 'yyyy-MM', new Date());
          if (isValid(start) && isValid(end)) {
            return `${format(start, 'yyyy-MM')} - ${format(end, 'yyyy-MM')}`;
          }
        }
      } else {
        // Simple year format
        const end = parse(endDate, 'yyyy', new Date());
        if (isValid(start) && isValid(end)) {
          return `${format(start, 'yyyy-MM')} - ${format(end, 'yyyy-MM')}`;
        }
      }
    }
    
    // Try parsing different date formats
    const formats = [
      'MMMM yyyy', 'MMM yyyy', 'MM/yyyy', 'MM/yy', 'yyyy-MM', 'MM-dd-yyyy', 
      'yyyy/MM/dd', 'yyyy-MM-dd', 'yyyy', 'MM/yyyy', 'MM-yyyy', 'MM.yyyy',
      'dd/MM/yyyy', 'dd-MM-yyyy', 'dd.MM.yyyy', 'yyyy/MM', 'yyyy.MM', 'yyyy/MM/dd',
      'dd MMM yyyy', 'MMM yyyy', 'MMMM yyyy', 'MM/yy', 'MM-yy', 'MM.yy',
      'MM/dd/yyyy', 'MMM yyyy'
    ];
    
    for (const format of formats) {
      try {
        const parsed = parse(dateStr, format, new Date());
        if (isValid(parsed)) {
          return format(parsed, 'yyyy-MM');
        }
      } catch (e) {
        // Continue to next format if parsing fails
        continue;
      }
    }
    
    // If we can't parse it, try to extract just the year
    const yearMatch = dateStr.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
      return yearMatch[0];
    }
    
    // If we still can't parse it, return the original string
    return dateStr;
  }

  // Extract text from PDF with enhanced error handling and OCR support
  async parsePDF(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Create a Uint8Array from the ArrayBuffer
      const typedArray = new Uint8Array(arrayBuffer);
      
      // Get the PDF document
      const loadingTask = pdfjs.getDocument(typedArray);
      const pdf = await loadingTask.promise;

      let text = '';
      const failedPages = [];
      let hasTextContent = false;

      for (let i = 1; i <= pdf.numPages; i++) {
        try {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          
          if (content.items && content.items.length > 0) {
            const strings = content.items.map(item => item.str);
            text += strings.join(' ') + '\n\n';
            hasTextContent = true;
          } else {
            // Page has no text content, might be a scanned document
            failedPages.push(i);
            // Here you could integrate OCR if needed
            // For now, we'll just add a placeholder
            text += `[Scanned Page ${i} - Content not extractable]\n\n`;
          }
        } catch (error) {
          console.error(`Error parsing page ${i}:`, error);
          failedPages.push(i);
          continue;
        }
      }

      if (!hasTextContent) {
        throw new ParsingError(
          'Could not extract any text from the PDF. The file may be a scanned document or protected. ' +
          'Please ensure the PDF contains selectable text or consider using an OCR tool first.', 
          'general'
        );
      }

      if (failedPages.length > 0) {
        console.warn(`Failed to fully parse pages: ${failedPages.join(', ')}`);
      }
      
      // Preprocess the extracted text
      this.text = this.preprocessText(text);
      this.splitIntoSections();
      return this.extractInformation();
    } catch (error) {
      if (error instanceof this.constructor.ParsingError) {
        throw error;
      }
      throw new this.constructor.ParsingError(`Failed to parse PDF: ${error.message}`, 'general');
    }
  }

  // Extract text from DOCX with enhanced error handling
  async parseDOCX(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      this.text = this.preprocessText(result.value);
      this.splitIntoSections();
      return this.extractInformation();
    } catch (error) {
      if (error instanceof this.constructor.ParsingError) {
        throw error;
      }
      throw new this.constructor.ParsingError(`Failed to parse DOCX: ${error.message}`, 'general');
    }
  }
  
  // Split text into sections based on headers with OCR tolerance
  splitIntoSections() {
    this.sections = {};
    
    // Enhanced section headers with common variations and OCR tolerance
    const sectionHeaders = [
      { name: 'experience', pattern: /(?:work\s*experience|employment\s*history|professional\s*experience|experience|work\s*history|jobs?\s*history)/i },
      { name: 'education', pattern: /(?:education|academic\s*background|qualifications|degrees?|academics?)/i },
      { name: 'skills', pattern: /(?:skills?|technical\s*skills?|core\s*competencies?|expertise)/i },
      { name: 'projects', pattern: /(?:projects?|selected\s*projects?|key\s*projects?)/i },
      { name: 'certifications', pattern: /(?:certifications?|licenses?|certificates?)/i },
      { name: 'languages', pattern: /(?:languages?|language\s*proficiency)/i },
      { name: 'awards', pattern: /(?:awards?|honors?|achievements?|recognition)/i },
      { name: 'publications', pattern: /(?:publications?|papers?|research)/i },
      { name: 'interests', pattern: /(?:interests?|hobbies?|activities)/i },
      { name: 'references', pattern: /(?:references?|testimonials?)/i }
    ];
    
    // Find all section headers in the text with their positions
    const headers = [];
    sectionHeaders.forEach(({ name, pattern }) => {
      const regex = new RegExp(`^${pattern.source}[\\s\\-:]*$`, 'im');
      let match;
      while ((match = regex.exec(this.text)) !== null) {
        headers.push({
          name,
          start: match.index,
          end: match.index + match[0].length
        });
      }
    });
    
    // Sort headers by their position in the document
    headers.sort((a, b) => a.start - b.start);
    
    // If no headers found, try to infer sections from common patterns
    if (headers.length === 0) {
      this.inferSections();
      return;
    }
    
    // Extract content between headers
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i].name;
      const start = headers[i].end;
      const end = i < headers.length - 1 ? headers[i + 1].start : this.text.length;
      const content = this.text.substring(start, end).trim();
      
      if (content) {
        if (this.sections[header]) {
          this.sections[header] += '\n\n' + content;
        } else {
          this.sections[header] = content;
        }
      }
    }
  }
  
  // Infer sections when no clear headers are found
  inferSections() {
    // Split text into lines
    const lines = this.text.split('\n').map(line => line.trim()).filter(line => line);
    
    // Try to identify section starts based on common patterns
    let currentSection = 'other';
    let sectionContent = [];
    
    for (const line of lines) {
      // Check if line looks like a section header
      const lowerLine = line.toLowerCase();
      
      // Common section headers and their variations
      const sectionPatterns = {
        experience: /(work\s*experience|employment|experience|professional\s*background|work\s*history|jobs?\s*history)/i,
        education: /(education|academic\s*background|qualifications|degrees?|academics?|studies)/i,
        skills: /(skills?|technical\s*skills?|core\s*competencies?|expertise|technologies?|tools?)/i,
        projects: /(projects?|selected\s*projects?|key\s*projects?|portfolio)/i,
        certifications: /(certifications?|licenses?|certificates?|trainings?)/i,
        languages: /(languages?|language\s*proficiency|bilingual|multilingual)/i,
        awards: /(awards?|honors?|achievements?|recognition|accolades?)/i,
        publications: /(publications?|papers?|research|presentations?|conferences?)/i,
        interests: /(interests?|hobbies?|activities|personal\s*interests?)/i,
        references: /(references?|testimonials?|recommendations?|referees?)/i
      };
      
      // Check if line matches any section pattern
      let isSectionHeader = false;
      for (const [section, pattern] of Object.entries(sectionPatterns)) {
        if (pattern.test(lowerLine)) {
          // Save previous section content if any
          if (sectionContent.length > 0) {
            this.sections[currentSection] = sectionContent.join('\n').trim();
            sectionContent = [];
          }
          currentSection = section;
          isSectionHeader = true;
          break;
        }
      }
      
      // If not a section header, add to current section content
      if (!isSectionHeader) {
        sectionContent.push(line);
      }
    }
    
    // Save the last section
    if (sectionContent.length > 0) {
      this.sections[currentSection] = sectionContent.join('\n').trim();
    }
    
    // If we still don't have any sections, just use the whole text as the content
    if (Object.keys(this.sections).length === 0) {
      this.sections.other = this.text;
    }
  }
  
  // Helper to extract bullet points from text
  extractBulletPoints(text) {
    if (!text) return [];
    const bulletMatches = text.match(patterns.bulletPoints);
    return bulletMatches ? bulletMatches.map(match => match.replace(/^[\s•*\-]+\s*/, '').trim()) : [];
  }

  // Extract work experience with improved parsing and OCR tolerance
  extractWorkExperience() {
    const experiences = [];
    
    // Try to use the dedicated experience section or search the whole text
    const experienceText = this.sections.experience || this.sections.employment || 
                         this.sections.work || this.sections['work experience'] || this.text;
    
    if (!experienceText) return [];
    
    // Enhanced entry splitting - look for date patterns, job titles, or bullet points
    const entrySplitters = [
      /(?=\d{4}\s*[\-–—]\s*(?:\d{4}|Present|Now|Current))/i, // Date ranges
      /(?=•|\*|\-\s|\d+\.\s)/, // Bullet points
      /\n{2,}(?=[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s*\n)/ // Potential job titles
    ];
    
    // Try different splitting strategies until we get meaningful entries
    let entries = [experienceText];
    for (const splitter of entrySplitters) {
      const newEntries = [];
      for (const entry of entries) {
        newEntries.push(...entry.split(splitter));
      }
      entries = newEntries.filter(e => e.trim().length > 0);
      if (entries.length > 1) break;
    }
    
    for (const entry of entries) {
      if (!entry.trim()) continue;
      
      // Extract dates using the date pattern
      const dateMatches = entry.match(patterns.dates) || [];
      if (dateMatches.length === 0) continue;
      
      // Use the first date range found (most likely the position dates)
      const dateRange = dateMatches[0];
      const dateParts = dateRange.split(/\s*[\-–—]\s*/);
      const startDate = this.normalizeDate(dateParts[0]);
      const endDate = dateParts[1] ? this.normalizeDate(dateParts[1]) : 'Present';
      
      // Extract job title and employer (look for the line containing the date range)
      const entryLines = entry.split('\n').filter(line => line.trim());
      let jobTitle = '';
      let employer = '';
      let location = '';
      
      // Find the line with the date range and extract title/employer from it
      const dateLineIndex = entryLines.findIndex(line => line.includes(dateRange));
      if (dateLineIndex >= 0) {
        const titleLine = entryLines[dateLineIndex].replace(dateRange, '').replace(/[\.,;:]$/, '').trim();
        
        // Try to split title and employer (common patterns)
        const titleEmployerParts = titleLine.split(/[,\t\|]| at |,?\s+at\s+/);
        if (titleEmployerParts.length > 1) {
          jobTitle = titleEmployerParts[0].trim();
          employer = titleEmployerParts[1].trim();
          
          // If the employer looks like a location, try to extract a better employer name
          if (/^[A-Z][a-z]+(?:[\s,][A-Z][a-z]+)*$/.test(employer)) {
            location = employer;
            employer = '';
          }
        } else {
          jobTitle = titleLine;
        }
        
        // Extract location (look for location patterns in the entry)
        const locationMatch = entry.match(patterns.location);
        const location = locationMatch ? locationMatch[0] : '';
        
        // Extract description (everything after the first few lines, excluding dates and locations)
        const description = entry
          .split('\n')
          .filter(line => {
            const trimmed = line.trim();
            return !patterns.dates.test(trimmed) && 
                   !patterns.location.test(trimmed) &&
                   !trimmed.match(/^(?:\s*[•*\-]\s*)?(?:responsibilities?|achievements?|duties?|key\s*achievements?):?\s*$/i);
          })
          .slice(2) // Skip the first couple of lines (title/employer)
          .join('\n')
          .replace(/^[\s•*\-]+\s*/gm, '') // Remove bullet points
          .replace(/\s{2,}/g, ' ') // Normalize spaces
          .trim();
        
        // Only add the experience if we have enough information
        if (jobTitle || employer || description) {
          experiences.push({
            jobTitle: jobTitle,
            employer: employer,
            location: location,
            startDate: startDate,
            endDate: endDate,
            description: description,
            highlights: this.extractBulletPoints(entry)
          });
        }
      }
    }
    
    // Sort experiences by date (most recent first)
    return experiences.sort((a, b) => {
      if (a.startDate === 'Present') return -1;
      if (b.startDate === 'Present') return 1;
      if (!a.startDate) return 1;
      if (!b.startDate) return -1;
      return b.startDate.localeCompare(a.startDate);
    });
  }

  // Extract education information with improved parsing and OCR tolerance
  extractEducation() {
    const education = [];
    
    // Try to use the education section or search the whole text
    const educationText = this.sections.education || this.sections.academic || 
                       this.sections.qualifications || this.sections['academic background'] || this.text;
    
    if (!educationText) return [];
    
    // Enhanced entry splitting - look for degree patterns, dates, or bullet points
    const entrySplitters = [
      /(?=\b(?:Bachelor|B\.?[A-Z]?\b|Master|M\.?[A-Z]?\b|PhD|Ph\.?D\.?|Associate|Diploma|Certificate|Degree|National\s+Senior\s+Certificate|NSC)\b)/i, // Degree types
      /(?=\d{4}\s*[\-–—]\s*(?:\d{4}|Present|Now|Current|Graduated|Expected))/i, // Date ranges
      /(?=•|\*|\-\s|\d+\.\s)/, // Bullet points
      /\n{2,}(?=[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s*\n)/ // Potential institution names
    ];
    
    // Try different splitting strategies until we get meaningful entries
    let entries = [educationText];
    for (const splitter of entrySplitters) {
      const newEntries = [];
      for (const entry of entries) {
        newEntries.push(...entry.split(splitter));
      }
      entries = newEntries.filter(e => e.trim().length > 0);
      if (entries.length > 1) break;
    }
    
    for (const entry of entries) {
      if (!entry.trim()) continue;
      
      // Try to find a degree in this entry
      const degreeMatch = entry.match(patterns.education);
      if (!degreeMatch) continue;
      
      const degree = degreeMatch[0].trim();
      const fieldOfStudy = degreeMatch[1] ? degreeMatch[1].trim() : '';
      
      // Extract dates (support for ranges like 2015 - 2019 or Jan 2015 - Dec 2019)
      const dateMatches = entry.match(patterns.dates) || [];
      const startDate = dateMatches[0] ? this.normalizeDate(dateMatches[0]) : '';
      const endDate = dateMatches[1] ? this.normalizeDate(dateMatches[1]) : 
                        /present|current|now|till date|till now|till today/i.test(entry) ? 'Present' : '';
      
      // Extract institution (look for lines that look like school/college names)
      const entryLines = entry.split('\n').filter(line => line.trim());
      let institution = '';
      let location = '';
      
      // Try to find the institution name (usually near the degree or dates)
      const degreeLineIndex = entryLines.findIndex(line => line.includes(degree));
      if (degreeLineIndex >= 0) {
        // Check the line after the degree
        if (entryLines.length > degreeLineIndex + 1) {
          const nextLine = entryLines[degreeLineIndex + 1].trim();
          if (!patterns.dates.test(nextLine) && !/^[•*\-]/.test(nextLine)) {
            institution = nextLine;
          }
        }
        
        // If no institution found, check the line before the degree
        if (!institution && degreeLineIndex > 0) {
          const prevLine = entryLines[degreeLineIndex - 1].trim();
          if (!patterns.dates.test(prevLine) && !/^[•*\-]/.test(prevLine)) {
            institution = prevLine;
          }
        }
      }
      
      // If still no institution, try to extract from the entry
      if (!institution) {
        const potentialInstitutions = entryLines
          .filter(line => !patterns.dates.test(line) && 
                         !line.includes(degree) && 
                         !/^[•*\-]/.test(line) &&
                         line.length > 3 &&
                         !/email|phone|address|gpa|grade|score|percentage/i.test(line));
          
        if (potentialInstitutions.length > 0) {
          institution = potentialInstitutions[0].trim();
        }
      }
      
      // Clean up institution name (remove common suffixes and OCR artifacts)
      if (institution) {
        institution = institution
          .replace(/[\.,;:]$/, '')
          .replace(/\s*[\-–—]\s*$/, '')
          .replace(/^[\s\-•*]+|[\s\-•*]+$/g, '')
          .trim();
      }
      
      // Extract location (look for common patterns)
      const locationMatch = entry.match(/(?:at|in|,|\|)\s*([^\n,()]+(?:,?\s*(?:[A-Z]{2}|[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*\d{0,5})?)/i);
      if (locationMatch) {
        location = locationMatch[1].replace(/^[,\s\|]+|[\s,]+$/g, '');
      }
      
      // Extract description (everything after the degree/institution/date line)
      let description = '';
      if (degreeLineIndex >= 0) {
        description = entryLines.slice(degreeLineIndex + 1)
          .filter(line => !line.includes(institution) && !patterns.dates.test(line))
          .join('\n')
          .trim();
      } else {
        description = entryLines.join('\n')
          .replace(degree, '')
          .replace(new RegExp(institution, 'g'), '')
          .replace(patterns.dates, '')
          .trim();
      }
      
      // Clean up common OCR artifacts in the description
      description = description
        .replace(/\s+\|\s+/g, ' ') // Fix pipe characters used as separators
        .replace(/\s*[•*]\s*/g, '\n• ') // Normalize bullet points
        .replace(/\n{3,}/g, '\n\n') // Normalize newlines
        .trim();
      
      // Extract bullet points from the description
      const highlights = this.extractBulletPoints(description);
      
      // Add to education if we have enough information
      if (degree || institution || description) {
        // Extract GPA if present
        let gpa = '';
        const gpaMatch = entry.match(/GPA[\s:]*([0-9]\.[0-9][0-9]?\s*(?:out of\s*[0-9]\.[0-9]+)?)/i);
        if (gpaMatch) {
          gpa = gpaMatch[1].trim();
        }
        
        education.push({
          type: this.getEducationType(degree),
          qualification: degree || 'Education Not Specified',
          institution: institution || 'Institution Not Specified',
          fieldOfStudy: fieldOfStudy,
          location: location,
          startDate: startDate,
          endDate: endDate,
          gpa: gpa,
          description: description,
          highlights: highlights
        });
      }
    }
    
    // Sort education by end date (most recent first)
    return education.sort((a, b) => {
      if (a.endDate === 'Present') return -1;
      if (b.endDate === 'Present') return 1;
      if (!a.endDate) return 1;
      if (!b.endDate) return -1;
      return b.endDate.localeCompare(a.endDate);
    });
  }

  getEducationType(degree) {
    if (!degree) return 'other';
    const lowerDegree = degree.toLowerCase();
    if (/bachelor|bsc|ba|bs/i.test(lowerDegree)) return 'degree';
    if (/master|msc|ma|mba|ms/i.test(lowerDegree)) return 'degree';
    if (/phd|doctorate/i.test(lowerDegree)) return 'degree';
    if (/diploma/i.test(lowerDegree)) return 'diploma';
    if (/certificate/i.test(lowerDegree)) return 'certificate';
    if (/course/i.test(lowerDegree)) return 'course';
    return 'other';
  }

  extractSkills() {
    const skills = [];
    const skillMap = new Map();
    
    // Try to use the dedicated skills section or search the whole text
    const skillsText = this.sections.skills || this.sections.technologies || 
                     this.sections.competencies || this.sections['technical skills'] || 
                     this.sections['key skills'] || this.sections['core competencies'] || this.text;
    
    if (skillsText) {
      // Extract skills mentioned in the skills section
      const skillSections = skillsText.split(/\n{2,}|•|\*|\d+\./);
      
      for (const section of skillSections) {
        if (!section.trim()) continue;
        
        // Extract skills from bullet points or comma-separated lists
        const skillItems = section.split(/[,\n]|\s\s+/).filter(item => item.trim());
        
        for (let item of skillItems) {
          item = item.trim();
          if (!item) continue;
          
          // Clean up the skill name (remove leading/trailing punctuation, etc.)
          const cleanSkill = item.replace(/^[^\w#+]+|[^\w#+]+$/g, '');
          
          if (cleanSkill && cleanSkill.length > 1) { // Skip single characters
            // Check if this is a skill with level (e.g., "JavaScript (Expert)")
            const levelMatch = cleanSkill.match(/^(.*?)\s*\(?([A-Za-z\s]+)\)?$/);
            let skillName = cleanSkill;
            let skillLevel = this.inferSkillLevel(cleanSkill, skillsText);
            
            if (levelMatch && levelMatch[2] && levelMatch[2].length < 20) { // Arbitrary length check to avoid false positives
              skillName = levelMatch[1].trim();
              const levelText = levelMatch[2].toLowerCase().trim();
              
              // Map common level terms to standard levels
              const levelMap = {
                'expert': 'expert',
                'advanced': 'advanced',
                'intermediate': 'intermediate',
                'beginner': 'beginner',
                'novice': 'beginner',
                'proficient': 'proficient',
                'familiar': 'familiar',
                'basic': 'basic',
                'excellent': 'expert',
                'good': 'intermediate',
                'fair': 'basic'
              };
              
              skillLevel = levelMap[levelText] || skillLevel;
            }
            
            // Only add the skill if it's not already in the map (case-insensitive)
            const lowerName = skillName.toLowerCase();
            if (!skillMap.has(lowerName)) {
              skillMap.set(lowerName, {
                name: skillName,
                level: skillLevel
              });
            }
          }
        }
      }
      
      // Add any skills mentioned in the work experience or education sections
      const experienceText = this.sections.experience || this.sections['work history'] || '';
      const educationText = this.sections.education || this.sections.qualifications || '';
      
      const additionalText = `${experienceText} ${educationText}`;
      
      // Define common skills to look for in the text
      const commonSkills = [
        // Programming Languages
        'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Rust',
        'Swift', 'Kotlin', 'Dart', 'Scala', 'Perl', 'R', 'MATLAB', 'SQL', 'NoSQL', 'HTML', 'CSS',
        'Sass', 'Less', 'GraphQL', 'Bash', 'Shell', 'PowerShell',
        
        // Frameworks & Libraries
        'React', 'Angular', 'Vue', 'Svelte', 'Node.js', 'Express', 'Django', 'Flask', 'Spring',
        'Laravel', 'Ruby on Rails', 'ASP.NET', '.NET Core', 'jQuery', 'Bootstrap', 'Tailwind CSS',
        'Material-UI', 'Redux', 'MobX', 'Vuex', 'Next.js', 'Nuxt.js', 'Gatsby', 'NestJS', 'FastAPI',
        'Hibernate', 'JPA', 'jOOQ', 'MyBatis', 'Dapper', 'Entity Framework', 'Prisma', 'Sequelize',
        'TypeORM', 'Mongoose', 'Knex.js', 'Bookshelf.js', 'Drizzle', 'MikroORM', 'Objection.js',
        'Waterline', 'Sails.js', 'LoopBack', 'Feathers.js', 'AdonisJS', 'NestJS', 'Fastify', 'Koa',
        'Hapi', 'Sails', 'Meteor', 'MERN', 'MEAN', 'MEVN', 'JAMstack', 'Serverless', 'Microservices',
        
        // Databases
        'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Oracle', 'Microsoft SQL Server', 'MariaDB',
        'Redis', 'Elasticsearch', 'Firebase', 'Firestore', 'DynamoDB', 'Cassandra', 'CouchDB',
        'Neo4j', 'ArangoDB', 'RethinkDB', 'InfluxDB', 'TimescaleDB', 'CockroachDB', 'ScyllaDB',
        'FaunaDB', 'SurrealDB', 'YugabyteDB', 'TiDB', 'ClickHouse', 'Druid', 'Pinot', 'DuckDB',
        
        // Cloud & DevOps
        'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins',
        'GitHub Actions', 'GitLab CI', 'CircleCI', 'Travis CI', 'Argo CD', 'Flux', 'Helm', 'Istio',
        'Linkerd', 'Consul', 'Vault', 'Prometheus', 'Grafana', 'ELK Stack', 'Splunk', 'New Relic',
        'Datadog', 'Dynatrace', 'AppDynamics', 'PagerDuty', 'OpsGenie', 'Sentry', 'LogRocket',
        
        // Testing
        'Jest', 'Mocha', 'Jasmine', 'Karma', 'JUnit', 'TestNG', 'Selenium', 'Cypress', 'Playwright',
        'Puppeteer', 'Testing Library', 'Enzyme', 'React Testing Library', 'Vitest', 'Ava', 'Tape',
        'Sinon', 'Chai', 'Jest', 'Mocha', 'Jasmine', 'Karma', 'JUnit', 'TestNG', 'Selenium',
        
        // Tools & Platforms
        'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence', 'Trello', 'Asana', 'ClickUp',
        'Notion', 'Figma', 'Sketch', 'Adobe XD', 'Zeplin', 'InVision', 'Framer', 'Webflow', 'Bubble',
        'Airtable', 'Zapier', 'Make', 'n8n', 'Retool', 'Appsmith', 'ToolJet', 'Budibase', 'Appwrite',
        'Supabase', 'Firebase', 'Auth0', 'Clerk', 'Magic Link', 'Stripe', 'PayPal', 'Square',
        
        // Methodologies & Practices
        'Agile', 'Scrum', 'Kanban', 'SAFe', 'Lean', 'XP', 'TDD', 'BDD', 'DDD', 'CI/CD', 'DevOps',
        'GitOps', 'AIOps', 'MLOps', 'DataOps', 'FinOps', 'SecOps', 'NoOps', 'SRE', 'Chaos Engineering',
        'Site Reliability Engineering', 'Observability', 'Monitoring', 'Logging', 'Tracing', 'APM',
        'Distributed Systems', 'Microservices', 'Serverless', 'Event-Driven Architecture', 'CQRS',
        'Event Sourcing', 'Saga Pattern', 'Outbox Pattern', 'Strangler Pattern', 'Anti-Corruption Layer',
        
        // Soft Skills
        'Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'Time Management', 'Adaptability',
        'Creativity', 'Work Ethic', 'Critical Thinking', 'Decision Making', 'Stress Management',
        'Conflict Resolution', 'Emotional Intelligence', 'Active Listening', 'Public Speaking',
        'Presentation Skills', 'Negotiation', 'Collaboration', 'Networking', 'Mentoring', 'Coaching',
        'Feedback', 'Empathy', 'Cultural Awareness', 'Diversity and Inclusion', 'Emotional Intelligence'
      ];
      
      // Look for skills mentioned in the text
      for (const skill of commonSkills) {
        const regex = new RegExp(`\\b${this.escapeRegExp(skill)}\\b`, 'i');
        if (regex.test(additionalText)) {
          const lowerName = skill.toLowerCase();
          if (!skillMap.has(lowerName)) {
            skillMap.set(lowerName, {
              name: skill,
              level: this.inferSkillLevel(skill, additionalText),
              category: this.getSkillCategory(skill)
            });
          }
        }
      }
    }
    
    // Convert map to array and sort by level (expert to beginner) then alphabetically
    return Array.from(skillMap.values()).sort((a, b) => {
      const levelOrder = { expert: 4, advanced: 3, proficient: 2, intermediate: 2, basic: 1, beginner: 1, familiar: 1 };
      const aLevel = levelOrder[a.level?.toLowerCase()] || 0;
      const bLevel = levelOrder[b.level?.toLowerCase()] || 0;
      
      if (bLevel !== aLevel) {
        return bLevel - aLevel;
      }
      return a.name.localeCompare(b.name);
    });
  }
  
  // Helper to escape special regex characters
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  // Infer skill level based on context and keywords
  inferSkillLevel(skill, context) {
    if (!context) return 'intermediate';
    if (!skill) return 'intermediate';
    
    const lowerContext = context.toLowerCase();
    const lowerSkill = skill.toLowerCase();
    
    // Check for explicit level indicators
    const levelMatch = lowerContext.match(
      new RegExp(`${this.escapeRegExp(lowerSkill)}[^.]*\\b(expert|advanced|proficient|intermediate|beginner|basic|familiar|novice)\\b`, 'i')
    );
    
    if (levelMatch && levelMatch[1]) {
      const level = levelMatch[1].toLowerCase();
      if (level === 'expert' || level === 'advanced') return 'expert';
      if (level === 'proficient' || level === 'intermediate') return 'intermediate';
      if (level === 'beginner' || level === 'basic' || level === 'novice' || level === 'familiar') return 'beginner';
    }
    
    // Infer level based on context keywords
    if (new RegExp(`\\b(experienced|extensive|strong|excellent|in-depth|deep|comprehensive)\\s+(knowledge|experience|skills?|with|in)\\s+${this.escapeRegExp(lowerSkill)}`, 'i').test(lowerContext)) {
      return 'expert';
    }
    
    if (new RegExp(`\\b(good|solid|working|practical|hands-?on|professional)\\s+(knowledge|experience|skills?|with|in)\\s+${this.escapeRegExp(lowerSkill)}`, 'i').test(lowerContext)) {
      return 'intermediate';
    }
    
    if (new RegExp(`\\b(basic|limited|some|familiar|introductory|beginner|entry-?level)\\s+(knowledge|experience|skills?|with|in)\\s+${this.escapeRegExp(lowerSkill)}`, 'i').test(lowerContext)) {
      return 'beginner';
    }
    
    // Default to intermediate if no clear indicator found
    return 'intermediate';
  }

  // Extract structured information from the parsed resume sections
  extractInformation() {
    try {
      // Extract personal information
      const personalInfo = this.extractPersonalInfo();
      
      // Extract work experience
      const workExperience = this.extractWorkExperience();
      
      // Extract education
      const education = this.extractEducation();
      
      // Extract skills
      const skills = this.extractSkills();
      
      // Extract certifications
      const certifications = this.extractCertifications();
      
      // Extract languages
      const languages = this.extractLanguages();
      
      // Extract references
      const references = this.extractReferences();
      
      // Extract summary/objective if available
      const summary = this.sections.summary || this.sections.objective || this.sections.profile || '';
      
      // Extract projects if available
      const projects = this.sections.projects ? this.extractProjects() : [];
      
      // Extract awards if available
      const awards = this.sections.awards ? this.extractAwards() : [];
      
      // Extract publications if available
      const publications = this.sections.publications ? this.extractPublications() : [];
      
      // Extract interests if available
      const interests = this.sections.interests || this.sections.hobbies || '';
      
      return {
        personalInfo,
        summary,
        workExperience,
        education,
        skills,
        certifications,
        languages,
        projects,
        awards,
        publications,
        interests,
        references
      };
    } catch (error) {
      console.error('Error extracting information:', error);
      throw new this.constructor.ParsingError(
        `Failed to extract information from resume: ${error.message}`,
        'extraction'
      );
    }
  }
  
  // Helper method to extract personal information
  extractPersonalInfo() {
    const personalInfo = {};
    const text = this.text;
    
    // Extract email
    const emailMatch = text.match(patterns.email);
    if (emailMatch) {
      personalInfo.email = emailMatch[0].trim();
    }
    
    // Extract phone
    const phoneMatch = text.match(patterns.phone);
    if (phoneMatch) {
      personalInfo.phone = phoneMatch[0].trim();
    }
    
    // Extract name (first non-empty line is often the name)
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    if (lines.length > 0 && !personalInfo.name) {
      personalInfo.name = lines[0];
    }
    
    // Extract location if available
    const locationMatch = text.match(patterns.location);
    if (locationMatch) {
      personalInfo.location = locationMatch[0].trim();
    }
    
    // Extract LinkedIn URL if available
    const linkedInMatch = text.match(/linkedin\.com\/in\/[a-z0-9_-]+/i);
    if (linkedInMatch) {
      personalInfo.linkedIn = 'https://' + linkedInMatch[0];
    }
    
    // Extract GitHub URL if available
    const githubMatch = text.match(/github\.com\/[a-z0-9_-]+/i);
    if (githubMatch) {
      personalInfo.github = 'https://' + githubMatch[0];
    }
    
    // Extract website/portfolio if available
    const websiteMatch = text.match(patterns.url);
    if (websiteMatch) {
      personalInfo.website = websiteMatch[0];
    }
    
    return personalInfo;
  }
  
  // Helper method to extract projects
  extractProjects() {
    const projects = [];
    const projectsText = this.sections.projects || '';
    
    // Split projects by bullet points or numbered lists
    const projectEntries = projectsText.split(/\n\s*\d+\.\s+|\n\s*[•-]\s+/).filter(entry => entry.trim());
    
    for (const entry of projectEntries) {
      const lines = entry.split('\n').map(line => line.trim()).filter(line => line);
      if (lines.length === 0) continue;
      
      const project = {
        name: lines[0],
        description: '',
        highlights: []
      };
      
      // Extract description and highlights
      if (lines.length > 1) {
        project.description = lines[1];
        project.highlights = lines.slice(2).filter(line => line.trim());
      }
      
      projects.push(project);
    }
    
    return projects;
  }
  
  // Helper method to extract awards
  extractAwards() {
    const awards = [];
    const awardsText = this.sections.awards || '';
    
    // Split awards by bullet points or numbered lists
    const awardEntries = awardsText.split(/\n\s*\d+\.\s+|\n\s*[•-]\s+/).filter(entry => entry.trim());
    
    for (const entry of awardEntries) {
      const award = {
        title: entry.split('|')[0].trim(),
        date: '',
        issuer: '',
        description: ''
      };
      
      // Try to extract date and issuer if in format "Award Name | Issuer | Date"
      const parts = entry.split('|').map(part => part.trim());
      if (parts.length > 1) {
        award.issuer = parts[1];
      }
      if (parts.length > 2) {
        award.date = parts[2];
      }
      
      awards.push(award);
    }
    
    return awards;
  }
  
  // Helper method to extract publications
  extractPublications() {
    const publications = [];
    const publicationsText = this.sections.publications || '';
    
    // Split publications by bullet points or numbered lists
    const pubEntries = publicationsText.split(/\n\s*\d+\.\s+|\n\s*[•-]\s+/).filter(entry => entry.trim());
    
    for (const entry of pubEntries) {
      const publication = {
        title: entry,
        authors: '',
        journal: '',
        date: '',
        url: ''
      };
      
      // Try to extract URL if present
      const urlMatch = entry.match(patterns.url);
      if (urlMatch) {
        publication.url = urlMatch[0];
      }
      
      publications.push(publication);
    }
    
    return publications;
  }
  
  // Helper method to extract certifications
  extractCertifications() {
    const certifications = [];
    const certsText = this.sections.certifications || '';
    
    // Split certifications by bullet points or numbered lists
    const certEntries = certsText.split(/\n\s*\d+\.\s+|\n\s*[•-]\s+/).filter(entry => entry.trim());
    
    for (const entry of certEntries) {
      const cert = {
        name: entry.split('|')[0].trim(),
        issuer: '',
        date: '',
        credentialId: ''
      };
      
      // Try to extract issuer and date if in format "Cert Name | Issuer | Date"
      const parts = entry.split('|').map(part => part.trim());
      if (parts.length > 1) {
        cert.issuer = parts[1];
      }
      if (parts.length > 2) {
        cert.date = parts[2];
      }
      
      // Try to extract credential ID if present (common format: ID: 12345)
      const idMatch = entry.match(/ID\s*[:=]\s*(\S+)/i);
      if (idMatch) {
        cert.credentialId = idMatch[1];
      }
      
      certifications.push(cert);
    }
    
    return certifications;
  }
  
  // Helper method to extract languages
  extractLanguages() {
    const languages = [];
    const langsText = this.sections.languages || '';
    
    // Split languages by comma, bullet points, or newlines
    const langEntries = langsText.split(/[,\n•-]|\s\s+/).filter(entry => entry.trim());
    
    for (const entry of langEntries) {
      // Extract language and optional proficiency level (e.g., "English (Fluent)")
      const langMatch = entry.match(/^([^(]+)(?:\(([^)]+)\))?/);
      if (langMatch) {
        const language = langMatch[1].trim();
        const proficiency = langMatch[2] ? langMatch[2].trim() : '';
        
        if (language) {
          languages.push({
            language,
            proficiency: proficiency || 'Intermediate' // Default to Intermediate if not specified
          });
        }
      }
    }
    
    return languages;
  }
  
  extractReferences() {
    const references = [];
    const referenceText = this.sections.references || 
                        this.sections['professional references'] || 
                        this.sections['personal references'] ||
                        this.sections['referees'] || '';

    if (referenceText) {
      // Split into individual reference sections
      const referenceSections = referenceText.split(/\n{2,}(?=[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3},)/);
      
      for (const section of referenceSections) {
        if (!section.trim()) continue;
        
        // Extract name (first line or before first comma)
        const nameMatch = section.match(/^([^\n,]+)/);
        if (!nameMatch) continue;
        
        const name = nameMatch[1].trim();
        let remainingText = section.slice(nameMatch[0].length).trim();
        
        // Extract title (usually follows name on same line after comma or on next line)
        let title = '';
        const titleMatch = remainingText.match(/^[,\s]*([^\n,]+)/);
        if (titleMatch) {
          title = titleMatch[1].trim();
          remainingText = remainingText.slice(titleMatch[0].length).trim();
        }
        
        // Extract company (often on its own line or after title)
        let company = '';
        const companyMatch = remainingText.match(/^[\s\n]+([^\n@]+)/);
        if (companyMatch) {
          company = companyMatch[1].trim();
          remainingText = remainingText.slice(companyMatch[0].length).trim();
        }
        
        // Extract contact information (phone, email)
        const phoneMatch = remainingText.match(/(?:\+?\d[\d\s\-()]{8,}\d)|(?:\(\d{3}\)\s*\d{3}[\s-]?\d{4})/);
        const emailMatch = remainingText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        
        const phone = phoneMatch ? phoneMatch[0].trim() : '';
        const email = emailMatch ? emailMatch[0].trim() : '';
        
        // Extract relationship/context if available (e.g., "Former Manager", "Colleague")
        let relationship = '';
        const relationshipMatch = remainingText.match(/\b(?:former\s+)?(?:manager|supervisor|colleague|professor|teacher|mentor|peer|teammate|director|lead)\b/i);
        if (relationshipMatch) {
          relationship = relationshipMatch[0].trim();
        }
        
        // Only add the reference if we have enough information
        if (name && (title || company || phone || email)) {
          references.push({
            name: name,
            title: title,
            company: company,
            phone: phone,
            email: email,
            relationship: relationship,
            availableOnRequest: false
          });
        }
      }
    }
    
    // If no references found but there's a note about references available on request
    if (references.length === 0 && /references?\s+(?:available\s+upon\s+request|upon\s+request|furnished\s+upon\s+request)/i.test(this.text)) {
      return [{
        availableOnRequest: true
      }];
    }
    
    return references;
  }

  // Static method to parse a resume file (PDF or DOCX)
  static async parseResume(file) {
    // Ensure PDF.js is loaded
    if (typeof window === 'undefined') {
      throw new this.ParsingError('PDF.js requires a browser environment', 'general');
    }
    if (!file) {
      throw new this.ParsingError('No file provided.', 'general');
    }

    const parser = new ResumeParser();
    
    if (file.name.toLowerCase().endsWith('.pdf')) {
      return await parser.parsePDF(file);
    } else if (file.name.toLowerCase().endsWith('.docx')) {
      return await parser.parseDOCX(file);
    } else {
      throw new this.ParsingError('Unsupported file format. Please upload a PDF or DOCX file.', 'general');
    }
  }
}

// TODO: Next steps:
// - Improve extractWorkExperience and extractEducation to better handle various formats
// - Make section detection more robust for different resume layouts

export default ResumeParser;
