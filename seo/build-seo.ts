import type { Plugin } from 'vite'
import { loadEnv } from 'vite'

type Env = Record<string, string>

const SITE_NAME = 'Dahaus Mérida'
const COUNTRY = 'VE'
const POSTAL_CODE = '5101'

const GARANA_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const METRO_DAYS = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

type LocationData = {
  streetAddress: string
  latitude: string
  longitude: string
  mapUrl: string
}

function daySpecification(days: string[], opens: string, closes: string) {
  return {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: days,
    opens,
    closes,
  }
}

function serviceArea() {
  return [
    { '@type': 'City', name: 'Mérida' },
    { '@type': 'City', name: 'Ejido' },
  ]
}

function restaurant(
  domain: string,
  name: string,
  slug: string,
  image: string,
  days: string[],
  opens: string,
  closes: string,
  description: string,
  location: LocationData,
  sameAs: string[],
) {
  return {
    '@type': 'Restaurant',
    '@id': `${domain}/#${slug}`,
    name,
    url: domain,
    image: `${domain}/${image}`,
    description,
    servesCuisine: ['Hamburguesas', 'Hamburguesería', 'Parrillas', 'Desayunos'],
    telephone: '+584147009402',
    priceRange: '$$',
    menu: [
      `${domain}/menu-hamburguesas.pdf`,
      `${domain}/menu-platos.pdf`,
      `${domain}/menu-bebidas.pdf`,
      `${domain}/menu-simplex.pdf`,
    ],
    sameAs,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.streetAddress,
      addressLocality: 'Mérida',
      addressRegion: 'Mérida',
      postalCode: POSTAL_CODE,
      addressCountry: COUNTRY,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: parseFloat(location.latitude),
      longitude: parseFloat(location.longitude),
    },
    hasMap: location.mapUrl,
    areaServed: serviceArea(),
    openingHoursSpecification: [daySpecification(days, opens, closes)],
  }
}

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

function faqPage() {
  return {
    '@type': 'FAQPage',
    inLanguage: 'es',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

function organization(domain: string, sameAs: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${domain}/`,
    logo: `${domain}/dahausmerida.jpg`,
    telephone: '+584147009402',
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+584147009402',
      contactType: 'customer service',
      availableLanguage: 'es',
    },
  }
}

function buildStructuredData(domain: string, env: Env) {
  const cleanDomain = domain.replace(/\/+$/, '')
  const instagram = env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/dahausmerida'
  const gbp = env.VITE_GBP_URL
  const sameAs = gbp ? [instagram, gbp] : [instagram]

  const garana: LocationData = {
    streetAddress:
      env.VITE_ADDRESS_GARANA || 'Avenida Andrés Bello, Urb. El Corral, Mérida 5101, Venezuela',
    latitude: env.VITE_GEO_GARANA_LAT || '8.5741921',
    longitude: env.VITE_GEO_GARANA_LNG || '-71.1751326',
    mapUrl: env.VITE_MAP_GARANA || '',
  }

  const metro: LocationData = {
    streetAddress:
      env.VITE_ADDRESS_METRO ||
      'Avenida Principal de Zumba, vía Estadio Metropolitano, Mérida 5101, Venezuela',
    latitude: env.VITE_GEO_METRO_LAT || '8.5698244',
    longitude: env.VITE_GEO_METRO_LNG || '-71.1804988',
    mapUrl: env.VITE_MAP_METROATLETIK || '',
  }

  return [
    restaurant(
      cleanDomain,
      'Dahaus Garana',
      'dahaus-garana',
      'garana.webp',
      GARANA_DAYS,
      '08:00',
      '23:30',
      'Hamburguesas premium con pan de papa, parrillas, ensaladas, café, desayunos y tequeños dentro del Garana Padel Club, avenida Andrés Bello, Mérida, Venezuela. Abierto todos los días de 8:00 a 23:30.',
      garana,
      sameAs,
    ),
    restaurant(
      cleanDomain,
      'Dahaus Metroatletik',
      'dahaus-metroatletik',
      'metro.webp',
      METRO_DAYS,
      '15:00',
      '23:30',
      'Hamburguesas premium con pan de papa, parrillas y más dentro del complejo deportivo Metro Atletik, en la avenida principal Zumba, junto al Colegio de Abogados, en Mérida, Venezuela. Atiende los pedidos de delivery y envíos a domicilio a toda Mérida y Ejido. Abierto de martes a domingo de 15:00 a 23:30.',
      metro,
      sameAs,
    ),
    faqPage(),
  ]
}

function buildSitemap(domain: string) {
  const cleanDomain = domain.replace(/\/+$/, '')
  const today = new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${cleanDomain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${cleanDomain}/menu-hamburguesas.pdf</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${cleanDomain}/menu-platos.pdf</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${cleanDomain}/menu-bebidas.pdf</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${cleanDomain}/menu-simplex.pdf</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
`
}

function buildLlms(domain: string, env: Env) {
  const cleanDomain = domain.replace(/\/+$/, '')
  const number = env.VITE_WHATSAPP_NUMBER ?? '584147009402'
  const deliveryText = env.VITE_WHATSAPP_DELIVERY_MESSAGE ?? ''
  const eventText = env.VITE_WHATSAPP_EVENT_MESSAGE ?? ''
  const instagramUrl = env.VITE_INSTAGRAM_URL ?? 'https://www.instagram.com/dahausmerida'
  const mapGarana = env.VITE_MAP_GARANA ?? ''
  const mapMetro = env.VITE_MAP_METROATLETIK ?? ''
  const addressGarana =
    env.VITE_ADDRESS_GARANA || 'Avenida Andrés Bello, Urb. El Corral, Mérida 5101, Venezuela'
  const addressMetro =
    env.VITE_ADDRESS_METRO ||
    'Avenida Principal de Zumba, vía Estadio Metropolitano, Mérida 5101, Venezuela'

  return `# ${SITE_NAME}

> Hamburguesas premium junto a las canchas de padel de Mérida, Venezuela y delivery a toda la ciudad. Donde termina el partido, empieza Dahaus.

## Sitios

- [Página principal](${cleanDomain}/)
- [Menú de hamburguesas](${cleanDomain}/menu-hamburguesas.pdf)
- [Menú de platos](${cleanDomain}/menu-platos.pdf)
- [Menú de bebidas](${cleanDomain}/menu-bebidas.pdf)
- [Menú Simplex](${cleanDomain}/menu-simplex.pdf): solo lunes a viernes, hasta las 7:00 PM.

## Sedes

- [Dahaus Garana](${mapGarana}): ${addressGarana} Dentro del Garana Padel Club. Todos los días de 8:00 a 23:30, ahora también con desayunos.
- [Dahaus Metroatletik](${mapMetro}): ${addressMetro} Dentro del complejo deportivo Metro Atletik. De martes a domingo de 15:00 a 23:30. Gestiona el delivery a toda Mérida y Ejido.

## Contacto

- [WhatsApp (pedidos y delivery)](https://wa.me/${number}?text=${deliveryText})
- [WhatsApp (reservar evento)](https://wa.me/${number}?text=${eventText})
- [Instagram @dahausmerida](${instagramUrl})

Delivery todos los días de 12:00 a 22:00. Atención por WhatsApp dentro de ese horario.
`
}

export function buildSeoPlugin(): Plugin {
  let env: Env = {}

  return {
    name: 'dahaus-build-seo',
    configResolved(resolved) {
      env = loadEnv(resolved.mode, resolved.root, '')
    },
    transformIndexHtml() {
      const domain = env.VITE_DOMAIN || 'https://www.dahausmerida.com'
      const cleanDomain = domain.replace(/\/+$/, '')
      const instagram = env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/dahausmerida'
      const gbp = env.VITE_GBP_URL
      const sameAs = gbp ? [instagram, gbp] : [instagram]
      const jsonLd = [
        organization(cleanDomain, sameAs),
        ...buildStructuredData(cleanDomain, env),
      ]
      return [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(jsonLd),
          injectTo: 'head-prepend',
        },
      ]
    },
    generateBundle() {
      const domain = env.VITE_DOMAIN || 'https://www.dahausmerida.com'
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: buildSitemap(domain),
      })
      this.emitFile({
        type: 'asset',
        fileName: 'llms.txt',
        source: buildLlms(domain, env),
      })
    },
  }
}