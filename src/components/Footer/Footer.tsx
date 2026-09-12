import styles from './Footer.module.scss'
import { INSTAGRAM, DEV_SITE, WHATSAPP_URLS } from '../../config'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.wordmark}>DAHAUS</p>
          <p className={styles.tagline}>
            Hamburguesas premium junto a las canchas de padel de Mérida.
          </p>
          <div className={styles.socials}>
            <a
              className={styles.social}
              href={WHATSAPP_URLS.delivery}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a
              className={styles.social}
              href={INSTAGRAM.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {INSTAGRAM.user}
            </a>
          </div>
        </div>

        <div className={styles.hours}>
          <p className={styles.hoursTitle}>Horarios</p>
          <dl className={styles.hoursList}>
            <div className={styles.hoursRow}>
              <dt>Garana</dt>
              <dd>Todos los días, 8:00 a.m. a 11:30 p.m.</dd>
            </div>
            <div className={styles.hoursRow}>
              <dt>Metroatletik</dt>
              <dd>Martes a domingo, 3:00 p.m. a 11:30 p.m.</dd>
            </div>
            <div className={styles.hoursRow}>
              <dt>Delivery</dt>
              <dd>Todos los días, 12:00 a 10:00 p.m.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Dahaus Mérida. Todos los derechos reservados.</p>
        <p>
          Desarrollo web{' '}
          <a
            className={styles.devLink}
            href={DEV_SITE.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {DEV_SITE.name}
          </a>
        </p>
      </div>
    </footer>
  )
}