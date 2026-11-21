import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.scss'
import { WHATSAPP_URLS } from '../../config'

const NAV_LINKS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'sedes', label: 'Sedes' },
  { id: 'menu', label: 'Menú' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'delivery', label: 'Delivery' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close()
    })
    return () => document.removeEventListener('keydown', close)
  }, [open])

  return (
    <header className={styles.header}>
      <a href="#hero" className={styles.brand}>
        <img className={styles.mark} src="/favicon.png" alt="" width={34} height={34} />
        <span className={styles.wordmark}>DAHAUS</span>
      </a>

      <nav className={styles.links} aria-label="Secciones de la página">
        {NAV_LINKS.map((link) => (
          <a key={link.id} className={styles.link} href={`#${link.id}`}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className={styles.cta} href={WHATSAPP_URLS.delivery} target="_blank" rel="noopener noreferrer">
        Pide por WhatsApp
      </a>

      <button
        type="button"
        className={styles.burger}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-controls="nav-panel"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </button>

      {open && (
        <div id="nav-panel" ref={panelRef} className={styles.panel}>
          <nav className={styles.panelLinks} aria-label="Menú de navegación">
            {NAV_LINKS.map((link) => (
              <a key={link.id} className={styles.panelLink} href={`#${link.id}`} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
          <a
            className={styles.cta}
            href={WHATSAPP_URLS.delivery}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Pide por WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}