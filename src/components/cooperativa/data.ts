import jblLogo from "@/assets/clientes/jbl.svg";
import sephoraLogo from "@/assets/clientes/sephora.svg";
import bossLogo from "@/assets/clientes/boss.svg";
import herraduraLogo from "@/assets/clientes/herradura.svg";
import paniniLogo from "@/assets/clientes/panini.svg";
import penumbraLogo from "@/assets/clientes/penumbra.svg";
import jackDanielsLogo from "@/assets/clientes/jack-daniels.svg";
import coachLogo from "@/assets/clientes/coach.svg";
import femexfutLogo from "@/assets/clientes/femexfut.svg";
import pfchangsLogo from "@/assets/clientes/pfchangs.svg";
import visitCaliforniaLogo from "@/assets/clientes/visit-california.svg";

import jblCase from "@/assets/casos/jbl.png";
import elPalcoCase from "@/assets/casos/elpalco.png";
import coachCase from "@/assets/casos/coach.png";
import newMixCase from "@/assets/casos/newmix.png";
import jackDanielsCase from "@/assets/casos/jackdaniels.png";
import paniniCase from "@/assets/casos/panini.jpg";

import experientialVideo from "@/assets/servicios/experiential.mp4";
import influencerVideo from "@/assets/servicios/influencer.mp4";
import produccionVideo from "@/assets/servicios/produccion.mp4";

import heroIzquierda from "@/assets/hero/cover-izquierda.mp4";
import heroMedio from "@/assets/hero/cover-medio.mp4";
import heroDerecha from "@/assets/hero/cover-derecha.mp4";

import mesaTeal from "@/assets/equipo/mesa-teal.svg";
import sillaArribaTeal from "@/assets/equipo/silla-arriba-teal.svg";

export const heroVideos = { izquierda: heroIzquierda, medio: heroMedio, derecha: heroDerecha };

export const tier1Clients = [
  { name: "JBL", logo: jblLogo },
  { name: "Sephora", logo: sephoraLogo },
];

export const tier2Clients = [
  { name: "BOSS", logo: bossLogo },
  { name: "Herradura", logo: herraduraLogo },
  { name: "Panini", logo: paniniLogo },
  { name: "Penumbra", logo: penumbraLogo },
  { name: "Jack Daniels", logo: jackDanielsLogo },
  { name: "Coach", logo: coachLogo },
  { name: "FMF", logo: femexfutLogo },
  { name: "PF Changs", logo: pfchangsLogo },
  { name: "Visit California", logo: visitCaliforniaLogo },
];

export const services = [
  {
    number: "01",
    name: "EXPERIENTIAL\nMARKETING & BTL",
    quote:
      "\"El momento en que una persona toca, siente y vive una marca vale más que mil impresiones.\"",
    desc: "Diseñamos activaciones BTL, eventos de marca y experiencias inmersivas que crean conexión real entre marcas y personas.",
    tags: [
      "Activaciones en PDV",
      "Eventos corporativos",
      "Experiencias inmersivas",
      "Casos Exito",
    ],
    cta: "Ver activaciones →",
    video: experientialVideo,
  },
  {
    number: "02",
    name: "INFLUENCER\nMARKETING",
    quote: "\"Las personas no escuchan a las marcas. Escuchan a quienes admiran.\"",
    desc: "Conectamos marcas con los creadores correctos para generar conversación auténtica y alcance real.",
    tags: [],
    cta: "Conocer más →",
    video: influencerVideo,
  },
  {
    number: "03",
    name: "RELACIONES\nPÚBLICAS",
    quote: "\"Una marca que no se cuenta es una marca que no existe en la mente de nadie.\"",
    desc: "Gestionamos la narrativa de marca en medios y espacios de cultura para posicionarla donde importa.",
    tags: [],
    cta: "Conocer más →",
    video: produccionVideo,
  },
] as const;

export const cases = [
  {
    num: "01/06",
    client: "PANINI",
    image: paniniCase,
    serviceType: "La nostalgia mundialista convertida en el evento del año.",
    title: "Panini FIFA World Cup 2026 — Lanzamiento Oficial del Álbum",
    challenge:
      "Lanzar el álbum oficial de la FIFA World Cup 2026 de Panini con un evento que estuviera a la altura de lo que ese álbum representa culturalmente — no solo un producto coleccionable, sino un objeto que ha acompañado generaciones enteras. El evento no podía sentirse como una presentación de producto. Tenía que sentirse como una celebración.",
    solution:
      "Tomamos el Museo Diego Rivera Anahuacalli y lo convertimos en el escenario donde la nostalgia mundialista cobró vida. Con Hugo Sánchez, Marcel Ruiz y Borja presentes, y Tania Rincón como anfitriona, produjimos una noche donde el fútbol, el coleccionismo y la emoción de abrir un álbum se encontraron en un mismo lugar.",
    stats: [
      { value: "+200", label: "Personalidades, figuras públicas y medios presentes" },
    ],
  },
  {
    num: "02/06",
    client: "JBL",
    image: jblCase,
    serviceType: "Sonido que envuelve la ciudad.",
    title: "JBL Haunted Sound",
    challenge:
      "Posicionar la nueva línea de bocinas JBL en un entorno urbano saturado de ruido — y lograr que la experiencia del producto se sintiera antes de que alguien lo comprara.",
    solution:
      "Diseñamos una activación nocturna inmersiva donde el sonido fue el protagonista absoluto. Entre luces, máscaras y beats que retumbaban en cada rincón, construimos un escenario donde el usuario no escuchaba a JBL — lo vivía.",
    stats: [
      { value: "+15K", label: "Asistentes inmersos en la experiencia" },
      { value: "2.5M", label: "Alcance digital generado" },
    ],
  },
  {
    num: "03/06",
    client: "FEDERACIÓN MEXICANA DE FÚTBOL",
    image: elPalcoCase,
    serviceType: "La fiesta donde México jugó por el oro.",
    title: "El Palco",
    challenge:
      "Crear un espacio de activación que estuviera a la altura de la emoción histórica de ver a la Selección Mexicana competir por una medalla olímpica — sin que se sintiera como publicidad.",
    solution:
      "Convertimos El Palco en una auténtica fiesta futbolera: un espacio donde la emoción, la risa y la pasión se vivían en cada metro. Cada elemento fue diseñado para que el fan sintiera que este era su lugar, no un stand de marca.",
    stats: [
      { value: "+20K", label: "Aficionados impactados en el recinto" },
      { value: "4.9/5", label: "Rating de experiencia del evento" },
    ],
  },
  {
    num: "04/06",
    client: "COACH",
    image: coachCase,
    serviceType: "Convertimos una tienda en un destino navideño.",
    title: "Crea Tu Navidad Coach",
    challenge:
      "Transformar el punto de venta de Coach en una experiencia que capturara la esencia de la marca durante la temporada más competida del año — donde todas las marcas gritan y pocas logran ser recordadas.",
    solution:
      "Diseñamos cada rincón para contar una historia: la artesanía de Coach encontrándose con la alegría de las fiestas. El resultado fue un espacio que la gente no solo visitó — fotografió, compartió y recordó mucho después del 25 de diciembre.",
    stats: [
      { value: "+40%", label: "Incremento de tráfico en tienda vs. anterior" },
      { value: "2M+", label: "Impresiones orgánicas en redes" },
    ],
  },
  {
    num: "05/06",
    client: "NEW MIX",
    image: newMixCase,
    serviceType: "Llevamos la marca al centro de la cultura urbana.",
    title: "New Mix × Ozuna",
    challenge:
      "Conectar a New Mix con una audiencia joven y exigente en un contexto musical de alto perfil — donde la marca tenía que estar presente sin sentirse forzada ni fuera de lugar.",
    solution:
      "Diseñamos una activación de sampling y experiencia de marca que se integró de forma orgánica al ambiente del concierto. La presencia de New Mix no interrumpió la noche — la complementó, convirtiéndose en parte del recuerdo.",
    stats: [
      { value: "50K+", label: "Contactos directos con la marca" },
      { value: "+60%", label: "Incremento en recall de marca" },
    ],
  },
  {
    num: "06/06",
    client: "JACK DANIEL'S",
    image: jackDanielsCase,
    serviceType: "La barra se convirtió en el escenario más cool.",
    title: "Jack Daniel's × Flow Fest",
    challenge:
      "Diferenciar la presencia de Jack Daniel's en un festival donde docenas de marcas compiten por atención — y hacer que la barra fuera un momento, no un trámite.",
    solution:
      "Convertimos la barra de Jack en una zona de juego: cada tiro al blanco era un momento de adrenalina. La activación generó filas, risas y contenido espontáneo.",
    stats: [
      { value: "+8K", label: "Interacciones directas en activación" },
      { value: "95%", label: "Tasa de satisfacción del cliente" },
    ],
  },
] as const;

export type Chair = {
  id: string;
  side: "top" | "bottom" | "left";
  cx: number;
  role: string;
  members: { name: string; title: string }[];
};

export const chairs: Chair[] = [
  { id: "top0", side: "top", cx: 220, role: "Dirección Creativa", members: [
    { name: "[Nombre Apellido]", title: "Director Creativo" },
    { name: "[Nombre Apellido]", title: "Diseñador Sr." },
  ]},
  { id: "top1", side: "top", cx: 388, role: "Estrategia de Marca", members: [
    { name: "[Nombre Apellido]", title: "Brand Strategist" },
    { name: "[Nombre Apellido]", title: "Copywriter" },
  ]},
  { id: "top2", side: "top", cx: 556, role: "BTL & Producción", members: [
    { name: "[Nombre Apellido]", title: "Productor Ejecutivo" },
    { name: "[Nombre Apellido]", title: "Coord. de Producción" },
    { name: "[Nombre Apellido]", title: "Asistente de Producción" },
  ]},
  { id: "top3", side: "top", cx: 724, role: "Relaciones Públicas", members: [
    { name: "[Nombre Apellido]", title: "PR Manager" },
    { name: "[Nombre Apellido]", title: "PR Executive" },
  ]},
  { id: "top4", side: "top", cx: 892, role: "Fotografía & Video", members: [
    { name: "[Nombre Apellido]", title: "Fotógrafo" },
    { name: "[Nombre Apellido]", title: "Editor de Video" },
  ]},
  { id: "head", side: "left", cx: 134, role: "CEO · Cooperativa.", members: [
    { name: "[Nombre Apellido]", title: "CEO & Fundador" },
  ]},
  { id: "bot0", side: "bottom", cx: 220, role: "Influencer Marketing", members: [
    { name: "[Nombre Apellido]", title: "Influencer Manager" },
    { name: "[Nombre Apellido]", title: "Talent Coordinator" },
  ]},
  { id: "bot1", side: "bottom", cx: 388, role: "Diseño Gráfico", members: [
    { name: "[Nombre Apellido]", title: "Diseñador Gráfico" },
    { name: "[Nombre Apellido]", title: "Motion Designer" },
  ]},
  { id: "bot2", side: "bottom", cx: 556, role: "Community Manager", members: [
    { name: "[Nombre Apellido]", title: "Social Media Manager" },
    { name: "[Nombre Apellido]", title: "Content Creator" },
  ]},
  { id: "bot3", side: "bottom", cx: 724, role: "Coordinación", members: [
    { name: "[Nombre Apellido]", title: "Project Manager" },
    { name: "[Nombre Apellido]", title: "Coordinador de Eventos" },
  ]},
  { id: "bot4", side: "bottom", cx: 892, role: "Cuentas & Ventas", members: [
    { name: "[Nombre Apellido]", title: "Account Manager" },
    { name: "[Nombre Apellido]", title: "Business Development" },
  ]},
];

export const mesaAssets = { mesa: mesaTeal, silla: sillaArribaTeal };