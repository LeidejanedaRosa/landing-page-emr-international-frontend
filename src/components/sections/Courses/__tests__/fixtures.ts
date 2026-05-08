import type { Course } from '../../../../data/coursesData'

export const mockEmergencyCourse: Course = {
  id: 'tmr',
  abbreviation: 'TMR',
  title: 'Tactical Medical Responder - Operador de Emergência Tática',
  levels: [
    {
      level: 'basic',
      code: 'TMR:1',
      name: 'First Response',
      namePt: 'Primeira Resposta',
      duration: '20 horas',
      immersivity: 3,
      difficulty: 4,
      skill: 5,
      description: 'Descrição do nível básico TMR.',
      enrollmentStatus: 'open',
    },
    {
      level: 'intermediate',
      code: 'TMR:2',
      name: 'Tactical Response',
      namePt: 'Resposta Tática',
      duration: '40 horas',
      immersivity: 5,
      difficulty: 7,
      skill: 7,
      description: 'Descrição do nível intermediário TMR.',
      enrollmentStatus: 'interest',
    },
    {
      level: 'advanced',
      code: 'TMR:3',
      name: 'Advanced Operations',
      namePt: 'Operações Avançadas',
      duration: '60 horas',
      immersivity: 9,
      difficulty: 9,
      skill: 10,
      description: 'Descrição do nível avançado TMR.',
      enrollmentStatus: 'interest',
    },
  ],
  metadata: {
    certification: 'Certificação Internacional TMR',
    location: 'In-Company ou Sede EMR',
  },
  links: {
    details: '/treinamentos/tmr',
    brochure: '/tmr.pdf',
  },
  images: {
    avif: 'tmr.avif',
    webp: 'tmr.webp',
    jpg: 'tmr.jpg',
    alt: 'Imagem do curso TMR para testes',
  },
  variant: 'emergency',
}

export const mockWildernessCourse: Course = {
  id: 'wmr',
  abbreviation: 'WMR',
  title:
    'Wilderness Medical Responder - Operador de Emergências em Áreas Remotas',
  levels: [
    {
      level: 'basic',
      code: 'WEC:1',
      name: 'First Aid',
      namePt: 'Primeiros Socorros',
      duration: '20 horas',
      immersivity: 3,
      difficulty: 4,
      skill: 5,
      description: 'Descrição do nível básico WMR.',
      enrollmentStatus: 'open',
    },
  ],
  metadata: {
    certification: 'Certificação Internacional Wilderness',
    location: 'In-Company ou Sede EMR',
  },
  links: {
    details: '/treinamentos/wmr',
    brochure: '/wmr.pdf',
  },
  images: {
    avif: 'wmr.avif',
    webp: 'wmr.webp',
    jpg: 'wmr.jpg',
    alt: 'Imagem do curso WMR para testes',
  },
  variant: 'wilderness',
}
