import CemiterioJpg from '../assets/testimonials/cemiterio.jpg'
// @ts-expect-error - vite-imagetools directives
import CemiterioAvif from '../assets/testimonials/cemiterio.jpg?format=avif&w=640;768;1024&as=srcset'
// @ts-expect-error - vite-imagetools directives
import CemiterioWebp from '../assets/testimonials/cemiterio.jpg?format=webp&w=640;768;1024&as=srcset'
import CorpoDeBombeirosJpg from '../assets/testimonials/corpo-de-bombeiros.jpg'
// @ts-expect-error - vite-imagetools directives
import CorpoDeBombeirosAvif from '../assets/testimonials/corpo-de-bombeiros.jpg?format=avif&w=640;768;1024&as=srcset'
// @ts-expect-error - vite-imagetools directives
import CorpoDeBombeirosWebp from '../assets/testimonials/corpo-de-bombeiros.jpg?format=webp&w=640;768;1024&as=srcset'
import GuiaTuristicoJpg from '../assets/testimonials/guia-turistico.jpg'
// @ts-expect-error - vite-imagetools directives
import GuiaTuristicoAvif from '../assets/testimonials/guia-turistico.jpg?format=avif&w=640;768;1024&as=srcset'
// @ts-expect-error - vite-imagetools directives
import GuiaTuristicoWebp from '../assets/testimonials/guia-turistico.jpg?format=webp&w=640;768;1024&as=srcset'
import MergulhadoresJpg from '../assets/testimonials/mergulhadores.jpg'
// @ts-expect-error - vite-imagetools directives
import MergulhadoresAvif from '../assets/testimonials/mergulhadores.jpg?format=avif&w=640;768;1024&as=srcset'
// @ts-expect-error - vite-imagetools directives
import MergulhadoresWebp from '../assets/testimonials/mergulhadores.jpg?format=webp&w=640;768;1024&as=srcset'
import MundakaAventuraJpg from '../assets/testimonials/mundaka-aventura.jpg'
// @ts-expect-error - vite-imagetools directives
import MundakaAventuraAvif from '../assets/testimonials/mundaka-aventura.jpg?format=avif&w=640;768;1024&as=srcset'
// @ts-expect-error - vite-imagetools directives
import MundakaAventuraWebp from '../assets/testimonials/mundaka-aventura.jpg?format=webp&w=640;768;1024&as=srcset'
import PousadaJpg from '../assets/testimonials/pousada.jpg'
// @ts-expect-error - vite-imagetools directives
import PousadaAvif from '../assets/testimonials/pousada.jpg?format=avif&w=640;768;1024&as=srcset'
// @ts-expect-error - vite-imagetools directives
import PousadaWebp from '../assets/testimonials/pousada.jpg?format=webp&w=640;768;1024&as=srcset'
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
    images: {
      avif: CemiterioAvif,
      webp: CemiterioWebp,
      jpg: CemiterioJpg,
      alt: 'Foto de Carlos A.',
    },
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
    images: {
      avif: PousadaAvif,
      webp: PousadaWebp,
      jpg: PousadaJpg,
      alt: 'Foto de Fernanda S.',
    },
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
    images: {
      avif: MundakaAventuraAvif,
      webp: MundakaAventuraWebp,
      jpg: MundakaAventuraJpg,
      alt: 'Foto de Roberto M.',
    },
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
    images: {
      avif: MergulhadoresAvif,
      webp: MergulhadoresWebp,
      jpg: MergulhadoresJpg,
      alt: 'Foto de Dra. Ana Paula L.',
    },
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
    images: {
      avif: CorpoDeBombeirosAvif,
      webp: CorpoDeBombeirosWebp,
      jpg: CorpoDeBombeirosJpg,
      alt: 'Foto de Tenente João C.',
    },
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
    images: {
      avif: GuiaTuristicoAvif,
      webp: GuiaTuristicoWebp,
      jpg: GuiaTuristicoJpg,
      alt: 'Foto de Cap. Marcos R.',
    },
  },
]

export const getTestimonials = (): Testimonial[] => [...testimonials]
