import CemiterioJpg from '../assets/testimonials/cemiterio.jpg'
import CorpoDeBombeirosJpg from '../assets/testimonials/corpo-de-bombeiros.jpg'
import GuiaTuristicoJpg from '../assets/testimonials/guia-turistico.jpg'
import MergulhadoresJpg from '../assets/testimonials/mergulhadores.jpg'
import MundakaAventuraJpg from '../assets/testimonials/mundaka-aventura.jpg'
import PousadaJpg from '../assets/testimonials/pousada.jpg'
import type { Testimonial } from '../components/sections/Testimonials/types'

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    variant: 'full',
    companyName: 'Petrobras',
    courseType: 'tatico',
    testimonialText:
      'O curso da EMR mudou minha visão sobre preparo tático. Me sinto confiante para agir em qualquer situação.',
    authorName: 'Carlos A.',
    authorRole: 'Bombeiro Civil',
    rating: 5,
    images: {
      jpg: CemiterioJpg,
      alt: 'Foto de Carlos A.',
    },
  },
  {
    id: 'testimonial-2',
    variant: 'full',
    companyName: 'Vale',
    courseType: 'remoto',
    testimonialText:
      'Treinamento excepcional para áreas remotas. A equipe está muito mais preparada para emergências em campo.',
    authorName: 'Fernanda S.',
    authorRole: 'Coordenadora de Segurança',
    rating: 5,
    images: {
      jpg: PousadaJpg,
      alt: 'Foto de Fernanda S.',
    },
  },
  {
    id: 'testimonial-3',
    variant: 'full',
    companyName: 'SAMU-RJ',
    courseType: 'tatico',
    testimonialText:
      'Conteúdo prático e instrutores altamente qualificados. Recomendo para todos os profissionais de emergência.',
    authorName: 'Roberto M.',
    authorRole: 'Médico Socorrista',
    rating: 5,
    images: {
      jpg: MundakaAventuraJpg,
      alt: 'Foto de Roberto M.',
    },
  },
  {
    id: 'testimonial-4',
    variant: 'full',
    companyName: 'Hospital Albert Einstein',
    courseType: 'tatico',
    testimonialText:
      'Formação completa que elevou o padrão de atendimento da nossa equipe de emergência.',
    authorName: 'Dra. Ana Paula L.',
    authorRole: 'Diretora de Emergência',
    rating: 5,
    images: {
      jpg: MergulhadoresJpg,
      alt: 'Foto de Dra. Ana Paula L.',
    },
  },
  {
    id: 'testimonial-5',
    variant: 'full',
    companyName: 'Corpo de Bombeiros SP',
    courseType: 'tatico',
    testimonialText:
      'Metodologia de ponta, alinhada com protocolos internacionais. Essencial para quem atua em situações críticas.',
    authorName: 'Tenente João C.',
    authorRole: 'Comandante de Operações',
    rating: 5,
    images: {
      jpg: CorpoDeBombeirosJpg,
      alt: 'Foto de Tenente João C.',
    },
  },
  {
    id: 'testimonial-6',
    variant: 'full',
    companyName: 'Exército Brasileiro',
    courseType: 'remoto',
    testimonialText:
      'Preparação diferenciada para missões em ambientes hostis. Conhecimento que salva vidas.',
    authorName: 'Cap. Marcos R.',
    authorRole: 'Oficial de Saúde',
    rating: 5,
    images: {
      jpg: GuiaTuristicoJpg,
      alt: 'Foto de Cap. Marcos R.',
    },
  },
  {
    id: 'testimonial-7',
    variant: 'text-only',
    courseType: 'tatico',
    testimonialText:
      'O treinamento tático da EMR foi transformador. A didática dos instrutores e o conteúdo prático me prepararam para situações reais de emergência.',
    authorName: 'Dra. Juliana Costa',
    authorRole: 'Médica Emergencista',
    rating: 5,
  },
  {
    id: 'testimonial-8',
    variant: 'image-only',
    courseType: 'remoto',
    companyName: 'Petrobras - Plataforma P-52',
    images: {
      jpg: MergulhadoresJpg,
      alt: 'Equipe de resgate da Petrobras em treinamento',
    },
  },
  {
    id: 'testimonial-9',
    variant: 'text-only',
    courseType: 'remoto',
    testimonialText:
      'Excelente capacitação para atendimento em áreas remotas. O conhecimento adquirido já salvou vidas em nossas operações de campo.',
    authorName: 'Ricardo Mendes',
    authorRole: 'Coordenador de Segurança - Mineração',
    rating: 5,
  },
  {
    id: 'testimonial-10',
    variant: 'image-only',
    courseType: 'tatico',
    companyName: 'SAMU - São Paulo',
    images: {
      jpg: CorpoDeBombeirosJpg,
      alt: 'Equipe do SAMU em treinamento tático',
    },
  },
]

export const getTestimonials = (): Testimonial[] => [...testimonials]
