import { BookOpen } from 'lucide-react'

import { AccessibleButton } from '../../../ui/AccessibleButton'
import { ABOUT_METRICS } from '../constants'
import { useScrollToSection } from '../hooks/useScrollToSection'
import { MetricCard } from './MetricCard'

export function AboutMetrics() {
  const { scrollTo } = useScrollToSection()

  const handleScrollToCourses = () => {
    scrollTo('courses')
  }

  return (
    <section
      aria-labelledby='metrics-heading'
      className='w-full space-y-4 pt-4'
    >
      <h3 id='metrics-heading' className='sr-only'>
        Estatísticas de experiência profissional
      </h3>
      <div className='flex flex-row gap-2 sm:gap-3'>
        {ABOUT_METRICS.map(({ id, value, label, ariaLabel, highlight }) => (
          <MetricCard
            key={id}
            value={value}
            label={label}
            ariaLabel={ariaLabel}
            highlight={highlight}
          />
        ))}
        <div className='flex-1 backdrop-blur-sm bg-cta-600 hover:bg-cta-700 px-2 py-3 sm:px-4 sm:py-4 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group'>
          <AccessibleButton
            onClick={handleScrollToCourses}
            variant='ghost'
            className='w-full h-full text-white hover:text-white hover:bg-transparent font-bold text-center flex flex-col items-center justify-center gap-2 focus:text-white focus:bg-transparent'
            aria-label='Conheça os cursos de emergências médicas da EMR Internacional'
          >
            <BookOpen
              className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white group-hover:text-white'
              aria-hidden='true'
            />
            <span className='text-[8px] sm:text-[10px] md:text-xs uppercase tracking-wide text-white group-hover:text-white leading-tight'>
              Conheça Nossos Cursos
            </span>
          </AccessibleButton>
        </div>
      </div>
    </section>
  )
}
