import React, { memo } from 'react'

import { AccessibleButton } from '../../ui/AccessibleButton'
import { PauseIcon, PlayIcon } from '../../ui/icons'

interface BannerControlsProps {
  isPaused: boolean
  onToggle: () => void
  bannerId: string
}

export const BannerControls: React.FC<BannerControlsProps> = memo(
  ({ isPaused, onToggle, bannerId }) => {
    return (
      <div className='absolute top-1/2 right-2 -translate-y-1/2 z-10'>
        <AccessibleButton
          onClick={onToggle}
          className='p-1 text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 rounded'
          aria-label={
            isPaused
              ? 'Retomar animação do banner'
              : 'Pausar animação do banner'
          }
          aria-describedby={`${bannerId}-status`}
        >
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </AccessibleButton>
      </div>
    )
  }
)

BannerControls.displayName = 'BannerControls'
