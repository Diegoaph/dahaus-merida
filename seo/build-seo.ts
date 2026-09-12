import type { Plugin } from 'vite'
import { loadEnv } from 'vite'

type Env = Record<string, string>

const SITE_NAME = 'Dahaus Mérida'

const GARANA_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const METRO_DAYS = ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function daySpecification(days: string[], opens: string, closes: string) {
  return {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: days,
    opens,
    closes,
  }
}

function restaurant(domain: string, name: string, slug: string, image: string, days: string[], opens: string, closes: string, description: string) {
  return {
    '@type': 'Restaurant',
    '@id': `${domain}/#${slug}`,
    name,
    url: domain,
    image: `${domain}/${image}`,
    description,
    servesCuisine: ['hamburguesas', 'parrillas'],
    telephone: '+584147009402',
    priceRange: '$$',
    menu: [
      `${domain}/menu-hamburguesas.pdf`,
      `${domain}/menu-platos.pdf`,
      `${domain}/menu-bebidas.pdf`,
      `${domain}/menu-simplex.pdf`,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mérida',
      addressRegion: 'Mérida',
      addressCountry: 'VE',
    },
    openingHoursSpecification: [daySpecification(days, opens, closes)],
  }
}

function buildStructuredData(domain: string) {
  const cleanDomain = domain.replace(/\/+$/, '')
  return [
    restaurant(
      cleanDomain,
      'Dahaus Garana',
      'dahaus-garana',
      'garana.webp',
      GARANA_DAYS,
      '12:00',
      '23:30',
      'Hamburguesas premium con pan de papa, parrillas, ensaladas, café y tequeños dentro del Garana Padel Club, en la avenida Andrés Bello, Mérida. Abierto todos los días de 12:00 a 23:30.',
    ),
    restaurant(
      cleanDomain,
      'Dahaus Metroatletik',
      'dahaus-metroatletik',
      'metro.webp',
      METRO_DAYS,
      '16:30',
      '23:30',
      'Hamburguesas premium con pan de papa, parrillas y más dentro del complejo deportivo Metro Atletik, en la avenida principal Zumba, Mérida, junto al Colegio de Abogados. Atiende los pedidos de delivery y envíos a domicilio a toda Mérida y Ejido. Abierto de jueves a martes de 16:30 a 23:30.',
    ),
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

  return `# ${SITE_NAME}

> Hamburguesas premium junto a las canchas de padel de Mérida y delivery a toda la ciudad. Donde termina el partido, empieza Dahaus.

## Sitios

- [Página principal](${cleanDomain}/)
- [Menú de hamburguesas](${cleanDomain}/menu-hamburguesas.pdf)
- [Menú de platos](${cleanDomain}/menu-platos.pdf)
- [Menú de bebidas](${cleanDomain}/menu-bebidas.pdf)
- [Menú Simplex](${cleanDomain}/menu-simplex.pdf): solo lunes a viernes, hasta las 7:00 PM.

## Sedes

- [Dahaus Garana](${mapGarana}): dentro del Garana Padel Club, avenida Andrés Bello, Mérida. Todos los días de 12:00 a 23:30.
- [Dahaus Metroatletik](${mapMetro}): dentro del complejo deportivo Metro Atletik, avenida principal Zumba, Mérida. De jueves a martes de 16:30 a 23:30. Gestiona el delivery a toda Mérida y Ejido.

## Contacto

- [WhatsApp (pedidos y delivery)](https://wa.me/${number}?text=${deliveryText})
- [WhatsApp (reservar evento)](https://wa.me/${number}?text=${eventText})
- [Instagram @dahausmerida](${instagramUrl})

Horario de atención por WhatsApp: jueves a martes de 16:30 a 22:30.
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
      const jsonLd = [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SITE_NAME,
          url: `${cleanDomain}/`,
          logo: `${cleanDomain}/dahausmerida.jpg`,
          telephone: '+584147009402',
        },
        ...buildStructuredData(cleanDomain),
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