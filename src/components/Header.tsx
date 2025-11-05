import React from 'react'

interface HeaderProps {
  className?: string
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`bg-white shadow-sm ${className}`}>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex items-center'>
            <h1 className='text-2xl font-bold text-primary-600'>
              EMR Internacional
            </h1>
          </div>
          <div className='hidden md:flex space-x-8'>
            <a
              href='#sobre'
              className='text-gray-700 hover:text-primary-600 transition-colors duration-200'
            >
              Sobre
            </a>
            <a
              href='#servicos'
              className='text-gray-700 hover:text-primary-600 transition-colors duration-200'
            >
              Serviços
            </a>
            <a
              href='#contato'
              className='text-gray-700 hover:text-primary-600 transition-colors duration-200'
            >
              Contato
            </a>
          </div>
          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button className='text-gray-700 hover:text-primary-600'>
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
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
