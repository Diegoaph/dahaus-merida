import styles from './App.module.scss'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import PadelBand from './components/PadelBand/PadelBand'
import Locations from './components/Locations/Locations'
import Menu from './components/Menu/Menu'
import Delivery from './components/Delivery/Delivery'
import Events from './components/Events/Events'
import Visit from './components/Visit/Visit'
import Footer from './components/Footer/Footer'
import Whatsapp from './components/Whatsapp/Whatsapp'

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main>
        <Hero />
        <PadelBand />
        <Locations />
        <Menu />
        <Delivery />
        <Events />
        <Visit />
      </main>
      <Footer />
      <Whatsapp />
    </div>
  )
}

export default App