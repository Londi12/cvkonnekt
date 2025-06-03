const templates = {
  professional: [
    {      name: "Classic",
      className: "bg-white text-black p-6 space-y-4 font-serif",
      headerClass: "text-2xl font-bold border-b-2 border-gray-800",
      sectionClass: "text-sm",
      previewImage: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="200" height="250" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <rect width="200" height="250" fill="white"/>
          <rect x="15" y="15" width="170" height="40" fill="#f8f8f8"/>
          <text x="20" y="42" fill="#1f2937" font-weight="bold" font-size="20">John Smith</text>
          <text x="20" y="75" fill="#4B5563" font-size="10">123 Main St, City • john@email.com</text>
          <line x1="15" y1="85" x2="185" y2="85" stroke="#333" stroke-width="1"/>
          <text x="15" y="105" fill="#374151" font-weight="600" font-size="14">Experience</text>
          <rect x="15" y="115" width="170" height="25" fill="#f8f8f8" rx="2"/>
          <rect x="15" y="145" width="170" height="25" fill="#f8f8f8" rx="2"/>
          <text x="15" y="190" fill="#374151" font-weight="600" font-size="14">Education</text>
          <rect x="15" y="200" width="170" height="25" fill="#f8f8f8" rx="2"/>
        </svg>
      `)}`
    },
    {      name: "Executive",
      className: "bg-slate-50 text-gray-900 p-8 space-y-6 font-sans",
      headerClass: "text-3xl font-bold text-blue-900 border-b border-blue-200",
      sectionClass: "text-base leading-relaxed",
      previewImage: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="200" height="250" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <rect width="200" height="250" fill="#f8fafc"/>
          <rect x="15" y="15" width="170" height="45" fill="#1e3a8a"/>
          <text x="20" y="45" fill="white" font-size="18" font-weight="bold">JAMES WILSON</text>
          <text x="20" y="80" fill="#1e3a8a" font-size="10" font-weight="500">Senior Executive</text>
          <line x1="20" y1="90" x2="180" y2="90" stroke="#bfdbfe" stroke-width="2"/>
          <text x="20" y="115" fill="#1e3a8a" font-size="12" font-weight="600">EXPERIENCE</text>
          <rect x="20" y="125" width="160" height="30" fill="#e2e8f0" rx="2"/>
          <rect x="20" y="160" width="160" height="30" fill="#e2e8f0" rx="2"/>
        </svg>
      `)}`
    },
    {      name: "Corporate",
      className: "bg-white text-gray-800 p-6 space-y-5 font-sans",
      headerClass: "text-2xl font-semibold text-gray-900 border-b-2 border-gray-300",
      sectionClass: "text-sm leading-relaxed",
      previewImage: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="200" height="250" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="250" fill="white"/>
          <text x="20" y="40" fill="#111827" style="font-size:18px;font-weight:bold;">Sarah Johnson</text>
          <text x="20" y="60" fill="#6B7280" style="font-size:11px;">Marketing Director</text>
          <line x1="20" y1="75" x2="180" y2="75" stroke="#d1d5db" stroke-width="2"/>
          <text x="20" y="100" fill="#374151" style="font-size:13px;font-weight:600;">Career Summary</text>
          <rect x="20" y="110" width="160" height="35" fill="#f3f4f6" rx="2"/>
          <text x="20" y="165" fill="#374151" style="font-size:13px;font-weight:600;">Experience</text>
          <rect x="20" y="175" width="160" height="30" fill="#f3f4f6" rx="2"/>
        </svg>
      `)}`
    }
  ],
  creative: [
    {      name: "Modern",
      className: "bg-gradient-to-r from-purple-200 to-pink-200 text-gray-800 p-6 space-y-4 font-sans",
      headerClass: "text-2xl font-extrabold text-purple-800",
      sectionClass: "text-sm italic",
      previewImage: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="200" height="250" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#e9d5ff;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#fbcfe8;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="200" height="250" fill="url(#grad1)"/>
          <circle cx="50" cy="50" r="30" fill="#6b21a8" opacity="0.2"/>
          <rect x="60" y="35" width="80" height="15" fill="#581c87"/>
          <rect x="70" y="55" width="60" height="8" fill="#581c87"/>
          <rect x="30" y="90" width="140" height="25" fill="white" opacity="0.5" rx="12.5"/>
          <rect x="30" y="125" width="140" height="25" fill="white" opacity="0.5" rx="12.5"/>
          <rect x="30" y="160" width="140" height="25" fill="white" opacity="0.5" rx="12.5"/>
        </svg>
      `)}`
    },
    {      name: "Creative",
      className: "bg-black text-white p-8 space-y-6 font-sans",
      headerClass: "text-3xl font-black text-yellow-400 border-b-2 border-yellow-400",
      sectionClass: "text-base",
      previewImage: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="200" height="250" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="250" fill="black"/>
          <rect x="20" y="35" width="100" height="15" fill="#facc15"/>
          <rect x="20" y="55" width="100" height="15" fill="#facc15"/>
          <line x1="20" y1="90" x2="180" y2="90" stroke="#facc15" stroke-width="2"/>
          <rect x="20" y="110" width="160" height="20" fill="#333" rx="2"/>
          <rect x="20" y="140" width="160" height="20" fill="#333" rx="2"/>
          <rect x="20" y="170" width="160" height="20" fill="#333" rx="2"/>
          <circle cx="170" cy="30" r="15" fill="#facc15"/>
        </svg>
      `)}`
    }
  ],
  harvard: [
    {      name: "Academic",
      className: "bg-white text-gray-900 p-8 space-y-5 font-serif",
      headerClass: "text-2xl font-bold text-gray-800 border-b-2 border-crimson-600",
      sectionClass: "text-sm leading-relaxed",
      previewImage: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="200" height="250" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="250" fill="white"/>
          <rect x="20" y="25" width="140" height="15" fill="#374151"/>
          <rect x="20" y="50" width="110" height="8" fill="#4B5563"/>
          <line x1="20" y1="75" x2="180" y2="75" stroke="#dc2626" stroke-width="2"/>
          <rect x="20" y="95" width="80" height="10" fill="#374151"/>
          <rect x="20" y="110" width="160" height="30" fill="#f3f4f6" rx="2"/>
          <rect x="20" y="155" width="80" height="10" fill="#374151"/>
          <rect x="20" y="170" width="160" height="30" fill="#f3f4f6" rx="2"/>
        </svg>
      `)}`
    },
    {      name: "Research",
      className: "bg-slate-50 text-gray-900 p-7 space-y-6 font-serif",
      headerClass: "text-2xl font-bold text-slate-800 border-b border-slate-300",
      sectionClass: "text-sm leading-relaxed",
      previewImage: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="200" height="250" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="250" fill="#f8fafc"/>
          <rect x="20" y="25" width="120" height="15" fill="#1e293b"/>
          <line x1="20" y1="60" x2="180" y2="60" stroke="#94a3b8" stroke-width="1"/>
          <rect x="20" y="80" width="90" height="10" fill="#1e293b"/>
          <rect x="20" y="95" width="160" height="40" fill="#e2e8f0" rx="2"/>
          <rect x="20" y="150" width="90" height="10" fill="#1e293b"/>
          <rect x="20" y="165" width="160" height="40" fill="#e2e8f0" rx="2"/>
        </svg>
      `)}`
    },
    {      name: "Scholar",
      className: "bg-white text-gray-900 p-6 space-y-4 font-serif border-t-4 border-blue-800",
      headerClass: "text-xl font-bold text-blue-900",
      sectionClass: "text-sm leading-relaxed",
      previewImage: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="200" height="250" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="250" fill="white"/>
          <rect x="0" y="0" width="200" height="4" fill="#1e40af"/>
          <rect x="20" y="25" width="100" height="15" fill="#1e3a8a"/>
          <line x1="20" y1="55" x2="180" y2="55" stroke="#1e40af" stroke-width="1"/>
          <rect x="20" y="75" width="120" height="10" fill="#1e3a8a"/>
          <rect x="20" y="90" width="160" height="35" fill="#f8f8f8" rx="2"/>
          <rect x="20" y="135" width="160" height="35" fill="#f8f8f8" rx="2"/>
          <rect x="20" y="185" width="100" height="10" fill="#1e3a8a"/>
        </svg>
      `)}`
    },
    {      name: "Thesis",
      className: "bg-gray-50 text-gray-900 p-7 space-y-5 font-serif",
      headerClass: "text-2xl font-bold text-gray-800 border-b-2 border-gray-300",
      sectionClass: "text-sm leading-relaxed",
      previewImage: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="200" height="250" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="250" fill="#f9fafb"/>
          <rect x="20" y="25" width="110" height="15" fill="#374151"/>
          <line x1="20" y1="60" x2="180" y2="60" stroke="#d1d5db" stroke-width="2"/>
          <rect x="20" y="80" width="90" height="10" fill="#374151"/>
          <rect x="20" y="95" width="160" height="45" fill="#f3f4f6" rx="2"/>
          <rect x="20" y="155" width="90" height="10" fill="#374151"/>
          <rect x="20" y="170" width="160" height="45" fill="#f3f4f6" rx="2"/>
        </svg>
      `)}`
    }
  ]
};

// Make templates available globally
window.templates = templates;

// Create React components for each template
window.ResumeTemplates = {};
Object.entries(templates).forEach(([category, templateList]) => {
  templateList.forEach(template => {
    window.ResumeTemplates[template.name] = (props) => {
      const { data } = props;
      return React.createElement('div', {
        className: template.className
      }, [
        // Header section
        React.createElement('div', { 
          key: 'header',
          className: template.headerClass 
        }, data.personalInfo.fullName),
        
        // Contact section
        React.createElement('div', {
          key: 'contact',
          className: 'text-sm'
        }, [
          data.personalInfo.email,
          ' • ',
          data.personalInfo.phone
        ]),
        
        // Summary section
        React.createElement('div', {
          key: 'summary',
          className: template.sectionClass
        }, data.professionalSummary)
      ]);
    };
  });
});

// Create ResumeTemplates format for the builder
window.ResumeTemplates = {};
Object.entries(templates).forEach(([category, templates]) => {
  templates.forEach(template => {
    window.ResumeTemplates[template.name] = (props) => React.createElement('div', {
      className: template.className
    }, 'Template Content Here');
  });
});

export { templates };