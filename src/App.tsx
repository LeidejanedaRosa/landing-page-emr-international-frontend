import Footer from './components/layout/Footer'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import SEO from './utils/SEO'

function App() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <SEO />
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
