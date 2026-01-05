import { memo } from 'react'

import { type StatisticData } from '../../../data/whyItMattersData'

interface StatisticCardProps {
  statistic: StatisticData
  isHighlight?: boolean
  activeTabId: string
}

function getCardStyles(isHighlight: boolean, isTactical: boolean) {
  if (isHighlight) {
    const highlightGradient = isTactical
      ? 'from-cta-700 to-cta-500'
      : 'from-warning-700 to-warning-500'
    return `p-4 md:p-6 bg-gradient-to-br ${highlightGradient} min-h-[250px]`
  }
  return 'p-3 bg-primary-700 border border-primary-800 hover:bg-primary-900 transition min-h-[130px]'
}

function getValueStyles(isHighlight: boolean) {
  return isHighlight ? 'text-white text-3xl md:text-4xl' : 'text-white text-xl'
}

function getLabelStyles(isHighlight: boolean) {
  return isHighlight
    ? 'text-white font-semibold text-sm md:text-base'
    : 'text-primary-100 text-xs'
}

function getSubtextStyles(isHighlight: boolean) {
  return isHighlight
    ? 'border-white/40 text-white/80 text-sm italic'
    : 'border-primary-800 text-primary-300 text-xs'
}

function StatisticCardComponent({
  statistic,
  isHighlight = false,
  activeTabId,
}: StatisticCardProps) {
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
            aria-hidden='true'
            className={`mt-3 h-1 w-8 rounded-full transition-all duration-300 ${accentColor}`}
          />
        )}
      </div>
    </article>
  )
}

export const StatisticCard = memo(StatisticCardComponent)
