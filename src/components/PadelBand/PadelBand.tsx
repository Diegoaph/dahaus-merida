import styles from './PadelBand.module.scss'

export default function PadelBand() {
  return (
    <section className={styles.band} aria-labelledby="padel-title">
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.eyebrow}>Dentro de la cancha</p>
          <h2 id="padel-title" className={styles.title}>
            Antes, durante y después del partido.
          </h2>
          <p className={styles.body}>
            Dahaus vive dentro de Garana Padel Club y Metro Atletik. Sales de la cancha,
            estiras las piernas y en dos pasos la parrilla ya está al fuego.
          </p>
          <p className={styles.body}>
            Por eso el pan de papa, las hamburguesas premium y las parrillas no son solo comida:
            son el tercer tiempo de tu set. Al aire libre, con el día abierto o con las luces de
            la cancha de fondo.
          </p>
        </div>

        <figure className={styles.figure}>
          <img
            className={styles.photo}
            src="/garana.webp"
            alt="Terraza de Dahaus Garana dentro del Garana Padel Club"
            loading="lazy"
            width={900}
            height={1350}
          />
        </figure>
      </div>
    </section>
  )
}