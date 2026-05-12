import { AccessibleLink } from '../../../ui/Accessibility'
import type { CourseActionsProps } from '../types'

export const CourseActions = ({
  whatsappUrl,
  title,
  levelCode,
  styles,
  enrollmentStatus,
}: CourseActionsProps) => {
  const isOpen = enrollmentStatus === 'open'

  return (
    <div className='flex flex-col gap-3 pt-2'>
      <AccessibleLink
        href={whatsappUrl}
        external
        className={`flex items-center justify-center w-full py-3.5 px-4 font-bold rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 ${
          isOpen
            ? `${styles.primary} ${styles.primaryHover} ${styles.primaryText}`
            : 'bg-transparent border-2 border-primary-500 text-primary-300 hover:bg-primary-700 hover:text-white'
        } ${styles.ring}`}
        aria-label={
          isOpen
            ? `Inscreva-se no curso ${title} - ${levelCode} via WhatsApp (abre em nova janela)`
            : `Manifestar interesse no curso ${title} - ${levelCode} via WhatsApp (abre em nova janela)`
        }
      >
        {isOpen ? 'Inscreva-se' : 'Tenho Interesse'}
      </AccessibleLink>
    </div>
  )
}
