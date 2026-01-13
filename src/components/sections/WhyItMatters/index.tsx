import { useState } from 'react'

import { whyItMattersData } from '../../../data/whyItMattersData'
import { useUniqueId } from '../../../hooks/useAccessibility'
import { SectionHeader } from './SectionHeader'
import { StatisticsGrid } from './StatisticsGrid'
import { TabSwitcher } from './TabSwitcher'
import { TrainingCTA } from './TrainingCTA'

export default function WhyItMattersSection() {
  const [activeTabId, setActiveTabId] = useState('tactical')

  const sectionId = useUniqueId('why-it-matters')
  const titleId = useUniqueId('why-title')
  const subtitleId = useUniqueId('why-subtitle')
  const tabListId = useUniqueId('tab-list')
  const gridDescriptionId = useUniqueId('grid-description')

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

      <div className='max-w-screen-2xl mx-auto relative z-10 flex flex-col w-full items-center'>
        <SectionHeader titleId={titleId} subtitleId={subtitleId} />

        <TabSwitcher
          tabs={whyItMattersData}
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
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

        <TrainingCTA />
      </div>
    </section>
  )
}

export { StatisticCard } from './StatisticCard'
