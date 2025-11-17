import React from 'react'

import FundoAbout from '../../assets/fundo_about.png'
import Juan from '../../assets/Juan.png'

// const useIntersectionObserver = () => {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true)
//         }
//       },
//       { threshold: 0.2 }
//     )

//     const section = document.getElementById('sobre')
//     if (section) {
//       observer.observe(section)
//     }

//     return () => observer.disconnect()
//   }, [])

//   return isVisible
// }

// const CheckIcon: React.FC = () => (
//   <svg
//     className='flex-shrink-0 w-6 h-6 text-red-600 mt-1 mr-3'
//     fill='none'
//     stroke='currentColor'
//     viewBox='0 0 24 24'
//     xmlns='http://www.w3.org/2000/svg'
//     strokeWidth={2.5}
//   >
//     <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
//   </svg>
// )

const ShieldCheckIcon: React.FC = () => (
  <svg
    className='flex-shrink-0 w-6 h-6 text-red-600 mt-1 mr-3'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.314-.213-2.622-.62-3.86a11.99 11.99 0 00-2.09-3.489A11.959 11.959 0 0115 2.714a11.959 11.959 0 01-3.402 3.223z'
    />
  </svg>
)
const ExpertiseList: React.FC = () => {
  const items = [
    {
      id: 1,
      text: (
        <>
          <strong>Resgate Tático</strong> em zonas de conflito e atendimento
          pré-hospitalar em <strong>ambientes remotos e de alto risco</strong>.
        </>
      ),
    },
    {
      id: 2,
      text: (
        <>
          <strong>Capacitação de forças operacionais</strong> — incluindo{' '}
          <strong>Corpo de Bombeiros</strong>,{' '}
          <strong>Exército Brasileiro</strong> e <strong>Força Nacional</strong>{' '}
          — com foco em protocolos de emergência real.
        </>
      ),
    },
    {
      id: 3,
      text: (
        <>
          <strong>Certificações internacionais</strong> reconhecidas por{' '}
          <strong>HSI</strong>, <strong>American College of Surgeons</strong> e{' '}
          <strong>American Red Cross</strong>.
        </>
      ),
    },
  ]

  return (
    <ul
      className='space-y-5 text-base md:text-lg leading-relaxed'
      role='list'
      aria-label='Principais áreas de especialização'
    >
      {items.map(({ id, text }) => (
        <li key={id} className='flex items-start group'>
          <ShieldCheckIcon />
          <span className='transition-colors group-hover:text-red-700 text-gray-900'>
            {text}
          </span>
        </li>
      ))}
    </ul>
  )
}

const TextContent: React.FC = () => {
  return (
    <div className='lg:mt-0 transition-all duration-1000 delay-300 w-full'>
      <span className='text-sm sm:text-base font-semibold text-red-600 uppercase tracking-wider'>
        Quem está por trás da
      </span>

      <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight'>
        EMR INTERNACIONAL
      </h2>
      <p className='text-3xl text-black border-l-4 border-red-500 pl-4 drop-shadow-lg mb-6'>
        Juan Regenerati
      </p>
      <p className='text-lg mb-8 text-gray-700'>
        {' '}
        Formado em Saúde e Segurança do Trabalho e Paramédico, é instrutor
        certificado em emergências médicas com vasta experiência e
        especialização em:
      </p>

      <hr className='border-gray-300 mb-8' />

      <ExpertiseList />
    </div>
  )
}

const About: React.FC = () => {
  return (
    <section
      id='sobre'
      className='min-h-screen bg-gradient-to-br from-gray-400 to-white relative flex flex-col lg:flex-row-reverse lg:items-center'
    >
      <div
        className='w-full h-[60vh] lg:h-[100vh] lg:w-1/2 relative transition-transform duration-1000 ease-out overflow-hidden flex items-center justify-center lg:overflow-visible'
        style={{
          backgroundImage: `url(${FundoAbout})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <img
          src={Juan}
          className='absolute h-full w-full object-cover md:object-top lg:hidden'
          alt='Juan'
        />
      </div>
      <img
        src={Juan}
        className='absolute h-[100%] w-auto object-cover lg:block hidden '
        alt='Juan'
      />
      <div className='relative w-full lg:w-1/2 lg:h-full'>
        <div className='flex flex-col mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full py-12 lg:py-0'>
          <TextContent />
        </div>
      </div>
    </section>
  )
}
export default About
