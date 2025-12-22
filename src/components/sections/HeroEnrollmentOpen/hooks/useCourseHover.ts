import { useCallback, useState } from 'react'

export const useCourseHover = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const createHoverHandlers = useCallback(
    (courseId: string) => ({
      onMouseEnter: () => setHoveredCard(courseId),
      onMouseLeave: () => setHoveredCard(null),
      onFocus: () => setHoveredCard(courseId),
      onBlur: () => setHoveredCard(null),
    }),
    []
  )

  return { createHoverHandlers, hoveredCard }
}
