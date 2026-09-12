import styles from './Hero.module.scss'
import { WHATSAPP_URLS } from '../../config'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.scrim}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Hamburguesas premium en Mérida</p>
          <h1 id="hero-title" className={styles.title}>
            Donde termina el partido, empieza Dahaus.
          </h1>
          <p className={styles.sub}>
            Hamburguesas premium junto a las canchas de padel de Mérida y delivery a toda la ciudad.
          </p>
          <div className={styles.ctas}>
            <a className={styles.ctaGhost} href="#menu">
              Ver menú
            </a>
            <a
              className={styles.ctaAmber}
              href={WHATSAPP_URLS.delivery}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pide por WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className={styles.microbar}>
        <p className={styles.microItem}>Delivery jueves a martes, 4:30 p.m. a 10:30 p.m.</p>
        <p className={styles.microItem}>Cobertura: toda Mérida y Ejido</p>
      </div>
    </section>
  )
}