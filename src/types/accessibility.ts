// Tipos para o sistema de acessibilidade
import type { ReactNode } from 'react'

export interface AccessibilityProps {
  /** ID único para o elemento */
  id?: string
  /** Label para screen readers */
  'aria-label'?: string
  /** ID do elemento que descreve este elemento */
  'aria-describedby'?: string
  /** ID do elemento que rotula este elemento */
  'aria-labelledby'?: string
  /** Indica se o elemento está expandido */
  'aria-expanded'?: boolean
  /** Indica se o elemento está pressionado */
  'aria-pressed'?: boolean
  /** Role do elemento para screen readers */
  role?: string
  /** Ordem de foco com teclado */
  tabIndex?: number
  /** Título para tooltip */
  title?: string
}

export interface FocusableElementProps {
  /** ID único para o elemento */
  id?: string
  /** Indica se o elemento pode receber foco */
  disabled?: boolean
}

export interface NavigationItem {
  /** Texto do item */
  label: string
  /** URL de destino */
  href: string
  /** Indica se é o item atual */
  isCurrent?: boolean
  /** Subitens do menu */
  children?: NavigationItem[]
}

export interface FormFieldProps extends FocusableElementProps {
  /** Nome do campo */
  name: string
  /** Indica se o campo é obrigatório */
  required?: boolean
  /** Mensagem de erro */
  error?: string
  /** Texto de ajuda */
  helpText?: string
  /** Indica se o campo é inválido */
  invalid?: boolean
}

export interface SkipLinkProps {
  /** URL de destino */
  href: string
  /** Texto do link */
  children: ReactNode
}

export interface AnnouncementProps {
  /** Tipo de anúncio */
  type?: 'polite' | 'assertive'
  /** Conteúdo a ser anunciado */
  message: string
}

// Constantes para navegação por teclado
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  HOME: 'Home',
  END: 'End',
} as const

export type KeyboardKey = (typeof KEYBOARD_KEYS)[keyof typeof KEYBOARD_KEYS]
