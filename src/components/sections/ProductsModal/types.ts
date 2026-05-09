export interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
}

export interface ProductsModalProps {
  isOpen: boolean
  onClose: () => void
  products: Product[]
  title: string
  subtitle: string
  ctaText: string
  closeButtonLabel?: string
}

export interface ProductCardProps {
  product: Product
}
