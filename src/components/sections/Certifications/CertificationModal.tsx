import React, { memo, useEffect, useRef } from 'react'

import { createPortal } from 'react-dom'

import FocusLock from 'react-focus-lock'

interface CertificationModalProps {
  isOpen: boolean
  onClose: () => void
  name: string
  description: string
  year: string
  certifiedLabel?: string
  closeButtonLabel?: string
}

interface ModalHeaderProps {
  name: string
  year: string
  certifiedLabel: string
  closeButtonLabel: string
  onClose: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  name,
  year,
  certifiedLabel,
  closeButtonLabel,
  onClose,
  closeButtonRef,
}) => (
  <div className='sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex items-start justify-between z-10'>
    <div className='flex items-center gap-4 flex-1 min-w-0'>
      <div className='min-w-0 flex-1'>
        <h2
          id='modal-title'
          className='text-xl md:text-2xl font-bold text-black mb-1 break-words'
        >
          {name}
        </h2>
        <p className='text-sm text-gray-500'>
          {certifiedLabel} {year}
        </p>
      </div>
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

export const CertificationModal: React.FC<CertificationModalProps> = memo(
  ({
    isOpen,
    onClose,
    name,
    description,
    year,
    certifiedLabel = 'Credenciado',
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

    return createPortal(
      <FocusLock returnFocus={false} autoFocus>
        <div
          className='fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50'
          onClick={onClose}
        >
          <div
            className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'
            onClick={e => e.stopPropagation()}
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-title'
          >
            <ModalHeader
              name={name}
              year={year}
              certifiedLabel={certifiedLabel}
              closeButtonLabel={closeButtonLabel}
              onClose={onClose}
              closeButtonRef={closeButtonRef}
            />
            <div className='p-4 md:p-6'>
              <p className='text-gray-700 leading-relaxed whitespace-pre-line'>
                {description}
              </p>
            </div>
          </div>
        </div>
      </FocusLock>,
      document.body
    )
  }
)

CertificationModal.displayName = 'CertificationModal'
