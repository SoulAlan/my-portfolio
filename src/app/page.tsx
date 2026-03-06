'use client';

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code, Server, Users, Briefcase, ChevronDown, ExternalLink, Sun, Moon, MapPin, Calendar, Clock, Thermometer, Wind, Eye, Activity, ChevronLeft, ChevronRight, Languages, Sparkles, Zap, Cpu } from 'lucide-react';
import AIAcceleratedSection from '@/components/AIAcceleratedSection';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  visibility: number;
}

interface CryptoData {
  bitcoin: {
    usd: number;
    usd_24h_change: number;
  };
  ripple: {
    usd: number;
    usd_24h_change: number;
  };
}

type Language = 'es' | 'en';

const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userTime, setUserTime] = useState(new Date());
  const [userTimezone, setUserTimezone] = useState('');
  const [isGuatemala, setIsGuatemala] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isApiPanelOpen, setIsApiPanelOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('es');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // API de clima para Guatemala
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Usando datos demo cuando no hay API key
        const demoData = {
          name: "Guatemala City",
          main: { temp: 22, feels_like: 24, humidity: 75 },
          weather: [{ main: "Clouds", description: "parcialmente nublado", icon: "03d" }],
          wind: { speed: 3.5 },
          visibility: 10000
        };
        setWeatherData(demoData);
      } catch (error) {
        console.log('Demo weather data loaded');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  // API de criptomonedas
  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        // Usando datos demo con XRP
        const demoData = {
          bitcoin: { usd: 43250, usd_24h_change: 2.5 },
          ripple: { usd: 0.62, usd_24h_change: 3.8 }
        };
        setCryptoData(demoData);
      } catch (error) {
        console.log('Demo crypto data loaded');
      }
    };
    fetchCrypto();
  }, []);

  // Reloj en tiempo real y detección de zona horaria
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setCurrentTime(now);

      // Hora del usuario
      setUserTime(now);

      // Detectar zona horaria del usuario
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimezone(timezone);

      // Verificar si está en Guatemala
      const guatemalaTimezones = ['America/Guatemala'];
      setIsGuatemala(guatemalaTimezones.includes(timezone));
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const openModal = (projectKey: string) => {
    setSelectedProject(projectKey);
    setIsModalOpen(true);
    setCountdown(5);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setCountdown(5);
  };

  // Contador regresivo para redirigir
  useEffect(() => {
    if (isModalOpen && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isModalOpen && countdown === 0) {
      window.open('https://albacinema.com.gt/', '_blank');
      closeModal();
    }
  }, [isModalOpen, countdown]);

  // Contenido multiidioma
  const content: Record<Language, {
    title: string;
    subtitle: string;
    openToRemote: string;
    about: string;
    aboutText1: string;
    aboutText2: string;
    aboutText3: string;
    skills: string;
    experience: string;
    projects: string;
    contact: string;
    contactText: string;
    viewCode: string;
    connect: string;
    contactMe: string;
    myHour: string;
    yourHour: string;
    ourHour: string;
    fullStack: string;
    infrastructure: string;
    projectManagement: string;
    technicalLeadership: string;
    projectTitles: {
      businessManagement: string;
      quotationPlatform: string;
      digitalSignatures: string;
      reactApps: string;
      interactivePortfolio: string;
      cinemaManagement: string;
    };
    projectDescriptions: {
      businessManagement: string;
      quotationPlatform: string;
      digitalSignatures: string;
      reactApps: string;
      interactivePortfolio: string;
      cinemaManagement: string;
    };
    modalParticipation: string;
    modalChallenge: string;
    modalDetails: {
      businessManagement: string[];
      quotationPlatform: string[];
      digitalSignatures: string[];
      cinemaManagement: string[];
    };
    modalImages?: {
      quotationPlatform: string[];
    };
    visitSite: string;
    closeModal: string;
    redirectingIn: string;
    privateProject: string;
    experienceData: {
      title: string;
      company: string;
      period: string;
      description: string;
      highlights: string[];
    }[];
  }> = {
    es: {
      title: "Senior Full Stack Engineer — Entrego sistemas production-grade 3-4x más rápido con AI-Assisted Workflows",
      subtitle: "6+ años de experiencia Full Stack · Node.js · TypeScript · React/Next.js · PostgreSQL · AWS · AI-Assisted desde 2022",
      openToRemote: "Disponible para roles remotos",
      about: "Sobre Mí",
      aboutText1: "Ingeniero full stack con más de 6 años arquitectando plataformas e-commerce, sistemas de integración empresarial y aplicaciones de alta demanda. A lo largo de esa trayectoria he liderado proyectos con SAP, Shopify, facturación electrónica FEL y plataformas de alto tráfico.",
      aboutText2: "Desde 2022 — sobre esa base de experiencia sólida — integro Claude Code y GitHub Copilot en mi flujo diario. No se trata de reemplazar criterio de ingeniería: se trata de multiplicar el output manteniendo los mismos estándares rigurosos de calidad y seguridad que construí en años de trabajo real.",
      aboutText3: "El resultado: entrego en días lo que antes tomaba semanas, con la confianza de quien ha visto fallar sistemas en producción y sabe exactamente dónde poner los límites.",
      skills: "Habilidades Técnicas",
      experience: "Experiencia Profesional",
      projects: "Proyectos Destacados",
      contact: "¿Listo para colaborar?",
      contactText: "Disponible para roles remotos con empresas de US/Europa. Si tienes un proyecto interesante o buscas un ingeniero senior con experiencia real en AI-assisted development, hablemos.",
      viewCode: "Ver mi código",
      connect: "Conectar en LinkedIn",
      contactMe: "Contáctame",
      myHour: "Mi hora",
      yourHour: "Tu hora local",
      ourHour: "Hora local (GT)",
      fullStack: "Desarrollo Full Stack",
      infrastructure: "Infraestructura & DevOps",
      projectManagement: "Gestión de Proyectos",
      technicalLeadership: "Liderazgo Técnico",
      projectTitles: {
        businessManagement: "Tiendy — Plataforma E-Commerce con FEL y Automatización de Envíos",
        quotationPlatform: "ERP de Cotizaciones con Integración SAP Business One",
        digitalSignatures: "Generador de Firmas Corporativas Multi-Empresa",
        reactApps: "Suite de Apps React para Gestión de Espacios de Trabajo",
        interactivePortfolio: "Portafolio con AI-Assisted Development en Producción",
        cinemaManagement: "Alba Cinema — Plataforma de Reservas y Ticketing de Alta Demanda"
      },
      projectDescriptions: {
        businessManagement: "Plataforma Shopify custom con integración de facturación electrónica FEL (SAT Guatemala), automatización de envíos multi-carrier y panel de administración. Reducción del 70% en tiempo de procesamiento de órdenes.",
        quotationPlatform: "Sistema conectado en tiempo real a SAP Business One: sincronización de catálogo de productos, precios y clientes. Generación automática de cotizaciones en PDF. Tiempo de cotización reducido de 20 min a menos de 2 min.",
        digitalSignatures: "Generación de firmas HTML personalizadas por colaborador y sub-empresa de multinacional. Desarrollo completo en Azure, compatible con Outlook. Cero configuración manual para +200 empleados.",
        reactApps: "Tres aplicaciones React para gestión de espacios de oficina, parqueos y salas de reunión. Reducción del 40% en conflictos de reserva y eliminación de procesos manuales.",
        interactivePortfolio: "Este portafolio — construido con Next.js y Tailwind CSS usando Claude Code como herramienta principal. Modo oscuro/claro, soporte bilingüe, animaciones y efectos avanzados de UI.",
        cinemaManagement: "Plataforma de venta de butacas para cadena de cines nacional con múltiples proveedores de pago. Sistema de boletería QR, filtros avanzados de horarios y resolución de errores de pago en producción."
      },
      modalParticipation: "Mi Participación",
      modalChallenge: "El Reto",
      modalDetails: {
        businessManagement: [
          "Integración de facturación electrónica FEL con el SAT de Guatemala directamente desde Shopify",
          "Automatización de envíos con múltiples carriers (Guatex, DHL, pickup local) sin intervención manual",
          "Dashboard de administración con control de inventario, órdenes y reportes en tiempo real",
          "Reducción del 70% en tiempo de procesamiento de órdenes gracias a flujos automatizados",
          "Desarrollo acelerado con Claude Code: sistema completo desplegado en semanas, no meses",
          "Stack: Next.js, Node.js, PostgreSQL, Shopify API, FEL API"
        ],
        quotationPlatform: [
          "Integración bidireccional con SAP Business One: productos, clientes y precios en tiempo real",
          "Generación automática de cotizaciones en PDF con branding personalizado por cliente",
          "Implementación de caché inteligente para consultas frecuentes a SAP",
          "Reducción de tiempo de cotización de 20 minutos a menos de 2 minutos",
          "Sistema multiusuario con historial de cotizaciones y aprobaciones",
          "Stack: PHP, JavaScript, SAP Business One API, PDF Generation"
        ],
        digitalSignatures: [
          "Sistema completo desarrollado desde cero e instalado en servidor Azure del cliente vía SSH",
          "Firmas HTML personalizadas por colaborador con colores y logos de cada sub-empresa",
          "Compatible con Outlook sin configuración manual — exportación con un solo clic",
          "Cubre 200+ empleados de múltiples empresas de la misma multinacional",
          "API REST propia para integración con directorio de empleados del cliente",
          "Stack: JavaScript, PHP, Azure, API REST, HTML/CSS avanzado"
        ],
        cinemaManagement: [
          "Plataforma de alta demanda: múltiples funciones simultáneas con cientos de transacciones diarias",
          "Sistema de boletería QR con validación en sala en tiempo real",
          "Reconciliación de pagos con múltiples proveedores (Visa, Mastercard, pago en efectivo)",
          "Filtros avanzados de selección de butaca por zona, accesibilidad y precio",
          "Resolución de errores críticos de conexión con puntos de pago en producción",
          "Stack: PHP, JavaScript, CSS, QR Integration, Payment APIs"
        ]
      },
      modalImages: {
        quotationPlatform: ["/multi_coti.png", "/Multi_dash.png"]
      },
      visitSite: "Visitar sitio web",
      closeModal: "Cerrar",
      redirectingIn: "Redirigiendo en",
      privateProject: "Proyecto Privado",
      experienceData: [
        {
          title: "Senior Full Stack Developer & Tech Lead",
          company: "Aumenta GT",
          period: "2022 — Presente",
          description: "Arquitectura y desarrollo de plataformas e-commerce, sistemas de integración empresarial y aplicaciones de alta demanda. Pionero en adopción de AI-assisted workflows (Claude Code, GitHub Copilot) que redujeron los tiempos de entrega en 3-4x. Líder técnico en proyectos con integración a Shopify, SAP Business One y sistemas de facturación electrónica.",
          highlights: ["Node.js · TypeScript · React/Next.js", "Shopify API · SAP Business One", "6+ años experiencia · AI-Assisted desde 2022", "FEL · Facturación Electrónica GT"]
        },
        {
          title: "Full Stack Developer & Systems Integrator",
          company: "Proyectos independientes / Clientes corporativos",
          period: "2019 — 2022",
          description: "Desarrollo de sistemas de gestión interna, integraciones con APIs empresariales y soluciones de automatización para empresas multinacionales. Creación de herramientas que eliminaron procesos manuales repetitivos y mejoraron eficiencia operativa.",
          highlights: ["Integración SAP Business One", "Azure · SSH · APIs REST", "Firmas digitales corporativas", "Sistemas de cotización automática"]
        },
        {
          title: "Technology Project Manager & Full Stack Developer",
          company: "Sector corporativo — Guatemala",
          period: "2017 — 2019",
          description: "Liderazgo de proyectos de infraestructura de redes y comunicaciones. Desarrollo de aplicaciones web para gestión de espacios, parqueos y recursos de oficina. Coordinación de equipos técnicos y entrega de proyectos bajo presión.",
          highlights: ["Gestión de proyectos tecnológicos", "React · JavaScript · PHP", "Infraestructura de redes", "Liderazgo técnico de equipos"]
        }
      ]
    },
    en: {
      title: "Senior Full Stack Engineer — Delivering production-grade systems 3-4x faster with AI-Assisted Workflows",
      subtitle: "6+ years Full Stack experience · Node.js · TypeScript · React/Next.js · PostgreSQL · AWS · AI-Assisted since 2022",
      openToRemote: "Open to remote opportunities",
      about: "About Me",
      aboutText1: "Full stack engineer with 6+ years architecting e-commerce platforms, enterprise integration systems, and high-traffic applications. Throughout that career I've led projects involving SAP, Shopify, FEL electronic invoicing, and high-demand platforms.",
      aboutText2: "Since 2022 — on top of that solid foundation — I've integrated Claude Code and GitHub Copilot into my daily workflow. This isn't about replacing engineering judgment: it's about multiplying output while maintaining the rigorous quality and security standards I built over years of real production work.",
      aboutText3: "The result: I ship in days what used to take weeks, with the confidence of someone who has seen systems fail in production and knows exactly where to draw the line.",
      skills: "Technical Skills",
      experience: "Professional Experience",
      projects: "Featured Projects",
      contact: "Ready to collaborate?",
      contactText: "Available for remote roles with US/European companies. If you have an interesting project or are looking for a senior engineer with real-world AI-assisted development experience, let's talk.",
      viewCode: "View my code",
      connect: "Connect on LinkedIn",
      contactMe: "Contact Me",
      myHour: "My hour",
      yourHour: "Your local hour",
      ourHour: "Alan's local hour",
      fullStack: "Full Stack Development",
      infrastructure: "Infrastructure & DevOps",
      projectManagement: "Project Management",
      technicalLeadership: "Technical Leadership",
      projectTitles: {
        businessManagement: "Tiendy — Shopify E-Commerce with FEL Invoicing & Shipping Automation",
        quotationPlatform: "SAP Business One Quotation Platform",
        digitalSignatures: "Multi-Company Corporate Signature Generator",
        reactApps: "React Workspace Management Suite",
        interactivePortfolio: "Portfolio Built with AI-Assisted Development",
        cinemaManagement: "Alba Cinema — High-Traffic Booking & Ticketing Platform"
      },
      projectDescriptions: {
        businessManagement: "Custom Shopify platform with FEL electronic invoicing (Guatemala SAT), multi-carrier shipping automation, and admin dashboard. Reduced order processing time by 70%.",
        quotationPlatform: "Real-time SAP Business One integration: live product catalog, pricing, and customer sync. Automated PDF quotation generation. Reduced quote turnaround from 20 min to under 2 min.",
        digitalSignatures: "Personalized HTML email signatures per employee and sub-company for a multinational. Built on Azure, Outlook-compatible. Zero manual setup for 200+ employees.",
        reactApps: "Three React apps for office space, parking, and meeting room management. 40% reduction in booking conflicts and full elimination of manual coordination processes.",
        interactivePortfolio: "This portfolio — built with Next.js and Tailwind CSS using Claude Code as the primary tool. Dark/light mode, bilingual support, animations, and advanced UI effects.",
        cinemaManagement: "National cinema chain booking platform with multi-provider payment reconciliation. QR ticketing system, advanced schedule filters, and production payment error resolution."
      },
      modalParticipation: "My Participation",
      modalChallenge: "The Challenge",
      modalDetails: {
        businessManagement: [
          "FEL electronic invoicing integration with Guatemala SAT directly from Shopify",
          "Multi-carrier shipping automation (Guatex, DHL, local pickup) with zero manual steps",
          "Admin dashboard with real-time inventory, order management, and reporting",
          "70% reduction in order processing time through automated workflows",
          "Built with Claude Code: full system shipped in weeks, not months",
          "Stack: Next.js, Node.js, PostgreSQL, Shopify API, FEL API"
        ],
        quotationPlatform: [
          "Bidirectional SAP Business One integration: live products, customers, and pricing",
          "Automated PDF quotation generation with per-client custom branding",
          "Intelligent caching layer for frequent SAP queries",
          "Quote turnaround reduced from 20 minutes to under 2 minutes",
          "Multi-user system with quotation history and approval workflows",
          "Stack: PHP, JavaScript, SAP Business One API, PDF Generation"
        ],
        digitalSignatures: [
          "Full system built from scratch and deployed on client's Azure server via SSH",
          "Personalized HTML signatures per employee with per-company colors and logos",
          "Outlook-compatible with one-click export — zero manual configuration",
          "Covers 200+ employees across multiple companies in the same multinational",
          "Custom REST API integrating with client's employee directory",
          "Stack: JavaScript, PHP, Azure, REST API, Advanced HTML/CSS"
        ],
        cinemaManagement: [
          "High-traffic platform: simultaneous screenings with hundreds of daily transactions",
          "QR ticketing system with real-time in-venue validation",
          "Payment reconciliation across multiple providers (Visa, Mastercard, cash)",
          "Advanced seat selection filters by zone, accessibility, and price",
          "Production payment connection error resolution with zero downtime",
          "Stack: PHP, JavaScript, CSS, QR Integration, Payment APIs"
        ]
      },
      modalImages: {
        quotationPlatform: ["/multi_coti.png", "/Multi_dash.png"]
      },
      visitSite: "Visit website",
      closeModal: "Close",
      redirectingIn: "Redirecting in",
      privateProject: "Private Project",
      experienceData: [
        {
          title: "Senior Full Stack Developer & Tech Lead",
          company: "Aumenta GT",
          period: "2022 — Present",
          description: "Architecture and development of e-commerce platforms, enterprise integration systems, and high-traffic applications. Pioneer in AI-assisted workflows (Claude Code, GitHub Copilot) reducing delivery times by 3-4x. Technical lead on projects integrating Shopify, SAP Business One, and electronic invoicing systems.",
          highlights: ["Node.js · TypeScript · React/Next.js", "Shopify API · SAP Business One", "6+ yrs experience · AI-Assisted since 2022", "FEL · Electronic Invoicing GT"]
        },
        {
          title: "Full Stack Developer & Systems Integrator",
          company: "Independent / Corporate Clients",
          period: "2019 — 2022",
          description: "Development of internal management systems, enterprise API integrations, and automation solutions for multinational companies. Built tools that eliminated repetitive manual processes and improved operational efficiency.",
          highlights: ["SAP Business One Integration", "Azure · SSH · REST APIs", "Corporate Digital Signatures", "Automated Quotation Systems"]
        },
        {
          title: "Technology Project Manager & Full Stack Developer",
          company: "Corporate sector — Guatemala",
          period: "2017 — 2019",
          description: "Led network and communications infrastructure projects. Developed web applications for space, parking, and office resource management. Coordinated technical teams and delivered projects under tight deadlines.",
          highlights: ["Technology Project Management", "React · JavaScript · PHP", "Network Infrastructure", "Technical Team Leadership"]
        }
      ]
    }
  };

  const skills = [
    { category: language === 'es' ? 'AI-Assisted Dev' : 'AI-Assisted Dev', items: ["Claude Code (CLI)", "Claude API", "GitHub Copilot", "Cursor", "AI Workflows (3+ yrs)"], isAI: true },
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML/CSS"] },
    { category: "Backend", items: ["Node.js", "TypeScript", "NestJS", "PostgreSQL", "GraphQL", "REST APIs", "SAP APIs"] },
    { category: "Infrastructure", items: ["AWS Lambda", "Serverless", "Docker", "Linode/VPS", "CI/CD", "SSH"] },
  ];

  // Experience now comes from content[language].experienceData

  const projects = [
    {
      title: content[language].projectTitles.businessManagement,
      description: content[language].projectDescriptions.businessManagement,
      tech: ["Next.js", "Node.js", "PostgreSQL", "Shopify API", "FEL API"],
      hasModal: true,
      projectKey: 'businessManagement',
      isPrivate: true,
      flagship: true,
      metric: language === 'es' ? '70% menos tiempo por orden' : '70% faster order processing',
      aiBadge: { type: 'accelerated', label: 'AI-Accelerated' }
    },
    {
      title: content[language].projectTitles.cinemaManagement,
      description: content[language].projectDescriptions.cinemaManagement,
      tech: ["PHP", "JavaScript", "QR Integration", "Payment APIs"],
      link: "https://albacinema.com.gt/",
      hasModal: true,
      projectKey: 'cinemaManagement',
      flagship: true,
      metric: language === 'es' ? 'Cientos de transacciones/día' : 'Hundreds of daily transactions',
      aiBadge: { type: 'performance', label: 'High-Performance' }
    },
    {
      title: content[language].projectTitles.quotationPlatform,
      description: content[language].projectDescriptions.quotationPlatform,
      tech: ["PHP", "JavaScript", "SAP Business One API", "PDF Generation"],
      hasModal: true,
      projectKey: 'quotationPlatform',
      hasImages: true,
      metric: language === 'es' ? '20 min → menos de 2 min por cotización' : '20 min → under 2 min per quote',
      aiBadge: { type: 'accelerated', label: 'AI-Accelerated' }
    },
    {
      title: content[language].projectTitles.digitalSignatures,
      description: content[language].projectDescriptions.digitalSignatures,
      tech: ["JavaScript", "PHP", "Azure", "REST API"],
      hasModal: true,
      projectKey: 'digitalSignatures',
      metric: language === 'es' ? '200+ empleados, cero configuración manual' : '200+ employees, zero manual setup',
      aiBadge: { type: 'enhanced', label: 'AI-Enhanced' }
    },
    {
      title: content[language].projectTitles.reactApps,
      description: content[language].projectDescriptions.reactApps,
      tech: ["React", "TypeScript", "JavaScript"],
      metric: language === 'es' ? '40% menos conflictos de reserva' : '40% fewer booking conflicts',
      aiBadge: null
    },
    {
      title: content[language].projectTitles.interactivePortfolio,
      description: content[language].projectDescriptions.interactivePortfolio,
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Claude Code"],
      aiBadge: { type: 'accelerated', label: 'AI-Accelerated' }
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} relative overflow-hidden`}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110 ${isDarkMode
          ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
          : 'bg-white hover:bg-gray-100 text-gray-800 shadow-lg'
          }`}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className={`fixed top-20 right-6 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110 ${isDarkMode
          ? 'bg-gray-800 hover:bg-gray-700 text-blue-400'
          : 'bg-white hover:bg-gray-100 text-gray-800 shadow-lg'
          }`}
      >
        <Languages size={20} />
        <span className="absolute -bottom-1 -right-1 text-xs font-bold bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
          {language.toUpperCase()}
        </span>
      </button>

      {/* Live API Data Panel - Desktop */}
      <div className={`hidden lg:block fixed top-6 left-6 z-40 p-4 rounded-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm shadow-lg'
        } max-w-sm`}>
        <h3 className="font-semibold mb-3 text-orange-500">Live APIs</h3>

        {/* Reloj Guatemala */}
        <div className="flex items-center gap-2 mb-2 text-sm">
          <Clock size={16} className="text-orange-400" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">{content[language].myHour}</span>
            <span>{currentTime.toLocaleTimeString('es-GT', { timeZone: 'America/Guatemala' })}</span>
          </div>
        </div>

        {/* Reloj Usuario */}
        {!isGuatemala && (
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Clock size={16} className="text-blue-400" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">{content[language].yourHour}</span>
              <span>{userTime.toLocaleTimeString()}</span>
            </div>
          </div>
        )}

        {/* Si está en Guatemala */}
        {isGuatemala && (
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Clock size={16} className="text-green-400" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">{content[language].ourHour}</span>
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        )}

        {/* Clima */}
        {weatherData && (
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Thermometer size={16} className="text-blue-400" />
            <span>Guatemala: {weatherData.main.temp}°C</span>
            <Wind size={14} className="text-gray-400" />
            <span>{weatherData.wind.speed}m/s</span>
          </div>
        )}

        {/* Crypto */}
        {cryptoData && (
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>₿ Bitcoin:</span>
              <span className={cryptoData.bitcoin.usd_24h_change > 0 ? 'text-green-400' : 'text-red-400'}>
                ${cryptoData.bitcoin.usd.toLocaleString()}
                ({cryptoData.bitcoin.usd_24h_change > 0 ? '+' : ''}{cryptoData.bitcoin.usd_24h_change.toFixed(1)}%)
              </span>
            </div>
            <div className="flex justify-between">
              <span>✖ XRP:</span>
              <span className={cryptoData.ripple.usd_24h_change > 0 ? 'text-green-400' : 'text-red-400'}>
                ${cryptoData.ripple.usd.toFixed(3)}
                ({cryptoData.ripple.usd_24h_change > 0 ? '+' : ''}{cryptoData.ripple.usd_24h_change.toFixed(1)}%)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Live API Data Panel - Mobile (Collapsible) */}
      <div className="lg:hidden">
        {/* Collapsible Panel */}
        <div className={`fixed top-6 left-4 z-50 transition-all duration-500 ease-in-out transform ${isApiPanelOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          } ${isDarkMode ? 'bg-gray-800/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm shadow-lg'} 
        rounded-lg p-4 max-w-xs relative overflow-hidden`}>

          {/* Efecto de chispas naranjas */}
          {isApiPanelOpen && (
            <>
              <div className="absolute top-2 left-2 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
              <div className="absolute top-4 right-4 w-1 h-1 bg-orange-500 rounded-full animate-ping delay-100"></div>
              <div className="absolute bottom-3 left-6 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-200"></div>
              <div className="absolute bottom-2 right-2 w-1 h-1 bg-orange-300 rounded-full animate-ping delay-300"></div>
              <div className="absolute top-1/2 right-1 w-1 h-1 bg-orange-400 rounded-full animate-ping delay-150"></div>
              <div className="absolute top-8 left-1 w-1 h-1 bg-yellow-500 rounded-full animate-ping delay-250"></div>
            </>
          )}

          {/* Header con botón de cerrar */}
          <div className="flex items-center justify-between mb-3 relative z-10">
            <h3 className="font-semibold text-orange-500 text-sm">🚀 APIs en Vivo</h3>
            <button
              onClick={() => setIsApiPanelOpen(false)}
              className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <ChevronLeft size={16} className="text-gray-400" />
            </button>
          </div>

          {/* Reloj Guatemala */}
          <div className="flex items-center gap-2 mb-2 text-xs relative z-10">
            <Clock size={14} className="text-orange-400" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">{content[language].myHour}</span>
              <span>{currentTime.toLocaleTimeString('es-GT', { timeZone: 'America/Guatemala' })}</span>
            </div>
          </div>

          {/* Reloj Usuario */}
          {!isGuatemala && (
            <div className="flex items-center gap-2 mb-2 text-xs relative z-10">
              <Clock size={14} className="text-blue-400" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">{content[language].yourHour}</span>
                <span>{userTime.toLocaleTimeString()}</span>
              </div>
            </div>
          )}

          {/* Guatemala */}
          {isGuatemala && (
            <div className="flex items-center gap-2 mb-2 text-xs relative z-10">
              <Clock size={14} className="text-green-400" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">{content[language].ourHour}</span>
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          )}

          {/* Clima */}
          {weatherData && (
            <div className="flex items-center gap-2 mb-2 text-xs relative z-10">
              <Thermometer size={14} className="text-blue-400" />
              <span>GT: {weatherData.main.temp}°C</span>
              <Wind size={12} className="text-gray-400" />
              <span>{weatherData.wind.speed}m/s</span>
            </div>
          )}

          {/* Crypto */}
          {cryptoData && (
            <div className="space-y-1 text-xs relative z-10">
              <div className="flex justify-between">
                <span className="text-xs">₿ BTC:</span>
                <span className={`text-xs ${cryptoData.bitcoin.usd_24h_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${(cryptoData.bitcoin.usd / 1000).toFixed(0)}k
                  ({cryptoData.bitcoin.usd_24h_change > 0 ? '+' : ''}{cryptoData.bitcoin.usd_24h_change.toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs">✖ XRP:</span>
                <span className={`text-xs ${cryptoData.ripple.usd_24h_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${cryptoData.ripple.usd.toFixed(3)}
                  ({cryptoData.ripple.usd_24h_change > 0 ? '+' : ''}{cryptoData.ripple.usd_24h_change.toFixed(1)}%)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Button - Detrás del panel y con animación palpitante */}
        {!isApiPanelOpen && (
          <button
            onClick={() => setIsApiPanelOpen(true)}
            className="fixed top-20 left-4 z-40 p-3 rounded-full transition-all duration-300 hover:scale-110 animate-pulse shadow-lg shadow-orange-500/50 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white relative"
          >
            <Activity size={20} />
            <Sparkles size={12} className="absolute -top-1 -right-1 animate-spin" />
          </button>
        )}

        {/* Overlay para cerrar al hacer click fuera */}
        {isApiPanelOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/20 lg:hidden"
            onClick={() => setIsApiPanelOpen(false)}
          />
        )}
      </div>

      {/* Efecto de linterna */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${isDarkMode ? 'rgba(255, 107, 53, 0.15)' : 'rgba(255, 107, 53, 0.08)'
            }, transparent 60%)`
        }}
      />

      {/* Header/Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center md:pt-0">
        <div className="max-w-4xl mx-auto text-center z-20">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img
              src="/logo.png"
              alt="Alan Cifuentes - Web Developer"
              className="w-32 h-32 md:w-40 md:h-40 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Alan Cifuentes
          </h1>
          <p className={`text-xl md:text-2xl mb-3 max-w-3xl mx-auto leading-relaxed font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {content[language].title}
          </p>
          <p className={`text-base md:text-lg mb-5 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {content[language].subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/40 text-green-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {content[language].openToRemote}
            </span>
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-white border border-gray-200 text-gray-600 shadow-sm'}`}>
              <MapPin size={14} className="text-orange-400" />
              Guatemala — Remote
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="https://github.com/SoulAlan"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 border border-orange-500/20 hover:border-orange-500/40'
                : 'bg-white hover:bg-gray-50 border border-orange-500/30 hover:border-orange-500/60 shadow-lg'
                }`}
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/alancifuentessiliezar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 text-white"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a
              href="mailto:a.fernando_cifuentes@yahoo.com"
              className={`flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 font-medium ${isDarkMode ? 'text-gray-900' : 'text-white'}`}
            >
              <Mail size={20} />
              {content[language].contactMe}
            </a>
          </div>
          <div className="animate-bounce">
            <ChevronDown size={32} className={isDarkMode ? "mx-auto text-gray-400" : "mx-auto text-gray-600"} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">{content[language].about}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className={`text-lg mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {content[language].aboutText1}
              </p>
              <p className={`text-lg mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {content[language].aboutText2}
              </p>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {content[language].aboutText3}
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Code className="text-orange-500" size={24} />
                <span className="text-lg">{content[language].fullStack}</span>
              </div>
              <div className="flex items-center gap-4">
                <Server className="text-yellow-400" size={24} />
                <span className="text-lg">{content[language].infrastructure}</span>
              </div>
              <div className="flex items-center gap-4">
                <Users className="text-red-500" size={24} />
                <span className="text-lg">{content[language].projectManagement}</span>
              </div>
              <div className="flex items-center gap-4">
                <Briefcase className="text-orange-400" size={24} />
                <span className="text-lg">{content[language].technicalLeadership}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Accelerated Development Section */}
      <AIAcceleratedSection isDarkMode={isDarkMode} language={language} />

      {/* Skills Section */}
      <section className={`py-20 px-4 relative z-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">{content[language].skills}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className={`p-6 rounded-lg hover:scale-105 transition-all duration-300 ${
                (skillGroup as { isAI?: boolean }).isAI
                  ? isDarkMode
                    ? 'bg-gradient-to-br from-gray-800 to-gray-800/50 hover:from-gray-700 hover:to-gray-700/50 border-2 border-orange-500/40 hover:border-orange-500/60 ring-2 ring-orange-500/10'
                    : 'bg-gradient-to-br from-orange-50 to-white hover:from-orange-100 hover:to-white border-2 border-orange-500/50 hover:border-orange-500/70 shadow-lg hover:shadow-xl'
                  : isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-orange-500/20 hover:border-orange-500/40'
                    : 'bg-white hover:bg-gray-50 border border-orange-500/30 hover:border-orange-500/60 shadow-lg hover:shadow-xl'
                }`}>
                <div className="flex items-center gap-2 mb-4">
                  {(skillGroup as { isAI?: boolean }).isAI && <Zap size={20} className="text-orange-500" />}
                  <h3 className={`text-xl font-semibold ${(skillGroup as { isAI?: boolean }).isAI ? 'text-orange-500' : 'text-orange-400'}`}>
                    {skillGroup.category}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li key={skillIndex} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">{content[language].experience}</h2>
          <div className="space-y-8">
            {content[language].experienceData.map((exp, index) => (
              <div key={index} className={`p-8 rounded-lg border transition-all duration-300 ${isDarkMode
                ? 'bg-gray-800/30 border-gray-700 hover:border-orange-500'
                : 'bg-white border-gray-200 hover:border-orange-500 shadow-lg hover:shadow-xl'
                }`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-1">
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400">{exp.title}</h3>
                    <p className={`text-sm font-medium mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{exp.company}</p>
                  </div>
                  <span className={`text-sm shrink-0 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{exp.period}</span>
                </div>
                <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((highlight, hIndex) => (
                    <span key={hIndex} className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 px-3 py-1 rounded-full text-sm text-orange-300">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={`py-20 px-4 relative z-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">{content[language].projects}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg transition-all duration-300 group border hover:scale-105 ${
                  (project as { flagship?: boolean }).flagship
                    ? isDarkMode
                      ? 'bg-gray-800 border-orange-500/50 hover:border-orange-500 shadow-lg shadow-orange-500/10'
                      : 'bg-white border-orange-500/60 hover:border-orange-500 shadow-lg shadow-orange-500/10 hover:shadow-xl'
                    : isDarkMode
                      ? 'bg-gray-800 hover:bg-gray-700 border-orange-500/20 hover:border-orange-500/40'
                      : 'bg-white hover:bg-gray-50 border-orange-500/30 hover:border-orange-500/60 shadow-lg hover:shadow-xl'
                } ${project.hasModal ? 'cursor-pointer' : ''}`}
                onClick={() => project.hasModal && project.projectKey && openModal(project.projectKey)}
              >
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {(project as { flagship?: boolean }).flagship && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      Flagship
                    </span>
                  )}
                  {project.aiBadge && (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      project.aiBadge.type === 'accelerated'
                        ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30'
                        : project.aiBadge.type === 'enhanced'
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {project.aiBadge.type === 'accelerated' && <Zap size={12} />}
                      {project.aiBadge.type === 'enhanced' && <Cpu size={12} />}
                      {project.aiBadge.type === 'performance' && <Zap size={12} />}
                      {project.aiBadge.label}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-2 text-orange-400 group-hover:text-orange-300">
                  {project.title}
                </h3>

                {/* Impact metric */}
                {(project as { metric?: string }).metric && (
                  <p className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    &#8599; {(project as { metric?: string }).metric}
                  </p>
                )}

                <p className={`mb-4 leading-relaxed text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 px-3 py-1 rounded-full text-xs text-red-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/40 text-green-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {content[language].openToRemote}
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">{content[language].contact}</h2>
          <p className={`text-xl mb-10 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {content[language].contactText}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:a.fernando_cifuentes@yahoo.com"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-white font-medium"
            >
              <Mail size={20} />
              {content[language].contactMe}
            </a>
            <a
              href="https://linkedin.com/in/alancifuentessiliezar"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 ${isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 border border-orange-500/20 hover:border-orange-500/40'
                : 'bg-white hover:bg-gray-50 border border-orange-500/30 hover:border-orange-500/60 shadow-lg'
              }`}
            >
              <Linkedin size={20} />
              {content[language].connect}
              <ExternalLink size={16} />
            </a>
            <a
              href="https://github.com/SoulAlan"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 ${isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 border border-orange-500/20 hover:border-orange-500/40'
                : 'bg-white hover:bg-gray-50 border border-orange-500/30 hover:border-orange-500/60 shadow-lg'
              }`}
            >
              <Github size={20} />
              {content[language].viewCode}
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Modal de Participación */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className={`relative max-w-3xl w-full rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
              <h3 className="text-2xl font-bold text-white">
                {content[language].projectTitles[selectedProject as keyof typeof content[typeof language]['projectTitles']]}
              </h3>
              {projects.find(p => p.projectKey === selectedProject)?.isPrivate && (
                <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                  {content[language].privateProject}
                </span>
              )}
            </div>

            {/* Body */}
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-4 text-orange-400">
                {content[language].modalParticipation}
              </h4>
              <ul className="space-y-3 mb-6">
                {content[language].modalDetails[selectedProject as keyof typeof content[typeof language]['modalDetails']].map((detail, index) => (
                  <li key={index} className={`flex items-start gap-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Imágenes del proyecto (si existen) */}
              {selectedProject === 'quotationPlatform' && content[language].modalImages?.quotationPlatform && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-orange-400">
                    {language === 'es' ? 'Capturas del Proyecto' : 'Project Screenshots'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content[language].modalImages.quotationPlatform.map((img: string, index: number) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Captura ${index + 1}`}
                        className="rounded-lg border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:scale-105"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Contador regresivo solo para proyectos con link */}
              {projects.find(p => p.projectKey === selectedProject)?.link && (
                <div className="text-center p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30">
                  <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {content[language].redirectingIn}
                  </p>
                  <div className="text-4xl font-bold text-orange-500 animate-pulse">
                    {countdown}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`p-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex gap-4`}>
              <button
                onClick={closeModal}
                className={`flex-1 px-6 py-3 rounded-lg transition-all duration-300 ${isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
              >
                {content[language].closeModal}
              </button>
              {projects.find(p => p.projectKey === selectedProject)?.link && (
                <button
                  onClick={() => {
                    const projectLink = projects.find(p => p.projectKey === selectedProject)?.link;
                    if (projectLink) {
                      window.open(projectLink, '_blank');
                      closeModal();
                    }
                  }}
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {content[language].visitSite}
                  <ExternalLink size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`py-8 px-4 border-t relative z-20 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'
        }`}>
        <div className="max-w-4xl mx-auto text-center">
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            © 2026 Alan Cifuentes. {language === 'es' ? 'Desarrollado con' : 'Built with'} Next.js · Tailwind CSS · Claude Code
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;