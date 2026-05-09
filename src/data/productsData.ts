import placeholderImage1 from '../assets/testimonials/corpo-de-bombeiros.jpg'
import placeholderImage2 from '../assets/testimonials/guia-turistico.jpg'
import { Product } from '../components/sections/ProductsModal/types'

export const productsData: Product[] = [
  {
    id: 'kit1',
    name: 'FAK-b (First Aid kit - Basic)',
    description:
      'Kit compacto e portátil com itens essenciais para atendimento de emergências básicas. Ideal para ambientes corporativos, eventos e uso individual.',
    price: 'Consulte',
    image: placeholderImage1,
  },
  {
    id: 'kit2',
    name: 'FRK-a (First Responder Kit - Advanced)',
    description:
      'Kit completo para primeiros socorristas com equipamentos avançados de suporte à vida. Desenvolvido para profissionais de emergência em campo.',
    price: 'Consulte',
    image: placeholderImage2,
  },
]

export const PRODUCTS_MODAL_CONFIG = {
  title: 'Adquira seu kit de emergência',
  subtitle: 'Equipamentos profissionais para seu dia a dia',
  ctaText: 'Falar com Especialista',
  whatsappMessage:
    'Olá! Tenho interesse nos equipamentos médicos. Gostaria de mais informações.',
}
