import PetrobrasImage from '../assets/testimonials/cemiterio.jpg'
import CorpoDeBombeirosSPImage from '../assets/testimonials/corpo-de-bombeiros.jpg'
import ExercitoBrasileiroImage from '../assets/testimonials/guia-turistico.jpg'
import HospitalEinsteinImage from '../assets/testimonials/mergulhadores.jpg'
import SamuRJImage from '../assets/testimonials/mundaka-aventura.jpg'
import ValeImage from '../assets/testimonials/pousada.jpg'
import type { Testimonial } from '../components/sections/Testimonials/types'

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    companyName: 'Petrobras',
    courseType: 'tatico',
    testimonialText:
      'O curso da EMR mudou minha visão sobre preparo tático. Me sinto confiante para agir em qualquer situação.',
    authorName: 'Carlos A.',
    authorRole: 'Bombeiro Civil',
    rating: 5,
    image: PetrobrasImage,
  },
  {
    id: 'testimonial-2',
    companyName: 'Vale',
    courseType: 'remoto',
    testimonialText:
      'Treinamento excepcional para áreas remotas. A equipe está muito mais preparada para emergências em campo.',
    authorName: 'Fernanda S.',
    authorRole: 'Coordenadora de Segurança',
    rating: 5,
    image: ValeImage,
  },
  {
    id: 'testimonial-3',
    companyName: 'SAMU-RJ',
    courseType: 'tatico',
    testimonialText:
      'Conteúdo prático e instrutores altamente qualificados. Recomendo para todos os profissionais de emergência.',
    authorName: 'Roberto M.',
    authorRole: 'Médico Socorrista',
    rating: 5,
    image: SamuRJImage,
  },
  {
    id: 'testimonial-4',
    companyName: 'Hospital Albert Einstein',
    courseType: 'tatico',
    testimonialText:
      'Formação completa que elevou o padrão de atendimento da nossa equipe de emergência.',
    authorName: 'Dra. Ana Paula L.',
    authorRole: 'Diretora de Emergência',
    rating: 5,
    image: HospitalEinsteinImage,
  },
  {
    id: 'testimonial-5',
    companyName: 'Corpo de Bombeiros SP',
    courseType: 'tatico',
    testimonialText:
      'Metodologia de ponta, alinhada com protocolos internacionais. Essencial para quem atua em situações críticas.',
    authorName: 'Tenente João C.',
    authorRole: 'Comandante de Operações',
    rating: 5,
    image: CorpoDeBombeirosSPImage,
  },
  {
    id: 'testimonial-6',
    companyName: 'Exército Brasileiro',
    courseType: 'remoto',
    testimonialText:
      'Preparação diferenciada para missões em ambientes hostis. Conhecimento que salva vidas.',
    authorName: 'Cap. Marcos R.',
    authorRole: 'Oficial de Saúde',
    rating: 5,
    image: ExercitoBrasileiroImage,
  },
]

export const getTestimonials = (): Testimonial[] => [...testimonials]
