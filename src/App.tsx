import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import SEO from './components/SEO'
import Services from './components/Services'

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
