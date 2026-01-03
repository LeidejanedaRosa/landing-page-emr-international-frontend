import React, { useCallback, useState } from 'react'

import FloatingButtons from './FloatingButtons'
import ScheduleCallModal from './ScheduleCallModal'
import { FloatingContactProps } from './types'

const FloatingContact: React.FC<FloatingContactProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      <FloatingButtons onPhoneClick={handleOpenModal} />
      <ScheduleCallModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

FloatingContact.displayName = 'FloatingContact'

export default React.memo(FloatingContact)
