import { useCallback, useState } from 'react'

export function useHover<T extends string = string>() {
  const [hoveredItem, setHoveredItem] = useState<T | null>(null)

  const createHoverHandlers = useCallback(
    (itemId: T) => ({
      onMouseEnter: () => setHoveredItem(itemId),
      onMouseLeave: () => setHoveredItem(null),
      onFocus: () => setHoveredItem(itemId),
      onBlur: () => setHoveredItem(null),
    }),
    []
  )

  return { hoveredItem, createHoverHandlers }
}
