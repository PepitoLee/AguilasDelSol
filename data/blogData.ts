export type BlogCategory = 'Tecnología UAV' | 'Seguridad Minera' | 'Servicios' | 'Casos de Éxito';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  readTime: string;
  author: { name: string; role: string };
  relatedPosts: string[];
  metaDescription: string;
}

export const blogCategories: BlogCategory[] = [
  'Tecnología UAV',
  'Seguridad Minera',
  'Servicios',
  'Casos de Éxito',
];

export const blogPosts: BlogPost[] = [
  // ─────────────────────────────────────────────
  // ARTÍCULO 1 — DJI Matrice 300 RTK
  // ─────────────────────────────────────────────
  {
    id: 'blog-001',
    slug: 'drones-dji-matrice-300-rtk-seguridad-minera',
    title: 'Drones DJI Matrice 300 RTK: Capacidades y Aplicaciones en Seguridad Minera',
    excerpt: 'Análisis técnico completo del DJI Matrice 300 RTK con cámara Zenmuse H20T, visión térmica de 640×512 px y Smart Track AI. Conozca cómo esta plataforma UAV transforma la vigilancia aérea en operaciones mineras en los Andes peruanos.',
    body: `El DJI Matrice 300 RTK es la plataforma aérea no tripulada de referencia para seguridad industrial y vigilancia de perímetros extensos. Lanzado por DJI Enterprise, este drone de grado comercial fue diseñado específicamente para misiones críticas donde la fiabilidad, la autonomía y la capacidad de sensores son factores determinantes.

Según las especificaciones oficiales de DJI, el Matrice 300 RTK ofrece hasta 55 minutos de vuelo sin carga útil y sin viento, lo que lo convierte en una de las plataformas multirrotor con mayor autonomía del mercado. Su resistencia al viento alcanza los 15 m/s (54 km/h), permitiendo operar en las condiciones ventosas habituales de los Andes peruanos. La clasificación de protección IP45 garantiza resistencia a salpicaduras y polvo, un requisito indispensable para entornos mineros donde el particulado en suspensión es constante.

El rango de temperatura operativa de -20 °C a 50 °C cubre prácticamente cualquier escenario climático en Perú, desde los valles costeros desérticos de Arequipa hasta las alturas gélidas de Cajamarca y La Libertad, donde las noches pueden descender a -15 °C. El peso del equipo con dos baterías TB60 es de aproximadamente 6.3 kg, y su capacidad de carga útil máxima es de 2.7 kg, suficiente para montar hasta tres sensores simultáneamente.

El sensor clave para vigilancia es el DJI Zenmuse H20T, un payload cuádruple que integra cuatro sensores en un solo estabilizador gimbal: una cámara visual de 20 megapíxeles con zoom óptico híbrido de 23x, una cámara gran angular de 12 MP con sensor CMOS de 1/2", un sensor térmico de 640×512 píxeles con microbolómetro VOx no refrigerado (NETD ≤ 50 mK a f/1.0, banda espectral 8-14 μm) y un telémetro láser con alcance efectivo de 3 a 1,200 metros sobre superficies verticales de ≥12 m de diámetro con reflectancia del 20 %.

La cámara térmica del Zenmuse H20T permite detectar firmas de calor en total oscuridad con un rango de medición de -40 °C a 550 °C en modo de baja ganancia. Esto significa que un operador puede identificar personas, vehículos o maquinaria activa a más de un kilómetro de distancia sin ninguna fuente de iluminación. El zoom digital térmico de hasta 8x permite confirmar visualmente la naturaleza de la amenaza antes de despachar personal terrestre.

El sistema Smart Track AI del Matrice 300 RTK incorpora algoritmos de visión por computadora que permiten al drone seguir automáticamente un objetivo en movimiento — ya sea un vehículo, una persona o un activo — sin intervención del operador. Una vez que el operador identifica y marca un objetivo en pantalla, el sistema mantiene el encuadre y seguimiento incluso durante maniobras evasivas. Esta funcionalidad reduce drásticamente los tiempos de respuesta ante intrusiones perimetrales.

El rango de transmisión de video OcuSync Enterprise alcanza hasta 15 km en condiciones FCC (línea de vista sin interferencia), lo que permite cubrir perímetros mineros de gran extensión desde un único punto de lanzamiento. Los sensores de detección de obstáculos cubren las 6 direcciones (frontal, trasera, lateral izquierda, lateral derecha, superior e inferior) con un rango de detección de visión dual de 0.7 a 40 metros en horizontal y 0.6 a 30 metros en vertical, complementados por sensores IR ToF con alcance de 0.1 a 8 metros.

En el contexto regulatorio peruano, la operación de drones comerciales está regulada por la DGAC (Dirección General de Aeronáutica Civil) mediante la NTC 001-2015 y la Ley 30740 promulgada el 22 de marzo de 2018. Esta normativa establece que las aeronaves deben estar registradas ante la DGAC, los pilotos deben contar con certificación emitida por un Centro de Instrucción de Aviación Civil, y las operaciones VLOS (Visual Line of Sight) tienen un límite de 500 metros de distancia horizontal y 120 metros de altitud sobre el nivel del suelo.

Para operaciones mineras, donde frecuentemente se requiere cubrir distancias superiores a los 500 metros, se tramitan autorizaciones especiales ante el MTC. El nuevo reglamento en proceso de adopción (borrador publicado en octubre de 2024) introducirá categorías basadas en riesgo que facilitarán la obtención de permisos para operaciones BVLOS (Beyond Visual Line of Sight) en zonas rurales y mineras.

El DJI Matrice 300 RTK se integra con la plataforma DJI FlightHub 2, que permite gestionar flotas de múltiples drones desde un centro de control unificado. Cada misión genera registros de telemetría georeferenciada, grabaciones de video con marcas de tiempo y coordenadas GPS, y reportes automáticos de incidentes. Esta trazabilidad documental es fundamental para cumplir con los protocolos de seguridad exigidos por clientes del sector minero.

En 2024, DJI lanzó el Matrice 350 RTK como sucesor directo del M300. El M350 RTK mantiene los 55 minutos de vuelo y la capacidad de carga de 2.7 kg, pero mejora la protección a IP55 (resistencia a chorros de agua desde cualquier dirección) y ofrece un sistema de radar CSM opcional con detección efectiva de hasta 30 metros en 360° horizontal. El peso aumenta a 8.98 kg con baterías, pero la mayor robustez justifica el incremento para operaciones en condiciones adversas.`,
    coverImage: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800&q=80',
    category: 'Tecnología UAV',
    tags: ['DJI Matrice 300 RTK', 'Zenmuse H20T', 'drones seguridad', 'visión térmica', 'Smart Track AI', 'vigilancia minera', 'DGAC Perú', 'Matrice 350 RTK'],
    publishedAt: '2025-12-15',
    readTime: '14 min',
    author: { name: 'Ing. Carlos Mendoza', role: 'Director de Operaciones UAV' },
    relatedPosts: ['blog-002', 'blog-004'],
    metaDescription: 'Análisis técnico del DJI Matrice 300 RTK con Zenmuse H20T para seguridad minera en Perú. Especificaciones reales, visión térmica 640×512, Smart Track AI, regulación DGAC y comparativa con Matrice 350 RTK.',
  },

  // ─────────────────────────────────────────────
  // ARTÍCULO 2 — Tipos de Drones para Vigilancia
  // ─────────────────────────────────────────────
  {
    id: 'blog-002',
    slug: 'tipos-drones-vigilancia-sector-industrial',
    title: 'Tipos de Drones para Vigilancia Industrial: Guía Completa de Selección 2025',
    excerpt: 'Comparativa técnica entre DJI Matrice 300 RTK, Matrice 350 RTK y Mavic 3 Enterprise Thermal para vigilancia industrial. Especificaciones reales, casos de uso por escenario y criterios de selección.',
    body: `La elección del drone adecuado para vigilancia industrial no es una decisión trivial. Depende de la extensión del área a cubrir, las condiciones climáticas del sitio, el tipo de sensores requeridos, el presupuesto disponible y el marco regulatorio aplicable. En esta guía técnica comparamos las tres plataformas DJI Enterprise más utilizadas en el sector industrial peruano con especificaciones verificadas del fabricante.

DJI Matrice 300 RTK: la plataforma de referencia para perímetros extensos. Con un tiempo de vuelo máximo de 55 minutos, resistencia al viento de 15 m/s (54 km/h) y clasificación IP45, el M300 está diseñado para misiones de larga duración en entornos desafiantes. Su capacidad de carga útil de 2.7 kg permite montar hasta 3 payloads simultáneamente, como el Zenmuse H20T (cámara térmica + visual + zoom + telémetro láser). Su rango de transmisión de 15 km (FCC) y detección de obstáculos en 6 direcciones lo hacen ideal para operaciones mineras con perímetros superiores a 5 km. Peso con baterías: 6.3 kg. Rango de temperatura operativa: -20 a 50 °C.

DJI Matrice 350 RTK: el sucesor mejorado. Lanzado en 2024, el M350 RTK mantiene la autonomía de 55 minutos y la carga útil de 2.7 kg, pero eleva la protección a IP55 — lo que significa resistencia certificada a chorros de agua desde cualquier dirección, no solo salpicaduras. Incorpora un nuevo sistema de radar CSM con detección de 360° horizontal hasta 30 metros, mejorando significativamente la seguridad de vuelo en entornos con estructuras como torres de alta tensión, chimeneas o plantas de procesamiento. El peso sube a 8.98 kg con baterías, y el rango de transmisión en entornos suburbanos es de 3-9 km. Es la opción más robusta para operaciones donde las condiciones meteorológicas son impredecibles.

DJI Mavic 3 Enterprise Thermal (M3T): la opción táctica y portátil. Con apenas 920 gramos de peso y un tiempo de vuelo de hasta 45 minutos, el M3T ofrece una relación portabilidad-capacidad excepcional. Integra tres cámaras: una cámara gran angular de 48 MP con sensor CMOS de 1/2", un teleobjetivo de 12 MP con zoom híbrido de 56x, y un sensor térmico de 640×512 píxeles (NETD ≤ 50 mK). Su rango de temperatura operativa es de -10 a 40 °C, más limitado que los Matrice. La gran ventaja del M3T es su despliegue ultrarrápido: plegado cabe en una mochila y está listo para volar en menos de 60 segundos, lo que lo convierte en la herramienta ideal para respuesta rápida ante alertas del sistema CCTV.

Criterios de selección por escenario operativo. Para perímetros mineros de gran extensión (más de 5 km), el M300 RTK o M350 RTK son la opción obligada por su autonomía, capacidad multisenso y resistencia ambiental. Para instalaciones industriales medianas (plantas de procesamiento, almacenes, campamentos), el M3T ofrece vigilancia térmica efectiva a un costo significativamente menor. Para inspección de infraestructura vertical (torres, chimeneas, líneas de transmisión), el M350 RTK con su radar CSM y el payload LiDAR Zenmuse L2 permite generar nubes de puntos 3D en tiempo real para detectar alteraciones estructurales.

Integración con centros de control. Las tres plataformas son compatibles con DJI FlightHub 2, la plataforma cloud de gestión de flotas que permite planificar rutas de vuelo, monitorear telemetría en tiempo real, almacenar registros de vuelo y generar reportes georeferenciados. Para operaciones que requieren automatización, DJI FlightHub 2 permite programar misiones recurrentes que el drone ejecuta de forma autónoma, incluyendo despegue desde DJI Dock 2 (estación de carga y despliegue automático) sin intervención humana.

Normativa aplicable en Perú. Según la NTC 001-2015 de la DGAC y la Ley 30740, todas las aeronaves deben registrarse ante la Dirección General de Aeronáutica Civil. Los pilotos requieren certificación de un Centro de Instrucción acreditado por el MTC. Las operaciones VLOS están limitadas a 500 m de distancia horizontal y 120 m de altitud AGL. Para vuelos urbanos se requiere autorización previa del MTC. Los drones recreativos de menos de 2 kg y las aeronaves estatales (policía, militares) están excluidos de la Ley 30740.

Costo total de propiedad (TCO). Al evaluar la inversión, es importante considerar no solo el precio del equipo sino los costos de capacitación de pilotos, seguros, mantenimiento preventivo, baterías de repuesto y software de gestión. El M300 RTK requiere una inversión inicial mayor pero ofrece versatilidad multisenso que reduce la necesidad de equipos adicionales. El M3T tiene un costo de entrada menor pero limita las operaciones a un solo set de sensores integrados no intercambiables.

Recomendación para el sector minero peruano. Basándonos en más de una década de experiencia en operaciones de seguridad en regiones como La Libertad, Cajamarca y Ancash, recomendamos una flota mixta: un M350 RTK con Zenmuse H20T como aeronave principal de patrullaje programado, complementado con uno o dos M3T para respuesta rápida y verificación de alertas. Esta combinación maximiza la cobertura minimizando los tiempos de respuesta.`,
    coverImage: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
    category: 'Tecnología UAV',
    tags: ['drones vigilancia industrial', 'DJI Matrice 300 RTK', 'DJI Matrice 350 RTK', 'Mavic 3 Enterprise Thermal', 'comparativa drones', 'FlightHub 2', 'DGAC Perú', 'Ley 30740'],
    publishedAt: '2025-11-28',
    readTime: '16 min',
    author: { name: 'Ing. Carlos Mendoza', role: 'Director de Operaciones UAV' },
    relatedPosts: ['blog-001', 'blog-003'],
    metaDescription: 'Guía comparativa 2025 de drones para vigilancia industrial en Perú: DJI Matrice 300 RTK vs 350 RTK vs Mavic 3 Enterprise Thermal. Especificaciones técnicas reales, criterios de selección por escenario y normativa DGAC vigente.',
  },

  // ─────────────────────────────────────────────
  // ARTÍCULO 3 — Seguridad Privada en Minería
  // ─────────────────────────────────────────────
  {
    id: 'blog-003',
    slug: 'empresa-minera-seguridad-privada-especializada-peru',
    title: '¿Por Qué una Empresa Minera en Perú Necesita Seguridad Privada Especializada?',
    excerpt: 'Análisis completo de los riesgos del sector minero peruano, marco legal SUCAMEC vigente (Decreto Legislativo 1213), estadísticas reales del sector y el ROI demostrado de la seguridad privada profesional.',
    body: `Perú es uno de los principales productores mineros del mundo. La minería representa aproximadamente el 8.5 % del PIB nacional y el 63.9 % de las exportaciones totales del país. Solo el cobre concentra el 52 % de las exportaciones mineras, seguido del oro con un 27 % y el zinc con un 7 %. Con operaciones distribuidas en regiones como Arequipa, Moquegua, Ancash, Cajamarca y La Libertad — que conjuntamente representan más del 50 % de la producción nacional — la protección de estos activos no es opcional: es una necesidad estratégica de primer orden.

Los riesgos específicos que enfrenta el sector minero peruano son diversos y complejos. El hurto de mineral de alta ley (oro, cobre, zinc) desde las zonas de acopio o durante el transporte es uno de los problemas más costosos. Según estimaciones del sector, las mermas por sustracción pueden representar entre el 2 % y el 5 % de los costos operativos anuales de una operación mediana. Para una mina que procesa 10,000 toneladas por día, esto puede traducirse en pérdidas de varios millones de soles al año.

El robo de combustible diésel de la maquinaria pesada es otro vector de pérdida frecuente. Las operaciones mineras consumen decenas de miles de galones de diésel mensualmente para alimentar camiones de acarreo, excavadoras y perforadoras. Sin un sistema de control de combustible integrado con vigilancia, las mermas por sustracción pueden alcanzar el 8-12 % del consumo total.

Los conflictos socioambientales representan un riesgo operacional que puede paralizar completamente una operación. Bloqueos de vías de acceso, invasiones de terreno y protestas contra actividades extractivas requieren un manejo profesional que combine inteligencia preventiva, protocolos de diálogo y capacidad de respuesta coordinada con las autoridades. Una empresa de seguridad especializada en el sector minero aporta experiencia directa en gestión de estos escenarios.

El marco legal peruano para servicios de seguridad privada está regulado por SUCAMEC (Superintendencia Nacional de Control de Servicios de Seguridad, Armas, Municiones y Explosivos de Uso Civil), entidad adscrita al Ministerio del Interior. La normativa vigente se basa en el Decreto Legislativo 1213, que reemplazó a la anterior Ley 28879 (Ley de Servicios de Seguridad Privada). El D.L. 1213 integra servicios de custodia de bienes controlados y seguridad en eventos dentro del ámbito de SUCAMEC, y otorga a la superintendencia facultades plenas de supervisión y sanción — algo que la ley anterior no contemplaba.

El reglamento de implementación del D.L. 1213 fue aprobado mediante Decreto Supremo N.° 005-2023-IN, vigente desde el 13 de mayo de 2023. Este reglamento fortalece la capacidad fiscalizadora de SUCAMEC y establece requisitos específicos para las empresas de seguridad privada que operan en sectores de alto riesgo como la minería. Esto incluye certificaciones especiales para los agentes de seguridad, protocolos obligatorios de coordinación con la Policía Nacional del Perú (PNP), y cumplimiento de estándares de equipamiento y formación.

Los requisitos de SUCAMEC para empresas de seguridad incluyen: autorización de funcionamiento vigente, registro de todos los agentes con sus respectivas credenciales, planes de seguridad documentados para cada operación, pólizas de seguro de responsabilidad civil, y reportes periódicos de incidentes. Las sanciones por operar sin autorización o incumplir requisitos pueden incluir multas de hasta 50 UIT, suspensión temporal y cancelación definitiva de la licencia.

El retorno de inversión (ROI) de contratar seguridad privada especializada se materializa en múltiples dimensiones. La reducción directa de pérdidas por hurto es la más cuantificable: operaciones que implementan seguridad integral reportan reducciones del 70-90 % en mermas de mineral y combustible dentro de los primeros seis meses. Pero el ROI también incluye la continuidad operativa (cada día de paralización por conflicto social cuesta cientos de miles de dólares), la protección de la reputación corporativa (incidentes de seguridad impactan directamente en el precio de las acciones de empresas listadas en bolsa) y el cumplimiento de estándares ESG (Environmental, Social and Governance) que los inversionistas internacionales exigen cada vez con mayor rigor.

Una empresa de seguridad especializada como ADS Security aporta valor diferencial frente a alternativas genéricas. Nuestros agentes pasan por entrenamiento específico para operaciones en altura superior a 4,500 msnm, incluyendo aclimatación progresiva y manejo de mal agudo de montaña. Conocemos el marco legal minero peruano en profundidad y mantenemos coordinación permanente con SUCAMEC, la PNP y las Fuerzas Armadas. Nuestra tecnología de vigilancia — drones DJI Matrice con visión térmica, centros CCTV con analítica de video IA y control de accesos biométrico — está específicamente adaptada a las condiciones topográficas y climáticas de los yacimientos andinos.

La decisión de invertir en seguridad privada especializada no es un gasto: es una inversión en la sostenibilidad y rentabilidad de la operación minera.`,
    coverImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&q=80',
    category: 'Seguridad Minera',
    tags: ['seguridad privada minería Perú', 'SUCAMEC', 'Decreto Legislativo 1213', 'riesgos mineros', 'ROI seguridad', 'normativa seguridad privada', 'conflictos socioambientales', 'Ley 28879'],
    publishedAt: '2025-11-10',
    readTime: '18 min',
    author: { name: 'Cap. (r) Roberto Águila', role: 'Gerente General' },
    relatedPosts: ['blog-005', 'blog-001'],
    metaDescription: '¿Por qué las empresas mineras en Perú necesitan seguridad privada? Marco legal SUCAMEC (D.L. 1213), estadísticas del sector minero, riesgos operativos reales y ROI demostrado de la seguridad especializada.',
  },

  // ─────────────────────────────────────────────
  // ARTÍCULO 4 — Centro de Control CCTV con IA
  // ─────────────────────────────────────────────
  {
    id: 'blog-004',
    slug: 'centro-control-cctv-inteligencia-artificial-vigilancia',
    title: 'Centro de Control CCTV con Inteligencia Artificial: Vigilancia Predictiva para Minería e Industria',
    excerpt: 'Guía técnica sobre centros de monitoreo CCTV con IA: software Dahua DSS Pro V8, analítica de video, reconocimiento facial, ANPR y detección de intrusión perimetral. Arquitectura, capacidades reales y escalabilidad.',
    body: `Los centros de control de circuito cerrado de televisión (CCTV) han experimentado una transformación radical en la última década. Lo que antes era una sala con monitores donde operadores humanos intentaban vigilar decenas de cámaras simultáneamente — con tasas de atención sostenida que caen al 45 % después de solo 12 minutos según estudios de seguridad — se ha convertido en un centro de inteligencia operativa donde la inteligencia artificial realiza el monitoreo continuo y los operadores humanos gestionan las alertas verificadas.

La plataforma Dahua DSS Pro V8 (Digital Surveillance System Professional) es el software empresarial de gestión de video (VMS/CMS) que utilizamos en ADS Security. Según la documentación técnica de Dahua, DSS Pro V8 integra siete aplicaciones principales: Monitoring Center (visualización en vivo), Event Center (gestión de alarmas y eventos), DeepXplore (búsqueda inteligente de datos), Access Management (control de puertas e intercomunicadores de video), Maintenance Center (salud de la plataforma), Parking Lot (gestión de estacionamientos) y Intelligent Analysis (analítica de video IA).

La capacidad de escalado de DSS Pro V8 es significativa. Un solo servidor puede gestionar hasta 2,000 canales de video, 1,000 puertas de control de acceso y 400 TB de almacenamiento. En arquitecturas distribuidas, el sistema puede expandirse hasta 20,000 canales y 4 PB (petabytes) de almacenamiento, suficiente para las operaciones mineras más grandes del país.

Las funciones de analítica de video con IA incluyen capacidades que marcan la diferencia en seguridad operativa real. La detección de intrusión perimetral utiliza líneas virtuales configurables (tripwires) y zonas de exclusión que generan alertas automáticas cuando una persona o vehículo cruza un límite definido. A diferencia de los sensores de movimiento tradicionales que disparan alarmas con animales, cambios de iluminación o movimiento de vegetación, los algoritmos de IA distinguen entre personas, vehículos y otros objetos con una precisión que supera el 95 % en condiciones operativas reales.

El reconocimiento facial integrado permite crear bases de datos de personal autorizado (listas blancas) y de individuos con acceso prohibido (listas negras). Cuando una cámara detecta un rostro que coincide con una entrada de lista negra — o que no coincide con ninguna entrada de lista blanca en una zona restringida — se genera una alerta inmediata con captura fotográfica, ubicación y marca temporal. Esta funcionalidad es particularmente valiosa en operaciones con múltiples turnos y alto volumen de contratistas.

El sistema ANPR (Automatic Number Plate Recognition) identifica y registra las placas de todos los vehículos que ingresan y salen de la operación. Esto permite controlar el flujo vehicular, detectar vehículos no autorizados y generar registros de trazabilidad que son fundamentales para la investigación de incidentes de sustracción de mineral o combustible.

El análisis de comportamiento anómalo va un paso más allá. Mediante machine learning, el sistema establece patrones normales de actividad para cada zona y franja horaria, y detecta automáticamente desviaciones. Puede identificar cuándo un vehículo se detiene en una zona donde normalmente no hay paradas, cuándo una persona permanece más tiempo del habitual cerca de un activo crítico, o cuándo se detecta movimiento en horarios donde no debería haber actividad.

La integración CCTV-drones es donde la tecnología realmente converge. Cuando el sistema de analítica detecta una alarma de alta prioridad, puede activar automáticamente el despegue de un drone DJI desde una estación DJI Dock 2 para verificar visualmente el incidente. El operador recibe simultáneamente la imagen de la cámara fija y el feed en vivo del drone, permitiendo evaluar la situación en tiempo real con múltiples ángulos y confirmando si se trata de una amenaza real o un falso positivo. Este flujo de trabajo automatizado reduce dramáticamente los tiempos de respuesta.

La arquitectura de un centro de control profesional requiere redundancia en todos los niveles. Esto incluye servidores en configuración de alta disponibilidad (failover automático), almacenamiento RAID para protección contra fallas de disco, alimentación eléctrica ininterrumpida (UPS) con respaldo de generador, enlaces de comunicación redundantes (fibra óptica + enlace satelital de respaldo) y climatización controlada para mantener los equipos en temperatura óptima.

DSS Pro V8 soporta el protocolo ONVIF, lo que permite integrar cámaras de terceros además del ecosistema Dahua. Esto es relevante cuando el cliente ya tiene infraestructura de videovigilancia instalada y desea migrar gradualmente a una solución más avanzada sin reemplazar todo el hardware existente.

Los videomuros (video walls) configurables permiten mostrar diseños de cámaras programados, con rotación automática de canales y visualización de mapas georeferenciados que muestran la ubicación de cada cámara y su campo de visión sobre un plano del sitio. Los operadores pueden hacer drill-down desde el mapa general hasta la vista en vivo de cualquier cámara con un solo clic.

La grabación continua en calidad HD genera un volumen considerable de datos. Para una operación con 100 cámaras IP a 4 MP grabando 24/7, se requieren aproximadamente 30-40 TB de almacenamiento por mes de retención. DSS Pro V8 optimiza esto mediante grabación inteligente que aumenta la calidad y framerate solo cuando detecta actividad, reduciendo el almacenamiento necesario hasta en un 50 % sin comprometer la evidencia.`,
    coverImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    category: 'Servicios',
    tags: ['CCTV inteligencia artificial', 'Dahua DSS Pro V8', 'analítica video IA', 'reconocimiento facial', 'ANPR', 'detección intrusión perimetral', 'centro monitoreo', 'videovigilancia minería'],
    publishedAt: '2025-10-22',
    readTime: '17 min',
    author: { name: 'Ing. Luis Paredes', role: 'Jefe de Tecnología' },
    relatedPosts: ['blog-001', 'blog-006'],
    metaDescription: 'Guía completa de centros de control CCTV con inteligencia artificial para minería. Software Dahua DSS Pro V8, analítica de video, reconocimiento facial, ANPR, detección de intrusión y arquitectura de centros de monitoreo.',
  },

  // ─────────────────────────────────────────────
  // ARTÍCULO 5 — Seguridad Patrimonial en Altura
  // ─────────────────────────────────────────────
  {
    id: 'blog-005',
    slug: 'seguridad-patrimonial-mineria-operaciones-altura-peru',
    title: 'Seguridad Patrimonial en Minería de Altura: Protocolos para Operaciones sobre 4,500 msnm en Perú',
    excerpt: 'Protocolos especializados para seguridad patrimonial en minas de altura en los Andes peruanos. Mal agudo de montaña (MAM), entrenamiento de agentes, equipamiento para temperaturas extremas y logística operativa sobre los 4,500 msnm.',
    body: `Las operaciones mineras en los Andes peruanos se desarrollan en algunas de las condiciones más extremas del planeta. Minas como Yanacocha en Cajamarca (la mayor mina de oro de Sudamérica) operan a altitudes que superan los 4,000 msnm, mientras que numerosas operaciones en La Libertad, Ancash y Puno se ubican por encima de los 4,500 metros sobre el nivel del mar. A estas altitudes, las condiciones ambientales imponen desafíos únicos a la seguridad patrimonial que las empresas de vigilancia convencionales simplemente no están preparadas para enfrentar.

El mal agudo de montaña (MAM) es la principal amenaza fisiológica para el personal de seguridad que opera en altura. Según la literatura médica (StatPearls/NCBI), los síntomas del MAM son raros por debajo de los 2,438 metros (8,000 pies), pero la incidencia alcanza aproximadamente el 20 % tras un ascenso rápido a 2,500 metros, y se eleva al 40 % a 3,000 metros. Por encima de los 3,352 metros (11,000 pies), el MAM es prácticamente universal sin aclimatación previa adecuada. Los síntomas incluyen cefalea intensa (el síntoma más frecuente y temprano), náuseas, vómitos, pérdida de apetito, fatiga extrema incluso en reposo, mareo y alteraciones del sueño. Los síntomas típicamente aparecen entre 6 y 12 horas después del ascenso.

Las formas graves del mal de altura incluyen el edema pulmonar de altura (HAPE, High Altitude Pulmonary Edema) y el edema cerebral de altura (HACE, High Altitude Cerebral Edema), que generalmente aparecen entre 2 y 5 días después del ascenso y constituyen emergencias médicas potencialmente mortales que requieren descenso inmediato y tratamiento especializado.

El proceso de selección de agentes para operaciones de altura en ADS Security incorpora evaluación médica especializada en medicina de altitud que incluye espirometría, electrocardiograma de esfuerzo, hemograma completo con medición de hemoglobina (buscando adaptación fisiológica a la hipoxia) y evaluación de la función renal. Se prefiere personal originario de zonas altoandinas que ya posee adaptación fisiológica crónica a la hipoxia, manifestada en mayor concentración de hemoglobina, mayor capacidad pulmonar y mejor eficiencia cardiovascular.

El programa de aclimatación sigue un protocolo escalonado de ascenso gradual. Los agentes nuevos permanecen 48 horas a altitudes intermedias (2,500-3,000 msnm) antes de ascender a la cota final de operación. Durante este período se monitorean signos vitales — saturación de oxígeno (SpO2), frecuencia cardíaca y presión arterial — y se administra acetazolamida profiláctica según indicación médica. Solo los agentes que mantienen SpO2 > 85 % en reposo son autorizados para ascender al siguiente nivel.

Los turnos de trabajo siguen un régimen de rotación diseñado para prevenir fatiga crónica y mantener la capacidad operativa. El esquema estándar es de 14 días de trabajo continuo en sitio seguidos de 7 días de descanso en zona de menor altitud. Cada jornada de trabajo no excede las 12 horas, con pausas obligatorias de hidratación cada 2 horas. La alimentación es hipercalórica (3,500-4,000 kcal/día) para compensar el mayor gasto energético que demanda el organismo en condiciones de hipoxia y frío extremo.

El equipamiento de los agentes debe soportar condiciones de frío extremo (temperaturas nocturnas que pueden descender a -15 °C e incluso -20 °C), radiación ultravioleta intensa (el índice UV a 4,500 msnm puede superar 14, clasificado como "extremo" por la OMS), vientos sostenidos que frecuentemente superan los 60 km/h con ráfagas de más de 80 km/h, y terreno irregular con pendientes pronunciadas. Cada agente está dotado de vestimenta térmica multicapa con membrana impermeable y cortaviento, botas de alta montaña con suela técnica, protección solar categoría extrema (UV400), gafas de protección contra viento y nieve, y guantes técnicos que permiten manipular equipos electrónicos sin perder destreza.

El sistema de comunicaciones es crítico en entornos donde la cobertura celular es inexistente o extremadamente limitada. Cada agente porta una radio VHF/UHF con alcance mínimo de 10 km en línea de vista y capacidad de operación en temperaturas bajo cero. El sistema base incluye repetidoras estratégicamente ubicadas en puntos altos para garantizar cobertura en valles y quebradas. Como respaldo, se dispone de comunicación satelital Iridium o Globalstar para emergencias que requieren coordinación con centros médicos o fuerzas del orden fuera del área de operación.

Los protocolos de vigilancia se adaptan dinámicamente a las condiciones meteorológicas. Las rondas perimetrales se planifican con rutas alternativas que consideran puntos de refugio cada 500 metros. En condiciones de neblina densa (visibilidad < 50 metros), nevada activa o vientos superiores a 70 km/h, se suspenden las rondas a pie y se activa la vigilancia perimetral mediante sensores térmicos fijos y drones cuando las condiciones de viento lo permiten (el DJI Matrice 300 RTK opera hasta 54 km/h de viento).

Los vehículos asignados a operaciones de altura son 4x4 con motor diésel turboalimentado (el turbo compensa parcialmente la pérdida de potencia por la menor densidad del aire, que a 4,500 msnm es aproximadamente un 40 % menor que a nivel del mar). Cada vehículo cuenta con kit de emergencia que incluye oxígeno medicinal portátil, camilla rígida, equipo de inmovilización cervical y desfibrilador externo automático (DEA). Los conductores reciben entrenamiento específico en conducción en terreno irregular y condiciones de baja adherencia por hielo o lodo.

La logística de abastecimiento a campamentos de seguridad en altura requiere planificación meticulosa. Se mantienen stocks de reserva para 72 horas de operación autónoma en caso de que las vías de acceso queden bloqueadas por deslizamientos, nevadas o conflictos sociales. Esto incluye alimentos no perecederos, agua, combustible, baterías, medicamentos esenciales y repuestos para equipos de comunicación.

La evacuación médica (MEDEVAC) está protocolizada con tres niveles de respuesta: evacuación terrestre al centro médico más cercano (tópico de mina o posta médica), evacuación aérea mediante helicóptero para emergencias graves cuando las condiciones meteorológicas lo permiten, y estabilización in situ con soporte de oxígeno y cámara hiperbárica portátil cuando el descenso inmediato no es posible.`,
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    category: 'Seguridad Minera',
    tags: ['seguridad patrimonial minería altura', 'mal agudo de montaña', 'operaciones 4500 msnm', 'Andes peruanos', 'aclimatación altitud', 'Yanacocha', 'HAPE HACE', 'protocolos seguridad altura'],
    publishedAt: '2025-10-05',
    readTime: '20 min',
    author: { name: 'Cap. (r) Roberto Águila', role: 'Gerente General' },
    relatedPosts: ['blog-003', 'blog-006'],
    metaDescription: 'Protocolos de seguridad patrimonial para minería de altura en Perú (4,500+ msnm). Mal agudo de montaña (MAM), aclimatación, equipamiento, comunicaciones y MEDEVAC. Guía basada en experiencia real en Yanacocha, Cajamarca y La Libertad.',
  },

  // ─────────────────────────────────────────────
  // ARTÍCULO 6 — Control de Accesos Biométrico
  // ─────────────────────────────────────────────
  {
    id: 'blog-006',
    slug: 'control-accesos-biometrico-instalaciones-criticas',
    title: 'Control de Accesos Biométrico en Instalaciones Mineras: Tecnología, Implementación y Normativa',
    excerpt: 'Guía técnica sobre sistemas biométricos para minería e industria: reconocimiento facial 3D, huella dactilar, torniquetes IP65, integración con CCTV y trazabilidad completa. Normativa peruana y beneficios operativos demostrados.',
    body: `El control de accesos es la primera línea de defensa en cualquier instalación de seguridad crítica. En el contexto de operaciones mineras e industriales en Perú, donde el volumen de personal puede superar las 2,000 personas por turno entre empleados directos, contratistas y proveedores, un sistema manual basado en credenciales físicas o listas impresas es una vulnerabilidad inaceptable. Los sistemas biométricos eliminan el factor de error humano y la posibilidad de suplantación de identidad, proporcionando un control de acceso verificable, auditable y automatizado.

La biometría aplicada al control de accesos utiliza características físicas únicas e intransferibles para identificar a cada individuo. Los tres métodos biométricos más utilizados en entornos industriales son el reconocimiento facial, la lectura de huella dactilar y el reconocimiento de iris. Cada uno tiene fortalezas y limitaciones que determinan su idoneidad según el entorno de instalación.

El reconocimiento facial 3D es la tecnología que mejor se adapta a entornos mineros donde los trabajadores frecuentemente llevan las manos sucias, usan guantes o tienen huellas dactilares deterioradas por el trabajo manual. Las cámaras de reconocimiento facial de última generación utilizan proyección de luz infrarroja estructurada para crear un mapa tridimensional del rostro que es resistente a variaciones de iluminación, ángulo de vista y uso parcial de elementos como cascos o gafas de seguridad. Los terminales actuales pueden realizar la autenticación en menos de 0.3 segundos con una tasa de falso rechazo (FRR) inferior al 0.1 % y una tasa de falsa aceptación (FAR) inferior al 0.001 %.

La lectura de huella dactilar sigue siendo un complemento valioso, especialmente en puertas de acceso a zonas de alta seguridad como almacenes de explosivos (polvorines), salas de servidores o áreas de procesamiento de mineral de alta ley. Los sensores capacitivos modernos con tecnología de lectura viva (liveness detection) pueden distinguir entre un dedo real y una réplica de silicona o una impresión en papel, eliminando los ataques de spoofing más comunes.

En muchas implementaciones de seguridad crítica se utiliza autenticación multifactor: reconocimiento facial + huella dactilar + código PIN. La probabilidad de que un impostor supere los tres factores simultáneamente es estadísticamente insignificante, proporcionando un nivel de seguridad que supera con creces los requisitos de cualquier normativa vigente.

La integración del sistema biométrico con una plataforma de gestión centralizada es donde la solución adquiere verdadero valor operativo. Desde una consola central — que puede estar en el centro de control CCTV o incluso ser accesible remotamente — el administrador de seguridad puede: autorizar o revocar accesos individuales en tiempo real, programar restricciones de acceso por zona y franja horaria (un contratista de mantenimiento solo puede acceder al taller mecánico de lunes a viernes entre 7:00 y 18:00), crear perfiles de acceso grupales (operadores de mina, personal administrativo, visitas), y generar reportes de trazabilidad completa de cada movimiento de personal.

La trazabilidad es un componente crítico tanto para la seguridad operativa como para el cumplimiento normativo. Cada evento de acceso queda registrado en una base de datos con: identidad verificada del individuo (nombre, DNI, fotografía), marca temporal exacta (fecha, hora, minuto, segundo), punto de acceso (puerta, torniquete, barrera), sentido del movimiento (ingreso/salida), método de autenticación utilizado, y fotografía capturada en el momento del acceso. Estos registros se almacenan cifrados (AES-256) durante un período mínimo de 5 años y son accesibles para auditorías internas, investigaciones de incidentes y requerimientos judiciales.

Los equipos físicos de control de acceso — torniquetes, barreras vehiculares y puertas de esclusa — deben soportar las condiciones ambientales de sitios mineros. Los estándares de protección requeridos son IP65 como mínimo (protección total contra polvo y chorros de agua) para equipos exteriores, e IK10 (resistencia a impactos de 20 joules) para zonas de alto tráfico. Los mecanismos operan con temperaturas de -20 °C a 60 °C y cuentan con fuentes de alimentación con respaldo por baterías para operar durante cortes eléctricos.

Los torniquetes de cuerpo completo (full height) son la opción preferida para accesos principales de operaciones mineras. A diferencia de los torniquetes de media altura que pueden ser superados saltando, los de cuerpo completo (2.2-2.4 metros de altura) impiden físicamente el paso no autorizado. Se configuran en modo anti-passback: una vez que una persona registra ingreso, no puede volver a registrar ingreso sin haber registrado primero una salida, eliminando el problema de compartir credenciales.

Las barreras vehiculares se integran con lectores ANPR (Automatic Number Plate Recognition) que verifican automáticamente si la placa del vehículo está en la base de datos de vehículos autorizados. Para vehículos no registrados, el sistema detiene la barrera y notifica al operador del centro de control para verificación manual. Todo el flujo vehicular queda registrado con fotografías, placas, marca temporal y duración de permanencia.

La integración con el sistema CCTV (Dahua DSS Pro V8 u otros VMS) permite que cada evento de acceso se vincule automáticamente con las grabaciones de las cámaras instaladas en cada punto de control. Si se necesita investigar un incidente ocurrido a las 3:47 AM, el sistema permite localizar inmediatamente las grabaciones de todas las cámaras que cubren los accesos, junto con la identidad de todas las personas que ingresaron o salieron en ese horario.

Los beneficios cuantificables de implementar control de accesos biométrico en operaciones mineras incluyen: eliminación del problema de tarjetas compartidas o clonadas (que representaba hasta el 40 % de las brechas de seguridad en sistemas basados en tarjetas), reducción del fraude en control de asistencia (fichaje fantasma por parte de contratistas), control preciso de la cantidad de personas al interior de la operación en cualquier momento (dato crítico para evacuaciones de emergencia), y generación de evidencia legal admisible para investigaciones de incidentes.

La implementación de un sistema biométrico integral en una operación minera mediana (3-5 puntos de acceso peatonal + 2 vehiculares) puede completarse en 4-6 semanas, incluyendo obra civil, instalación de equipos, configuración de software, carga de base de datos biométrica y capacitación del personal de seguridad y administración.`,
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    category: 'Servicios',
    tags: ['control accesos biométrico', 'reconocimiento facial minería', 'torniquetes IP65', 'ANPR', 'trazabilidad accesos', 'seguridad instalaciones críticas', 'autenticación multifactor', 'huella dactilar industrial'],
    publishedAt: '2025-09-18',
    readTime: '19 min',
    author: { name: 'Ing. Luis Paredes', role: 'Jefe de Tecnología' },
    relatedPosts: ['blog-004', 'blog-003'],
    metaDescription: 'Control de accesos biométrico para minería e industria en Perú. Reconocimiento facial 3D, huella dactilar, torniquetes IP65, integración CCTV, ANPR, trazabilidad y beneficios operativos. Guía técnica completa de implementación.',
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedBlogPosts(postId: string): BlogPost[] {
  const post = blogPosts.find((p) => p.id === postId);
  if (!post) return [];
  return post.relatedPosts
    .map((id) => blogPosts.find((p) => p.id === id))
    .filter((p): p is BlogPost => p !== undefined);
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}
