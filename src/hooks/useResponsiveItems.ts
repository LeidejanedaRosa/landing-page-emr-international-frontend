import { useEffect, useState } from 'react'

export interface ItemsPerView {
  mobile: number
  tablet: number
  desktop: number
}

const getItemsForViewport = (width: number, itemsPerView: ItemsPerView) => {
  if (width < 768) return itemsPerView.mobile
  if (width < 1024) return itemsPerView.tablet
  return itemsPerView.desktop
}

/**
 * Hook para calcular quantidade de items visíveis baseado no viewport
 * Breakpoints: < 768px (mobile), < 1024px (tablet), >= 1024px (desktop)
 */
export const useResponsiveItems = (
  itemsPerView: ItemsPerView = { mobile: 1, tablet: 2, desktop: 4 }
) => {
  const [itemsVisible, setItemsVisible] = useState(itemsPerView.desktop)

  useEffect(() => {
    const updateItemsVisible = () => {
      setItemsVisible(getItemsForViewport(window.innerWidth, itemsPerView))
    }

    updateItemsVisible()
    window.addEventListener('resize', updateItemsVisible)

    return () => window.removeEventListener('resize', updateItemsVisible)
  }, [itemsPerView])

  return itemsVisible
}
