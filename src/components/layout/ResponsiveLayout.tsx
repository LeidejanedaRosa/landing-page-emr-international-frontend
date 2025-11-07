// Layout responsivo base com Mobile-First
import type { ReactNode } from 'react'
import * as React from 'react'

import { MainContent, SkipLink } from '../ui/Accessibility'

interface LayoutProps {
  children: ReactNode
  className?: string
}

/**
 * Container principal com largura máxima e padding responsivo
 */
export const Container = ({ children, className = '' }: LayoutProps) => (
  <div
    className={`
      mx-auto w-full max-w-7xl
      px-4 sm:px-6 lg:px-8
      ${className}
    `}
  >
    {children}
  </div>
)

/**
 * Grid responsivo para layout principal
 */
interface GridProps extends LayoutProps {
  cols?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: string
}

export const ResponsiveGrid = ({
  children,
  cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 },
  gap = 'gap-4 sm:gap-6 lg:gap-8',
  className = '',
}: GridProps) => {
  const gridCols = [
    cols.xs && `grid-cols-${cols.xs}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`grid ${gridCols} ${gap} ${className}`}>{children}</div>
  )
}

/**
 * Seção com espaçamento vertical consistente
 */
interface SectionProps extends LayoutProps {
  id?: string
  as?: keyof React.JSX.IntrinsicElements
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  background?: 'transparent' | 'light' | 'dark'
}

export const Section = ({
  children,
  id,
  as: Component = 'section',
  spacing = 'md',
  background = 'transparent',
  className = '',
}: SectionProps) => {
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
    <Component
      id={id}
      className={`
        ${spacingClasses[spacing]}
        ${backgroundClasses[background]}
        ${className}
      `}
    >
      {children}
    </Component>
  )
}

/**
 * Header responsivo com navegação
 */
interface HeaderProps {
  logo?: ReactNode
  navigation?: ReactNode
  actions?: ReactNode
  className?: string
}

export const ResponsiveHeader = ({
  logo,
  navigation,
  actions,
  className = '',
}: HeaderProps) => (
  <header
    className={`
      sticky top-0 z-50 w-full
      bg-secondary border-b border-gray-200
      ${className}
    `}
  >
    <SkipLink href='#main-content'>Pular para o conteúdo principal</SkipLink>

    <Container>
      <div className='flex h-16 items-center justify-between'>
        {/* Logo */}
        <div className='flex-shrink-0'>{logo}</div>

        {/* Navegação Desktop */}
        <nav
          className='hidden md:flex md:items-center md:space-x-8'
          role='navigation'
          aria-label='Navegação principal'
        >
          {navigation}
        </nav>

        {/* Ações */}
        <div className='flex items-center space-x-4'>{actions}</div>
      </div>
    </Container>
  </header>
)

/**
 * Footer responsivo
 */
interface FooterProps {
  children: ReactNode
  className?: string
}

export const ResponsiveFooter = ({ children, className = '' }: FooterProps) => (
  <footer
    className={`
      bg-gray-900 text-secondary
      ${className}
    `}
    role='contentinfo'
  >
    <Container>{children}</Container>
  </footer>
)

/**
 * Layout principal da aplicação
 */
interface AppLayoutProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

export const AppLayout = ({ children, header, footer }: AppLayoutProps) => (
  <div className='min-h-screen flex flex-col bg-secondary'>
    {header}

    <MainContent className='flex-1'>{children}</MainContent>

    {footer}
  </div>
)

/**
 * Card responsivo para conteúdo
 */
interface CardProps extends LayoutProps {
  padding?: 'sm' | 'md' | 'lg'
  shadow?: boolean
  border?: boolean
}

export const Card = ({
  children,
  padding = 'md',
  shadow = true,
  border = true,
  className = '',
}: CardProps) => {
  const paddingClasses = {
    sm: 'p-4 sm:p-6',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10',
  }

  return (
    <div
      className={`
        bg-secondary rounded-lg
        ${paddingClasses[padding]}
        ${shadow ? 'shadow-md hover:shadow-lg transition-shadow duration-200' : ''}
        ${border ? 'border border-gray-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

/**
 * Stack layout para organizar elementos verticalmente
 */
interface StackProps extends LayoutProps {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export const Stack = ({
  children,
  spacing = 'md',
  align = 'stretch',
  className = '',
}: StackProps) => {
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
      className={`
        flex flex-col
        ${spacingClasses[spacing]}
        ${alignClasses[align]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

/**
 * Flex layout responsivo
 */
interface FlexProps extends LayoutProps {
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
  wrap?: boolean
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Flex = ({
  children,
  direction = 'row',
  wrap = false,
  justify = 'start',
  align = 'start',
  gap = 'md',
  className = '',
}: FlexProps) => {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse',
  }

  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }

  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  }

  const gapClasses = {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  }

  return (
    <div
      className={`
        flex
        ${directionClasses[direction]}
        ${wrap ? 'flex-wrap' : ''}
        ${justifyClasses[justify]}
        ${alignClasses[align]}
        ${gapClasses[gap]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
