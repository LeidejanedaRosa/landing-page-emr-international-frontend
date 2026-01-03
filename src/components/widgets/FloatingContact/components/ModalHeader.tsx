import React from 'react'

import { X } from 'lucide-react'

interface ModalHeaderProps {
  title: string
  subtitle: string
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
  onClose: () => void
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  closeButtonRef,
  onClose,
}) => {
  return (
    <div className='relative rounded-t-2xl bg-cta px-6 py-5 text-white'>
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className='absolute right-4 top-4 rounded-full p-1 text-white/80 transition-colors hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
        aria-label='Fechar modal'
      >
        <X className='h-5 w-5' />
      </button>

      <h2 id='schedule-call-title' className='text-xl font-bold'>
        {title}
      </h2>
      <p className='mt-1 text-sm text-white/80'>{subtitle}</p>
    </div>
  )
}

ModalHeader.displayName = 'ModalHeader'

export default React.memo(ModalHeader)
