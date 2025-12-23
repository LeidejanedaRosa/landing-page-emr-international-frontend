import { memo } from 'react'

interface TestimonialsHeaderProps {
  titleId: string
  descriptionId: string
}

const TestimonialsHeader = memo(
  ({ titleId, descriptionId }: TestimonialsHeaderProps) => (
    <header className='text-center mb-12'>
      <h2
        id={titleId}
        className='text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-4'
      >
        O que dizem nossos alunos
      </h2>
      <p
        id={descriptionId}
        className='text-lg text-primary-600 max-w-2xl mx-auto'
      >
        Profissionais de todo o Brasil confiam na EMR Internacional para sua
        formação em atendimento pré-hospitalar
      </p>
    </header>
  )
)

TestimonialsHeader.displayName = 'TestimonialsHeader'

export default TestimonialsHeader
