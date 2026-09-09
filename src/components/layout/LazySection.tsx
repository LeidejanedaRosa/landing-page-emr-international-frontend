import {
  ComponentType,
  ReactNode,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react'

import ErrorBoundary from '../error/ErrorBoundary'
import { SectionErrorFallback } from '../error/SectionErrorFallback'
import { SectionSkeleton } from '../ui/Loading'
import { LAZY_SECTION_REVEAL_EVENT } from './lazySectionReveal'

interface LazySectionProps {
  sectionName: string
  component: ComponentType
  fallback?: ReactNode
  rootMargin?: string
}

export const LazySection = ({
  sectionName,
  component: Component,
  fallback = <SectionSkeleton />,
  rootMargin = '300px',
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const placeholderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = placeholderRef.current
    let observer: IntersectionObserver | undefined

    const reveal = () => {
      setIsVisible(true)
      observer?.disconnect()
    }

    window.addEventListener(LAZY_SECTION_REVEAL_EVENT, reveal)

    if (el) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) reveal()
        },
        { rootMargin }
      )
      observer.observe(el)
    }

    return () => {
      window.removeEventListener(LAZY_SECTION_REVEAL_EVENT, reveal)
      observer?.disconnect()
    }
  }, [rootMargin])

  if (!isVisible) {
    return (
      <div ref={placeholderRef} aria-hidden='true'>
        {fallback}
      </div>
    )
  }

  return (
    <ErrorBoundary
      fallback={({ resetError }) => (
        <SectionErrorFallback sectionName={sectionName} onRetry={resetError} />
      )}
    >
      <Suspense fallback={fallback}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  )
}
