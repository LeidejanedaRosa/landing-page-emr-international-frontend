import { ArrowRight, Download } from 'lucide-react'

import { AccessibleLink } from '../../../ui/Accessibility'
import type { CourseActionsProps } from '../types'

export const CourseActions = ({
  whatsappUrl,
  title,
  levelCode,
  brochureLink,
  styles,
  enrollmentStatus,
}: CourseActionsProps) => {
  const isOpen = enrollmentStatus === 'open'

  return (
    <div className='flex flex-col gap-3 pt-2'>
      <AccessibleLink
        href={whatsappUrl}
        target='_blank'
        rel='noopener noreferrer'
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
        <ArrowRight className='w-5 h-5 ml-2' aria-hidden='true' />
      </AccessibleLink>

      <AccessibleLink
        href={brochureLink}
        target='_blank'
        rel='noopener noreferrer'
        className={`flex items-center justify-center w-full py-2 text-sm font-medium ${styles.secondary} ${styles.secondaryHover} ${styles.ring} transition-colors gap-2`}
        aria-label={`Baixar brochura em PDF do curso ${title} (abre em nova janela)`}
      >
        <Download className='w-4 h-4' aria-hidden='true' />
        <span>Baixar PDF técnico</span>
      </AccessibleLink>
    </div>
  )
}
