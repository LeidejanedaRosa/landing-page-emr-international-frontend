interface SectionHeaderProps {
  titleId: string
  subtitleId: string
}

export function SectionHeader({ titleId, subtitleId }: SectionHeaderProps) {
  return (
    <header className='text-center mb-4'>
      <p
        id={subtitleId}
        className='text-red-600 font-bold tracking-wider uppercase text-xs mb-1'
      >
        A Realidade dos Números
      </p>
      <h2
        id={titleId}
        className='text-2xl font-extrabold text-zinc-900 mb-2 leading-tight'
      >
        VOCÊ ESTÁ PREPARADO PARA{' '}
        <span className='text-transparent text-3xl bg-clip-text bg-gradient-to-r from-red-600 to-red-800'>
          O PIOR CENÁRIO?
        </span>
      </h2>
      <p className='text-zinc-600 max-w-2xl mx-auto text-sm md:text-base'>
        Em operações táticas e emergências remotas, a ignorância é fatal. Os
        dados abaixo demonstram por que a formação em APH Tático e Wilderness
        Medicine não é um luxo, mas uma necessidade de sobrevivência para
        operadores e primeiros respondentes.
      </p>
    </header>
  )
}
