import styles from './Menu.module.scss'
import { MENUS } from '../../config'

type MenuKey = keyof typeof MENUS

const MENU_CARDS: { key: MenuKey; name: string; text: string; tag?: string }[] = [
  {
    key: 'hamburguesas',
    name: 'Hamburguesas',
    text: 'Crispy, clásicas, doppelt y especiales con pan de papa.',
  },
  {
    key: 'platos',
    name: 'Platos',
    text: 'Parrillas, cortes de res y platos fuertes con contornos.',
  },
  {
    key: 'bebidas',
    name: 'Bebidas',
    text: 'Cócteles, cervezas, batidos, frappés y más.',
  },
  {
    key: 'simplex',
    name: 'Simplex',
    text: 'Hamburguesas con papas rayadas incluidas.',
    tag: 'Lunes a viernes · hasta 7:00 PM',
  },
]

export default function Menu() {
  return (
    <section id="menu" className={styles.section} aria-labelledby="menu-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>El menú</p>
        <h2 id="menu-title" className={styles.title}>
          Pan de papa, parrilla y más.
        </h2>
        <p className={styles.lead}>
          Elegí el menú que quieras ver: todo con pan de papa, horneado a diario.
        </p>

        <div className={styles.cards}>
          {MENU_CARDS.map((menu) => (
            <article
              key={menu.key}
              className={styles.card}
              aria-labelledby={`menu-card-${menu.key}`}
            >
              <div className={styles.cardHead}>
                <h3 id={`menu-card-${menu.key}`} className={styles.cardTitle}>
                  {menu.name}
                </h3>
                {menu.tag ? <span className={styles.cardTag}>{menu.tag}</span> : null}
              </div>
              <p className={styles.cardText}>{menu.text}</p>
              <a
                className={styles.cardCta}
                href={MENUS[menu.key].view}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver menú
              </a>
            </article>
          ))}
        </div>

        <p className={styles.note}>
          Precios en USD · Los mismos en todas las sedes · Menú Simplex lunes a viernes hasta las
          7:00 PM
        </p>
      </div>
    </section>
  )
}