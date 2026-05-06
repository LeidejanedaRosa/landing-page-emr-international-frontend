import { useScrollTo } from '../../../hooks/useScrollTo'
import { AccessibleButton } from '../../ui/Accessibility'

export function TrainingCTA() {
  const { scrollTo } = useScrollTo()

  const handleNavigateToTraining = () => {
    scrollTo({ dataSection: 'cursos' })
  }

  return (
    <footer className='mt-8 text-center'>
      <p className='text-primary-700 text-sm font-medium mb-3'>
        Não faça parte das estatísticas. Seja a diferença.
      </p>
      <AccessibleButton
        onClick={handleNavigateToTraining}
        variant='primary'
        className='bg-cta-600 text-white hover:bg-cta-700 py-3 px-6 uppercase tracking-wider text-xs shadow-lg hover:shadow-xl hover:scale-105'
        aria-label='Navegar para seção de treinamentos disponíveis'
      >
        TREINAMENTOS
      </AccessibleButton>
    </footer>
  )
}
