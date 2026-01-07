import React, { useCallback, useRef } from 'react'

interface UseTouchSwipeOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  minimumSwipeDistance?: number
  enabled?: boolean
}

interface TouchHandlers {
  onTouchStart: React.TouchEventHandler
  onTouchMove: React.TouchEventHandler
  onTouchEnd: () => void
}

const DEFAULT_MINIMUM_SWIPE_DISTANCE = 50

const isTouchDataComplete = (
  startX: number | null,
  endX: number | null,
  startY: number | null,
  endY: number | null
): boolean => {
  return startX !== null && endX !== null && startY !== null && endY !== null
}

const calculateSwipeDistances = (
  startX: number,
  endX: number,
  startY: number,
  endY: number
) => {
  const horizontalDistance = startX - endX
  const verticalDistance = Math.abs(startY - endY)
  return { horizontalDistance, verticalDistance }
}

const isValidHorizontalSwipe = (
  horizontalDistance: number,
  verticalDistance: number,
  minimumDistance: number
): boolean => {
  return (
    Math.abs(horizontalDistance) > minimumDistance &&
    Math.abs(horizontalDistance) > verticalDistance
  )
}

export const useTouchSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  minimumSwipeDistance = DEFAULT_MINIMUM_SWIPE_DISTANCE,
  enabled = true,
}: UseTouchSwipeOptions): TouchHandlers => {
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const touchEndY = useRef<number | null>(null)

  const handleTouchStart = useCallback(
    (touchEvent: React.TouchEvent) => {
      if (!enabled) return

      touchStartX.current = touchEvent.touches[0].clientX
      touchStartY.current = touchEvent.touches[0].clientY
      touchEndX.current = null
      touchEndY.current = null
    },
    [enabled]
  )

  const handleTouchMove = useCallback(
    (touchEvent: React.TouchEvent) => {
      if (!enabled) return

      touchEndX.current = touchEvent.touches[0].clientX
      touchEndY.current = touchEvent.touches[0].clientY
    },
    [enabled]
  )

  const handleTouchEnd = useCallback(() => {
    if (!enabled) return

    if (
      !isTouchDataComplete(
        touchStartX.current,
        touchEndX.current,
        touchStartY.current,
        touchEndY.current
      )
    ) {
      return
    }

    const { horizontalDistance, verticalDistance } = calculateSwipeDistances(
      touchStartX.current!,
      touchEndX.current!,
      touchStartY.current!,
      touchEndY.current!
    )

    if (
      isValidHorizontalSwipe(
        horizontalDistance,
        verticalDistance,
        minimumSwipeDistance
      )
    ) {
      if (horizontalDistance > 0 && onSwipeLeft) {
        onSwipeLeft()
      } else if (horizontalDistance < 0 && onSwipeRight) {
        onSwipeRight()
      }
    }

    touchStartX.current = null
    touchEndX.current = null
    touchStartY.current = null
    touchEndY.current = null
  }, [enabled, onSwipeLeft, onSwipeRight, minimumSwipeDistance])

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  }
}
