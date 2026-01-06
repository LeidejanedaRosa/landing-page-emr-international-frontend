import { INDICATOR_SEGMENTS } from '../constants'
import type { LevelIndicatorProps, LevelIndicatorsProps } from '../types'

const LevelIndicator = ({ label, value, filledColor }: LevelIndicatorProps) => (
  <div className='flex items-center gap-2'>
    <span className='text-xs text-primary-400 w-20 flex-shrink-0'>{label}</span>
    <div
      className='flex gap-0.5 flex-1'
      role='meter'
      aria-label={`${label}: ${value} de ${INDICATOR_SEGMENTS}`}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={INDICATOR_SEGMENTS}
    >
      {Array.from({ length: INDICATOR_SEGMENTS }, (_, i) => (
        <div
          key={i}
          className={`h-2 flex-1 rounded-sm ${i < value ? filledColor : 'bg-primary-700'}`}
          aria-hidden='true'
        />
      ))}
    </div>
    <span className='text-xs text-primary-400 w-8 text-right'>
      {value}/{INDICATOR_SEGMENTS}
    </span>
  </div>
)

export const LevelIndicators = ({
  levelData,
  styles,
}: LevelIndicatorsProps) => (
  <div className='space-y-2 mb-4'>
    <LevelIndicator
      label='Imersividade'
      value={levelData.immersivity}
      filledColor={styles.barFilled}
    />
    <LevelIndicator
      label='Dificuldade'
      value={levelData.difficulty}
      filledColor={styles.barFilled}
    />
    <LevelIndicator
      label='Habilidade'
      value={levelData.skill}
      filledColor={styles.barFilled}
    />
  </div>
)
