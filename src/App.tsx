import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
// Importando os componentes simples para demonstração

import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import SEO from './utils/SEO'

function App() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <SEO />
      <Header />
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
