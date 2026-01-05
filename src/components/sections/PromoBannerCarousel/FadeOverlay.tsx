import React from 'react'

type Position = 'left' | 'right'

interface FadeOverlayProps {
  position: Position
}

const positionStyles: Record<Position, string> = {
  left: 'left-0 bg-gradient-to-r',
  right: 'right-0 bg-gradient-to-l',
}

export const FadeOverlay: React.FC<FadeOverlayProps> = ({ position }) => {
  return (
    <div
      className={`absolute top-0 w-8 h-full from-white to-transparent pointer-events-none ${positionStyles[position]}`}
      aria-hidden='true'
    />
  )
}
