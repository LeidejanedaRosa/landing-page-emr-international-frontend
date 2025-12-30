import placeholderImage1 from '../assets/testimonials/corpo-de-bombeiros.jpg'
import placeholderImage2 from '../assets/testimonials/guia-turistico.jpg'
import placeholderImage3 from '../assets/testimonials/mergulhadores.jpg'
import { Product } from '../components/sections/ProductsModal/types'

export const productsData: Product[] = [
  {
    id: 'tourniquete',
    name: 'Torniquete Tático',
    description: 'Torniquete de uso profissional para controle de hemorragias',
    price: 'Consulte',
    image: placeholderImage1,
  },
  {
    id: 'hemostatic',
    name: 'Agente Hemostático',
    description: 'Agente para controle rápido de sangramento',
    price: 'Consulte',
    image: placeholderImage2,
  },
  {
    id: 'kit-ifak',
    name: 'Kit IFAK',
    description: 'Kit individual de primeiros socorros táticos',
    price: 'Consulte',
    image: placeholderImage3,
  },
]

export const PRODUCTS_MODAL_CONFIG = {
  title: 'Conheça Nossos Equipamentos',
  subtitle: 'Equipamentos profissionais para complementar seu treinamento',
  ctaText: 'Falar com Especialista',
  whatsappMessage:
    'Olá! Tenho interesse nos equipamentos médicos. Gostaria de mais informações.',
}
