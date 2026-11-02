import type { Locale } from './site';

export type BadgeType = 'accelerated' | 'enhanced' | 'performance';

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
}

interface ProjectBase {
  slug: string;
  tech: string[];
  flagship?: boolean;
  isPrivate?: boolean;
  badge?: BadgeType;
  images?: ProjectImage[];
}

interface ProjectText {
  title: string;
  summary: string;
  metric?: string;
  // What I built — the bullet list previously shown in the modal.
  details: string[];
  // Case-study sections. Leave empty until there is real, verifiable content;
  // empty sections are not rendered.
  challenge?: string;
  architecture?: string[];
  decisions?: string[];
  results?: string[];
}

export type Project = ProjectBase & ProjectText;

const projectBase: ProjectBase[] = [
  {
    slug: 'shopify-fel-ecommerce',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Shopify API', 'FEL API'],
    flagship: true,
    isPrivate: true,
    badge: 'accelerated',
  },
  {
    slug: 'cinema-ticketing-platform',
    tech: ['PHP', 'JavaScript', 'QR Integration', 'Payment APIs'],
    flagship: true,
    badge: 'performance',
  },
  {
    slug: 'sap-quotation-platform',
    tech: ['PHP', 'JavaScript', 'SAP Business One API', 'PDF Generation'],
    badge: 'accelerated',
    images: [
      {
        src: '/Multi_dash.png',
        width: 1371,
        height: 778,
        alt: { en: 'Quotation platform dashboard', es: 'Panel de la plataforma de cotizaciones' },
      },
      {
        src: '/multi_coti.png',
        width: 1453,
        height: 766,
        alt: { en: 'Quotation editor connected to SAP Business One', es: 'Editor de cotizaciones conectado a SAP Business One' },
      },
    ],
  },
  {
    slug: 'corporate-email-signatures',
    tech: ['JavaScript', 'PHP', 'Azure', 'REST API'],
    badge: 'enhanced',
  },
  {
    slug: 'workspace-booking-suite',
    tech: ['React', 'TypeScript', 'JavaScript'],
  },
  {
    slug: 'ai-assisted-portfolio',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'AI SDK', 'Groq', 'Claude Code'],
    badge: 'accelerated',
  },
];

const projectText: Record<Locale, Record<string, ProjectText>> = {
  en: {
    'shopify-fel-ecommerce': {
      title: 'Shopify E-Commerce Platform with FEL Invoicing & Shipping Automation',
      summary: 'Custom Shopify platform with FEL electronic invoicing (Guatemala SAT), multi-carrier shipping automation, and admin dashboard. Reduced order processing time by 70%.',
      metric: '70% faster order processing',
      details: [
        'FEL electronic invoicing integration with Guatemala SAT directly from Shopify',
        'Multi-carrier shipping automation (Guatex, DHL, local pickup) with zero manual steps',
        'Admin dashboard with real-time inventory, order management, and reporting',
        '70% reduction in order processing time through automated workflows',
        'Built with Claude Code: full system shipped in weeks, not months',
      ],
    },
    'cinema-ticketing-platform': {
      title: 'High-Traffic Cinema Booking & Ticketing Platform',
      summary: 'National cinema chain booking platform with multi-provider payment reconciliation. QR ticketing system, advanced schedule filters, and production payment error resolution.',
      metric: 'Hundreds of daily transactions',
      details: [
        'High-traffic platform: simultaneous screenings with hundreds of daily transactions',
        'QR ticketing system with real-time in-venue validation',
        'Payment reconciliation across multiple providers (Visa, Mastercard, cash)',
        'Advanced seat selection filters by zone, accessibility, and price',
        'Production payment connection error resolution with zero downtime',
      ],
    },
    'sap-quotation-platform': {
      title: 'SAP Business One Quotation Platform',
      summary: 'Real-time SAP Business One integration: live product catalog, pricing, and customer sync. Automated PDF quotation generation. Reduced quote turnaround from 20 min to under 2 min.',
      metric: '20 min → under 2 min per quote',
      details: [
        'Bidirectional SAP Business One integration: live products, customers, and pricing',
        'Automated PDF quotation generation with per-client custom branding',
        'Intelligent caching layer for frequent SAP queries',
        'Quote turnaround reduced from 20 minutes to under 2 minutes',
        'Multi-user system with quotation history and approval workflows',
      ],
    },
    'corporate-email-signatures': {
      title: 'Multi-Company Corporate Signature Generator',
      summary: 'Personalized HTML email signatures per employee and sub-company for a multinational. Built on Azure, Outlook-compatible. Zero manual setup for 200+ employees.',
      metric: '200+ employees, zero manual setup',
      details: [
        "Full system built from scratch and deployed on the client's Azure server via SSH",
        'Personalized HTML signatures per employee with per-company colors and logos',
        'Outlook-compatible with one-click export — zero manual configuration',
        'Covers 200+ employees across multiple companies in the same multinational',
        "Custom REST API integrating with the client's employee directory",
      ],
    },
    'workspace-booking-suite': {
      title: 'React Workspace Management Suite',
      summary: 'Three React apps for office space, parking, and meeting room management. 40% reduction in booking conflicts and full elimination of manual coordination processes.',
      metric: '40% fewer booking conflicts',
      details: [
        'Three React applications: office desks, parking spots, and meeting rooms',
        '40% reduction in booking conflicts',
        'Replaced manual coordination processes end to end',
      ],
    },
    'ai-assisted-portfolio': {
      title: 'Portfolio Built with AI-Assisted Development',
      summary: 'This site — built with Next.js and Tailwind CSS using Claude Code as the primary tool. Bilingual routes with hreflang, structured data, and an AI assistant (Vercel AI SDK + Groq) that answers questions about my profile.',
      details: [
        'Next.js App Router with fully separate /en and /es routes and hreflang alternates',
        'AI assistant built with the Vercel AI SDK on Groq, grounded only on the content of this site',
        'schema.org Person data and llms.txt so AI search tools describe my profile accurately',
        'Contact form with server-side validation and transactional email',
      ],
    },
  },
  es: {
    'shopify-fel-ecommerce': {
      title: 'Plataforma E-Commerce con FEL y Automatización de Envíos',
      summary: 'Plataforma Shopify a la medida con facturación electrónica FEL (SAT Guatemala), automatización de envíos con varias transportistas y panel de administración. Reducción del 70% en el tiempo de procesamiento de órdenes.',
      metric: '70% menos tiempo por orden',
      details: [
        'Integración de facturación electrónica FEL con el SAT de Guatemala directamente desde Shopify',
        'Automatización de envíos con varias transportistas (Guatex, DHL, recogida local) sin intervención manual',
        'Panel de administración con control de inventario, órdenes y reportes en tiempo real',
        'Reducción del 70% en tiempo de procesamiento de órdenes gracias a flujos automatizados',
        'Desarrollo acelerado con Claude Code: sistema completo desplegado en semanas, no meses',
      ],
    },
    'cinema-ticketing-platform': {
      title: 'Plataforma de Reservas y Boletería para Cadena de Cines Nacional',
      summary: 'Plataforma de venta de butacas para una cadena de cines nacional con varios proveedores de pago. Boletería con QR, filtros avanzados de horarios y resolución de errores de pago en producción.',
      metric: 'Cientos de transacciones al día',
      details: [
        'Plataforma de alta demanda: múltiples funciones simultáneas con cientos de transacciones diarias',
        'Sistema de boletería QR con validación en sala en tiempo real',
        'Conciliación de pagos con varios proveedores (Visa, Mastercard, efectivo)',
        'Filtros avanzados de selección de butaca por zona, accesibilidad y precio',
        'Resolución de errores críticos de conexión con puntos de pago en producción, sin caídas',
      ],
    },
    'sap-quotation-platform': {
      title: 'ERP de Cotizaciones con Integración SAP Business One',
      summary: 'Sistema conectado en tiempo real a SAP Business One: sincronización de catálogo, precios y clientes. Generación automática de cotizaciones en PDF. Tiempo de cotización reducido de 20 min a menos de 2 min.',
      metric: '20 min → menos de 2 min por cotización',
      details: [
        'Integración bidireccional con SAP Business One: productos, clientes y precios en tiempo real',
        'Generación automática de cotizaciones en PDF con la marca de cada cliente',
        'Caché inteligente para consultas frecuentes a SAP',
        'Reducción del tiempo de cotización de 20 minutos a menos de 2 minutos',
        'Sistema multiusuario con historial de cotizaciones y aprobaciones',
      ],
    },
    'corporate-email-signatures': {
      title: 'Generador de Firmas Corporativas Multiempresa',
      summary: 'Firmas HTML personalizadas por colaborador y por empresa de una multinacional. Desarrollado en Azure, compatible con Outlook. Cero configuración manual para más de 200 empleados.',
      metric: 'Más de 200 empleados, cero configuración manual',
      details: [
        'Sistema completo desarrollado desde cero e instalado en el servidor Azure del cliente vía SSH',
        'Firmas HTML personalizadas por colaborador con los colores y logos de cada empresa',
        'Compatible con Outlook sin configuración manual — exportación con un clic',
        'Cubre a más de 200 empleados de varias empresas de la misma multinacional',
        'API REST propia integrada con el directorio de empleados del cliente',
      ],
    },
    'workspace-booking-suite': {
      title: 'Suite de Apps React para Gestión de Espacios de Trabajo',
      summary: 'Tres aplicaciones React para gestionar espacios de oficina, parqueos y salas de reunión. Reducción del 40% en conflictos de reserva y eliminación de procesos manuales.',
      metric: '40% menos conflictos de reserva',
      details: [
        'Tres aplicaciones React: escritorios, parqueos y salas de reunión',
        'Reducción del 40% en conflictos de reserva',
        'Sustitución completa de los procesos manuales de coordinación',
      ],
    },
    'ai-assisted-portfolio': {
      title: 'Portafolio Construido con Desarrollo Asistido por IA',
      summary: 'Este sitio, construido con Next.js y Tailwind CSS usando Claude Code como herramienta principal. Rutas bilingües con hreflang, datos estructurados y un asistente con IA (Vercel AI SDK + Groq) que responde preguntas sobre mi perfil.',
      details: [
        'Next.js App Router con rutas /en y /es completamente separadas y alternativas hreflang',
        'Asistente con IA hecho con el Vercel AI SDK sobre Groq, que responde solo con el contenido de este sitio',
        'Datos schema.org de tipo Person y llms.txt para que los buscadores con IA describan bien mi perfil',
        'Formulario de contacto con validación en servidor y envío de correo transaccional',
      ],
    },
  },
};

export const getProjects = (locale: Locale): Project[] =>
  projectBase.map((base) => ({ ...base, ...projectText[locale][base.slug] }));

export const getProject = (locale: Locale, slug: string): Project | undefined =>
  getProjects(locale).find((p) => p.slug === slug);

export const projectSlugs = projectBase.map((p) => p.slug);

export const skills = [
  { category: 'AI-Assisted Dev', items: ['Claude Code (CLI)', 'Claude API', 'GitHub Copilot', 'Cursor', 'AI Workflows (3+ yrs)'], isAI: true },
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'] },
  { category: 'Backend', items: ['Node.js', 'TypeScript', 'JavaScript', 'PHP', 'NestJS', 'PostgreSQL', 'GraphQL', 'REST APIs', 'SAP APIs'] },
  { category: 'Infrastructure', items: ['AWS Lambda', 'Serverless', 'Docker', 'Azure', 'Linode/VPS', 'CI/CD', 'SSH'] },
];

const dictionaries = {
  en: {
    meta: {
      title: 'Alan Cifuentes | Senior Full Stack Engineer — Node.js, TypeScript, React, AI-Assisted',
      description: 'Senior Full Stack Engineer with 6+ years building production-grade systems. Node.js, TypeScript, React/Next.js, PostgreSQL, AWS. 3+ years of daily AI-assisted development (Claude Code, GitHub Copilot). Open to remote roles with US/European companies.',
      ogDescription: 'Senior Full Stack Engineer delivering production-grade systems 3-4x faster with AI-assisted workflows. Open to remote roles.',
    },
    switchLanguage: { label: 'Español', aria: 'Ver el sitio en español' },
    themeToggle: 'Toggle light/dark theme',
    skipToContent: 'Skip to content',
    time: { title: 'Time zones', mine: "Alan's time (Guatemala)", yours: 'Your time', same: 'Same time zone as you', close: 'Close' },
    hero: {
      openToRemote: 'Open to remote opportunities',
      location: 'Guatemala — Remote',
      tagline: 'Delivering production-grade systems 3-4x faster with AI-assisted workflows',
      subtitle: '6+ years Full Stack experience · Node.js · TypeScript · React/Next.js · PostgreSQL · AWS · AI-assisted since 2022',
      stats: [
        { value: '6+', label: 'yrs exp.' },
        { value: '3-4x', label: 'faster' },
        { value: 'AI', label: 'since 2022' },
      ],
      photoAlt: 'Alan Cifuentes — Senior Full Stack Engineer',
    },
    about: {
      title: 'About Me',
      paragraphs: [
        "Full stack engineer with 6+ years architecting e-commerce platforms, enterprise integration systems, and high-traffic applications. Throughout that career I've led projects involving SAP, Shopify, FEL electronic invoicing, and high-demand platforms.",
        "Since 2022 — on top of that solid foundation — I've integrated Claude Code and GitHub Copilot into my daily workflow. This isn't about replacing engineering judgment: it's about multiplying output while maintaining the rigorous quality and security standards I built over years of real production work.",
        'The result: I ship in days what used to take weeks, with the confidence of someone who has seen systems fail in production and knows exactly where to draw the line.',
      ],
      areas: ['Full Stack Development', 'Infrastructure & DevOps', 'Project Management', 'Technical Leadership'],
    },
    skillsTitle: 'Technical Skills',
    experience: {
      title: 'Professional Experience',
      items: [
        {
          title: 'Senior Full Stack Developer & Tech Lead',
          company: 'Tech & E-Commerce Agency',
          period: '2022 — Present',
          description: 'Architecture and development of e-commerce platforms, enterprise integration systems, and high-traffic applications. Pioneer in AI-assisted workflows (Claude Code, GitHub Copilot) reducing delivery times by 3-4x. Technical lead on projects integrating Shopify, SAP Business One, and electronic invoicing systems.',
          highlights: ['Node.js · TypeScript · React/Next.js', 'Shopify API · SAP Business One', '6+ yrs experience · AI-assisted since 2022', 'FEL · Electronic Invoicing GT'],
        },
        {
          title: 'Full Stack Developer & Systems Integrator',
          company: 'Independent / Corporate Clients',
          period: '2019 — 2022',
          description: 'Development of internal management systems, enterprise API integrations, and automation solutions for multinational companies. Built tools that eliminated repetitive manual processes and improved operational efficiency.',
          highlights: ['SAP Business One Integration', 'Azure · SSH · REST APIs', 'Corporate Digital Signatures', 'Automated Quotation Systems'],
        },
        {
          title: 'Technology Project Manager & Full Stack Developer',
          company: 'Corporate sector — Guatemala',
          period: '2017 — 2019',
          description: 'Led network and communications infrastructure projects. Developed web applications for space, parking, and office resource management. Coordinated technical teams and delivered projects under tight deadlines.',
          highlights: ['Technology Project Management', 'React · JavaScript · PHP', 'Network Infrastructure', 'Technical Team Leadership'],
        },
      ],
    },
    projects: {
      title: 'Featured Projects',
      readCaseStudy: 'Read case study',
      flagship: 'Flagship',
      privateProject: 'Private project',
      badges: { accelerated: 'AI-Accelerated', enhanced: 'AI-Enhanced', performance: 'High-Performance' } as Record<BadgeType, string>,
    },
    caseStudy: {
      back: 'Back to all projects',
      keyResult: 'Key result',
      challenge: 'The challenge',
      built: 'What I built',
      architecture: 'Architecture',
      decisions: 'Key decisions',
      results: 'Results',
      stack: 'Stack',
      screenshots: 'Screenshots',
      privateNote: 'Client project under NDA — code and live URL are private.',
      ctaTitle: 'Want to know more about this project?',
      ctaText: 'Ask the AI assistant, or write to me directly.',
      otherProjects: 'Other projects',
    },
    contact: {
      title: 'Ready to collaborate?',
      text: "Available for remote roles with US/European companies. If you have an interesting project or are looking for a senior engineer with real-world AI-assisted development experience, let's talk.",
      emailMe: 'Email me',
      copy: 'Copy email',
      copied: 'Copied!',
      linkedin: 'Connect on LinkedIn',
      github: 'View my code',
      bookCall: 'Book a call',
      downloadCv: 'Download CV (PDF)',
      form: {
        title: 'Send me a message',
        name: 'Name',
        email: 'Email',
        company: 'Company (optional)',
        message: 'Message',
        send: 'Send message',
        sending: 'Sending…',
        success: "Thanks! Your message is on its way — I'll reply within one business day.",
        error: 'Something went wrong. Please email me directly at',
        invalid: 'Please fill in your name, a valid email, and a message (10+ characters).',
      },
    },
    chat: {
      open: 'Ask AI about Alan',
      title: 'Ask about Alan',
      subtitle: 'AI assistant · answers only from this site',
      greeting: "Hi! I'm an AI assistant. Ask me anything about Alan's experience, projects, or skills.",
      placeholder: 'e.g. Has he worked with SAP?',
      send: 'Send',
      close: 'Close chat',
      suggestions: [
        'What is his experience with e-commerce integrations?',
        'Has he worked with SAP Business One?',
        'How does he use AI in his workflow?',
        'Is he available for remote work in US time zones?',
      ],
      error: 'The assistant is unavailable right now. You can email Alan directly at',
      disclaimer: 'AI answers can be imperfect — confirm details with Alan.',
    },
    footer: 'Built with Next.js · Tailwind CSS · Claude Code',
  },
  es: {
    meta: {
      title: 'Alan Cifuentes | Senior Full Stack Engineer — Node.js, TypeScript, React, desarrollo asistido por IA',
      description: 'Ingeniero Full Stack Senior con más de 6 años construyendo sistemas en producción. Node.js, TypeScript, React/Next.js, PostgreSQL, AWS. Más de 3 años de desarrollo diario asistido por IA (Claude Code, GitHub Copilot). Disponible para roles remotos con empresas de EE. UU. y Europa.',
      ogDescription: 'Ingeniero Full Stack Senior que entrega sistemas listos para producción 3-4x más rápido con flujos asistidos por IA. Disponible para roles remotos.',
    },
    switchLanguage: { label: 'English', aria: 'View the site in English' },
    themeToggle: 'Cambiar tema claro/oscuro',
    skipToContent: 'Saltar al contenido',
    time: { title: 'Zonas horarias', mine: 'Hora de Alan (Guatemala)', yours: 'Tu hora', same: 'Estás en la misma zona horaria', close: 'Cerrar' },
    hero: {
      openToRemote: 'Disponible para roles remotos',
      location: 'Guatemala — Remoto',
      tagline: 'Entrego sistemas listos para producción 3-4x más rápido con flujos de trabajo asistidos por IA',
      subtitle: 'Más de 6 años en desarrollo Full Stack · Node.js · TypeScript · React/Next.js · PostgreSQL · AWS · Asistido por IA desde 2022',
      stats: [
        { value: '6+', label: 'años exp.' },
        { value: '3-4x', label: 'más rápido' },
        { value: 'IA', label: 'desde 2022' },
      ],
      photoAlt: 'Alan Cifuentes — Ingeniero Full Stack Senior',
    },
    about: {
      title: 'Sobre mí',
      paragraphs: [
        'Ingeniero full stack con más de 6 años diseñando plataformas de comercio electrónico, sistemas de integración empresarial y aplicaciones de alta demanda. En ese tiempo he liderado proyectos con SAP, Shopify, facturación electrónica FEL y plataformas de alto tráfico.',
        'Desde 2022, sobre esa base, integro Claude Code y GitHub Copilot en mi trabajo diario. No se trata de reemplazar el criterio de ingeniería, sino de multiplicar la producción manteniendo los mismos estándares de calidad y seguridad que construí en años de trabajo real.',
        'El resultado: entrego en días lo que antes tomaba semanas, con la confianza de quien ha visto fallar sistemas en producción y sabe exactamente dónde poner los límites.',
      ],
      areas: ['Desarrollo Full Stack', 'Infraestructura y DevOps', 'Gestión de proyectos', 'Liderazgo técnico'],
    },
    skillsTitle: 'Habilidades técnicas',
    experience: {
      title: 'Experiencia profesional',
      items: [
        {
          title: 'Senior Full Stack Developer & Tech Lead',
          company: 'Agencia de tecnología y e-commerce',
          period: '2022 — Presente',
          description: 'Arquitectura y desarrollo de plataformas de comercio electrónico, sistemas de integración empresarial y aplicaciones de alta demanda. Pionero en flujos de trabajo asistidos por IA (Claude Code, GitHub Copilot) que redujeron los tiempos de entrega 3-4x. Líder técnico en proyectos con Shopify, SAP Business One y facturación electrónica.',
          highlights: ['Node.js · TypeScript · React/Next.js', 'Shopify API · SAP Business One', '6+ años de experiencia · IA desde 2022', 'FEL · Facturación electrónica GT'],
        },
        {
          title: 'Full Stack Developer & Systems Integrator',
          company: 'Proyectos independientes / Clientes corporativos',
          period: '2019 — 2022',
          description: 'Desarrollo de sistemas de gestión interna, integraciones con APIs empresariales y soluciones de automatización para empresas multinacionales. Herramientas que eliminaron procesos manuales repetitivos y mejoraron la eficiencia operativa.',
          highlights: ['Integración SAP Business One', 'Azure · SSH · APIs REST', 'Firmas digitales corporativas', 'Sistemas de cotización automática'],
        },
        {
          title: 'Technology Project Manager & Full Stack Developer',
          company: 'Sector corporativo — Guatemala',
          period: '2017 — 2019',
          description: 'Liderazgo de proyectos de infraestructura de redes y comunicaciones. Desarrollo de aplicaciones web para gestión de espacios, parqueos y recursos de oficina. Coordinación de equipos técnicos y entrega de proyectos con plazos ajustados.',
          highlights: ['Gestión de proyectos tecnológicos', 'React · JavaScript · PHP', 'Infraestructura de redes', 'Liderazgo técnico de equipos'],
        },
      ],
    },
    projects: {
      title: 'Proyectos destacados',
      readCaseStudy: 'Ver caso de estudio',
      flagship: 'Destacado',
      privateProject: 'Proyecto privado',
      badges: { accelerated: 'Acelerado con IA', enhanced: 'Potenciado con IA', performance: 'Alto rendimiento' } as Record<BadgeType, string>,
    },
    caseStudy: {
      back: 'Volver a todos los proyectos',
      keyResult: 'Resultado clave',
      challenge: 'El reto',
      built: 'Lo que construí',
      architecture: 'Arquitectura',
      decisions: 'Decisiones clave',
      results: 'Resultados',
      stack: 'Tecnologías',
      screenshots: 'Capturas',
      privateNote: 'Proyecto de cliente bajo NDA: el código y la URL son privados.',
      ctaTitle: '¿Quieres saber más de este proyecto?',
      ctaText: 'Pregúntale al asistente con IA o escríbeme directamente.',
      otherProjects: 'Otros proyectos',
    },
    contact: {
      title: '¿Listo para colaborar?',
      text: 'Disponible para roles remotos con empresas de EE. UU. y Europa. Si tienes un proyecto interesante o buscas un ingeniero senior con experiencia real en desarrollo asistido por IA, hablemos.',
      emailMe: 'Escríbeme',
      copy: 'Copiar correo',
      copied: '¡Copiado!',
      linkedin: 'Conectar en LinkedIn',
      github: 'Ver mi código',
      bookCall: 'Agendar una llamada',
      downloadCv: 'Descargar CV (PDF)',
      form: {
        title: 'Envíame un mensaje',
        name: 'Nombre',
        email: 'Correo',
        company: 'Empresa (opcional)',
        message: 'Mensaje',
        send: 'Enviar mensaje',
        sending: 'Enviando…',
        success: '¡Gracias! Tu mensaje va en camino; te respondo en un día hábil.',
        error: 'Algo salió mal. Escríbeme directamente a',
        invalid: 'Completa tu nombre, un correo válido y un mensaje (10 caracteres o más).',
      },
    },
    chat: {
      open: 'Pregúntale a la IA sobre Alan',
      title: 'Pregunta sobre Alan',
      subtitle: 'Asistente con IA · responde solo con este sitio',
      greeting: '¡Hola! Soy un asistente con IA. Pregúntame lo que quieras sobre la experiencia, proyectos o habilidades de Alan.',
      placeholder: 'p. ej. ¿Ha trabajado con SAP?',
      send: 'Enviar',
      close: 'Cerrar chat',
      suggestions: [
        '¿Qué experiencia tiene en integraciones de e-commerce?',
        '¿Ha trabajado con SAP Business One?',
        '¿Cómo usa la IA en su trabajo?',
        '¿Puede trabajar en horario de EE. UU.?',
      ],
      error: 'El asistente no está disponible ahora. Puedes escribirle a Alan directamente a',
      disclaimer: 'Las respuestas de la IA pueden tener errores; confirma los detalles con Alan.',
    },
    footer: 'Desarrollado con Next.js · Tailwind CSS · Claude Code',
  },
};

export type Dictionary = (typeof dictionaries)['en'];

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
