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

export const useResponsiveItems = (
  itemsPerView: ItemsPerView = { mobile: 1, tablet: 2, desktop: 4 }
) => {
  const { mobile, tablet, desktop } = itemsPerView
  const [itemsVisible, setItemsVisible] = useState(desktop)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateItemsVisible = () => {
      setItemsVisible(getItemsForViewport(window.innerWidth, itemsPerView))
    }

    updateItemsVisible()
    window.addEventListener('resize', updateItemsVisible)

    return () => window.removeEventListener('resize', updateItemsVisible)
  }, [mobile, tablet, desktop])

  return itemsVisible
}
