'use client';

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code, Server, Users, Briefcase, ChevronDown, ExternalLink, Sun, Moon, MapPin, Calendar, Clock, Thermometer, Wind, Eye, Activity, ChevronLeft, ChevronRight, Languages, Sparkles } from 'lucide-react';

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
  }> = {
    es: {
      title: "Desarrollador Full Stack & Technology Project Manager con más de 8 años transformando ideas en soluciones digitales robustas",
      about: "Sobre Mí",
      aboutText1: "Soy un desarrollador full stack apasionado con más de 8 años de experiencia en el desarrollo de soluciones web complejas y gestión de proyectos tecnológicos. Mi experiencia abarca desde la infraestructura de redes hasta el desarrollo de aplicaciones web modernas.",
      aboutText2: "Como Project Manager, he liderado equipos en proyectos de infraestructura física de redes y comunicaciones, mientras que como desarrollador, he creado sistemas de administración, plataformas de cotización y herramientas de automatización empresarial.",
      aboutText3: "Actualmente combino mis roles de PM y desarrollador, creando estructuras para proyectos web y aplicaciones mientras guío equipos hacia el éxito.",
      skills: "Habilidades Técnicas",
      experience: "Experiencia Profesional",
      projects: "Proyectos Destacados",
      contact: "¿Listo para colaborar?",
      contactText: "Estoy disponible para nuevos proyectos y oportunidades. Si tienes una idea interesante o necesitas un desarrollador experimentado, ¡hablemos!",
      viewCode: "Ver mi código",
      connect: "Conectar",
      myHour: "My hour",
      yourHour: "Your local hour",
      ourHour: "Our local hour",
      fullStack: "Desarrollo Full Stack",
      infrastructure: "Infraestructura & DevOps",
      projectManagement: "Gestión de Proyectos",
      technicalLeadership: "Liderazgo Técnico",
      projectTitles: {
        businessManagement: "Sistema de Gestión Empresarial",
        quotationPlatform: "Plataforma de Cotizaciones",
        digitalSignatures: "Sistema de Firmas Digitales",
        reactApps: "Aplicaciones React",
        interactivePortfolio: "Portafolio Interactivo",
        cinemaManagement: "Sistema de Gestión de Cine"
      },
      projectDescriptions: {
        businessManagement: "Desarrollo de sistema completo de administración con integración a APIs externas, generación de reportes y gestión de usuarios.",
        quotationPlatform: "Sistema conectado a APIs de SAP para obtener productos, costos y generar cotizaciones en PDF de forma automatizada.",
        digitalSignatures: "Herramienta que obtiene datos de colaboradores vía API y genera firmas personalizadas para integración con Outlook.",
        reactApps: "Desarrollo y modificación de aplicaciones para gestión de espacios, ordenamiento de parqueos y reservas de oficina.",
        interactivePortfolio: "Desarrollo de este portafolio con integración de APIs en tiempo real, modo oscuro/claro y efectos avanzados de UI/UX.",
        cinemaManagement: "Sistema de gestión y venta de butacas para cadena de cines nacional. Incluye mejoras en carrousel, filtros de selección y boletería por QR."
      },
      modalParticipation: "Mi Participación",
      modalChallenge: "El Reto",
      modalDetails: {
        businessManagement: [
          "Heredar código sin documentación de un desarrollador previo",
          "Solucionar errores críticos en sistema de producción bajo presión de tiempo",
          "Corregir problemas que afectaban la atención a clientes",
          "Optimizar la gestión interna de la empresa a través de la plataforma web",
          "Implementar mejoras de seguridad y rendimiento",
          "Crear documentación técnica del sistema para futuro mantenimiento"
        ],
        quotationPlatform: [
          "Integración completa con APIs de SAP Business One",
          "Implementación de métodos para generación automática de cotizaciones",
          "Conexión en tiempo real con productos internos, clientes y precios",
          "Desarrollo de sistema de generación de PDFs personalizados",
          "Optimización de consultas para mejorar tiempos de respuesta",
          "Implementación de caché para datos frecuentemente consultados"
        ],
        digitalSignatures: [
          "Desarrollo desde cero del sistema completo",
          "Acceso y configuración vía SSH al servidor Azure del cliente",
          "Creación de endpoints personalizados para integración",
          "Conexión directa con base de datos del cliente",
          "Generación de firmas con colores específicos para cada sub-empresa",
          "Sistema compatible con múltiples empresas de la multinacional",
          "Exportación fácil y compatible con Outlook",
          "Firmas interactivas y personalizadas para cada colaborador"
        ],
        cinemaManagement: [
          "Solucionar problemas en el carrusel principal",
          "Agregar filtros especializados en la selección de butaca y los horarios de compra",
          "Implementar el sistema de boletería por QR de manera eficiente",
          "Mitigar errores de conexión con puntos de pago"
        ]
      },
      modalImages: {
        quotationPlatform: ["/multi_coti.png", "/Multi_dash.png"]
      },
      visitSite: "Visitar sitio web",
      closeModal: "Cerrar",
      redirectingIn: "Redirigiendo en",
      privateProject: "Proyecto Privado"
    },
    en: {
      title: "Full Stack Developer & Technology Project Manager with 8+ years transforming ideas into robust digital solutions",
      about: "About Me",
      aboutText1: "I am a passionate full stack developer with over 8 years of experience in developing complex web solutions and managing technology projects. My experience ranges from network infrastructure to modern web application development.",
      aboutText2: "As a Project Manager, I have led teams on physical network and communications infrastructure projects, while as a developer, I have created management systems, quotation platforms, and business automation tools.",
      aboutText3: "I currently combine my PM and developer roles, creating structures for web projects and applications while guiding teams to success.",
      skills: "Technical Skills",
      experience: "Professional Experience",
      projects: "Featured Projects",
      contact: "Ready to collaborate?",
      contactText: "I'm available for new projects and opportunities. If you have an interesting idea or need an experienced developer, let's talk!",
      viewCode: "View my code",
      connect: "Connect",
      myHour: "My hour",
      yourHour: "Your local hour",
      ourHour: "Alan local hour",
      fullStack: "Full Stack Development",
      infrastructure: "Infrastructure & DevOps",
      projectManagement: "Project Management",
      technicalLeadership: "Technical Leadership",
      projectTitles: {
        businessManagement: "Business Management System",
        quotationPlatform: "Quotation Platform",
        digitalSignatures: "Digital Signatures System",
        reactApps: "React Applications",
        interactivePortfolio: "Interactive Portfolio",
        cinemaManagement: "Cinema Management System"
      },
      projectDescriptions: {
        businessManagement: "Development of complete administration system with external API integration, report generation and user management.",
        quotationPlatform: "System connected to SAP APIs to obtain products, costs and generate automated PDF quotations.",
        digitalSignatures: "Tool that obtains employee data via API and generates personalized signatures for Outlook integration.",
        reactApps: "Development and modification of applications for space management, parking ordering and office reservations.",
        interactivePortfolio: "Development of this portfolio with real-time API integration, dark/light mode and advanced UI/UX effects.",
        cinemaManagement: "Seat management and sales system for a national cinema chain. Includes carousel improvements, selection filters and QR ticketing."
      },
      modalParticipation: "My Participation",
      modalChallenge: "The Challenge",
      modalDetails: {
        businessManagement: [
          "Inherit undocumented code from previous developer",
          "Fix critical errors in production system under time pressure",
          "Correct issues affecting customer service",
          "Optimize internal company management through web platform",
          "Implement security and performance improvements",
          "Create technical documentation for future maintenance"
        ],
        quotationPlatform: [
          "Complete integration with SAP Business One APIs",
          "Implementation of methods for automatic quotation generation",
          "Real-time connection with internal products, customers and prices",
          "Development of customized PDF generation system",
          "Query optimization to improve response times",
          "Cache implementation for frequently consulted data"
        ],
        digitalSignatures: [
          "Complete system development from scratch",
          "SSH access and configuration to client's Azure server",
          "Creation of custom endpoints for integration",
          "Direct connection with client database",
          "Generation of signatures with specific colors for each sub-company",
          "System compatible with multiple companies of the multinational",
          "Easy export compatible with Outlook",
          "Interactive and personalized signatures for each employee"
        ],
        cinemaManagement: [
          "Fix issues in the main carousel",
          "Add specialized filters for seat selection and purchase schedules",
          "Implement efficient QR ticketing system",
          "Mitigate connection errors with payment points"
        ]
      },
      modalImages: {
        quotationPlatform: ["/multi_coti.png", "/Multi_dash.png"]
      },
      visitSite: "Visit website",
      closeModal: "Close",
      redirectingIn: "Redirecting in",
      privateProject: "Private Project"
    }
  };

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "JavaScript", "CSS", "HTML", "Tailwind CSS"] },
    { category: "Backend", items: ["PHP", "Node.js", "API Integration", "SAP APIs", "Database Design"] },
    { category: "Infrastructure", items: ["AWS", "Linode", "VPS", "SSH", "Domain Management", "Server Deployment"] },
    { category: "Project Management", items: ["Team Leadership", "Project Planning", "Infrastructure Projects", "Agile Methodologies"] }
  ];

  const experience = [
    {
      title: "Technology Project Manager & Full Stack Developer",
      period: "8+ años de experiencia",
      description: "Liderazgo de proyectos de infraestructura física de redes y comunicaciones, desarrollo de sistemas web complejos y gestión de equipos de desarrollo.",
      highlights: ["Gestión de proyectos tecnológicos", "Desarrollo de sistemas de administración", "Integración con APIs externas", "Optimización de infraestructura"]
    },
    {
      title: "Desarrollador Web Full Stack",
      period: "Experiencia continua",
      description: "Desarrollo y mantenimiento de aplicaciones web, rediseño de sitios, implementación de filtros dinámicos y mejoras de rendimiento.",
      highlights: ["Rediseño de interfaces web", "Integración con APIs", "Sistemas de cotización", "Optimización de rendimiento"]
    },
    {
      title: "Especialista en Integración de Sistemas",
      period: "Proyectos diversos",
      description: "Conexión con sistemas empresariales como SAP, desarrollo de herramientas internas y automatización de procesos.",
      highlights: ["Integración SAP", "Generación automática de documentos", "Sistemas de firma digital", "Automatización de procesos"]
    }
  ];

  const projects = [
    {
      title: content[language].projectTitles.businessManagement,
      description: content[language].projectDescriptions.businessManagement,
      tech: ["PHP", "JavaScript", "CSS", "API Integration"],
      hasModal: true,
      projectKey: 'businessManagement',
      isPrivate: true
    },
    {
      title: content[language].projectTitles.quotationPlatform,
      description: content[language].projectDescriptions.quotationPlatform,
      tech: ["PHP", "JavaScript", "SAP API", "PDF Generation"],
      hasModal: true,
      projectKey: 'quotationPlatform',
      hasImages: true
    },
    {
      title: content[language].projectTitles.digitalSignatures,
      description: content[language].projectDescriptions.digitalSignatures,
      tech: ["JavaScript", "PHP", "CSS", "API Integration"],
      hasModal: true,
      projectKey: 'digitalSignatures'
    },
    {
      title: content[language].projectTitles.reactApps,
      description: content[language].projectDescriptions.reactApps,
      tech: ["React", "JavaScript", "CSS"]
    },
    {
      title: content[language].projectTitles.interactivePortfolio,
      description: content[language].projectDescriptions.interactivePortfolio,
      tech: ["Next.js", "React", "Tailwind CSS", "APIs", "Real-time Data"]
    },
    {
      title: content[language].projectTitles.cinemaManagement,
      description: content[language].projectDescriptions.cinemaManagement,
      tech: ["PHP", "JavaScript", "CSS", "QR Integration"],
      link: "https://albacinema.com.gt/",
      hasModal: true,
      projectKey: 'cinemaManagement'
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

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Alan Cifuentes
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {content[language].title}
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
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
              href="mailto: a.fernando_cifuentes@yahoo.com"
              className={`flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 font-medium ${isDarkMode ? 'text-gray-900' : 'text-white'
                }`}
            >
              <Mail size={20} />
              Contacto
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

      {/* Skills Section */}
      <section className={`py-20 px-4 relative z-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">{content[language].skills}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className={`p-6 rounded-lg hover:scale-105 transition-all duration-300 ${isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 border border-orange-500/20 hover:border-orange-500/40'
                : 'bg-white hover:bg-gray-50 border border-orange-500/30 hover:border-orange-500/60 shadow-lg hover:shadow-xl'
                }`}>
                <h3 className="text-xl font-semibold mb-4 text-orange-400">{skillGroup.category}</h3>
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
            {experience.map((exp, index) => (
              <div key={index} className={`p-8 rounded-lg border transition-all duration-300 ${isDarkMode
                ? 'bg-gray-800/30 border-gray-700 hover:border-orange-500'
                : 'bg-white border-gray-200 hover:border-orange-500 shadow-lg hover:shadow-xl'
                }`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-orange-400">{exp.title}</h3>
                  <span className={`md:text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{exp.period}</span>
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
                className={`p-6 rounded-lg transition-all duration-300 group border hover:scale-105 ${isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 border-orange-500/20 hover:border-orange-500/40'
                  : 'bg-white hover:bg-gray-50 border-orange-500/30 hover:border-orange-500/60 shadow-lg hover:shadow-xl'
                  } ${project.hasModal ? 'cursor-pointer' : ''}`}
                onClick={() => project.hasModal && project.projectKey && openModal(project.projectKey)}
              >
                <h3 className="text-xl font-semibold mb-3 text-orange-400 group-hover:text-orange-300">
                  {project.title}
                </h3>
                <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 px-3 py-1 rounded-full text-sm text-red-300">
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
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">{content[language].contact}</h2>
          <p className={`text-xl mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {content[language].contactText}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://github.com/SoulAlan"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 ${isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 border border-orange-500/20 hover:border-orange-500/40'
                : 'bg-white hover:bg-gray-50 border border-orange-500/30 hover:border-orange-500/60 shadow-lg'
                }`}
            >
              <Github size={24} />
              {content[language].viewCode}
              <ExternalLink size={16} />
            </a>
            <a
              href="https://linkedin.com/in/alancifuentessiliezar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-white"
            >
              <Linkedin size={24} />
              {content[language].connect}
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
            © 2025 Alan Cifuentes. Desarrollado con Next.js y Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;