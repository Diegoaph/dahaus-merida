import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className="container" style={{ width: '100%' }}>
        <h1 id="hero-title" className={styles.title}>La terraza más cool de Mérida</h1>
        <a 
          href="/menu.pdf" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.cta}
        > <p>Ver Menú </p>
        <img className={styles.menuIcon} src="/cutlery.svg" alt="menu Icon" width={24} height={24} />
      </a>
      </div>
    </section>
  );
}