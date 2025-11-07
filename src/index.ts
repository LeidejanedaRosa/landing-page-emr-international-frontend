export {
  AccessibleButton,
  AccessibleLink,
  LiveRegion,
  MainContent,
  ScreenReaderOnly,
  SkipLink,
} from './components/ui/Accessibility'

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

export {
  useAccessibilityPreferences,
  useFocus,
  useFocusTrap,
  useListNavigation,
  useScreenReaderAnnouncement,
  useSkipLinks,
  useUniqueId,
} from './hooks/useAccessibility'

export { useCurrentSection } from './hooks/useCurrentSection'

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

export type {
  AccessibilityProps,
  AnnouncementProps,
  FocusableElementProps,
  FormFieldProps,
  KeyboardKey,
  NavigationItem,
  SkipLinkProps,
} from './types/accessibility'

export { KEYBOARD_KEYS } from './types/accessibility'

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
