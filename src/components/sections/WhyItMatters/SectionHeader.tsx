interface SectionHeaderProps {
  titleId: string
  subtitleId: string
}

export function SectionHeader({ titleId, subtitleId }: SectionHeaderProps) {
  return (
    <header className='text-center mb-4'>
      <span className='text-cta-500 font-semibold tracking-wider uppercase text-sm mb-2 block'>
        POR QUE ISSO IMPORTA
      </span>
      <h2
        id={titleId}
        className='text-3xl md:text-4xl lg:text-5xl tracking-tight text-zinc-900 mb-2'
      >
        Você está preparado para{' '}
        <span className='font-capture-it'>O PIOR CENÁRIO?</span>
      </h2>
      <p
        id={subtitleId}
        className='text-zinc-600 max-w-4xl mx-auto text-sm md:text-base'
      >
        Em operações táticas e em áreas remotas, a ignorância é fatal. Os dados
        abaixo demonstram por que a formação em emergência não é um luxo, mas
        uma necessidade de sobrevivência para operadores de básicos a avançados.
      </p>
    </header>
  )
}
