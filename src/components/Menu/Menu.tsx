import { useEffect, useState } from 'react'
import styles from './Menu.module.scss'
import { MENUS } from '../../config'

type MenuCard = {
  id: string
  name: string
  text: string
  tag?: string
  view?: string
}

const MENU_CARDS: MenuCard[] = [
  {
    id: 'hamburguesas',
    name: 'Hamburguesas',
    text: 'Crispy, clásicas, doppelt y especiales con pan de papa.',
    view: MENUS.hamburguesas.view,
  },
  {
    id: 'platos',
    name: 'Platos',
    text: 'Parrillas, cortes de res y platos fuertes con contornos.',
    view: MENUS.platos.view,
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    text: 'Cócteles, cervezas, batidos, frappés y más.',
    view: MENUS.bebidas.view,
  },
  {
    id: 'simplex',
    name: 'Simplex',
    text: 'Hamburguesas con papas rayadas incluidas.',
    tag: 'Lunes a viernes · hasta 7:00 PM',
    view: MENUS.simplex.view,
  },
  {
    id: 'desayunos',
    name: 'Desayunos',
    text: 'Café, pan de papa, fuertes y dulces desde temprano.',
    tag: 'Llega el lunes',
  },
]

export default function Menu() {
  const [breakfastOpen, setBreakfastOpen] = useState(false)

  useEffect(() => {
    if (!breakfastOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setBreakfastOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [breakfastOpen])

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
          {MENU_CARDS.map((menuCard) => (
            <article
              key={menuCard.id}
              className={styles.card}
              aria-labelledby={`menu-card-${menuCard.id}`}
            >
              <div className={styles.cardHead}>
                <h3 id={`menu-card-${menuCard.id}`} className={styles.cardTitle}>
                  {menuCard.name}
                </h3>
                {menuCard.tag ? <span className={styles.cardTag}>{menuCard.tag}</span> : null}
              </div>
              <p className={styles.cardText}>{menuCard.text}</p>
              {menuCard.view ? (
                <a
                  className={styles.cardCta}
                  href={menuCard.view}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver menú
                </a>
              ) : (
                <button
                  type="button"
                  className={styles.cardCta}
                  aria-haspopup="dialog"
                  onClick={() => setBreakfastOpen(true)}
                >
                  Ver carta
                </button>
              )}
            </article>
          ))}
        </div>

        <p className={styles.note}>
          Precios en USD · Los mismos en todas las sedes · Menú Simplex lunes a viernes hasta las
          7:00 PM
        </p>
      </div>

      {breakfastOpen ? (
        <div
          className={styles.overlay}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setBreakfastOpen(false)
          }}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="breakfast-title"
          >
            <p className={styles.modalEyebrow}>Desayunos</p>
            <h3 id="breakfast-title" className={styles.modalTitle}>
              En camino, con pan de papa.
            </h3>
            <p className={styles.modalText}>
              La carta de desayunos de Dahaus Garana llega el lunes. ¡Volvé a pasar!
            </p>
            <button
              type="button"
              className={styles.modalClose}
              autoFocus
              onClick={() => setBreakfastOpen(false)}
            >
              Entendido
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}