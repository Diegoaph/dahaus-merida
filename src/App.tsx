import styles from './App.module.scss'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Section from './components/Section/Section'
import Footer from './components/Footer/Footer'
import Whatsapp from './components/Whatsapp/Whatsapp'

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <Section id="dahaus-deck" title="Dahaus Deck">
         <div> <p>Ubicada en la avenida Centenario con calle Industria, en Ejido, justo al lado de Empire Keeway. Es un espacio amplio y versátil que ofrece un menú variado de hamburguesas con pan de papa, ensaladas, parrillas con cortes premium, café, tequeños y bebidas alcohólicas. <br /><br /> Cuenta con salón para fiestas privadas, alquiler para celebraciones especiales y amplio estacionamiento gratuito. <br /><br /><strong>Actualmente esta sede se encuentra en proceso de remodelación y no está abierta al público.</strong></p><a
        href="https://maps.app.goo.gl/1MXEtxf3R6kJDKBW7"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.marker}
        aria-label="Ubicación de Dahaus Garana"
      >
       Cómo llegar <img src="/marker.svg" alt="map marker Icon" width={24} height={24} />
      </a></div>
          <img className={styles.image} src="/deck.png" alt="/dahausmerida.jpg" /></Section>
        <Section id="dahaus-garana" title="Dahaus Garana">
        
          <img className={styles.image} src="/garana.png" alt="/dahausmerida.jpg" /><div><p>Ubicada en la avenida Andrés Bello, Mérida, dentro del complejo deportivo Garana Padel Club. <br /> <br />Esta sede está pensada para acompañar la experiencia deportiva, con un servicio enfocado en hamburguesas, ideales para disfrutar antes o después de los partidos.</p><a
        href="https://maps.app.goo.gl/2ksuJQxwfqc3X2DS6"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.marker}
        aria-label="Ubicación de Dahaus Garana"
      >
       Cómo llegar <img src="/marker.svg" alt="map marker Icon" width={24} height={24} />
      </a></div></Section>
        <Section id="dahaus-metroatletik" title="Dahaus Metroatletik">
        <div> <p>Situada en la avenida principal Zumba, en Mérida, dentro del complejo deportivo Metro Atletik, esta sede comparte el enfoque deportivo y funcional.<br /> <br /> Desde esta ubicación se gestionan los pedidos de delivery y envíos a domicilio, convirtiéndola en el punto clave para llevar la experiencia Dahaus directamente hasta tu casa.</p><a
        href="https://maps.app.goo.gl/kgUVixnvaWECi2Cq9"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.marker}
        aria-label="Ubicación de Dahaus Metroatletik"
      >
       Cómo llegar <img src="/marker.svg" alt="map marker Icon" width={24} height={24} />
      </a></div><img className={styles.image}  src="/metro.png
          " alt="/dahausmerida.jpg" />
        </Section>
        <Section id="dahaus-events" title="Dahaus en tus eventos">
        <img className={styles.image} src="/eventos.png" alt="dahausmerida.jpg" /><p>Lleva la experiencia Dahaus a tu celebración con nuestra sede móvil, diseñada para convertir cualquier espacio en un evento inolvidable. Atendemos bodas, quinceaños, fiestas empresariales, eventos corporativos y celebraciones privadas, tanto en interiores como en exteriores, con el mismo estándar premium que distingue a Dahaus.<br /> <br /> Los eventos más TOP de Mérida ya nos eligen y nuestra agenda se llena rápido: asegura tu fecha hoy y no te quedes fuera de la experiencia que todos están buscando.</p>
          </Section>
      </main>
      <Footer />
      <Whatsapp />
    </div>
  )
}

export default App
