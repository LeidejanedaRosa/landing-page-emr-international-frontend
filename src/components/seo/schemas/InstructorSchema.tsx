import { JsonLdScript } from '../JsonLdScript'

const COMPANY_URL = 'https://www.emrinternational.com'

interface InstructorSchemaProps {
  name: string
  jobTitle: string
  description: string
  image?: string
  credentials?: string[]
  yearsOfExperience?: number
}

export function InstructorSchema({
  name,
  jobTitle,
  description,
  image,
  credentials = [],
  yearsOfExperience,
}: InstructorSchemaProps) {
  const instructorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person' as const,
    '@id': `${COMPANY_URL}/#instructor`,
    name,
    jobTitle,
    description,
    image: image || `${COMPANY_URL}/assets/about/bg_about.jpg`,
    worksFor: {
      '@type': 'Organization' as const,
      '@id': `${COMPANY_URL}/#organization`,
      name: 'EMR International',
    },
    knowsAbout: [
      'APH Tático',
      'Protocolos TECC',
      'Wilderness Medicine',
      'Atendimento Pré-Hospitalar',
      'Medicina Tática',
      'Resgate em Áreas Remotas',
    ],
    hasCredential: credentials.map(credential => ({
      '@type': 'EducationalOccupationalCredential' as const,
      name: credential,
    })),
    ...(yearsOfExperience && {
      hasOccupation: {
        '@type': 'Occupation' as const,
        name: 'Instrutor de Emergências Médicas',
        occupationalCategory: 'Healthcare',
        experienceRequirements: `${yearsOfExperience}+ anos de experiência`,
      },
    }),
    sameAs: [
      'https://www.linkedin.com/in/juan-regenerati/',
      'https://www.instagram.com/emr_international/',
    ],
  }

  return <JsonLdScript data={instructorSchema} />
}
