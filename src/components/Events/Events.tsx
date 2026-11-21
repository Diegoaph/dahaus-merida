import styles from './Events.module.scss'
import { WHATSAPP_URLS } from '../../config'

export default function Events() {
  return (
    <section id="eventos" className={styles.section} aria-labelledby="eventos-title">
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.eyebrow}>Eventos</p>
          <h2 id="eventos-title" className={styles.title}>
            Dahaus en tu evento.
          </h2>
          <p className={styles.body}>
            Llevamos la sede móvil a bodas, quinceaños, eventos corporativos y celebraciones
            privadas. El mismo pan de papa y la misma atención en el espacio
            que elijas.
          </p>
          <a
            className={styles.cta}
            href={WHATSAPP_URLS.event}
            target="_blank"
            rel="noopener noreferrer"
          >
            Reservar tu fecha
          </a>
        </div>

        <div className={styles.gallery}>
          <img
            className={styles.photoMain}
            src="/eventos.webp"
            alt="Parrilla y servicio de Dahaus montados en un evento"
            loading="lazy"
            width={1024}
            height={1536}
          />
          <img
            className={styles.photoSide}
            src="/eventos.jpeg"
            alt="Mesa de eventos con comida de Dahaus"
            loading="lazy"
            width={1280}
            height={704}
          />
        </div>
      </div>
    </section>
  )
}