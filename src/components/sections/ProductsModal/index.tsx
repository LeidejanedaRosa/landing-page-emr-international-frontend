import React, { memo, useEffect, useRef } from 'react'

import { createPortal } from 'react-dom'

import FocusLock from 'react-focus-lock'

import { buildWhatsAppMessageUrl } from '../../../utils/whatsapp'
import { ProductCard } from './ProductCard'
import { ProductsModalProps } from './types'

interface ModalHeaderProps {
  title: string
  subtitle: string
  closeButtonLabel: string
  onClose: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  closeButtonLabel,
  onClose,
  closeButtonRef,
}) => (
  <div className='sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex items-start justify-between z-10'>
    <div className='flex-1 min-w-0'>
      <h2
        id='products-modal-title'
        className='text-xl md:text-2xl font-bold text-gray-900 mb-1'
      >
        {title}
      </h2>
      <p className='text-sm text-gray-600'>{subtitle}</p>
    </div>
    <button
      ref={closeButtonRef}
      onClick={onClose}
      className='p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 ml-2 bg-transparent border-0 cursor-pointer'
      aria-label={closeButtonLabel}
    >
      <svg
        className='w-6 h-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    </button>
  </div>
)

ModalHeader.displayName = 'ModalHeader'

interface WhatsAppButtonProps {
  ctaText: string
  whatsappMessage: string
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  ctaText,
  whatsappMessage,
}) => {
  const whatsappUrl = buildWhatsAppMessageUrl(whatsappMessage)

  return (
    <a
      href={whatsappUrl}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`${ctaText} (abre em nova janela)`}
      className='inline-flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors'
    >
      <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
      </svg>
      {ctaText}
    </a>
  )
}

WhatsAppButton.displayName = 'WhatsAppButton'

export const ProductsModal: React.FC<ProductsModalProps> = memo(
  ({
    isOpen,
    onClose,
    products,
    title = '',
    subtitle = '',
    ctaText = '',
    closeButtonLabel = 'Fechar modal',
  }) => {
    const previousActiveElement = useRef<Element | null>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
      if (isOpen) {
        previousActiveElement.current = document.activeElement
        document.body.style.overflow = 'hidden'

        const handleEscape = (e: KeyboardEvent) => {
          if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleEscape)

        return () => {
          document.body.style.overflow = 'unset'
          document.removeEventListener('keydown', handleEscape)

          if (
            previousActiveElement.current &&
            previousActiveElement.current instanceof HTMLElement
          ) {
            previousActiveElement.current.focus()
          }
        }
      }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const whatsappMessage =
      'Olá! Tenho interesse nos equipamentos médicos. Gostaria de mais informações.'

    return createPortal(
      <FocusLock returnFocus={false} autoFocus>
        <div
          className='fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50'
          onClick={onClose}
        >
          <div
            className='bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto'
            onClick={e => e.stopPropagation()}
            role='dialog'
            aria-modal='true'
            aria-labelledby='products-modal-title'
          >
            <ModalHeader
              title={title}
              subtitle={subtitle}
              closeButtonLabel={closeButtonLabel}
              onClose={onClose}
              closeButtonRef={closeButtonRef}
            />
            <div className='p-4 md:p-6'>
              <div className='flex flex-wrap gap-4 mb-6 [&>*]:flex-1 [&>*]:min-w-[240px]'>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <WhatsAppButton
                ctaText={ctaText}
                whatsappMessage={whatsappMessage}
              />
            </div>
          </div>
        </div>
      </FocusLock>,
      document.body
    )
  }
)

ProductsModal.displayName = 'ProductsModal'
