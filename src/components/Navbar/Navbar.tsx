import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.scss'

const sections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'dahaus-deck', label: 'Dahaus Deck' },
  { id: 'dahaus-garana', label: 'Dahaus Garana' },
  { id: 'dahaus-metroatletik', label: 'Dahaus Metroatletik' },
  { id: 'dahaus-events', label: 'Dahaus en tus eventos' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (menuRef.current && !menuRef.current.contains(target) && buttonRef.current && !buttonRef.current.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleNav = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  return (
    <header className={`${styles.navbar} ${scrolled ? 'is-scrolled' : 'is-top'}`}> 
      <div className={styles.logo}>
        <img src="dahausmerida.jpg" alt="Logo" width={28} height={28} />
        <span>DAHAUS</span>
      </div>

      {/* Links desktop */}
      <nav className={styles.links} aria-label="Secciones">
        {sections.map(s => (
          <button key={s.id} onClick={() => handleNav(s.id)} className={styles.menuItem}>
            {s.label}
          </button>
        ))}
      </nav>

      {/* Hamburguesa móvil/tablet */}
      <button
        ref={buttonRef}
        className={styles.hamburgerButton}
        aria-label="Abrir menú"
        aria-controls="navbar-menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        ⋮
      </button>

      {open && (
        <div id="navbar-menu" role="menu" className={styles.menuPanel} ref={menuRef}>
          {sections.map(s => (
            <button
              key={s.id}
              role="menuitem"
              className={styles.menuItem}
              onClick={() => handleNav(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
