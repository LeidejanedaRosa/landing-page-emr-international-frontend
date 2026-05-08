import TMRImageAvif from '../assets/courses/TMR.avif'
import TMRImageJpg from '../assets/courses/TMR.jpg'
import TMRImageWebp from '../assets/courses/TMR.webp'
import TMRPdf from '../assets/courses/TMR_Spec_Sheet.pdf'
import WECPdf from '../assets/courses/WEC_Spec_Sheet.pdf'
import WMRImageAvif from '../assets/courses/WMR.avif'
import WMRImageJpg from '../assets/courses/WMR.jpg'
import WMRImageWebp from '../assets/courses/WMR.webp'

export type CourseVariant = 'emergency' | 'wilderness'
export type CourseLevel = 'basic' | 'intermediate' | 'advanced'
export type EnrollmentStatus = 'open' | 'interest' | 'closed'

export interface CourseMetadata {
  certification: string
  location: string
}

export interface CourseLinks {
  details: string
  brochure: string
}

export interface CourseImages {
  avif?: string
  webp?: string
  jpg: string
  alt: string
}

export interface CourseLevelData {
  level: CourseLevel
  code: string
  name: string
  namePt: string
  duration: string
  immersivity: number
  difficulty: number
  skill: number
  description: string
  enrollmentStatus: EnrollmentStatus
  brochure?: string
}

export interface Course {
  id: string
  abbreviation: string
  title: string
  levels: CourseLevelData[]
  metadata: CourseMetadata
  links: CourseLinks
  images: CourseImages
  variant: CourseVariant
}

export const LEVEL_LABELS: Record<CourseLevel, string> = {
  basic: 'Básico',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
}

const courses: Course[] = [
  {
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
        description:
          'Planejado para indivíduos que necessitam de conhecimentos básicos em atendimento de emergência tática, aguardando suporte especializado.',
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
        description:
          'Elaborado para equipes que atuam em cenários táticos integrando protocolos TECC com ações de atendimento sob pressão.',
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
        description:
          'Formatado para operadores que trabalham em ambientes de alto risco, requerendo técnicas avançadas de medicina tática e extração.',
        enrollmentStatus: 'interest',
      },
    ],
    metadata: {
      certification: 'Certificação Internacional TMR',
      location: 'In-Company ou Sede EMR',
    },
    links: {
      details: '/treinamentos/tmr-tactical-medical-responder',
      brochure: TMRPdf,
    },
    images: {
      avif: TMRImageAvif,
      webp: TMRImageWebp,
      jpg: TMRImageJpg,
      alt: 'Tactical medical responder applying tourniquet during simulated combat training',
    },
    variant: 'emergency',
  },
  {
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
        description:
          'Planejado para indivíduos não profissionais que necessitam de condições mínimas para atendimento inicial, aguardando chegada do serviço especializado.',
        enrollmentStatus: 'open',
      },
      {
        level: 'intermediate',
        code: 'WEC:2',
        name: 'Rapid Response',
        namePt: 'Resposta Rápida',
        duration: '40 horas',
        immersivity: 5,
        difficulty: 7,
        skill: 7,
        description:
          'Elaborado para times de resgate que promovem serviços de emergência integrando ações de atendimento e evacuação com suporte de equipe profissional.',
        enrollmentStatus: 'interest',
      },
      {
        level: 'advanced',
        code: 'WEC:3',
        name: 'Technical Operation',
        namePt: 'Operação Técnica',
        duration: '60 horas',
        immersivity: 9,
        difficulty: 9,
        skill: 10,
        description:
          'Formatado para profissionais que trabalham em cenários intensos com ambientes de difícil acesso, onde requerem recursos técnicos, segurança sistêmica e complexidade.',
        enrollmentStatus: 'interest',
      },
    ],
    metadata: {
      certification: 'Certificação Internacional Wilderness',
      location: 'In-Company ou Sede EMR',
    },
    links: {
      details: '/treinamentos/wmr-wilderness-medical-responder',
      brochure: WECPdf,
    },
    images: {
      avif: WMRImageAvif,
      webp: WMRImageWebp,
      jpg: WMRImageJpg,
      alt: 'Wilderness rescuer performing first aid and patient transport in mountainous terrain',
    },
    variant: 'wilderness',
  },
]

export const getCourses = (): Course[] => [...courses]

export const getCourseById = (id: string): Course | undefined =>
  courses.find(course => course.id === id)

export const getCoursesByVariant = (variant: CourseVariant): Course[] =>
  courses.filter(course => course.variant === variant)
