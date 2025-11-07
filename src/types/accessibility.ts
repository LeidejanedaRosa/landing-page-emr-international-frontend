import type { ReactNode } from 'react'

export interface AccessibilityProps {
  id?: string
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-labelledby'?: string
  'aria-expanded'?: boolean
  'aria-pressed'?: boolean
  role?: string
  tabIndex?: number
  title?: string
}

export interface FocusableElementProps {
  id?: string
  disabled?: boolean
}

export interface NavigationItem {
  label: string
  href: string
  isCurrent?: boolean
  ariaCurrent?:
    | boolean
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
    | 'true'
  children?: NavigationItem[]
}

export interface FormFieldProps extends FocusableElementProps {
  name: string
  required?: boolean
  'aria-required'?: boolean
  error?: string
  'aria-errormessage'?: string
  helpText?: string
  'aria-describedby'?: string
  invalid?: boolean
  'aria-invalid'?: boolean
}

export interface SkipLinkProps {
  href: string
  children: ReactNode
}

export interface AnnouncementProps {
  type?: 'polite' | 'assertive'
  message: string
}

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
