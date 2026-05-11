import skullIcon from '../../../assets/reaper_protocol/icone.png'

export function PrincipleBox() {
  return (
    <div className='relative flex items-center gap-4 bg-black/70 pl-0 pr-5 py-3 mb-8 max-w-lg'>
      <div
        className='absolute top-0 left-0 right-0 h-px bg-cta-700'
        aria-hidden='true'
      />
      <div
        className='absolute bottom-0 left-0 right-0 h-px bg-cta-700'
        aria-hidden='true'
      />
      <img
        src={skullIcon}
        alt=''
        className='relative z-20 flex-shrink-0 w-20 h-20'
      />
      <div className='relative'>
        <p className='text-xs sm:text-sm font-bold tracking-widest text-white uppercase'>
          BASEIA-SE NO PRINCÍPIO:
        </p>
        <p className='text-xs sm:text-sm font-bold tracking-widest leading-snug uppercase'>
          <span className='text-cta-500'>ERROS CEIFAM VIDAS</span>
          <span className='text-white'>{', ACERTOS OFERECEM UMA CHANCE.'}</span>
        </p>
      </div>
    </div>
  )
}
