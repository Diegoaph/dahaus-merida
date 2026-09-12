import styles from './Menu.module.scss'
import { MENU_PATH } from '../../config'

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

        <a
          className={styles.cta}
          href={MENU_PATH}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver menú (PDF)
        </a>
        <p className={styles.note}>Precios en USD · Los mismos en todas las sedes</p>

        <div className={styles.placeholder} aria-hidden="true">
          <p className={styles.placeholderTag}>Próximamente</p>
          <p className={styles.placeholderText}>Los favoritos de la cancha</p>
        </div>
      </div>
    </section>
  )
}