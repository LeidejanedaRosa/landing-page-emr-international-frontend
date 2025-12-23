export const HERO_SECTION_ID = 'hero' as const
export const HERO_MAIN_TITLE_ID = 'hero-main-title' as const
export const COURSES_SECTION_ID = 'courses' as const

export const HERO_CONTENT = {
  seo: {
    title:
      'EMR Internacional - Formação de Operadores Médicos Táticos e Wilderness',
    description:
      'Cursos de APH Tático, TCCC/TECC e Emergências Remotas. Prepare-se para o inesperado com instrutores de elite.',
    contextDescription:
      'Seção principal com informações sobre cursos de resgate tático, atendimento pré-hospitalar e certificações internacionais.',
  },
  badge: {
    label: 'Certificação Internacional',
    ariaLabel: 'Selo de certificação internacional',
  },
  headline: {
    firstLine: 'O Imprevisível',
    highlightLine: 'Acontece.',
    thirdLine: 'VOCÊ ESTÁ REALMENTE PREPARADO?',
  },
  cta: {
    text: 'Ver Cursos de Elite',
    ariaLabel: 'Ver cursos de elite disponíveis',
  },
  visual: {
    alt: 'Operadores táticos em treinamento real de atendimento pré-hospitalar',
    ariaLabel: 'Imagem ilustrativa de treinamento tático',
    badge: {
      label: 'Treinamento Real',
      ariaLabel: 'Indicador de treinamento em ambiente real',
    },
  },
  socialProof: {
    students: '+ 6.000 Operadores formados',
    methodology: 'Metodologia Internacional',
    separator: '•',
  },
  about: {
    title: 'Sobre a EMR Internacional',
    description:
      'Somos referência em cursos de APH Tático, TECC, e sobrevivência. Prepare-se para o inesperado com instrutores de elite.',
  },
} as const

export const HERO_ANIMATION = {
  duration: {
    fadeIn: 300,
    hover: 700,
    shine: 500,
  },
  scroll: {
    behavior: 'smooth' as const,
  },
} as const

export const HERO_IMAGE = {
  loading: 'eager' as const,
  fetchPriority: 'high' as const,
  sizes: ['400w', '800w', '1200w', '1600w'],
  formats: ['avif', 'webp', 'jpg'] as const,
  quality: 85,
} as const
