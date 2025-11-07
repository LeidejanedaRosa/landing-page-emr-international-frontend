// Exportações principais do sistema de acessibilidade e layout

// Componentes de acessibilidade
export {
  AccessibleButton,
  AccessibleLink,
  LiveRegion,
  MainContent,
  ScreenReaderOnly,
  SkipLink,
} from './components/ui/Accessibility'

// Componentes de layout
export {
  AppLayout,
  Card,
  Container,
  Flex,
  ResponsiveFooter,
  ResponsiveGrid,
  ResponsiveHeader,
  Section,
  Stack,
} from './components/layout/ResponsiveLayout'

// Hooks de acessibilidade
export {
  useAccessibilityPreferences,
  useFocus,
  useFocusTrap,
  useKeyboardNavigation,
  useListNavigation,
  useScreenReaderAnnouncement,
  useSkipLinks,
  useUniqueId,
} from './hooks/useAccessibility'

// Utilitários de acessibilidade
export {
  announceToScreenReader,
  focusNextElement,
  focusPreviousElement,
  generateAriaLabel,
  generateId,
  getContrastPreference,
  getFocusableElements,
  isKeyPressed,
  prefersReducedMotion,
  preventDefaultAndStopPropagation,
  trapFocus,
  validateAccessibility,
} from './utils/accessibility/helpers'

// Tipos de acessibilidade
export type {
  AccessibilityProps,
  AnnouncementProps,
  FocusableElementProps,
  FormFieldProps,
  KeyboardKey,
  NavigationItem,
  SkipLinkProps,
} from './types/accessibility'

// Constantes de teclado
export { KEYBOARD_KEYS } from './types/accessibility'

// Configurações de tema
export {
  breakpoints,
  shadows,
  spacing,
  transitions,
  typography,
  zIndex,
} from './styles/theme'

export type {
  Breakpoint,
  FontSize,
  FontWeight,
  Shadow,
  TransitionDuration,
  TransitionTiming,
  ZIndex,
} from './styles/theme'
