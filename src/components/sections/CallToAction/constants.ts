import {
  Crosshair,
  Glasses,
  type LucideIcon,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'

export interface Feature {
  Icon: LucideIcon
  title: string
  description: string
}

export const features: Feature[] = [
  {
    Icon: Crosshair,
    title: 'REALÍSTICO',
    description: 'Treinamento baseado em situações reais.',
  },
  {
    Icon: Glasses,
    title: 'IMERSIVO',
    description: 'Ambientes que simulam pressão e imprevisibilidade.',
  },
  {
    Icon: ShieldCheck,
    title: 'OPERACIONAL',
    description: 'Técnicas aplicáveis sob pressão.',
  },
  {
    Icon: TrendingUp,
    title: 'PRÁTICO',
    description: 'Desenvolvimento de decisões que salvam vidas.',
  },
]

export const sideLabels: [string, string][] = [
  ['CENÁRIOS', 'CRÍTICOS'],
  ['PRESSÃO', 'OPERACIONAL'],
  ['DECISÕES', 'QUE SALVAM'],
  ['EVOLUÇÃO', 'CONTÍNUA'],
]

export const WHATSAPP_MESSAGE =
  'Olá! Gostaria de saber mais sobre os treinamentos da EMR International.'
