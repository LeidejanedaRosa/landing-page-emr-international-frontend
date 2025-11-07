import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import { useCurrentSection } from './hooks/useCurrentSection'
import SEO from './utils/SEO'

function App() {
  const currentSection = useCurrentSection([
    'hero',
    'sobre',
    'servicos',
    'contato',
  ])

  return (
    <div className='min-h-screen bg-gray-50'>
      <SEO />
      <Header
        currentSection={
          currentSection as 'home' | 'sobre' | 'servicos' | 'contato'
        }
      />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
