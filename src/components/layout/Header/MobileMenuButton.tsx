import React from 'react'

interface MobileMenuButtonProps {
  isMobileMenuOpen: boolean
  onClick: () => void
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isMobileMenuOpen,
  onClick,
}) => (
  <div className='md:hidden'>
    <button
      className='text-white hover:text-primary-400 transition-colors duration-200'
      onClick={onClick}
      aria-expanded={isMobileMenuOpen}
      aria-controls='mobile-menu'
      aria-label={
        isMobileMenuOpen
          ? 'Fechar menu de navegação'
          : 'Abrir menu de navegação'
      }
      type='button'
      data-testid='mobile-menu-button'
    >
      <svg
        className='w-6 h-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        {isMobileMenuOpen ? (
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        ) : (
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 6h16M4 12h16M4 18h16'
          />
        )}
      </svg>
    </button>
  </div>
)

MobileMenuButton.displayName = 'MobileMenuButton'

export default MobileMenuButton
