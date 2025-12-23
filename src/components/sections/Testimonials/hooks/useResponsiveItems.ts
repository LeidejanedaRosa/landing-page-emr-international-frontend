import { useEffect, useState } from 'react'

interface ItemsPerView {
  mobile: number
  tablet: number
  desktop: number
}

const getItemsForViewport = (
  width: number,
  itemsPerView: ItemsPerView | undefined
) => {
  if (!itemsPerView) return 3
  if (width < 768) return itemsPerView.mobile
  if (width < 1024) return itemsPerView.tablet
  return itemsPerView.desktop
}

export const useResponsiveItems = (itemsPerView: ItemsPerView | undefined) => {
  const [itemsVisible, setItemsVisible] = useState(itemsPerView?.desktop ?? 3)

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
