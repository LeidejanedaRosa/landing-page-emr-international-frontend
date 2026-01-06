import type { Course } from '../../../data/coursesData'
import { JsonLdScript } from '../JsonLdScript'

const COMPANY_NAME = 'EMR Internacional'
const COMPANY_URL = 'https://www.emrinternacional.com'

interface CourseListSchemaProps {
  courses: Course[]
}

export function CourseListSchema({ courses }: CourseListSchemaProps) {
  const courseSchemas = courses.flatMap(course =>
    course.levels.map(level => ({
      '@type': 'Course' as const,
      '@id': `${COMPANY_URL}/#course-${course.id}-${level.level}`,
      name: `${course.title} - ${level.namePt}`,
      courseCode: level.code,
      description: level.description,
      provider: {
        '@type': 'Organization' as const,
        '@id': `${COMPANY_URL}/#organization`,
        name: COMPANY_NAME,
      },
      hasCourseInstance: {
        '@type': 'CourseInstance' as const,
        courseMode: 'Presencial',
        courseWorkload: level.duration,
        inLanguage: 'pt-BR',
      },
      educationalLevel:
        level.level === 'basic'
          ? 'Beginner'
          : level.level === 'intermediate'
            ? 'Intermediate'
            : 'Advanced',
      about:
        course.variant === 'emergency'
          ? 'Atendimento Pré-Hospitalar Tático'
          : 'Emergência em Áreas Remotas',
      teaches:
        course.variant === 'emergency'
          ? ['APH Tático', 'Protocolos TECC', 'Medicina Tática']
          : [
              'Wilderness Medicine',
              'Resgate em Áreas Remotas',
              'Primeiros Socorros',
            ],
      audience: {
        '@type': 'Audience' as const,
        audienceType:
          'Profissionais de emergência, bombeiros, militares e socorristas',
      },
      image: course.images.jpg,
      offers: {
        '@type': 'Offer' as const,
        category: course.metadata.certification,
        availability:
          level.enrollmentStatus === 'open'
            ? 'https://schema.org/InStock'
            : 'https://schema.org/PreOrder',
      },
    }))
  )

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList' as const,
    name: 'Cursos de Especialização EMR Internacional',
    description:
      'Lista de cursos de APH Tático e Emergência em Áreas Remotas oferecidos pela EMR Internacional',
    numberOfItems: courseSchemas.length,
    itemListElement: courseSchemas.map((course, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      item: course,
    })),
  }

  return <JsonLdScript data={itemListSchema} />
}
