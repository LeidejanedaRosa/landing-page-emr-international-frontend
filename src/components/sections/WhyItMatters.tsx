import React, { CSSProperties, memo, useCallback, useState } from 'react'

import {
  type StatisticData,
  type TabData,
  whyItMattersData,
} from '../../data/whyItMattersData'
import { useUniqueId } from '../../hooks/useAccessibility'
import { ScreenReaderOnly } from '../ui/Accessibility'
import { AccessibleButton } from '../ui/AccessibleButton'

interface SectionHeaderProps {
  titleId: string
  subtitleId: string
}

interface TabSwitcherProps {
  tabs: TabData[]
  activeTabId: string
  onTabChange: (id: string) => void // eslint-disable-line no-unused-vars
  tabListId: string
}

interface StatisticCardProps {
  statistic: StatisticData
  isHighlight?: boolean
  activeTabId: string
}

interface StatisticsGridProps {
  statistics: StatisticData[]
  activeTabId: string
  gridDescriptionId: string
}

interface StickyStyle extends CSSProperties {
  '--sticky-top'?: string
  '--sticky-z'?: string
}

const SectionHeader = memo(({ titleId, subtitleId }: SectionHeaderProps) => {
  return (
    <header className='text-center mb-4'>
      <p
        id={subtitleId}
        className='text-red-600 font-bold tracking-wider uppercase text-xs mb-1'
      >
        A Realidade dos Números
      </p>
      <h2
        id={titleId}
        className='text-2xl font-extrabold text-zinc-900 mb-2 leading-tight'
      >
        VOCÊ ESTÁ PREPARADO PARA{' '}
        <span className='text-transparent text-3xl bg-clip-text bg-gradient-to-r from-red-600 to-red-800'>
          O PIOR CENÁRIO?
        </span>
      </h2>
      <p className='text-zinc-600 max-w-2xl mx-auto text-sm md:text-base'>
        Em operações táticas e emergências remotas, a ignorância é fatal. Os
        dados abaixo demonstram por que a formação em APH Tático e medicina
        wilderness não é um luxo, mas uma necessidade de sobrevivência para
        operadores e primeiros respondentes.
      </p>
    </header>
  )
})

SectionHeader.displayName = 'SectionHeader'

const TabSwitcher = memo(
  ({ tabs, activeTabId, onTabChange, tabListId }: TabSwitcherProps) => {
    return (
      <nav
        className='flex justify-center mb-6'
        role='navigation'
        aria-label='Selecionar tipo de ambiente de emergência'
      >
        <div
          role='tablist'
          id={tabListId}
          aria-label='Categorias de estatísticas de emergência'
          className='p-1.5 rounded-full bg-zinc-100 border border-zinc-200 flex relative w-full h-[50px] max-w-xl shadow-inner'
        >
          {tabs.map(tab => {
            const isActive = activeTabId === tab.id
            const activeStyles =
              tab.id === 'tactical'
                ? 'bg-red-600 text-white shadow-md shadow-red-900/20'
                : 'bg-warning-600 text-white whitespace-nowrap shadow-md shadow-warning-900/20'

            return (
              <AccessibleButton
                key={tab.id}
                id={`${tab.id}-tab`}
                onClick={() => onTabChange(tab.id)}
                variant={isActive ? 'primary' : 'ghost'}
                className={`flex-1 py-2 px-6 !rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  isActive
                    ? activeStyles
                    : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/50'
                }`}
                role='tab'
                aria-selected={isActive}
                aria-controls={`${tab.id}-panel`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </AccessibleButton>
            )
          })}
        </div>
      </nav>
    )
  }
)

TabSwitcher.displayName = 'TabSwitcher'

const getCardStyles = (isHighlight: boolean, isTactical: boolean) => {
  if (isHighlight) {
    const highlightGradient = isTactical
      ? 'from-cta-700 to-cta-500'
      : 'from-warning-700 to-warning-500'
    return `p-4 md:p-6 bg-gradient-to-br ${highlightGradient} min-h-[250px]`
  }
  return 'p-3 bg-primary-700 border border-primary-800 hover:bg-primary-900 transition min-h-[130px]'
}

const getValueStyles = (isHighlight: boolean) => {
  return isHighlight ? 'text-white text-3xl md:text-4xl' : 'text-white text-xl'
}

const getLabelStyles = (isHighlight: boolean) => {
  return isHighlight
    ? 'text-white font-semibold text-sm md:text-base'
    : 'text-primary-100 text-xs'
}

const getSubtextStyles = (isHighlight: boolean) => {
  return isHighlight
    ? 'border-white/40 text-white/80 text-sm italic'
    : 'border-primary-800 text-primary-300 text-xs'
}

export const StatisticCard: React.FC<StatisticCardProps> = memo(
  ({ statistic, isHighlight = false, activeTabId }) => {
    const isTactical = activeTabId === 'tactical'
    const accentColor = isTactical ? 'bg-cta-500' : 'bg-warning-500'

    return (
      <article
        className={`
          relative rounded-xl shadow-xl h-full flex flex-col justify-end flex-shrink-0
          ${getCardStyles(isHighlight, isTactical)}
        `}
      >
        <div
          aria-hidden='true'
          className='absolute inset-0 flex justify-end items-start pr-4 pt-4'
        >
          <div className='text-[100px] md:text-[120px]'>{statistic.icon}</div>
        </div>

        <div className='relative z-10 flex flex-col gap-2'>
          {isHighlight && (
            <div className='flex items-center gap-2 mb-2 text-white/90'>
              <span className='uppercase tracking-widest text-[10px] font-bold border border-white/40 px-2 py-1 rounded bg-white/10'>
                Fator Crítico
              </span>
            </div>
          )}

          <p
            className={`font-black leading-none tracking-tight ${getValueStyles(isHighlight)}`}
          >
            {statistic.value}
          </p>

          <p className={`leading-snug ${getLabelStyles(isHighlight)}`}>
            {statistic.label}
          </p>

          {statistic.subtext && (
            <p
              className={`mt-2 border-l-2 pl-3 ${getSubtextStyles(isHighlight)}`}
            >
              {statistic.subtext}
            </p>
          )}

          {!isHighlight && (
            <div
              aria-hidden
              className={`mt-3 h-1 w-8 rounded-full transition-all duration-300 ${accentColor}`}
            />
          )}
        </div>
      </article>
    )
  }
)

StatisticCard.displayName = 'StatisticCard'

const StatisticsGrid: React.FC<StatisticsGridProps> = memo(
  ({ statistics, activeTabId, gridDescriptionId }) => {
    if (statistics.length === 0) {
      return null
    }

    const [highlightStat, ...regularStats] = statistics
    const STICKY_BASE_OFFSET_REM = 3.5
    const STICKY_INCREMENT_REM = 1

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
)

StatisticsGrid.displayName = 'StatisticsGrid'

const CallToAction: React.FC = memo(() => {
  const handleNavigateToTraining = useCallback(() => {
    const coursesSection = document.querySelector(
      `[data-section="${CSS.escape('courses')}"]`
    )
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (coursesSection instanceof HTMLElement) {
        coursesSection.focus()
      }
    }
  }, [])

  return (
    <footer className='mt-8 text-center'>
      <p className='text-primary-700 text-sm font-medium mb-3'>
        Não faça parte das estatísticas. Seja a diferença.
      </p>
      <AccessibleButton
        onClick={handleNavigateToTraining}
        variant='primary'
        className='bg-cta-600 text-white hover:bg-cta-700 font-bold py-3 px-6 rounded-lg uppercase tracking-wider text-xs transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
        aria-label='Navegar para seção de treinamentos disponíveis'
      >
        Conhecer Treinamentos
      </AccessibleButton>
    </footer>
  )
})

CallToAction.displayName = 'CallToAction'

const WhyItMattersSection: React.FC = memo(() => {
  const [activeTabId, setActiveTabId] = useState<string>('tactical')

  const sectionId = useUniqueId('why-it-matters')
  const titleId = useUniqueId('why-title')
  const subtitleId = useUniqueId('why-subtitle')
  const tabListId = useUniqueId('tab-list')
  const gridDescriptionId = useUniqueId('grid-description')

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTabId(tabId)
  }, [])

  const activeTabData = whyItMattersData.find(tab => tab.id === activeTabId)

  if (!activeTabData) {
    return null
  }

  return (
    <section
      id={sectionId}
      data-section='why-it-matters'
      className='relative w-full bg-gradient-to-b from-primary-50 via-white to-primary-50 py-8 md:py-6 px-4 md:px-8 font-sans'
      aria-labelledby={titleId}
      aria-describedby={subtitleId}
    >
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-0 left-0 w-full h-full opacity-[0.03]'>
          <div
            className='absolute top-20 right-20 w-96 h-96 bg-cta-600 rounded-full blur-[150px]'
            aria-hidden='true'
          />
          <div
            className='absolute bottom-20 left-20 w-96 h-96 bg-success-600 rounded-full blur-[150px]'
            aria-hidden='true'
          />
        </div>
      </div>

      <div className='max-w-7xl mx-auto relative z-10 flex flex-col w-full items-center'>
        <SectionHeader titleId={titleId} subtitleId={subtitleId} />

        <TabSwitcher
          tabs={whyItMattersData}
          activeTabId={activeTabId}
          onTabChange={handleTabChange}
          tabListId={tabListId}
        />

        <div
          id={`${activeTabId}-panel`}
          role='tabpanel'
          aria-labelledby={`${activeTabId}-tab`}
          className='w-4/5'
        >
          <StatisticsGrid
            statistics={activeTabData.statistics}
            activeTabId={activeTabId}
            gridDescriptionId={gridDescriptionId}
          />
        </div>

        <CallToAction />
      </div>
    </section>
  )
})

WhyItMattersSection.displayName = 'WhyItMattersSection'

export default WhyItMattersSection
