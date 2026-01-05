import { INTERNATIONAL_CREDENTIALS, OPERATIONAL_FORCES } from '../constants'
import { CredentialsList } from './CredentialsList'
import { InstructorHero } from './InstructorHero'

export function AboutContent() {
  return (
    <article className='w-full px-6 py-6 sm:px-8 lg:px-10 space-y-4'>
      <InstructorHero />

      <div className='space-y-4'>
        <CredentialsList
          headingId='operational-forces-heading'
          title='Capacitação para Forças de Referência'
          items={OPERATIONAL_FORCES}
          icon='check'
          ariaLabel='Lista de forças operacionais treinadas'
        />
        <CredentialsList
          headingId='credentials-heading'
          title='Credenciais Internacionais'
          description='Instrutor credenciado por instituições de referência mundial em educação e resposta a traumas:'
          items={INTERNATIONAL_CREDENTIALS}
          icon='star'
          ariaLabel='Lista de credenciais internacionais'
        />
      </div>
    </article>
  )
}
