import { CSSProperties } from 'react'

import { type StatisticData } from '../../../data/whyItMattersData'
import { ScreenReaderOnly } from '../../ui/Accessibility'
import { StatisticCard } from './StatisticCard'

interface StatisticsGridProps {
  statistics: StatisticData[]
  activeTabId: string
  gridDescriptionId: string
}

interface StickyStyle extends CSSProperties {
  '--sticky-top'?: string
  '--sticky-z'?: string
}

const STICKY_BASE_OFFSET_REM = 3.5
const STICKY_INCREMENT_REM = 1

export function StatisticsGrid({
  statistics,
  activeTabId,
  gridDescriptionId,
}: StatisticsGridProps) {
  if (statistics.length === 0) {
    return null
  }

  const [highlightStat, ...regularStats] = statistics

  return (
    <div
      className='flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-2 relative'
      role='list'
      aria-describedby={gridDescriptionId}
    >
      <ScreenReaderOnly>
        <p id={gridDescriptionId}>
          Lista de {statistics.length} estatísticas críticas sobre emergências
          médicas
        </p>
      </ScreenReaderOnly>

      <div
        role='listitem'
        aria-posinset={1}
        aria-setsize={statistics.length}
        style={
          {
            '--sticky-top': `${STICKY_BASE_OFFSET_REM}rem`,
            '--sticky-z': '10',
          } as StickyStyle
        }
        className={`
          sticky lg:static top-[var(--sticky-top)] lg:top-auto z-[var(--sticky-z)] lg:z-auto
          mb-8 lg:mb-0 transition-transform duration-300 hover:scale-[1.02]
          h-full ${highlightStat.className || ''}
        `}
      >
        <StatisticCard
          statistic={highlightStat}
          isHighlight={true}
          activeTabId={activeTabId}
        />
      </div>

      {regularStats.map((stat, index) => {
        const realIndex = index + 1
        const topOffsetRem =
          STICKY_BASE_OFFSET_REM + realIndex * STICKY_INCREMENT_REM
        const zIndex = 10 + realIndex

        return (
          <div
            key={stat.id}
            role='listitem'
            aria-posinset={realIndex + 1}
            aria-setsize={statistics.length}
            style={
              {
                '--sticky-top': `${topOffsetRem}rem`,
                '--sticky-z': zIndex.toString(),
              } as StickyStyle
            }
            className={`
              sticky lg:static
              top-[var(--sticky-top)] lg:top-auto
              z-[var(--sticky-z)] lg:z-auto
              mb-8 lg:mb-0 transition-transform duration-300 hover:scale-[1.02]
              h-full ${stat.className || ''}
            `}
          >
            <StatisticCard statistic={stat} activeTabId={activeTabId} />
          </div>
        )
      })}
    </div>
  )
}
