import React from 'react'

import { MainContent, SkipLink } from '../ui/Accessibility'

const GRID_COLS_MAP: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
}

const SM_GRID_COLS_MAP: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
  7: 'sm:grid-cols-7',
  8: 'sm:grid-cols-8',
  9: 'sm:grid-cols-9',
  10: 'sm:grid-cols-10',
  11: 'sm:grid-cols-11',
  12: 'sm:grid-cols-12',
}

const MD_GRID_COLS_MAP: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  7: 'md:grid-cols-7',
  8: 'md:grid-cols-8',
  9: 'md:grid-cols-9',
  10: 'md:grid-cols-10',
  11: 'md:grid-cols-11',
  12: 'md:grid-cols-12',
}

const LG_GRID_COLS_MAP: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  7: 'lg:grid-cols-7',
  8: 'lg:grid-cols-8',
  9: 'lg:grid-cols-9',
  10: 'lg:grid-cols-10',
  11: 'lg:grid-cols-11',
  12: 'lg:grid-cols-12',
}

export const Container: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
)

export const ResponsiveGrid: React.FC<{
  children: React.ReactNode
  cols?: { xs?: number; sm?: number; md?: number; lg?: number }
  gap?: string
  className?: string
}> = ({
  children,
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 'gap-4 sm:gap-6 lg:gap-8',
  className = '',
}) => {
  const gridCols = [
    cols.xs && GRID_COLS_MAP[cols.xs],
    cols.sm && SM_GRID_COLS_MAP[cols.sm],
    cols.md && MD_GRID_COLS_MAP[cols.md],
    cols.lg && LG_GRID_COLS_MAP[cols.lg],
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`grid ${gridCols} ${gap} ${className}`}>{children}</div>
  )
}

export const Section: React.FC<{
  children: React.ReactNode
  id?: string
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  background?: 'transparent' | 'light' | 'dark'
  className?: string
}> = ({
  children,
  id,
  spacing = 'md',
  background = 'transparent',
  className = '',
}) => {
  const spacingClasses = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16 lg:py-20',
    lg: 'py-16 sm:py-20 lg:py-24',
    xl: 'py-20 sm:py-24 lg:py-32',
  }

  const backgroundClasses = {
    transparent: '',
    light: 'bg-gray-50',
    dark: 'bg-gray-900',
  }

  return (
    <section
      id={id}
      className={`${spacingClasses[spacing]} ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </section>
  )
}

export const ResponsiveHeader: React.FC<{
  logo?: React.ReactNode
  navigation?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}> = ({ logo, navigation, actions, className = '' }) => (
  <header
    className={`sticky top-0 z-50 w-full bg-secondary border-b border-gray-200 ${className}`}
  >
    <SkipLink href='#main-content'>Pular para o conteúdo principal</SkipLink>
    <Container>
      <div className='flex h-16 items-center justify-between'>
        <div className='flex-shrink-0'>{logo}</div>
        <nav
          className='hidden md:flex md:items-center md:space-x-8'
          role='navigation'
          aria-label='Navegação principal'
        >
          {navigation}
        </nav>
        <div className='flex items-center space-x-4'>{actions}</div>
      </div>
    </Container>
  </header>
)

export const ResponsiveFooter: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => (
  <footer
    className={`bg-gray-900 text-secondary ${className}`}
    role='contentinfo'
  >
    <Container>{children}</Container>
  </footer>
)

export const AppLayout: React.FC<{
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}> = ({ children, header, footer }) => (
  <div className='min-h-screen flex flex-col bg-secondary'>
    {header}
    <MainContent className='flex-1'>{children}</MainContent>
    {footer}
  </div>
)

export const Card: React.FC<{
  children: React.ReactNode
  padding?: 'sm' | 'md' | 'lg'
  className?: string
}> = ({ children, padding = 'md', className = '' }) => {
  const paddingClasses = {
    sm: 'p-4 sm:p-6',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10',
  }

  return (
    <div
      className={`bg-secondary rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  )
}

export const Stack: React.FC<{
  children: React.ReactNode
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  className?: string
}> = ({ children, spacing = 'md', align = 'stretch', className = '' }) => {
  const spacingClasses = {
    xs: 'space-y-2',
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
    xl: 'space-y-12',
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  return (
    <div
      className={`flex flex-col ${spacingClasses[spacing]} ${alignClasses[align]} ${className}`}
    >
      {children}
    </div>
  )
}
