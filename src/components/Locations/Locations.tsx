import styles from './Locations.module.scss'
import MapEmbed from '../MapEmbed/MapEmbed'
import { OpeningBadge } from '../OpeningBadge/OpeningBadge'
import { WHATSAPP_URLS, MAPS, MAP_EMBEDS } from '../../config'
import { formatClock, type Schedule } from '../../hooks/useOpenNow'

const GARANA: Schedule = { days: [0, 1, 2, 3, 4, 5, 6], opens: '12:00', closes: '23:30' }
const METRO: Schedule = { days: [0, 1, 2, 4, 5, 6], opens: '16:30', closes: '23:30' }

export default function Locations() {
  return (
    <section id="sedes" className={styles.section} aria-labelledby="sedes-title">
      <div className={styles.head}>
        <p className={styles.eyebrow}>Las sedes</p>
        <h2 id="sedes-title" className={styles.title}>
          Al lado de la cancha, donde empieza la noche.
        </h2>
      </div>

      <div className={styles.cards}>
        <article className={styles.card} aria-labelledby="garana-name">
          <a
            className={styles.photoLink}
            href={MAPS.garana}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver Dahaus Garana en el mapa"
          >
            <img
              className={styles.photo}
              src="/garana.webp"
              alt="Terraza de Dahaus Garana dentro del Garana Padel Club"
              loading="lazy"
              width={900}
              height={1350}
            />
          </a>

          <div className={styles.cardBody}>
            <div className={styles.cardTop}>
              <h3 id="garana-name" className={styles.cardTitle}>
                Dahaus Garana
              </h3>
              <OpeningBadge schedule={GARANA} />
            </div>
            <p className={styles.cardText}>
              Dentro del Garana Padel Club, en la avenida Andrés Bello. Abierto todos los días,
              de {formatClock(GARANA.opens)} a {formatClock(GARANA.closes)}.
            </p>
            <div className={styles.actions}>
              <a
                className={styles.mapLink}
                href={MAPS.garana}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo llegar
              </a>
              <a
                className={styles.orderLink}
                href={WHATSAPP_URLS.delivery}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir delivery
              </a>
            </div>
            <MapEmbed src={MAP_EMBEDS.garana} title="Mapa de Dahaus Garana" />
          </div>
        </article>

        <article className={styles.card} aria-labelledby="metro-name">
          <a
            className={styles.photoLink}
            href={MAPS.metro}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver Dahaus Metroatletik en el mapa"
          >
            <img
              className={styles.photo}
              src="/metro.webp"
              alt="Dahaus Metroatletik dentro del Metro Atletik"
              loading="lazy"
              width={900}
              height={1350}
            />
          </a>

          <div className={styles.cardBody}>
            <div className={styles.cardTop}>
              <h3 id="metro-name" className={styles.cardTitle}>
                Dahaus Metroatletik
              </h3>
              <OpeningBadge schedule={METRO} />
            </div>
            <p className={styles.cardText}>
              Dentro del Metro Atletik, en la avenida principal Zumba, junto al Colegio de
              Abogados. Desde acá se gestionan todos los pedidos de delivery. Abierto de jueves
              a martes, de {formatClock(METRO.opens)} a {formatClock(METRO.closes)}.
            </p>
            <div className={styles.actions}>
              <a
                className={styles.mapLink}
                href={MAPS.metro}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo llegar
              </a>
              <a
                className={styles.orderLink}
                href={WHATSAPP_URLS.delivery}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir delivery
              </a>
            </div>
            <MapEmbed src={MAP_EMBEDS.metro} title="Mapa de Dahaus Metroatletik" />
          </div>
        </article>

        <article className={styles.cardDeck} aria-labelledby="deck-name">
          <div className={styles.photoWrap}>
            <img
              className={`${styles.photo} ${styles.photoDeck}`}
              src="/deck.webp"
              alt="Fachada de Dahaus Deck en Ejido, en remodelación"
              loading="lazy"
              width={900}
              height={1350}
            />
            <div className={styles.tape}>
              <span className={styles.tapeLabel}>En remodelación · Próximamente</span>
            </div>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.cardTop}>
              <h3 id="deck-name" className={styles.cardTitle}>
                Dahaus Deck
              </h3>
              <span className={styles.tag}>Próximamente</span>
            </div>
            <p className={styles.cardText}>
              En Ejido, junto a Empire Keeway. Estamos preparando el espacio para recibirte de
              nuevo.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}