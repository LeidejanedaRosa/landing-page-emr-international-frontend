import type { Credential, InstructorInfo, Metric } from './types'

export const INSTRUCTOR_IMAGE_ALT =
  'Juan Regenerati, paramédico e instrutor tático, fardado com equipamento de segurança em ambiente operacional'

export const INSTRUCTOR_CAPTION =
  'Fotografia profissional de Juan Regenerati, instrutor principal da EMR Internacional, especializado em emergências médicas e resgate tático em ambientes de alto risco'

export const INSTRUCTOR_INFO: InstructorInfo = {
  name: 'Juan Regenerati',
  subtitle: 'EMR INTERNACIONAL',
  title: 'Instrutor e operador de emergências, certificado internacionalmente',
  description:
    ', com treinamento de elite para profissionais que salvam vidas em cenários de alto risco e ambientes austeros.',
  highlight:
    'especialista em APH Tático, protocolos TECC, Wilderness Medicine e formação de operadores táticos e operadores de emergência em áreas remotas',
}

export const OPERATIONAL_FORCES: Credential[] = [
  { id: 'cbm', label: 'Corpo de Bombeiros Militar' },
  { id: 'eb', label: 'Exército Brasileiro' },
  { id: 'fnsp', label: 'Força Nacional de Segurança Pública' },
]

export const INTERNATIONAL_CREDENTIALS: Credential[] = [
  { id: 'hsi', label: 'Health & Safety Institute (HSI)' },
  { id: 'acs', label: 'American College of Surgeons' },
  { id: 'arc', label: 'American Red Cross' },
]

export const ABOUT_METRICS: Metric[] = [
  {
    id: 'experience',
    value: '15+',
    label: 'Anos de Experiência',
    ariaLabel: 'Mais de 15 anos de experiência em emergências médicas',
    highlight: false,
  },
  {
    id: 'trained',
    value: '6000+',
    label: 'Profissionais Treinados',
    ariaLabel: 'Mais de 6000 profissionais capacitados',
    highlight: false,
  },
]
