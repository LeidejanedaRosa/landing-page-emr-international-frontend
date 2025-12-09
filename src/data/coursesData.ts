import TMRImageJpg from '../assets/TMR.jpg'
// @ts-expect-error - vite-imagetools directives
import TMRImageAvif from '../assets/TMR.jpg?format=avif&w=640;768;1024&as=srcset'
// @ts-expect-error - vite-imagetools directives
import TMRImageWebp from '../assets/TMR.jpg?format=webp&w=640;768;1024&as=srcset'
import TMRPdf from '../assets/TMR_Spec_Sheet.pdf'
import WECPdf from '../assets/WEC_Spec_Sheet.pdf'
import WMRImageJpg from '../assets/WMR.jpg'
// @ts-expect-error - vite-imagetools directives
import WMRImageAvif from '../assets/WMR.jpg?format=avif&w=640;768;1024&as=srcset'
// @ts-expect-error - vite-imagetools directives
import WMRImageWebp from '../assets/WMR.jpg?format=webp&w=640;768;1024&as=srcset'

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
  avif: string
  webp: string
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
    title: 'Tactical Medical Rescue',
    description:
      'Curso avançado de resgate tático focado em operações de alto risco e ambientes hostis. Desenvolva habilidades críticas para salvar vidas sob pressão extrema em cenários de combate e operações táticas.',
    metadata: {
      duration: '40 horas',
      certification: 'Certificação Internacional',
      location: 'In-Company ou Sede EMR',
    },
    links: {
      details: '/cursos/tmr-tactical-medical-rescue',
      brochure: TMRPdf,
    },
    images: {
      avif: TMRImageAvif,
      webp: TMRImageWebp,
      jpg: TMRImageJpg,
      alt: 'Operador tático aplicando torniquete em ambiente de combate simulado durante treinamento do curso TMR',
    },
    variant: 'emergency',
  },
  {
    id: 'wmr',
    abbreviation: 'WMR',
    title: 'Wilderness Medical Rescue',
    description:
      'Especialização em resgate em áreas remotas e ambientes selvagens. Prepare-se para atuar onde os recursos são limitados, o acesso é difícil e a estabilização prolongada é necessária.',
    metadata: {
      duration: '50 horas',
      certification: 'Certificação NAEMT',
      location: 'In-Company ou Sede EMR',
    },
    links: {
      details: '/cursos/wmr-wilderness-medical-rescue',
      brochure: WECPdf,
    },
    images: {
      avif: WMRImageAvif,
      webp: WMRImageWebp,
      jpg: WMRImageJpg,
      alt: 'Equipe de resgate realizando transporte de vítima em terreno montanhoso durante treinamento do curso WMR',
    },
    variant: 'wilderness',
  },
]

export const getCourses = (): Course[] => [...courses]

export const getCourseById = (id: string): Course | undefined =>
  courses.find(course => course.id === id)

export const getCoursesByVariant = (variant: CourseVariant): Course[] =>
  courses.filter(course => course.variant === variant)
