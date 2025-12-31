import TMRImageJpg from '../assets/TMR.jpg'
import TMRPdf from '../assets/TMR_Spec_Sheet.pdf'
import WECPdf from '../assets/WEC_Spec_Sheet.pdf'
import WMRImageJpg from '../assets/WMR.jpg'

export type CourseVariant = 'emergency' | 'wilderness'

export interface CourseMetadata {
  duration: string
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

export interface Course {
  id: string
  abbreviation: string
  title: string
  description: string
  metadata: CourseMetadata
  links: CourseLinks
  images: CourseImages
  variant: CourseVariant
}

const courses: Course[] = [
  {
    id: 'tmr',
    abbreviation: 'TMR',
    title: 'Tactical Medical Responder - Operador de Emergência Tática',
    description:
      'Formação completa de Operadores de Emergência Tática em APH Tático e protocolos TECC. Curso avançado para operadores médicos táticos focado em operações de alto risco, ambientes hostis e cenários críticos. Desenvolva habilidades essenciais para salvar vidas sob pressão extrema com certificação internacional reconhecida.',
    metadata: {
      duration: '40 horas',
      certification: 'Certificação Internacional TMR',
      location: 'In-Company ou Sede EMR',
    },
    links: {
      details: '/cursos/tmr-tactical-medical-responder',
      brochure: TMRPdf,
    },
    images: {
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
    description:
      'Formação especializada em emergências em áreas remotas com certificação internacional. Curso de Wilderness Medicine para operadores de campo, guias de turismo de aventura e profissionais de resgate outdoor. Prepare-se para atuar em ambientes silvestres onde os recursos são limitados, o acesso é difícil e a estabilização prolongada é necessária.',
    metadata: {
      duration: '50 horas',
      certification: 'Certificação Internacional Wilderness',
      location: 'In-Company ou Sede EMR',
    },
    links: {
      details: '/cursos/wmr-wilderness-medical-responder',
      brochure: WECPdf,
    },
    images: {
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
