import React from 'react'

import { createPortal } from 'react-dom'

import FocusLock from 'react-focus-lock'

import BusinessHoursInfo from './components/BusinessHoursInfo'
import ModalHeader from './components/ModalHeader'
import ScheduleCallForm from './components/ScheduleCallForm'
import { useModalAccessibility } from './hooks/useModalAccessibility'
import { useScheduleForm } from './hooks/useScheduleForm'
import { ScheduleCallModalProps } from './types'

const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { closeButtonRef } = useModalAccessibility(isOpen, onClose)
  const {
    formData,
    errors,
    popupBlockedError,
    handleSubmit,
    handleInputChange,
    handlePhoneChange,
  } = useScheduleForm(onClose)

  if (!isOpen) return null

  return createPortal(
    <FocusLock returnFocus={false} autoFocus>
      <div
        className='fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-4'
        onClick={onClose}
      >
        <div
          className='relative w-full max-w-md animate-[slideUp_0.3s_ease-out] rounded-2xl bg-white shadow-2xl'
          onClick={e => e.stopPropagation()}
          role='dialog'
          aria-modal='true'
          aria-labelledby='schedule-call-title'
        >
          <ModalHeader
            title='Agendar Ligação'
            subtitle='Informe seus dados e entraremos em contato'
            closeButtonRef={closeButtonRef}
            onClose={onClose}
          />

          <BusinessHoursInfo />

          {popupBlockedError && (
            <div
              className='mx-6 mb-4 rounded-lg border-2 border-error bg-error-50 p-4'
              role='alert'
              aria-live='assertive'
            >
              <p className='text-sm font-semibold text-error'>
                {popupBlockedError}
              </p>
            </div>
          )}

          <ScheduleCallForm
            formData={formData}
            errors={errors}
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
            onPhoneChange={handlePhoneChange}
          />
        </div>
      </div>
    </FocusLock>,
    document.body
  )
}

ScheduleCallModal.displayName = 'ScheduleCallModal'

export default React.memo(ScheduleCallModal)
