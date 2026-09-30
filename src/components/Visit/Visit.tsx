import { useState } from 'react'
import styles from './Visit.module.scss'
import { COMPANY, INSTAGRAM, LOCATIONS_INFO, MAPS, WHATSAPP_URLS } from '../../config'

const FAQS = [
  {
    q: '¿Dónde está Dahaus?',
    a: 'Estamos en el Garana Padel Club, avenida Andrés Bello, urb. El Corral, Mérida 5101, Venezuela, y en Metro Atletik, avenida principal de Zumba, vía Estadio Metropolitano. También gestionamos delivery a toda Mérida y Ejido.',
  },
  {
    q: '¿Qué horarios tienen?',
    a: 'Dahaus Garana abre todos los días de 8:00 a.m. a 11:30 p.m., con desayunos. Dahaus Metroatletik abre de martes a domingo de 3:00 p.m. a 11:30 p.m.',
  },
  {
    q: '¿Hacen delivery y a dónde llegan?',
    a: 'Sí, todos los días de 12:00 a 10:00 p.m. Llevamos la parrilla a toda Mérida y Ejido. Pedís por WhatsApp y te confirmamos en el momento.',
  },
  {
    q: '¿Qué es el pan de papa?',
    a: 'Es nuestro pan artesanal horneado a diario, el sello de todas las hamburguesas de Dahaus.',
  },
  {
    q: '¿Hacen desayunos?',
    a: 'Sí, en Dahaus Garana ya servimos desayunos desde las 8:00 a.m. La carta completa de desayunos estrena próximamente.',
  },
]

export default function Visit() {
  const [open, setOpen] = useState(0)

  return (
    <section id="dónde-estamos" className={styles.section} aria-labelledby="visit-title">
      <div className={styles.inner}>
        <h2 id="visit-title" className={styles.title}>
          Dónde estamos
        </h2>
        <p className={styles.lead}>
          Hamburguesería en Mérida, Venezuela, con dos sedes junto a las canchas de padel y
          delivery a toda la ciudad y Ejido.
        </p>

        <div className={styles.grid}>
          <ul className={styles.sedes}>
            {LOCATIONS_INFO.map((loc) => (
              <li key={loc.id} className={styles.sede}>
                <h3 className={styles.sedeName}>{loc.name}</h3>
                <p className={styles.sedeAddress}>{loc.address}</p>
                <p className={styles.sedeHours}>{loc.hours}</p>
                <a
                  className={styles.sedeLink}
                  href={MAPS[loc.id]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver en el mapa
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.contact}>
            <p className={styles.contactTitle}>Pedidos y reservas</p>
            <a
              className={styles.contactCta}
              href={WHATSAPP_URLS.delivery}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pide por WhatsApp
            </a>
            <a className={styles.contactTel} href={`tel:+58${COMPANY.phone.replace(/\D/g, '')}`}>
              {COMPANY.phone}
            </a>
            <p className={styles.contactNote}>
              <a href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer">
                {INSTAGRAM.user}
              </a>{' '}
              · {COMPANY.city}
            </p>
          </div>
        </div>

        <div className={styles.faq}>
          {FAQS.map((faq, index) => {
            const isOpen = open === index
            return (
              <div className={styles.faqItem} key={faq.q}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  {faq.q}
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={styles.faqAnswer}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  hidden={!isOpen}
                >
                  <p className={styles.faqText}>{faq.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}