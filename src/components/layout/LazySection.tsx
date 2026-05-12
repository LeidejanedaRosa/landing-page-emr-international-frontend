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
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  if (!isVisible) {
    return <div ref={placeholderRef} aria-hidden='true' />
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
