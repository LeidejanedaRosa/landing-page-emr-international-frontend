import { ComponentType, ReactNode, Suspense } from 'react'

import ErrorBoundary from '../error/ErrorBoundary'
import { SectionErrorFallback } from '../error/SectionErrorFallback'
import { SectionSkeleton } from '../ui/Loading'

interface LazySectionProps {
  sectionName: string
  component: ComponentType
  fallback?: ReactNode
}

export const LazySection = ({
  sectionName,
  component: Component,
  fallback = <SectionSkeleton />,
}: LazySectionProps) => {
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
