import { Mountain, Plane, MonitorPlay, ShieldAlert, Zap, Lock, LucideIcon } from 'lucide-react';

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceSpec {
  label: string;
  value: string;
}

export interface CaseStudy {
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
}

export interface GalleryItem {
  url: string;
  alt: string;
  type: 'image' | 'video';
}

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  heroImage: string;
  heroVideo?: string;
  features: ServiceFeature[];
  specifications: ServiceSpec[];
  gallery: GalleryItem[];
  caseStudy: CaseStudy;
  benefits: string[];
  relatedServices: string[];
  ctaText: string;
  ctaSubtext: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'seguridad-patrimonial',
    slug: 'seguridad-patrimonial-minera',
    title: 'Seguridad Patrimonial y Minera',
    shortTitle: 'Seguridad Minera',
    subtitle: 'Protección integral de activos en entornos de alta exigencia',
    description: 'Protección integral de grandes extensiones, campamentos mineros, tajos abiertos y maquinaria pesada en zonas agrestes.',
    longDescription: `Nuestra división de Seguridad Patrimonial y Minera está diseñada para operar en los entornos más desafiantes del Perú. Con más de 12 años de experiencia protegiendo operaciones mineras en La Libertad, Cajamarca y Ancash, hemos desarrollado protocolos especializados que combinan vigilancia humana de élite con tecnología de punta.

Nuestros agentes reciben entrenamiento especializado en supervivencia en altura, primeros auxilios avanzados y manejo de crisis. Operamos en condiciones extremas: desde los 4,500 msnm hasta zonas desérticas de alta radiación solar.

Cada operación cuenta con un Plan de Seguridad Integral personalizado, diseñado tras un análisis exhaustivo de vulnerabilidades y amenazas específicas del sitio.`,
    icon: Mountain,
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1920&q=80',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-mining-site-4809-large.mp4',
    features: [
      {
        title: 'Vigilancia Perimetral 24/7',
        description: 'Rondas programadas y aleatorias con GPS tracking en tiempo real. Cobertura total del perímetro con puntos de control estratégicos.'
      },
      {
        title: 'Control de Activos Críticos',
        description: 'Protección especializada de maquinaria pesada, almacenes de explosivos, y áreas de procesamiento. Inventarios digitales y auditorías continuas.'
      },
      {
        title: 'Gestión de Emergencias',
        description: 'Protocolos de evacuación, brigadas de respuesta y coordinación con autoridades locales. Simulacros trimestrales obligatorios.'
      },
      {
        title: 'Inteligencia Preventiva',
        description: 'Análisis de riesgos, mapeo de actores hostiles y alertas tempranas. Red de informantes en comunidades aledañas.'
      }
    ],
    specifications: [
      { label: 'Cobertura máxima', value: 'Hasta 50,000 hectáreas' },
      { label: 'Personal disponible', value: '80+ agentes certificados' },
      { label: 'Tiempo de respuesta', value: '< 5 minutos' },
      { label: 'Altitud operativa', value: 'Hasta 5,200 msnm' },
      { label: 'Turnos', value: '24/7/365' },
      { label: 'Comunicación', value: 'Radio digital encriptada' }
    ],
    gallery: [
      { url: '/images/services/seguridad-patrimonial/1.jpeg', alt: 'Seguridad patrimonial minera', type: 'image' },
      { url: '/images/services/seguridad-patrimonial/2.jpeg', alt: 'Vigilancia de activos críticos', type: 'image' },
      { url: '/images/services/seguridad-patrimonial/3.jpeg', alt: 'Control perimetral', type: 'image' },
      { url: '/images/services/seguridad-patrimonial/4.jpeg', alt: 'Operaciones en altura', type: 'image' }
    ],
    caseStudy: {
      client: 'Minera Aurífera del Norte',
      industry: 'Minería de oro a cielo abierto',
      challenge: 'Incremento del 300% en intentos de intrusión y robo de cables de alta tensión durante 2022. Pérdidas estimadas en $2.4M USD.',
      solution: 'Implementación de sistema integral: 45 agentes en 3 turnos, drones con visión térmica, y red de sensores perimetrales. Coordinación directa con PNP.',
      result: 'Reducción del 94% en incidentes. Cero robos exitosos en 18 meses. ROI positivo en 6 meses.'
    },
    benefits: [
      'Reducción comprobada de pérdidas por robo',
      'Cumplimiento normativo con SUCAMEC y OSINERGMIN',
      'Personal certificado en altura y primeros auxilios',
      'Reportes diarios y dashboard en tiempo real',
      'Seguro de responsabilidad civil incluido'
    ],
    relatedServices: ['vigilancia-aerea', 'centro-control', 'reaccion-inmediata'],
    ctaText: 'SOLICITAR EVALUACIÓN GRATUITA',
    ctaSubtext: 'Nuestro equipo visitará sus instalaciones sin costo'
  },
  {
    id: 'vigilancia-aerea',
    slug: 'vigilancia-aerea-uav',
    title: 'Vigilancia Aérea (UAV)',
    shortTitle: 'Drones UAV',
    subtitle: 'Ojos en el cielo con tecnología de última generación',
    description: 'Flota DJI Matrice/Mavic con visión térmica y nocturna. Smart Track para seguimiento inteligente de intrusos en oscuridad total.',
    longDescription: `Nuestra división aérea representa la vanguardia en vigilancia remota para el sector minero e industrial peruano. Operamos una flota de drones profesionales DJI certificados, equipados con las últimas tecnologías en imagen térmica, visión nocturna y seguimiento autónomo.

El sistema Smart Track permite que nuestros UAV identifiquen y sigan automáticamente a intrusos incluso en condiciones de oscuridad total, transmitiendo video en tiempo real a nuestro Centro de Control.

Todos nuestros pilotos cuentan con certificación DGAC y más de 500 horas de vuelo documentadas. Cumplimos estrictamente con la normativa aeronáutica peruana y coordinamos con autoridades cuando operamos cerca de zonas restringidas.`,
    icon: Plane,
    heroImage: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-drone-flying-over-a-snowy-mountain-range-3528-large.mp4',
    features: [
      {
        title: 'Visión Térmica FLIR',
        description: 'Cámaras térmicas de grado militar que detectan presencia humana a más de 2km de distancia, día y noche, en cualquier condición climática.'
      },
      {
        title: 'Smart Track AI',
        description: 'Algoritmo de seguimiento automático que mantiene al intruso en cuadro mientras el drone lo persigue de forma autónoma hasta la interceptación.'
      },
      {
        title: 'Autonomía Extendida',
        description: 'Baterías de alta capacidad que permiten vuelos de hasta 55 minutos. Sistema de cambio rápido para operación continua.'
      },
      {
        title: 'Transmisión Encriptada',
        description: 'Video 4K en tiempo real con encriptación AES-256. Alcance de transmisión hasta 15km sin pérdida de señal.'
      }
    ],
    specifications: [
      { label: 'Flota disponible', value: '12 unidades DJI' },
      { label: 'Modelos', value: 'Matrice 300 RTK, Mavic 3T' },
      { label: 'Autonomía máxima', value: '55 minutos' },
      { label: 'Alcance operativo', value: '15 km' },
      { label: 'Resolución térmica', value: '640x512 px' },
      { label: 'Velocidad máxima', value: '82 km/h' }
    ],
    gallery: [
      { url: '/images/services/vigilancia-uav/1 drone.jpeg', alt: 'Drone DJI en operación', type: 'image' },
      { url: '/images/services/vigilancia-uav/2 drone.jpeg', alt: 'Vista térmica nocturna', type: 'image' },
      { url: '/images/services/vigilancia-uav/3 drone.jpeg', alt: 'Piloto UAV certificado', type: 'image' },
      { url: '/images/services/vigilancia-uav/4 drone.jpeg', alt: 'Monitoreo aéreo en vivo', type: 'image' }
    ],
    caseStudy: {
      client: 'Complejo Agroindustrial Beta',
      industry: 'Agroindustria - Cultivos de exportación',
      challenge: 'Robos nocturnos sistemáticos de fruta premium. Perímetro de 3,200 hectáreas imposible de cubrir con vigilancia tradicional.',
      solution: 'Despliegue de 4 drones con visión térmica en patrullaje rotativo. Integración con alarmas perimetrales para respuesta automática.',
      result: 'Detección de 23 intentos de intrusión en el primer mes. 100% de intercepciones exitosas. Reducción de pérdidas en $890,000 USD anuales.'
    },
    benefits: [
      'Cobertura de grandes extensiones en minutos',
      'Detección nocturna sin iluminación artificial',
      'Evidencia en video 4K para procesos legales',
      'Disuasión visible que reduce intentos de intrusión',
      'Integración con sistemas de alarma existentes'
    ],
    relatedServices: ['seguridad-patrimonial', 'centro-control', 'reaccion-inmediata'],
    ctaText: 'AGENDAR DEMOSTRACIÓN',
    ctaSubtext: 'Vuelo de prueba en sus instalaciones'
  },
  {
    id: 'centro-control',
    slug: 'centro-control-cctv',
    title: 'Centro de Control (CCTV)',
    shortTitle: 'Centro Control',
    subtitle: 'Vigilancia inteligente centralizada 24/7',
    description: 'Gestión centralizada mediante Video Wall y software analítico (Smart PSS). Supervisión en tiempo real y comunicación radial.',
    longDescription: `Nuestro Centro de Control representa el cerebro operativo de todas nuestras operaciones de seguridad. Equipado con tecnología de última generación, permite la supervisión simultánea de múltiples sitios con un solo equipo especializado.

El Video Wall de 12 pantallas 4K permite a nuestros operadores monitorear hasta 200 cámaras simultáneamente, con sistemas de detección automática de anomalías que priorizan las alertas críticas.

El software Smart PSS integra análisis de video con inteligencia artificial: reconocimiento facial, detección de intrusión perimetral, conteo de personas, y alertas por comportamiento sospechoso. Todo grabado y respaldado en servidores redundantes con retención de 90 días.`,
    icon: MonitorPlay,
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-security-camera-control-room-34473-large.mp4',
    features: [
      {
        title: 'Video Wall 4K',
        description: '12 monitores profesionales de 55" en configuración 4x3. Visualización simultánea de hasta 200 cámaras con layouts personalizables.'
      },
      {
        title: 'Smart PSS Analytics',
        description: 'IA que detecta intrusiones, reconoce rostros, cuenta personas y genera alertas automáticas. Reduce falsos positivos en un 95%.'
      },
      {
        title: 'Grabación Redundante',
        description: 'NVR con RAID 6 y backup en la nube. Retención de 90 días con acceso remoto seguro. Exportación forense certificada.'
      },
      {
        title: 'Comunicación Integrada',
        description: 'Radio digital, telefonía IP y sistema de voceo. Coordinación instantánea con unidades en campo y autoridades.'
      }
    ],
    specifications: [
      { label: 'Capacidad cámaras', value: 'Hasta 500 canales' },
      { label: 'Resolución', value: '4K/8MP' },
      { label: 'Almacenamiento', value: '200TB redundante' },
      { label: 'Retención', value: '90 días mínimo' },
      { label: 'Operadores', value: '6 por turno' },
      { label: 'Tiempo respuesta', value: '< 30 segundos' }
    ],
    gallery: [
      { url: '/images/services/centro-control/1.jpeg', alt: 'Video Wall operativo', type: 'image' },
      { url: '/images/services/centro-control/2.jpeg', alt: 'Operadores en turno', type: 'image' },
      { url: '/images/services/centro-control/3.jpeg', alt: 'Sistema de monitoreo', type: 'image' },
      { url: '/images/services/centro-control/4.jpeg', alt: 'Análisis de video', type: 'image' }
    ],
    caseStudy: {
      client: 'Centro Comercial Plaza del Sol',
      industry: 'Retail - 150 locales comerciales',
      challenge: 'Sistema CCTV obsoleto con grabaciones inutilizables. Múltiples robos sin evidencia procesable. Tiempos de respuesta superiores a 10 minutos.',
      solution: 'Migración completa a sistema IP con 280 cámaras 4K. Centro de control dedicado con 4 operadores. Integración con alarmas de tiendas.',
      result: 'Tiempo de respuesta reducido a 45 segundos. 100% de incidentes con evidencia HD. Reducción del 78% en mermas reportadas.'
    },
    benefits: [
      'Monitoreo remoto desde cualquier dispositivo',
      'Evidencia HD admisible en procesos judiciales',
      'Reducción de personal de seguridad física',
      'Análisis de patrones para prevención',
      'Reportes automáticos diarios/semanales'
    ],
    relatedServices: ['vigilancia-aerea', 'control-accesos', 'seguridad-patrimonial'],
    ctaText: 'SOLICITAR AUDITORÍA CCTV',
    ctaSubtext: 'Evaluamos su sistema actual sin compromiso'
  },
  {
    id: 'unidades-tacticas',
    slug: 'unidades-tacticas',
    title: 'Unidades Tácticas',
    shortTitle: 'Unidades Tácticas',
    subtitle: 'Respuesta especializada para situaciones de alto riesgo',
    description: 'Personal "Robocop" con equipos antidisturbios, escudos y cascos para control de masas y defensa de perímetros críticos.',
    longDescription: `Nuestras Unidades Tácticas están conformadas por personal ex-militar y ex-policial con entrenamiento especializado en control de multitudes, defensa de instalaciones y manejo de crisis. Son la última línea de defensa cuando la situación excede las capacidades de la vigilancia convencional.

Equipados con indumentaria antimotines de nivel III (escudos balísticos, cascos con visera, protección corporal completa), nuestros agentes tácticos pueden contener y dispersar multitudes hostiles cumpliendo estrictamente los protocolos de uso progresivo de la fuerza.

Operamos bajo los más altos estándares éticos y legales. Todo uso de fuerza es documentado, reportado y revisado. Nuestro historial de cero denuncias por abuso es nuestro mayor orgullo.`,
    icon: ShieldAlert,
    heroImage: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1920&q=80',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-swat-team-entering-a-building-34457-large.mp4',
    features: [
      {
        title: 'Equipamiento Nivel III',
        description: 'Escudos balísticos, cascos con visera anti-impacto, protección corporal completa y bastones extensibles. Todo certificado y homologado.'
      },
      {
        title: 'Formación Antimotines',
        description: 'Técnicas de contención, dispersión controlada y evacuación de VIPs. Ejercicios conjuntos con PNP autorizados.'
      },
      {
        title: 'Uso Progresivo de Fuerza',
        description: 'Protocolos estrictos: presencia, voz de mando, control físico, elementos no letales. Escalamiento documentado.'
      },
      {
        title: 'Coordinación Policial',
        description: 'Canales directos con comisarías locales. Apoyo autorizado en operativos de alto riesgo. Todo dentro del marco legal.'
      }
    ],
    specifications: [
      { label: 'Personal táctico', value: '35 agentes certificados' },
      { label: 'Certificación', value: 'SUCAMEC + PNP' },
      { label: 'Tiempo despliegue', value: '< 15 minutos' },
      { label: 'Equipamiento', value: 'Nivel III antimotines' },
      { label: 'Vehículos', value: '4 unidades blindadas' },
      { label: 'Cobertura', value: 'La Libertad y Lima' }
    ],
    gallery: [
      { url: '/images/services/unidades-tacticas/1.jpeg', alt: 'Unidad táctica formada', type: 'image' },
      { url: '/images/services/unidades-tacticas/2.jpeg', alt: 'Equipamiento táctico', type: 'image' },
      { url: '/images/services/unidades-tacticas/3.jpeg', alt: 'Entrenamiento especializado', type: 'image' },
      { url: '/images/services/unidades-tacticas/4.jpeg', alt: 'Operativo de seguridad', type: 'image' }
    ],
    caseStudy: {
      client: 'Proyecto Hidroeléctrico Marañón',
      industry: 'Energía - Construcción de represa',
      challenge: 'Bloqueos constantes por comunidades opositoras. Paralización de obras por 3 meses. Agresiones a trabajadores y maquinaria.',
      solution: 'Despliegue de 20 agentes tácticos en perímetro. Establecimiento de zona de diálogo segura. Coordinación con fiscalía para denuncias.',
      result: 'Reinicio de operaciones en 2 semanas. Cero enfrentamientos violentos. Canal de diálogo establecido con comunidades.'
    },
    benefits: [
      'Disuasión visual que previene escalamiento',
      'Personal entrenado en desescalamiento',
      'Cero denuncias por uso excesivo de fuerza',
      'Coordinación legal con autoridades',
      'Documentación completa de cada intervención'
    ],
    relatedServices: ['reaccion-inmediata', 'seguridad-patrimonial', 'control-accesos'],
    ctaText: 'CONSULTAR DISPONIBILIDAD',
    ctaSubtext: 'Evaluación de necesidades sin compromiso'
  },
  {
    id: 'reaccion-inmediata',
    slug: 'reaccion-inmediata',
    title: 'Reacción Inmediata',
    shortTitle: 'Reacción Rápida',
    subtitle: 'Respuesta veloz para neutralizar amenazas activas',
    description: 'Equipos de respuesta rápida para neutralizar intrusiones y recuperar activos (cables, material estratégico) en terrenos difíciles.',
    longDescription: `Nuestros Equipos de Reacción Inmediata (ERI) son unidades móviles de alta velocidad diseñadas para interceptar intrusos, recuperar activos robados y asegurar escenas hasta la llegada de autoridades. Operamos donde otros no pueden: quebradas, cerros, y terrenos sin acceso vehicular.

Cada ERI está compuesto por 4 agentes con entrenamiento en persecución a pie, conducción evasiva y primeros auxilios tácticos. Equipados con vehículos 4x4, motos todo terreno y equipos de comunicación satelital.

El tiempo es crítico en seguridad. Por eso garantizamos tiempos de respuesta inferiores a 5 minutos dentro del perímetro protegido, y coordinación inmediata con PNP para persecuciones fuera de zona.`,
    icon: Zap,
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-police-car-lights-flashing-at-night-34442-large.mp4',
    features: [
      {
        title: 'Respuesta < 5 Minutos',
        description: 'Unidades pre-posicionadas estratégicamente. GPS en tiempo real para optimización de rutas. Alertas automáticas desde centro de control.'
      },
      {
        title: 'Vehículos Todo Terreno',
        description: 'Camionetas 4x4 y motos enduro para acceso a cualquier punto. Equipamiento completo: luces tácticas, sirenas, botiquín avanzado.'
      },
      {
        title: 'Recuperación de Activos',
        description: 'Protocolos para intercepción de vehículos, recuperación de cables/materiales y preservación de evidencia para procesos legales.'
      },
      {
        title: 'Coordinación Policial',
        description: 'Línea directa con 105 y comisarías locales. Protocolos de entrega de detenidos y cadena de custodia de evidencias.'
      }
    ],
    specifications: [
      { label: 'Equipos disponibles', value: '8 unidades ERI' },
      { label: 'Agentes por equipo', value: '4 especializados' },
      { label: 'Tiempo respuesta', value: '< 5 minutos' },
      { label: 'Vehículos', value: '12 (4x4 + motos)' },
      { label: 'Cobertura', value: '24/7/365' },
      { label: 'Radio alcance', value: '50km' }
    ],
    gallery: [
      { url: '/images/services/reaccion-inmediata/1.jpeg', alt: 'Unidad de reacción rápida', type: 'image' },
      { url: '/images/services/reaccion-inmediata/2.jpeg', alt: 'Vehículo táctico 4x4', type: 'image' },
      { url: '/images/services/reaccion-inmediata/3.jpeg', alt: 'Equipo de respuesta', type: 'image' },
      { url: '/images/services/reaccion-inmediata/4.jpeg', alt: 'Patrulla motorizada', type: 'image' }
    ],
    caseStudy: {
      client: 'Línea de Transmisión Eléctrica 220kV',
      industry: 'Energía - Transmisión eléctrica',
      challenge: 'Robos sistemáticos de cable de cobre. Pérdidas de $1.8M USD en 2021. Tiempos de respuesta de seguridad anterior superiores a 40 minutos.',
      solution: '3 equipos ERI pre-posicionados a lo largo de 180km de línea. Drones para patrullaje + sensores de vibración en torres críticas.',
      result: '12 intercepciones exitosas en 6 meses. Recuperación del 89% del material en flagrancia. Reducción de pérdidas en 96%.'
    },
    benefits: [
      'Intercepciones en flagrancia para proceso penal',
      'Recuperación de activos antes de su venta',
      'Disuasión activa visible en la zona',
      'Documentación en video de cada intervención',
      'Coordinación fluida con autoridades'
    ],
    relatedServices: ['vigilancia-aerea', 'centro-control', 'unidades-tacticas'],
    ctaText: 'EVALUAR COBERTURA',
    ctaSubtext: 'Analizamos tiempos de respuesta para su zona'
  },
  {
    id: 'control-accesos',
    slug: 'control-accesos',
    title: 'Control de Accesos',
    shortTitle: 'Control Accesos',
    subtitle: 'Gestión inteligente de ingresos y salidas',
    description: 'Gestión rigurosa en puntos neurálgicos. Aseguramos que solo personal y vehículos autorizados ingresen a la zona de operación.',
    longDescription: `El Control de Accesos es la primera y última línea de defensa de cualquier instalación. Nuestro servicio va más allá del simple "vigilante en garita": implementamos sistemas integrales que combinan tecnología biométrica, verificación documental y protocolos anti-infiltración.

Cada punto de control cuenta con personal entrenado en detección de comportamientos sospechosos, verificación de identidades y procedimientos de emergencia. Todos nuestros agentes de acceso hablan español e inglés básico para instalaciones con personal internacional.

Gestionamos desde garitas simples hasta complejos sistemas de esclusas vehiculares con rayos X, arcos detectores y verificación biométrica multi-factor.`,
    icon: Lock,
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-security-guard-checking-a-car-at-a-checkpoint-34475-large.mp4',
    features: [
      {
        title: 'Biometría Multi-Factor',
        description: 'Huella dactilar + reconocimiento facial + tarjeta RFID. Base de datos sincronizada en tiempo real con RRHH del cliente.'
      },
      {
        title: 'Control Vehicular',
        description: 'Lectura automática de placas, inspección con espejos y equipos de rayos X portátiles. Registro fotográfico de cada ingreso.'
      },
      {
        title: 'Gestión de Visitantes',
        description: 'Pre-registro online, verificación de identidad, acompañamiento a destino y control de permanencia. Alertas por tiempo excedido.'
      },
      {
        title: 'Anti-Tailgating',
        description: 'Torniquetes de alta seguridad, mantraps (esclusas) y detección de piggyback. Cero accesos no autorizados.'
      }
    ],
    specifications: [
      { label: 'Puntos de control', value: 'Ilimitados' },
      { label: 'Tecnología', value: 'Biométrica + RFID' },
      { label: 'Capacidad registro', value: '50,000+ usuarios' },
      { label: 'Verificación', value: '< 3 segundos' },
      { label: 'Integración', value: 'SAP, Oracle, AD' },
      { label: 'Reportes', value: 'Tiempo real + históricos' }
    ],
    gallery: [
      { url: '/images/services/control-accesos/1.jpeg', alt: 'Garita de control', type: 'image' },
      { url: '/images/services/control-accesos/2.jpeg', alt: 'Sistema biométrico', type: 'image' },
      { url: '/images/services/control-accesos/3.jpeg', alt: 'Control vehicular', type: 'image' },
      { url: '/images/services/control-accesos/4.jpeg', alt: 'Registro de visitantes', type: 'image' }
    ],
    caseStudy: {
      client: 'Planta Farmacéutica GMP',
      industry: 'Farmacéutica - Producción de medicamentos',
      challenge: 'Requisitos GMP (Good Manufacturing Practices) exigen trazabilidad total de accesos. Sistema manual con registros en papel incumplía auditorías.',
      solution: 'Implementación de sistema biométrico integrado con ERP. Zonas clasificadas con niveles de acceso diferenciados. Reportes automáticos para auditorías.',
      result: 'Certificación GMP renovada sin observaciones. Tiempo de auditoría reducido en 70%. Trazabilidad 100% de movimientos de personal.'
    },
    benefits: [
      'Trazabilidad total para auditorías',
      'Eliminación de accesos no autorizados',
      'Integración con sistemas de RRHH',
      'Reportes de asistencia automáticos',
      'Cumplimiento normativo (GMP, ISO, BASC)'
    ],
    relatedServices: ['centro-control', 'seguridad-patrimonial', 'unidades-tacticas'],
    ctaText: 'DISEÑAR SISTEMA DE ACCESOS',
    ctaSubtext: 'Propuesta personalizada para su instalación'
  }
];

export const getServiceBySlug = (slug: string): ServiceDetail | undefined => {
  return servicesData.find(service => service.slug === slug);
};

export const getServiceById = (id: string): ServiceDetail | undefined => {
  return servicesData.find(service => service.id === id);
};

export const getRelatedServices = (currentId: string): ServiceDetail[] => {
  const current = getServiceById(currentId);
  if (!current) return [];
  return current.relatedServices
    .map(id => getServiceById(id))
    .filter((s): s is ServiceDetail => s !== undefined);
};
