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
  // Public URL of the live project, shown as a "Visit site" link.
  url?: string;
  // The URL opens a sign-in screen, so the link says so instead of promising a public site.
  urlRequiresLogin?: boolean;
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
    slug: 'adventist-church-guatemala',
    tech: ['Next.js', 'React', 'TypeScript', 'Prisma', 'MariaDB', 'NextAuth', 'TipTap', 'Leaflet', 'Live audio streaming'],
    flagship: true,
    url: 'https://adventistas.org.gt/',
  },
  {
    slug: 'manyconnect-lead-routing',
    tech: ['Next.js', 'TypeScript', 'Supabase (Postgres)', 'Vercel Cron', 'ManyChat API', 'Meta Ads API', 'MCP', 'OAuth'],
    flagship: true,
    badge: 'enhanced',
    url: 'https://manyconnect.aumenta.do',
    urlRequiresLogin: true,
  },
  {
    slug: 'morpheus-whatsapp-platform',
    tech: ['Next.js 16', 'Fastify', 'PostgreSQL', 'Zod', 'WhatsApp Cloud API', 'Groq · Claude · OpenAI · Gemini', 'n8n', 'Docker'],
    flagship: true,
    badge: 'enhanced',
    url: 'https://morpheus-pied.vercel.app/admin',
    urlRequiresLogin: true,
  },
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
    slug: 'luzea-real-estate-landing',
    tech: ['Next.js', 'React', 'TypeScript', 'Motion', 'schema.org', 'Google Tag Manager', 'Webhooks'],
    url: 'https://proyectos.luzeaapartamentos.gt/',
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
    'adventist-church-guatemala': {
      title: 'Seventh-day Adventist Church in Guatemala — National Platform',
      summary: "Official site of the Seventh-day Adventist Church in Guatemala (Guatemalan Union, Inter-American Division), built to the church's worldwide brand guidelines. A custom CMS, live radio streaming, and a national access network that mirrors the church's structure from country down to each local congregation.",
      metric: 'Live at adventistas.org.gt',
      challenge: "The church needed one official platform for the whole country that follows the worldwide Adventist identity to the letter, lets each level of the organization manage only its own content, and stays simple for volunteers with no technical background.",
      details: [
        "Public site built to the worldwide Adventist brand guidelines: official logo and symbol, brand color accents, and the identity's signature seventh column on every public page",
        'Custom CMS with a rich-text editor for news, official announcements with read tracking, notifications, image galleries, pastors, churches, clubs, and events',
        'Live radio player for Unión Radio GT and Orión Stereo that keeps playing while visitors navigate and remembers station, volume, and pause preferences',
        'Church finder with an interactive map, worship schedules, and pastor profiles for every congregation',
        'Prayer requests with optional pastoral visits, routed to the district responsible for each request',
        'Online sign-up for youth clubs (Pathfinders) and church secretariat tools: board, votes, and attendance records',
      ],
      architecture: [
        'National hierarchy in the data model: country → associations → districts → pastors → churches, with clubs, Growth Groups, and secretariat records under each church',
        'Access network with five roles (super admin, general admin, district admin, club admin, church secretary), each scoped to the entities it is assigned to',
        'Next.js App Router with Prisma on MariaDB; admin area and APIs protected by NextAuth v5 with JWT in httpOnly cookies',
      ],
      decisions: [
        'No public login button: staff sign in from a private URL, with bcrypt-hashed passwords and IP lockout after five failed attempts',
        'Admin screens use their own full-width layout, while every public page keeps the brand-mandated seventh column',
        "The seventh column's palette follows the visitor's time of day (dawn, day, dusk, night) to keep the identity alive without breaking the guidelines",
        'Production builds run locally and are shipped to the Node.js host behind an Apache proxy, avoiding the shared host’s build limits',
      ],
    },
    'manyconnect-lead-routing': {
      title: 'ManyConnect — Lead Routing for WhatsApp Sales Teams',
      summary: "Built for Aumenta (professional services contract). Multi-tenant platform that assigns every WhatsApp lead coming from ManyChat to the right sales advisor in seconds, reassigns it if nobody replies in 5 minutes, and gives each brand dashboards on how its team responds and sells.",
      metric: 'Unattended leads reassigned after 5 minutes',
      challenge: 'Brands running ads to WhatsApp were losing leads: chats sat unanswered, advisors were picked by hand, and nobody could see which campaigns or advisors actually closed sales.',
      details: [
        'Round-robin assignment by department and branch, with fallback pools when a department has nobody available',
        'Automatic reassignment when an advisor does not respond within 5 minutes, plus a queue that releases leads when business hours start',
        'Advisors set themselves available from WhatsApp; the system tracks lead stages and flags stuck leads on a Kanban board',
        'Analytics dashboards for paid vs. organic leads, advisor response times, and lead models, with Excel exports',
        'Hourly Meta Ads sync to tie leads back to the campaigns that generated them',
        'MCP connector for claude.ai with OAuth sign-in, read-only tools, and audited actions, so managers can query and operate the system from Claude',
      ],
      architecture: [
        'Next.js App Router API on Vercel with Supabase Postgres; a database function performs the round-robin pick atomically',
        'Multi-tenant: every operational table carries tenant_id, and outbound ManyChat calls use each brand’s own credentials',
        'Vercel Cron jobs every few minutes for reassignment, auditing, and stuck-lead recovery, plus daily digests',
      ],
      decisions: [
        'Cron reassignments send only ids and re-confirm the advisor before firing, after fixing a race condition that misattributed organic leads',
        'Demo tenants with fictitious brands and a simulated inbox, so the sales team can present the product without exposing client data',
      ],
    },
    'morpheus-whatsapp-platform': {
      title: 'Morpheus — Multi-Tenant WhatsApp Customer Service Platform with AI',
      summary: "Built for Aumenta (professional services contract); in active development. A SaaS where an AI assistant answers customers on WhatsApp instantly, hands them to the right advisor, and shows the business in real time who is waiting, how fast the team replies, and which conversations end in a sale. It grew out of ChatCenter, its alpha version (an in-house WhatsApp inbox with an AI bot), and absorbs ManyConnect’s lead routing, removing the dependency on ManyChat.",
      metric: 'Each business picks Groq, Claude, OpenAI, or Gemini',
      details: [
        'Own WhatsApp channel on the Meta Cloud API: inbound and outbound messages, attachments, approved templates, and bulk sends from Excel',
        'Real-time shared inbox with assignment, notes, tags, quick replies, and chat states (pending, attended, closed, sold, lost with reason)',
        'Visual flow builder: keyword, ad, and button triggers, questions that save data, conditions, live testing on your own WhatsApp, and drop-off metrics per step',
        'AI assistant that answers by intent and routes to areas such as Sales or HR; each business uses the platform’s AI or its own key, with token usage tracked per business',
        'Business hours, percentage-based automatic distribution, and backup advisors per area',
        'Reports with period comparison and Excel export; mobile app designed in Figma in Spanish and English',
      ],
      architecture: [
        'Monorepo: Fastify API with OpenAPI docs, Next.js 16 web app, and a shared package with roles, Zod schemas, and a typed HTTP client used by web and the upcoming mobile app',
        'Every business resource lives under /v1/tenants/:tenantId and is filtered by tenant_id in SQL; row-level security is enabled on every table',
        'Real-time updates over Server-Sent Events that carry only ids, so clients re-fetch with their own permissions',
        'Plain SQL migrations applied on startup; deployed with Docker Compose on a VPS, with n8n as an optional automation backend',
      ],
      decisions: [
        'API contract first: Zod schema, then route, then client method — the UI never calls fetch by hand',
        'Permissions defined once and checked the same way in the API and the UI, with per-person exceptions on top of roles',
        'Chats handled by the bot stay out of advisors’ queues until they are handed to a person, so the team only sees conversations that need a human',
      ],
    },
    'luzea-real-estate-landing': {
      title: 'Luzea Apartments — Real Estate Landing Page',
      summary: 'Built for Aumenta (professional services contract). Sales landing page for an apartment complex in San José Pinula, Guatemala, built from the Figma design in about a week, with SEO structured data, analytics, and lead capture wired to the sales team’s automations.',
      metric: 'Built from the Figma design in about a week',
      details: [
        'Pixel-faithful build of the Figma design, responsive down to small phones, with motion on key sections',
        'Content blocks that help buyers decide: house vs. apartment comparison, FAQ, unit models, and amenities',
        '"Schedule a visit" modal that carries the apartment model the visitor was looking at, plus a budget-qualifying lead form',
        'Leads sent by webhook to the sales team’s automation workflows',
        'schema.org ApartmentComplex and FAQPage data, Open Graph image, sitemap, and Google Tag Manager for campaign tracking',
      ],
    },
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
    'adventist-church-guatemala': {
      title: 'Iglesia Adventista del Séptimo Día en Guatemala — Plataforma Nacional',
      summary: 'Sitio oficial de la Iglesia Adventista del Séptimo Día en Guatemala (Unión Guatemalteca, División Interamericana), construido siguiendo los lineamientos de marca de la iglesia a nivel mundial. CMS a medida, radio en vivo y una red de acceso nacional que replica la estructura de la iglesia, desde el país hasta cada congregación local.',
      metric: 'En producción en adventistas.org.gt',
      challenge: 'La iglesia necesitaba una sola plataforma oficial para todo el país que respetara al pie de la letra la identidad adventista mundial, que permitiera a cada nivel de la organización administrar solo su propio contenido y que fuera sencilla para voluntarios sin conocimientos técnicos.',
      details: [
        'Sitio público alineado a los lineamientos de marca adventista a nivel mundial: logotipo y símbolo oficiales, acentos de color de la marca y la séptima columna característica de la identidad en cada página pública',
        'CMS a medida con editor de texto enriquecido para noticias, comunicados oficiales con control de lectura, notificaciones, galerías, pastores, iglesias, clubes y eventos',
        'Reproductor de radio en vivo para Unión Radio GT y Orión Stereo que sigue sonando mientras se navega y recuerda la emisora, el volumen y si el visitante lo pausó',
        'Buscador de iglesias con mapa interactivo, horarios de culto y perfil del pastor de cada congregación',
        'Peticiones de oración con opción de visita pastoral, dirigidas al distrito responsable de cada solicitud',
        'Inscripción en línea a clubes juveniles (Conquistadores) y herramientas de secretaría: junta, votos y registro de asistencia',
      ],
      architecture: [
        'Jerarquía nacional en el modelo de datos: país → asociaciones → distritos → pastores → iglesias, con clubes, Grupos en Crecimiento y registros de secretaría bajo cada iglesia',
        'Red de acceso con cinco roles (super administrador, administrador general, administrador de distrito, administrador de club y secretaría de iglesia), cada uno limitado a las entidades que tiene asignadas',
        'Next.js App Router con Prisma sobre MariaDB; panel y APIs protegidos con NextAuth v5 y JWT en cookies httpOnly',
      ],
      decisions: [
        'Sin botón público de inicio de sesión: el personal entra desde una URL privada, con contraseñas cifradas con bcrypt y bloqueo por IP tras cinco intentos fallidos',
        'Las pantallas de administración usan su propio diseño a pantalla completa, mientras cada página pública conserva la séptima columna que exige la marca',
        'La paleta de la séptima columna cambia según la hora del visitante (amanecer, día, atardecer, noche) para darle vida a la identidad sin romper los lineamientos',
        'La compilación de producción se hace en local y se publica al servidor Node.js detrás de un proxy Apache, evitando los límites del hosting compartido',
      ],
    },
    'manyconnect-lead-routing': {
      title: 'ManyConnect — Asignación de Leads para Equipos de Venta por WhatsApp',
      summary: 'Desarrollado para Aumenta (contrato de servicios profesionales). Plataforma multiempresa que asigna en segundos cada lead de WhatsApp que llega desde ManyChat al asesor correcto, lo reasigna si nadie responde en 5 minutos y le da a cada marca tableros sobre cómo responde y vende su equipo.',
      metric: 'Leads sin atender reasignados a los 5 minutos',
      challenge: 'Las marcas que pautaban hacia WhatsApp perdían leads: los chats quedaban sin respuesta, los asesores se elegían a mano y nadie sabía qué campañas o asesores cerraban ventas.',
      details: [
        'Asignación por turnos (round robin) por departamento y sucursal, con grupos de respaldo cuando un departamento no tiene a nadie disponible',
        'Reasignación automática si el asesor no responde en 5 minutos, y una cola que libera los leads al empezar el horario de atención',
        'Los asesores se marcan disponibles desde WhatsApp; el sistema sigue la etapa de cada lead y muestra los atascados en un tablero Kanban',
        'Tableros de analítica de leads de pauta y orgánicos, tiempos de respuesta por asesor y modelos de interés, con exportación a Excel',
        'Sincronización cada hora con Meta Ads para relacionar cada lead con la campaña que lo generó',
        'Conector MCP para claude.ai con inicio de sesión OAuth, herramientas de solo lectura y acciones auditadas, para consultar y operar el sistema desde Claude',
      ],
      architecture: [
        'API en Next.js App Router sobre Vercel con Supabase Postgres; una función de base de datos hace la elección por turnos de forma atómica',
        'Multiempresa: cada tabla operativa lleva tenant_id y las llamadas a ManyChat usan las credenciales propias de cada marca',
        'Tareas programadas en Vercel Cron cada pocos minutos para reasignar, auditar y rescatar leads atascados, además de resúmenes diarios',
      ],
      decisions: [
        'Las reasignaciones programadas envían solo identificadores y vuelven a confirmar el asesor antes de dispararse, tras corregir una condición de carrera que atribuía mal los leads orgánicos',
        'Empresas de demostración con marcas ficticias y una bandeja simulada, para que el equipo comercial presente el producto sin exponer datos de clientes',
      ],
    },
    'morpheus-whatsapp-platform': {
      title: 'Morpheus — Plataforma Multiempresa de Atención por WhatsApp con IA',
      summary: 'Desarrollado para Aumenta (contrato de servicios profesionales); en desarrollo activo. Un SaaS donde un asistente con IA atiende al cliente por WhatsApp al instante, lo pasa al asesor correcto y le muestra al negocio en tiempo real quién espera, cuánto tarda su equipo en responder y qué conversaciones terminan en venta. Nace de ChatCenter, su versión alfa (una bandeja de WhatsApp propia con bot de IA), e incorpora la asignación de leads de ManyConnect, eliminando la dependencia de ManyChat.',
      metric: 'Cada negocio elige Groq, Claude, OpenAI o Gemini',
      details: [
        'Canal propio de WhatsApp sobre la Cloud API de Meta: mensajes entrantes y salientes, adjuntos, plantillas aprobadas y envíos masivos desde Excel',
        'Bandeja compartida en tiempo real con asignación, notas, etiquetas, respuestas rápidas y estados del chat (pendiente, atendido, cerrado, vendido, perdido con motivo)',
        'Constructor visual de flujos: inicios por palabra clave, anuncio o botón, preguntas que guardan datos, condiciones, pruebas en tu propio WhatsApp y métricas de abandono por paso',
        'Asistente con IA que responde por intención y deriva a áreas (Ventas, RRHH, Secretaría); cada negocio usa la IA de la plataforma o su propia clave, con el consumo de tokens medido por negocio',
        'Horarios de atención, reparto automático por porcentajes y asesores de respaldo por área',
        'Reportes con comparación de periodos y exportación a Excel; app móvil diseñada en Figma en español e inglés',
      ],
      architecture: [
        'Monorepo: API en Fastify con documentación OpenAPI, web en Next.js 16 y un paquete compartido con roles, esquemas Zod y un cliente HTTP tipado que usan la web y la futura app móvil',
        'Todo recurso de un negocio vive bajo /v1/tenants/:tenantId y se filtra por tenant_id en SQL; cada tabla tiene seguridad a nivel de fila activada',
        'Actualizaciones en tiempo real con Server-Sent Events que solo llevan identificadores, para que cada cliente vuelva a pedir los datos con sus propios permisos',
        'Migraciones en SQL puro aplicadas al arrancar; despliegue con Docker Compose en un VPS y n8n como motor de automatización opcional',
      ],
      decisions: [
        'Primero el contrato de la API: esquema Zod, luego la ruta, luego el método del cliente; la interfaz nunca hace fetch a mano',
        'Los permisos se definen una sola vez y se verifican igual en la API y en la interfaz, con excepciones por persona además de los roles',
        'Los chats que atiende el bot no entran a la cola de los asesores hasta que pasan a una persona, así el equipo solo ve las conversaciones que necesitan atención humana',
      ],
    },
    'luzea-real-estate-landing': {
      title: 'Luzea Apartamentos — Landing Inmobiliaria',
      summary: 'Desarrollado para Aumenta (contrato de servicios profesionales). Landing de ventas para un complejo de apartamentos en San José Pinula, Guatemala, construida a partir del diseño en Figma en alrededor de una semana, con datos estructurados para SEO, analítica y captura de leads conectada a las automatizaciones del equipo de ventas.',
      metric: 'Construida desde el diseño de Figma en alrededor de una semana',
      details: [
        'Maquetación fiel al diseño de Figma, adaptable hasta teléfonos pequeños, con animaciones en las secciones clave',
        'Bloques de contenido que ayudan a decidir: comparación casa o apartamento, preguntas frecuentes, modelos y amenidades',
        'Modal "Agenda tu visita" que conserva el modelo de apartamento que el visitante estaba viendo, y un formulario que califica el presupuesto del lead',
        'Leads enviados por webhook a los flujos de automatización del equipo de ventas',
        'Datos schema.org de tipo ApartmentComplex y FAQPage, imagen Open Graph, sitemap y Google Tag Manager para medir campañas',
      ],
    },
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
      live: 'Live',
      badges: { accelerated: 'AI-Accelerated', enhanced: 'AI-Enhanced', performance: 'High-Performance' } as Record<BadgeType, string>,
    },
    caseStudy: {
      back: 'Back to all projects',
      keyResult: 'Key result',
      visitSite: 'Visit the live site',
      openApp: 'Open the app (sign-in required)',
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
      live: 'En vivo',
      badges: { accelerated: 'Acelerado con IA', enhanced: 'Potenciado con IA', performance: 'Alto rendimiento' } as Record<BadgeType, string>,
    },
    caseStudy: {
      back: 'Volver a todos los proyectos',
      keyResult: 'Resultado clave',
      visitSite: 'Ver el sitio en vivo',
      openApp: 'Abrir la app (requiere iniciar sesión)',
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
