import type { MetricCardProps } from '../types'

export function MetricCard({
  value,
  label,
  ariaLabel,
  highlight = false,
}: MetricCardProps) {
  return (
    <div
      className={`flex-1 backdrop-blur-sm px-2 py-3 sm:px-4 sm:py-4 flex flex-col items-center justify-center gap-1 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 ${highlight ? 'bg-cta-600' : 'bg-gray-100/95'}`}
      role='group'
      aria-label={ariaLabel}
    >
      <strong
        className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${highlight ? 'text-white' : 'text-cta-600'}`}
      >
        {value}
      </strong>
      <p
        className={`text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wide text-center leading-tight ${highlight ? 'text-white' : 'text-black'}`}
      >
        {label}
      </p>
    </div>
  )
}
