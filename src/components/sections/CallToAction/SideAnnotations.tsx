import { sideLabels } from './constants'

export function SideAnnotations() {
  return (
    <div className='hidden lg:flex flex-col justify-center items-end gap-20'>
      {sideLabels.map(([first, second]) => (
        <div key={`${first}-${second}`} className='flex items-center gap-3'>
          <div>
            <span className='block text-xs font-bold tracking-widest text-cta-500 uppercase text-right'>
              {first}
            </span>
            <span className='block text-xs font-bold tracking-widest text-white/80 uppercase text-right'>
              {second}
            </span>
          </div>
          <div className='flex items-center gap-1.5' aria-hidden='true'>
            <div className='w-4 h-4 rounded-full border border-white/60 flex items-center justify-center'>
              <div className='w-1 h-1 rounded-full bg-white/60' />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
