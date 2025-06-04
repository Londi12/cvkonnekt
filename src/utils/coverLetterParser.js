import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  window.pdfjsLib = pdfjs;
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

export class CoverLetterParser {
  static async parseCoverLetter(file) {
    const fileType = file.type;
    let text = '';

    try {
      if (fileType === 'application/pdf') {
        text = await this.extractTextFromPDF(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        text = await this.extractTextFromDocx(file);
      } else {
        text = await this.extractTextFromTextFile(file);
      }

      // Basic parsing to extract common sections
      const parsedData = this.parseTextSections(text);
      return parsedData;
    } catch (error) {
      console.error('Error parsing cover letter:', error);
      throw new Error('Failed to parse cover letter. Please try another file.');
    }
  }

  static async extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    let text = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      text += strings.join(' ') + '\n\n';
    }
    
    return text;
  }

  static async extractTextFromDocx(file) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  static async extractTextFromTextFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  }

  static parseTextSections(text) {
    // Normalize line endings and clean up the text
    let normalizedText = text
      .replace(/\r\n/g, '\n')  // Normalize line endings
      .replace(/\r/g, '\n')     // Handle old Mac line endings
      .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
      .trim();

    const result = {
      sender: {
        name: '',
        address: ''
      },
      recipient: {
        name: '',
        company: '',
        address: ''
      },
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      salutation: 'Dear Hiring Manager,',
      body: '',
      closing: 'Sincerely,',
      signature: ''
    };

    // Extract header section (first 20 lines) for sender/recipient info
    const headerSection = normalizedText.split('\n').slice(0, 20).join('\n');
    const headerContent = headerSection.split('\n').filter(line => line.trim().length > 0);

    // Common patterns for sender/recipient blocks
    const namePattern = /^\s*(?:[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})\s*$/;
    const addressPattern = /^\s*\d+\s+[\w\s,.-]+(?:\n\s*[A-Za-z\s,.-]+\s*\d{4,})?/im;
    const phoneEmailPattern = /(?:\+?\d[\d\s-()]+|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/i;

    // Try to identify sender and recipient blocks
    let senderInfo = [];
    let recipientInfo = [];
    let currentBlock = [];
    let isRecipientSection = false;

    for (const line of headerContent) {
      const trimmedLine = line.trim();
      
      // Skip empty lines and date lines
      if (!trimmedLine || /^\s*\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\s*$/i.test(trimmedLine)) {
        continue;
      }
      
      // Check if we've reached the salutation or body
      if (trimmedLine.toLowerCase().startsWith('dear ') || 
          trimmedLine.toLowerCase().includes('to whom it may concern')) {
        break;
      }
      
      // Check if this looks like a name or address line
      if (namePattern.test(trimmedLine) || 
          addressPattern.test(trimmedLine) ||
          phoneEmailPattern.test(trimmedLine)) {
        currentBlock.push(trimmedLine);
      } else if (currentBlock.length > 0) {
        // If we have a block and hit a non-matching line, process the block
        if (isRecipientSection) {
          recipientInfo = [...currentBlock];
        } else {
          senderInfo = [...currentBlock];
          isRecipientSection = true; // Next block is likely the recipient
        }
        currentBlock = [];
      }
    }

    // Process the last block if any
    if (currentBlock.length > 0) {
      if (isRecipientSection) {
        recipientInfo = [...currentBlock];
      } else {
        senderInfo = [...currentBlock];
      }
    }

    // Extract sender information
    if (senderInfo.length > 0) {
      // First line is usually the name
      result.sender.name = senderInfo[0].trim();
      
      // The rest is address/contact info
      const senderAddress = [];
      for (let i = 1; i < senderInfo.length; i++) {
        const line = senderInfo[i].trim();
        // Skip lines that look like email/phone if they're not part of the address
        if (!phoneEmailPattern.test(line)) {
          senderAddress.push(line);
        }
      }
      result.sender.address = senderAddress.join('\n');
    }

    // Extract recipient information
    if (recipientInfo.length > 0) {
      // Try to find name and company in the first few lines
      for (let i = 0; i < Math.min(3, recipientInfo.length); i++) {
        const line = recipientInfo[i];
        if (!result.recipient.name && namePattern.test(line)) {
          result.recipient.name = line.trim();
        } else if (!result.recipient.company && /\b(?:llc|inc|ltd|gmbh|corp|company|co\.?)\b/i.test(line)) {
          result.recipient.company = line.trim();
        }
      }
      
      // The rest is address
      const recipientAddress = [];
      for (let i = 0; i < recipientInfo.length; i++) {
        const line = recipientInfo[i].trim();
        if (line !== result.recipient.name && line !== result.recipient.company) {
          recipientAddress.push(line);
        }
      }
      result.recipient.address = recipientAddress.join('\n');
    }

    // Extract date if present in the header
    const dateMatch = normalizedText.match(/\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)[\s\d,]+\d{4}\b/);
    if (dateMatch) {
      result.date = dateMatch[0];
    }

    // Enhanced salutation detection with context awareness
    const salutationPatterns = [
      // Standard "Dear [Name]," format with title
      /^\s*(dear\s+(?:mr\.?|mrs\.?|ms\.?|dr\.?|prof\.?\s+)?[a-z][^\n,]+(?:\s+[^\n,]+)*,?)/im,
      // Formal salutations with optional colon
      /^\s*(to whom it may concern:?|dear (?:sir\/madam|hiring manager|recruitment team|search committee|selection committee),?)/im,
      // Generic greetings with optional punctuation
      /^\s*(greetings|hello|hi|good (morning|afternoon|evening)|dear (?:team|colleagues|all))[,.!]?/im,
      // Any line followed by a blank line (as fallback)
      /^([^\n]+)\n\s*\n/im
    ];

    // Try each pattern until we find a match
    for (const pattern of salutationPatterns) {
      const match = normalizedText.match(pattern);
      if (match) {
        let salutation = (match[1] || match[0]).trim();
        
        // Clean up common issues
        salutation = salutation
          .replace(/\s+/g, ' ')  // Normalize spaces
          .replace(/\s*,\s*$/, '')  // Remove trailing comma if any
          .trim();
        
        // Ensure proper formatting
        if (!salutation.endsWith(',') && !salutation.endsWith(':')) {
          salutation += ',';
        }
        
        // Additional validation
        const wordCount = salutation.split(/\s+/).length;
        if (wordCount >= 1 && wordCount <= 10) {
          // If we found a recipient name but not in the salutation, update it
          if (result.recipient.name && !salutation.toLowerCase().includes(result.recipient.name.toLowerCase())) {
            // Try to extract just the name part
            const nameMatch = salutation.match(/dear\s+(.+?)(?:,|$)/i);
            if (nameMatch && nameMatch[1]) {
              result.recipient.name = nameMatch[1].trim();
            }
          }
          result.salutation = salutation;
          break;
        }
      }
    }

    // Common closing phrases (case insensitive)
    const closingPhrases = [
      'sincerely',
      'best regards',
      'kind regards',
      'yours truly',
      'yours sincerely',
      'thank you',
      'best',
      'respectfully',
      'warm regards',
      'with appreciation'
    ];

    // Build regex pattern to find the closing section
    const closingPattern = new RegExp(
      `(\\n\\s*)(?:${closingPhrases.join('|')})(?:\\s*[^\\n]*)?\\s*((?:\\n\\s*[^\\n]+)*)$`,
      'im'
    );

    const closingMatch = normalizedText.match(closingPattern);
    
    if (closingMatch) {
      // Extract the closing and signature
      const [fullMatch, , signatureText] = closingMatch;
      const closingText = fullMatch.trim();
      
      // Find the actual closing phrase used (case sensitive from the original text)
      const closingPhraseMatch = new RegExp(`(${closingPhrases.join('|')})`, 'i').exec(closingText);
      if (closingPhraseMatch) {
        // Preserve the original case of the closing phrase
        const originalClosing = closingText.substring(
          closingPhraseMatch.index,
          closingPhraseMatch.index + closingPhraseMatch[0].length
        );
        // Remove the closing phrase from the signature text
        const signature = signatureText 
          ? signatureText.replace(/^[\s,]+/, '').replace(/[\s,]+$/, '')
          : '';
        
        result.closing = originalClosing;
        result.signature = signature;
      }

      // Extract the body (between salutation and closing)
      const salutationIndex = normalizedText.toLowerCase().indexOf(result.salutation.toLowerCase());
      if (salutationIndex >= 0) {
        const bodyStart = salutationIndex + result.salutation.length;
        const bodyEnd = normalizedText.toLowerCase().indexOf(
          closingText.toLowerCase(),
          bodyStart
        );
        
        if (bodyEnd > bodyStart) {
          result.body = normalizedText
            .substring(bodyStart, bodyEnd)
            .replace(/^[\s\n]+/, '')  // Remove leading whitespace
            .replace(/[\s\n]+$/, '')   // Remove trailing whitespace
            .replace(/\s+/g, ' ')       // Normalize whitespace
            .replace(/\n{3,}/g, '\n\n')  // Normalize multiple newlines
            .trim();
        }
      }
    } else {
      // If no closing found, try to extract body after salutation
      const salutationIndex = normalizedText.toLowerCase().indexOf(result.salutation.toLowerCase());
      if (salutationIndex >= 0) {
        result.body = normalizedText
          .substring(salutationIndex + result.salutation.length)
          .replace(/^[\s\n]+/, '')
          .replace(/\s+/g, ' ')
          .replace(/\n{3,}/g, '\n\n')
          .trim();
      } else {
        // If no salutation found, use the whole text as body
        result.body = normalizedText;
      }
    }

    // Extract header section (first 15 lines for better coverage)
    const headerLines = normalizedText.split('\n').slice(0, 15).join('\n');
    
    // Enhanced company name extraction with multiple patterns
    const companyPatterns = [
      // Pattern 1: Common prefixes (at, for, to, company, etc.)
      /(?:\b(?:at|for|to|company|organization|firm|re:?)[:\s]+)([A-Z][A-Za-z0-9\s&'"-]+(?:\s+(?:LLC|Inc|Ltd|Pty|Limited|Corp|Corporation|GmbH))?)(?=[\s,;\n]|$)/i,
      // Pattern 2: Line starting with company name (common in letter headers)
      /^\s*([A-Z][A-Za-z0-9\s&'"-]+(?:\s+(?:LLC|Inc|Ltd|Pty|Limited|Corp|Corporation|GmbH))?)(?=[\s,;\n]|$)/m,
      // Pattern 3: After common address indicators
      /(?:\b(?:add(?:ress)?|location):?\s*\n?)([A-Z][A-Za-z0-9\s&'"-]+(?:\s+(?:LLC|Inc|Ltd|Pty|Limited|Corp|Corporation|GmbH))?)(?=[\s,;\n]|$)/i
    ];

    // Try each pattern until we find a match
    for (const pattern of companyPatterns) {
      const match = headerLines.match(pattern);
      if (match && match[1]) {
        const companyName = match[1].replace(/^[\s,\-\.]+|[\s,\-\.]+$/g, '').trim();
        if (companyName && companyName.length > 2) { // Basic validation
          result.recipient.company = companyName;
          break;
        }
      }
    }
    
    // Enhanced recipient name extraction
    if (!result.recipient.name) {  // Only run if we haven't found the name yet
      const recipientPatterns = [
        // Pattern 1: After common salutation words
        /\b(?:dear|to|attn|attention|attention of|attn\.?)[:\s]+([^\n,;]+(?:\s+[^\n,;]+){0,3})/i,
        // Pattern 2: Line starting with a title (Mr., Ms., Dr., etc.)
        /^\s*(?:Mr\.?|Ms\.?|Mrs\.?|Dr\.?|Prof\.?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})/m,
        // Pattern 3: Line with a name in title case (common in letter headers)
        /^\s*([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)(?:\s*\n|\s*$)/m
      ];

      for (const pattern of recipientPatterns) {
        const match = headerSection.match(pattern);
        if (match && match[1]) {
          const name = match[1].replace(/^[\s,\-\.:]+|[\s,\-\.:]+$/g, '').trim();
          if (name && name.length > 2 && !name.toLowerCase().includes('hiring')) {
            result.recipient.name = name;
            break;
          }
        }
      }
    }

    // Enhanced address extraction
    const addressPatterns = [
      // Standard US/UK address format
      /(?:\b(?:add(?:ress)?|location):?\s*\n?)?(\d+\s+[\w\s,.-]+?(?:\n|\s{2,})(?:[A-Za-z\s,.-]*\d{1,5}\s*\n?)?[A-Za-z\s,.-]*\d{5}(?:-\d{4})?(?:\s+[A-Za-z]{2,})?)/i,
      // International address format (more flexible)
      /(?:\b(?:add(?:ress)?|location):?\s*\n?)([\w\s,.\-]+\n[\w\s,.\-]+\n[\w\s,.\-]+(?:\n[\w\s,.\-]+){0,2})/i,
      // Simple address line (as fallback)
      /(?:\b(?:add(?:ress)?|location):?\s*\n?)([\w\s,.\-]+(?:\s+\d+[A-Za-z]?)?(?:\s+\w+){2,})/i
    ];

    // Initialize address if not exists
    result.recipient.address = '';
    
    // Try each pattern until we find a match
    for (const pattern of addressPatterns) {
      const match = normalizedText.match(pattern);
      if (match && match[1]) {
        const address = match[1]
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .join('\n');
        if (address && address.length > 10) { // Basic validation
          result.recipient.address = address;
          break;
        }
      }
    }

    // Enhanced body text cleaning with better structure preservation
    if (result.body) {
      // First, clean up common formatting issues
      let cleanBody = result.body
        .replace(/\s*\n\s*\n\s*/g, '\n\n')  // Normalize paragraph breaks
        .replace(/([^\n])\n(?!\n|$)/g, '$1 ')  // Fix single newlines within paragraphs
        .replace(/\s+/g, ' ')  // Normalize spaces
        .trim();
      
      // Split into paragraphs
      let paragraphs = cleanBody.split('\n\n')
        .map(p => p.trim())
        .filter(p => p.length > 0);
      
      // Clean up each paragraph
      paragraphs = paragraphs.map(paragraph => {
        // Fix common punctuation and spacing issues
        return paragraph
          .replace(/\s*([,.!?])\s*/g, '$1 ')  // Normalize spaces around punctuation
          .replace(/\s+/g, ' ')  // Normalize spaces again
          .replace(/([,.!?])([A-Za-z])/g, '$1 $2')  // Add space after punctuation if missing
          .replace(/\s+$/, '')  // Remove trailing space
          .replace(/^\s*[\u201C\"]?([A-Z])/g, (m, p1) => p1)  // Fix opening quotes
          .replace(/([^.!?])\s*$/g, '$1.');  // Ensure sentences end with punctuation
      });
      
      // Join with double newlines to preserve paragraph structure
      result.body = paragraphs.join('\n\n');
      
      // Final cleanup
      result.body = result.body
        .replace(/([.!?])\s{2,}([A-Z])/g, '$1 $2')  // Fix spaces after punctuation
        .replace(/\s+([,.!?])/g, '$1')  // Remove spaces before punctuation
        .replace(/([^.!?])\n\n+([a-z])/g, (m, p1, p2) => p1 + ' ' + p2)  // Fix broken sentences
        .replace(/\n{3,}/g, '\n\n')  // Normalize multiple newlines
        .trim();
    }

    return result;
  }
}
