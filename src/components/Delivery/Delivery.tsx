import styles from './Delivery.module.scss'
import { WHATSAPP_URLS } from '../../config'

export default function Delivery() {
  return (
    <section id="delivery" className={styles.section} aria-labelledby="delivery-title">
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.eyebrow}>Delivery</p>
          <h2 id="delivery-title" className={styles.title}>
            La parrilla llega a tu puerta.
          </h2>
          <p className={styles.body}>
            Pedís por WhatsApp y la hamburguesa sale recién hecha. Directa, puntual y con
            cobertura en toda Mérida y Ejido.
          </p>
          <ul className={styles.list}>
            <li className={styles.item}>Atención de jueves a martes, 4:30 p.m. a 10:30 p.m.</li>
            <li className={styles.item}>Pedidos confirmados por WhatsApp en el momento</li>
            <li className={styles.item}>Entrega a toda Mérida y Ejido</li>
          </ul>
          <a
            className={styles.cta}
            href={WHATSAPP_URLS.delivery}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pide por WhatsApp
          </a>
        </div>

        <img
          className={styles.photo}
          src="/delivery.webp"
          alt="Hamburguesa de Dahaus lista para entregar a domicilio"
          loading="lazy"
          width={1024}
          height={1024}
        />
      </div>
    </section>
  )
}