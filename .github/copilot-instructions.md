# EMR Internacional Landing Page - AI Coding Agent Instructions

## Core AI Assistant Behavior

**Be a mature debater and challenger**: Question my ideas, challenge my viewpoints, show where I'm wrong, point out my blind spots, help me see opportunities I'm missing. Act like a coach who cares more about truth and my growth than comfort. I don't need validation - I want to improve. Always provide links to reliable information sources in all responses.

**Code Quality Standards**: Always follow Clean Code principles, SOLID principles, accessibility standards, semantic HTML, avoid code smells, and optimize for SEO. Every component must use proper HTML5 semantic elements and ARIA attributes. Use semantic commits separating files by their responsibilities with short, English commit messages.

**Quality Enforcement**:

- Clean Code: Functions should do one thing well, use meaningful names, avoid comments by writing self-documenting code
- SOLID Principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- Accessibility: WCAG 2.1 AA compliance, keyboard navigation, screen reader support, proper contrast ratios
- Code Smells: No duplicated code, no long methods/classes, no primitive obsession, proper abstraction levels
- SEO: Semantic HTML structure, proper meta tags, structured data, performance optimization
- Semantic HTML: Use `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<aside>` appropriately

**Sources & References**: Every technical suggestion or best practice mentioned must include links to official documentation, reputable sources, or industry standards.

---

This is a modern React + TypeScript + Tailwind CSS landing page for EMR Internacional (emergency medical training company). Focus on accessibility, performance, and responsive design.

## Architecture Overview

**Stack**: Vite + React 18 + TypeScript + Tailwind CSS + React Helmet (SEO)
**Structure**: Single-page application with lazy-loaded sections using React.Suspense
**Design System**: Custom Tailwind config with brand-specific color palette and typography

### Key Components Structure

```
src/
├── components/
│   ├── sections/        # Main page sections (Hero, About, Services, Contact)
│   ├── layout/          # Layout components (Header, Footer, ResponsiveLayout)
│   ├── ui/              # Reusable UI components (Accessibility components)
│   └── seo/             # SEO and structured data components
├── hooks/               # Custom hooks (accessibility, forms, navigation)
├── styles/              # Theme configuration (colors, typography, spacing)
└── utils/               # Utilities (SEO, accessibility helpers)
```

## Essential Patterns & Conventions

### Semantic HTML & Code Quality First

- **Semantic HTML Structure**: Always use appropriate HTML5 elements (`<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<aside>`, `<figure>`, `<figcaption>`)
- **Clean Code Principles**: Functions max 20 lines, classes max 300 lines, meaningful variable/function names, no magic numbers
- **SOLID Compliance**: Each component has single responsibility, open for extension but closed for modification
- **Code Smell Detection**: Refactor duplicated code, long parameter lists, feature envy, inappropriate intimacy

### Accessibility First Architecture

- **Always use custom accessibility components**: `AccessibleButton`, `AccessibleLink`, `SkipLink`, `MainContent`
- **Navigation pattern**: Use `useCurrentSection` hook with `aria-current="page"` for active states
- **Form pattern**: Forms use `useContactForm` hook with built-in validation and error handling
- **Screen reader support**: All interactive elements have proper ARIA labels and live regions
- **Keyboard Navigation**: Tab order, focus management, escape key handling, arrow key navigation where appropriate

### Color System (Custom Tailwind)

- **Primary**: Black/grayscale scale (`primary-*`) - main brand colors
- **CTA**: Red (`cta-*` / `#CC0000`) - emergency/danger theme matching medical context
- **Success**: Dark green (`success-*` / `#28A745`)
- **Error**: Red (`error-*` / `#DC3545`)
- Use semantic color names, not arbitrary values

### Typography & Spacing

- **Font**: Arial only (`font-sans`) - accessibility requirement
- **Responsive approach**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints
- **Spacing**: Use theme constants from `src/styles/theme.ts` for consistent spacing

### Component Patterns

- **Lazy loading**: Non-critical sections use `React.lazy()` with Suspense fallbacks
- **Error boundaries**: All components wrapped in `ErrorBoundary`
- **ForwardRef pattern**: UI components use `forwardRef` for ref forwarding
- **Memo optimization**: Use `React.memo` for performance-critical components

## Development Workflow

### Commands

- `npm run dev` - Development server (port 3000)
- `npm run build` - Production build with TypeScript checking
- `npm run lint` - ESLint with strict accessibility and security rules
- `npm run format` - Prettier formatting

### Build Configuration

- **Vite config**: Custom asset handling, vendor chunk splitting
- **ESLint**: Strict rules including jsx-a11y, security, sonarjs, unicorn plugins
- **Bundle optimization**: Images go to `/images/`, vendor code separated

### SEO & Performance Standards

- **SEO Requirements**: Every page needs proper `<title>`, meta description, Open Graph tags, structured data (JSON-LD)
- **Semantic Structure**: Use heading hierarchy (`h1` → `h2` → `h3`), proper landmarks, descriptive link text
- **Performance Targets**: First Contentful Paint < 1.5s, Largest Contentful Paint < 2.5s, Cumulative Layout Shift < 0.1
- **Image Optimization**: WebP format, responsive images with `srcset`, proper `alt` attributes, lazy loading for non-critical images
- **Core Web Vitals**: Monitor and optimize for Google's Core Web Vitals metrics

## Critical Integration Points

### Hero Carousel System

- **Hook**: `useHeroCarousel` manages slides, auto-play, and navigation
- **Components**: `DesktopLayout` (hidden on mobile), `MobileTabletCarousel` (responsive)
- **Accessibility**: Full keyboard navigation, screen reader announcements, reduced motion support
- **Styling**: Custom CSS in `HeroCarousel.css` with media queries

### Form Handling

- **Hook**: `useContactForm` provides validation, loading states, error handling
- **Pattern**: Controlled inputs with `updateField` callback, form submission with `handleSubmit`
- **Validation**: Built-in email/required field validation with user-friendly error messages

### Navigation System

- **Current section detection**: `useCurrentSection` hook tracks scroll position
- **Accessibility**: `aria-current="page"` for active navigation items
- **Mobile menu**: Hamburger menu with proper focus management

## Common Tasks

### Adding New Sections

1. Create component in `src/components/sections/`
2. Add lazy import to `App.tsx` with Suspense wrapper
3. Update navigation in `Header/DesktopMenu.tsx` and `MobileMenu.tsx`
4. Add section ID to `useCurrentSection` hook array

### Styling Guidelines

- Use existing Tailwind classes from custom config
- Follow responsive-first approach (`base` → `sm:` → `md:` → `lg:`)
- Maintain accessibility (focus states, contrast ratios)
- Use semantic spacing from theme constants

### Accessibility Checklist

- All interactive elements must have proper labels
- Use `AccessibleButton`/`AccessibleLink` instead of native elements
- Test keyboard navigation (Tab, Enter, Space, Arrow keys)
- Verify screen reader announcements with `LiveRegion`
- Check color contrast meets WCAG AA standards

### Performance Optimization

- Lazy load non-critical components
- Use proper image formats and sizes
- Implement loading states for async operations
- Minimize bundle size with code splitting

The codebase prioritizes accessibility, semantic HTML, and performance. Always consider mobile users and screen reader compatibility when making changes.
