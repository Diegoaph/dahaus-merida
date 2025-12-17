import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.copy}>© {new Date().getFullYear()} Todos los derechos reservados DAHAUS.</p>
      </div>
      <p>
        Desarrollo web Diego Pacheco 2025{' '}
        <a
          className={styles.copy}
          href='mailto:Dev.DiegoPacheco@gmail.com?subject=¡¡Me%20ha%20gustado%20una%20de%20tus%20webs!!&amp;body=%20Diego,%20Me%20gustar%C3%ADa%20saber%20mas%20sobre%20tus%20servicios'>
          <b>&lt;D/&gt;</b>
        </a>
      </p>
      <a
        href="https://www.instagram.com/dahausmerida?igsh=bzVmbnl1ZnJ6Mjhi"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.instagram}
        aria-label="Instagram de Dahaus Mérida"
      >
        <img src="/instagram_icon.svg" alt="Instagram Icon" width={24} height={24} />
      </a>
    </footer>
  );
}