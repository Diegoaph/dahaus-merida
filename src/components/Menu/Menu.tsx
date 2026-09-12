import styles from './Menu.module.scss'
import { MENU_VIEW_PATH, MENU_SIMPLEX_VIEW_PATH } from '../../config'

export default function Menu() {
  return (
    <section id="menu" className={styles.section} aria-labelledby="menu-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>El menú</p>
        <h2 id="menu-title" className={styles.title}>
          Pan de papa, parrilla y más.
        </h2>
        <p className={styles.lead}>
          Hamburguesas premium, cortes de parrilla, ensaladas, tequeños, café y bebidas.
        </p>

        <div className={styles.ctas}>
          <a
            className={styles.cta}
            href={MENU_VIEW_PATH}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver menú (PDF)
          </a>
          <a
            className={styles.ctaGhost}
            href={MENU_SIMPLEX_VIEW_PATH}
            target="_blank"
            rel="noopener noreferrer"
          >
            Menú Simplex (PDF)
          </a>
        </div>
        <p className={styles.note}>
          Precios en USD · Los mismos en todas las sedes · Menú Simplex lunes a viernes hasta las
          7:00 PM
        </p>
      </div>
    </section>
  )
}