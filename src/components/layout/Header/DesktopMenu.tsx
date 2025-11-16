import React from 'react'

import { AccessibleLink } from '../../ui/Accessibility'

interface DesktopMenuProps {
  currentSection?: string
}

const DesktopMenu: React.FC<DesktopMenuProps> = React.memo(
  ({ currentSection }) => (
    <div className='hidden md:flex space-x-8'>
      <AccessibleLink
        href='#sobre'
        variant='ghost'
        ariaCurrent={currentSection === 'sobre' ? 'page' : undefined}
      >
        Sobre
      </AccessibleLink>
      <AccessibleLink
        href='#cursos'
        variant='ghost'
        ariaCurrent={currentSection === 'cursos' ? 'page' : undefined}
      >
        Cursos
      </AccessibleLink>
      <AccessibleLink
        href='#depoimentos'
        variant='ghost'
        ariaCurrent={currentSection === 'depoimentos' ? 'page' : undefined}
      >
        Depoimentos
      </AccessibleLink>
      <AccessibleLink
        href='#resultados'
        variant='ghost'
        ariaCurrent={currentSection === 'resultados' ? 'page' : undefined}
      >
        Resultados
      </AccessibleLink>
      <AccessibleLink
        href='#contato'
        variant='ghost'
        ariaCurrent={currentSection === 'contato' ? 'page' : undefined}
      >
        Contato
      </AccessibleLink>
    </div>
  )
)

DesktopMenu.displayName = 'DesktopMenu'

export default DesktopMenu
