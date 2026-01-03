import React, { memo, useCallback } from 'react'

import { LEVEL_LABELS } from '../../../../data/coursesData'
import type { CourseLevelTabsProps } from '../types'

export const CourseLevelTabs = memo(
  ({
    levels,
    selectedLevel,
    onLevelChange,
    styles,
    courseId,
  }: CourseLevelTabsProps) => {
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, currentIndex: number) => {
        switch (e.key) {
          case 'ArrowRight': {
            e.preventDefault()
            const nextIndex = (currentIndex + 1) % levels.length
            onLevelChange(levels[nextIndex].level)
            break
          }
          case 'ArrowLeft': {
            e.preventDefault()
            const prevIndex = (currentIndex - 1 + levels.length) % levels.length
            onLevelChange(levels[prevIndex].level)
            break
          }
          case 'Home':
            e.preventDefault()
            onLevelChange(levels[0].level)
            break
          case 'End':
            e.preventDefault()
            onLevelChange(levels[levels.length - 1].level)
            break
        }
      },
      [levels, onLevelChange]
    )

    return (
      <div
        role='tablist'
        aria-label='Níveis do curso'
        className='flex bg-primary-700/30 rounded-lg p-1 mb-4'
      >
        {levels.map((level, index) => {
          const isSelected = selectedLevel === level.level
          return (
            <button
              key={level.level}
              type='button'
              role='tab'
              id={`${courseId}-tab-${level.level}`}
              aria-selected={isSelected}
              aria-controls={`${courseId}-panel-${level.level}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onLevelChange(level.level)}
              onKeyDown={e => handleKeyDown(e, index)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-800 ${styles.ring} ${
                isSelected
                  ? `${styles.tabActive} ${styles.tabActiveText}`
                  : 'text-primary-400 hover:text-white hover:bg-primary-700/50'
              }`}
            >
              {LEVEL_LABELS[level.level]}
            </button>
          )
        })}
      </div>
    )
  }
)

CourseLevelTabs.displayName = 'CourseLevelTabs'
