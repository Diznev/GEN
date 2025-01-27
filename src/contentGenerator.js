export function generateContent(page, config, images) {
  const isGerman = config.language === 'German';
  
  const content = {
    title: getPageTitle(page, isGerman),
    description: getPageDescription(page, config, isGerman),
    paragraphs: [],
    images: images,
    sidebar: generateSidebar(config, isGerman)
  };

  switch (page) {
    case 'index':
      content.paragraphs = generateIndexContent(config, isGerman);
      content.features = generateFeatures(config, isGerman);
      break;
    case 'about':
      content.paragraphs = generateAboutContent(config, isGerman);
      break;
    case 'privacy':
      content.paragraphs = generatePrivacyContent(config, isGerman);
      break;
    case 'payment':
      content.paragraphs = generatePaymentContent(config, isGerman);
      break;
    case 'contact':
      content.paragraphs = generateContactContent(config, isGerman);
      content.contactForm = true;
      break;
  }

  return content;
}

function getIndustryContent(industry, isGerman) {
  const content = {
    Technology: {
      de: {
        features: [
          'Innovative Softwarelösungen',
          'Digitale Transformation',
          'Cybersicherheit'
        ],
        articles: [
          {
            title: 'KI-Entwicklung',
            summary: 'Neue Möglichkeiten durch künstliche Intelligenz'
          },
          {
            title: 'Cloud Computing',
            summary: 'Skalierbare Lösungen für Unternehmen'
          },
          {
            title: 'Digitale Sicherheit',
            summary: 'Schutz vor Cyber-Bedrohungen'
          }
        ]
      },
      en: {
        features: [
          'Innovative Software Solutions',
          'Digital Transformation',
          'Cybersecurity'
        ],
        articles: [
          {
            title: 'AI Development',
            summary: 'New possibilities through artificial intelligence'
          },
          {
            title: 'Cloud Computing',
            summary: 'Scalable solutions for businesses'
          },
          {
            title: 'Digital Security',
            summary: 'Protection against cyber threats'
          }
        ]
      }
    },
    Healthcare: {
      de: {
        features: [
          'Medizinische Innovation',
          'Patientenversorgung',
          'Gesundheitstechnologie'
        ],
        articles: [
          {
            title: 'Digitale Gesundheit',
            summary: 'Moderne Lösungen für die Patientenbetreuung'
          },
          {
            title: 'Telemedizin',
            summary: 'Fernbehandlung und Beratung'
          },
          {
            title: 'Medizintechnik',
            summary: 'Innovative Geräte und Systeme'
          }
        ]
      },
      en: {
        features: [
          'Medical Innovation',
          'Patient Care',
          'Healthcare Technology'
        ],
        articles: [
          {
            title: 'Digital Health',
            summary: 'Modern solutions for patient care'
          },
          {
            title: 'Telemedicine',
            summary: 'Remote treatment and consultation'
          },
          {
            title: 'Medical Technology',
            summary: 'Innovative devices and systems'
          }
        ]
      }
    },
    Education: {
      de: {
        features: [
          'Digitales Lernen',
          'Bildungsinnovation',
          'Wissensvermittlung'
        ],
        articles: [
          {
            title: 'E-Learning',
            summary: 'Moderne Bildungsplattformen'
          },
          {
            title: 'Digitale Klassenzimmer',
            summary: 'Technologie im Unterricht'
          },
          {
            title: 'Weiterbildung',
            summary: 'Lebenslanges Lernen fördern'
          }
        ]
      },
      en: {
        features: [
          'Digital Learning',
          'Educational Innovation',
          'Knowledge Transfer'
        ],
        articles: [
          {
            title: 'E-Learning',
            summary: 'Modern educational platforms'
          },
          {
            title: 'Digital Classrooms',
            summary: 'Technology in education'
          },
          {
            title: 'Professional Development',
            summary: 'Promoting lifelong learning'
          }
        ]
      }
    },
    Finance: {
      de: {
        features: [
          'Finanzberatung',
          'Digitales Banking',
          'Vermögensverwaltung'
        ],
        articles: [
          {
            title: 'Online Banking',
            summary: 'Sichere digitale Transaktionen'
          },
          {
            title: 'Fintech-Lösungen',
            summary: 'Innovation im Finanzsektor'
          },
          {
            title: 'Anlagestrategien',
            summary: 'Nachhaltige Investitionen'
          }
        ]
      },
      en: {
        features: [
          'Financial Advisory',
          'Digital Banking',
          'Asset Management'
        ],
        articles: [
          {
            title: 'Online Banking',
            summary: 'Secure digital transactions'
          },
          {
            title: 'Fintech Solutions',
            summary: 'Innovation in finance'
          },
          {
            title: 'Investment Strategies',
            summary: 'Sustainable investments'
          }
        ]
      }
    },
    Manufacturing: {
      de: {
        features: [
          'Produktionstechnik',
          'Qualitätssicherung',
          'Industrie 4.0'
        ],
        articles: [
          {
            title: 'Smart Factory',
            summary: 'Intelligente Fertigung'
          },
          {
            title: 'Automatisierung',
            summary: 'Effiziente Produktionsprozesse'
          },
          {
            title: 'Nachhaltigkeit',
            summary: 'Umweltfreundliche Produktion'
          }
        ]
      },
      en: {
        features: [
          'Production Technology',
          'Quality Assurance',
          'Industry 4.0'
        ],
        articles: [
          {
            title: 'Smart Factory',
            summary: 'Intelligent manufacturing'
          },
          {
            title: 'Automation',
            summary: 'Efficient production processes'
          },
          {
            title: 'Sustainability',
            summary: 'Environmentally friendly production'
          }
        ]
      }
    },
    Retail: {
      de: {
        features: [
          'E-Commerce',
          'Kundenservice',
          'Digitaler Handel'
        ],
        articles: [
          {
            title: 'Online Shopping',
            summary: 'Moderne Einkaufserlebnisse'
          },
          {
            title: 'Kundenbetreuung',
            summary: 'Personalisierter Service'
          },
          {
            title: 'Digitale Trends',
            summary: 'Zukunft des Einzelhandels'
          }
        ]
      },
      en: {
        features: [
          'E-Commerce',
          'Customer Service',
          'Digital Trade'
        ],
        articles: [
          {
            title: 'Online Shopping',
            summary: 'Modern shopping experiences'
          },
          {
            title: 'Customer Care',
            summary: 'Personalized service'
          },
          {
            title: 'Digital Trends',
            summary: 'Future of retail'
          }
        ]
      }
    },
    Construction: {
      de: {
        features: [
          'Projektmanagement',
          'Bauqualität',
          'Nachhaltigkeit'
        ],
        articles: [
          {
            title: 'Moderne Bautechnik',
            summary: 'Innovative Bauverfahren'
          },
          {
            title: 'Energieeffizienz',
            summary: 'Nachhaltige Gebäude'
          },
          {
            title: 'Digitale Planung',
            summary: 'BIM und 3D-Modellierung'
          }
        ]
      },
      en: {
        features: [
          'Project Management',
          'Construction Quality',
          'Sustainability'
        ],
        articles: [
          {
            title: 'Modern Construction',
            summary: 'Innovative building methods'
          },
          {
            title: 'Energy Efficiency',
            summary: 'Sustainable buildings'
          },
          {
            title: 'Digital Planning',
            summary: 'BIM and 3D modeling'
          }
        ]
      }
    },
    Consulting: {
      de: {
        features: [
          'Strategieberatung',
          'Prozessoptimierung',
          'Digitalisierung'
        ],
        articles: [
          {
            title: 'Unternehmensberatung',
            summary: 'Strategische Entwicklung'
          },
          {
            title: 'Digitale Transformation',
            summary: 'Zukunftsfähige Lösungen'
          },
          {
            title: 'Change Management',
            summary: 'Erfolgreicher Wandel'
          }
        ]
      },
      en: {
        features: [
          'Strategy Consulting',
          'Process Optimization',
          'Digitalization'
        ],
        articles: [
          {
            title: 'Business Consulting',
            summary: 'Strategic development'
          },
          {
            title: 'Digital Transformation',
            summary: 'Future-proof solutions'
          },
          {
            title: 'Change Management',
            summary: 'Successful transformation'
          }
        ]
      }
    }
  };

  return content[industry][isGerman ? 'de' : 'en'];
}

function generateArticles(config, isGerman, count) {
  const industryContent = getIndustryContent(config.industry, isGerman);
  const baseArticles = industryContent.articles;
  
  const articles = baseArticles.map((article, index) => ({
    ...article,
    date: new Date(Date.now() - index * 86400000).toLocaleDateString(
      isGerman ? 'de-DE' : 'en-US'
    )
  }));

  return articles.slice(0, count);
}

function generateNews(config, isGerman, count) {
  const industryContent = getIndustryContent(config.industry, isGerman);
  
  const news = industryContent.articles.map((article, index) => ({
    title: `${config.companyName}: ${article.title}`,
    summary: article.summary,
    date: new Date(Date.now() - index * 86400000).toLocaleDateString(
      isGerman ? 'de-DE' : 'en-US'
    )
  }));

  return news.slice(0, count);
}

function generateFeatures(config, isGerman) {
  const industryContent = getIndustryContent(config.industry, isGerman);
  
  return industryContent.features.map(feature => ({
    title: feature,
    description: isGerman
      ? `Führend in ${feature}`
      : `Leading in ${feature}`
  }));
}

function generateSidebar(config, isGerman) {
  return {
    left: {
      title: isGerman ? 'Aktuelle Artikel' : 'Latest Articles',
      articles: generateArticles(config, isGerman, 5)
    },
    right: {
      title: isGerman ? 'Neuigkeiten' : 'Latest News',
      news: generateNews(config, isGerman, 5)
    }
  };
}

function getPageTitle(page, isGerman) {
  const titles = {
    index: isGerman ? 'Startseite' : 'Home',
    about: isGerman ? 'Über uns' : 'About Us',
    privacy: isGerman ? 'Datenschutzerklärung' : 'Privacy Policy',
    payment: isGerman ? 'Zahlungsbedingungen' : 'Payment Policy',
    contact: isGerman ? 'Kontakt' : 'Contact Us'
  };
  return titles[page];
}

function getPageDescription(page, config, isGerman) {
  const descriptions = {
    index: isGerman
      ? `Willkommen bei ${config.companyName} - Ihr vertrauenswürdiger Partner im Bereich ${config.industry}`
      : `Welcome to ${config.companyName} - your trusted partner in ${config.industry}`,
    about: isGerman
      ? `Erfahren Sie mehr über ${config.companyName} und unsere Geschichte im ${config.industry} Sektor`
      : `Learn more about ${config.companyName} and our history in the ${config.industry} sector`,
    privacy: isGerman
      ? 'Unsere Datenschutzerklärung - Ihr Vertrauen ist uns wichtig'
      : 'Our Privacy Policy - Your trust matters to us',
    payment: isGerman
      ? 'Informationen zu unseren Zahlungsmöglichkeiten und Konditionen'
      : 'Information about our payment options and terms',
    contact: isGerman
      ? 'Kontaktieren Sie uns - Wir sind für Sie da'
      : 'Contact us - We are here for you'
  };
  return descriptions[page];
}

function generateIndexContent(config, isGerman) {
  const industryContent = getIndustryContent(config.industry, isGerman);
  
  if (isGerman) {
    return [
      `Als führendes Unternehmen im Bereich ${config.industry} bieten wir innovative Lösungen für unsere Kunden.`,
      `Unsere Expertise in ${industryContent.features.join(', ')} setzt neue Maßstäbe in der Branche.`,
      'Mit modernster Technologie und einem erfahrenen Team garantieren wir höchste Qualität.',
      'Innovation und Kundenzufriedenheit stehen bei uns im Mittelpunkt.',
      'Entdecken Sie unsere vielfältigen Angebote und überzeugen Sie sich selbst.'
    ];
  }
  
  return [
    `As a leading company in ${config.industry}, we offer innovative solutions for our customers.`,
    `Our expertise in ${industryContent.features.join(', ')} sets new standards in the industry.`,
    'With cutting-edge technology and an experienced team, we guarantee the highest quality.',
    'Innovation and customer satisfaction are at the heart of everything we do.',
    'Discover our diverse offerings and see for yourself.'
  ];
}

function generateAboutContent(config, isGerman) {
  const industryContent = getIndustryContent(config.industry, isGerman);
  
  if (isGerman) {
    return [
      `${config.companyName} wurde mit der Vision gegründet, den ${config.industry}-Sektor zu revolutionieren.`,
      `Unsere Kernkompetenzen liegen in ${industryContent.features.join(', ')}.`,
      'Unser Team besteht aus hochqualifizierten Experten mit langjähriger Branchenerfahrung.',
      'Wir investieren kontinuierlich in Forschung und Entwicklung, um innovative Lösungen zu schaffen.',
      'Nachhaltigkeit und soziale Verantwortung sind zentrale Säulen unserer Unternehmensphilosophie.'
    ];
  }
  
  return [
    `${config.companyName} was founded with the vision to revolutionize the ${config.industry} sector.`,
    `Our core competencies lie in ${industryContent.features.join(', ')}.`,
    'Our team consists of highly qualified experts with years of industry experience.',
    'We continuously invest in research and development to create innovative solutions.',
    'Sustainability and social responsibility are central pillars of our company philosophy.'
  ];
}

function generatePrivacyContent(config, isGerman) {
  if (isGerman) {
    return [
      'Datenschutz und Datensicherheit haben bei uns höchste Priorität.',
      'Wir verarbeiten Ihre personenbezogenen Daten ausschließlich gemäß der DSGVO und weiterer geltender Datenschutzvorschriften.',
      'Ihre Daten werden nur für die angegebenen Zwecke verwendet und nicht an Dritte weitergegeben.',
      'Wir setzen modernste Sicherheitstechnologien ein, um Ihre Daten zu schützen.',
      'Sie haben jederzeit das Recht auf Auskunft, Berichtigung oder Löschung Ihrer Daten.',
      'Unsere Datenschutzbeauftragten stehen Ihnen bei Fragen zur Verfügung.',
      'Cookies werden nur mit Ihrer ausdrücklichen Zustimmung gesetzt.'
    ];
  }
  
  return [
    'Data protection and security are our highest priority.',
    'We process your personal data exclusively in accordance with GDPR and other applicable data protection regulations.',
    'Your data is only used for the stated purposes and not shared with third parties.',
    'We use state-of-the-art security technologies to protect your data.',
    'You have the right to access, correct, or delete your data at any time.',
    'Our data protection officers are available to answer your questions.',
    'Cookies are only set with your explicit consent.'
  ];
}

function generatePaymentContent(config, isGerman) {
  if (isGerman) {
    return [
      'Wir bieten verschiedene sichere Zahlungsmöglichkeiten für Ihre Bequemlichkeit.',
      'Alle Zahlungen werden über SSL-verschlüsselte Verbindungen abgewickelt.',
      'Verfügbare Zahlungsarten: Kreditkarte, PayPal, Überweisung und SEPA-Lastschrift.',
      'Rechnungen sind innerhalb von 30 Tagen nach Rechnungsstellung zu begleichen.',
      'Bei größeren Projekten bieten wir flexible Ratenzahlungsoptionen an.',
      'Alle Preise verstehen sich zzgl. der gesetzlichen Mehrwertsteuer.',
      'Bei Fragen zu Zahlungen steht unser Finanzteam zur Verfügung.'
    ];
  }
  
  return [
    'We offer various secure payment options for your convenience.',
    'All payments are processed through SSL-encrypted connections.',
    'Available payment methods: Credit card, PayPal, bank transfer, and SEPA direct debit.',
    'Invoices must be paid within 30 days of invoice date.',
    'For larger projects, we offer flexible installment payment options.',
    'All prices are subject to applicable VAT.',
    'Our finance team is available for any payment-related questions.'
  ];
}

function generateContactContent(config, isGerman) {
  if (isGerman) {
    return [
      'Wir freuen uns auf Ihre Kontaktaufnahme!',
      `Unser Hauptsitz befindet sich in: ${config.address}`,
      `Telefonisch erreichen Sie uns unter: ${config.phone}`,
      `E-Mail: ${config.email}`,
      'Unsere Geschäftszeiten: Montag bis Freitag, 9:00 - 18:00 Uhr',
      'Nutzen Sie gerne unser Kontaktformular für Ihre Anfrage.',
      'Wir bemühen uns, alle Anfragen innerhalb von 24 Stunden zu beantworten.'
    ];
  }
  
  return [
    'We look forward to hearing from you!',
    `Our headquarters are located at: ${config.address}`,
    `You can reach us by phone at: ${config.phone}`,
    `Email: ${config.email}`,
    'Our business hours: Monday to Friday, 9:00 AM - 6:00 PM',
    'Feel free to use our contact form for your inquiry.',
    'We strive to respond to all inquiries within 24 hours.'
  ];
}
