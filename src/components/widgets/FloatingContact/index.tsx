import React, { useState } from 'react'

import FloatingButtons from './FloatingButtons'
import ScheduleCallModal from './ScheduleCallModal'
import { FloatingContactProps } from './types'

const FloatingContact: React.FC<FloatingContactProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <FloatingButtons onPhoneClick={() => setIsModalOpen(true)} />
      <ScheduleCallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

FloatingContact.displayName = 'FloatingContact'

export default React.memo(FloatingContact)
