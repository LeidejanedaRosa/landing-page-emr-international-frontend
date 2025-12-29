import { memo } from 'react'

interface CourseTypeTagProps {
  courseType: 'tatico' | 'remoto'
}

const courseTypeConfig = {
  tatico: {
    label: 'Tático',
    className: 'bg-red-600 text-white',
  },
  remoto: {
    label: 'Remoto',
    className: 'bg-yellow-500 text-black',
  },
} as const

export const CourseTypeTag = memo<CourseTypeTagProps>(({ courseType }) => {
  const config = courseTypeConfig[courseType]

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded ${config.className}`}
    >
      {config.label}
    </span>
  )
})

CourseTypeTag.displayName = 'CourseTypeTag'
