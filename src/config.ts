/* Configuración build-time.
 * Los valores vienen de .env (ver .env.example). Sin configuración muerta.
 */

const env = import.meta.env

export const DOMAIN = env.VITE_DOMAIN || 'https://www.dahausmerida.com'

export const WHATSAPP_NUMBER = env.VITE_WHATSAPP_NUMBER || '584147009402'

const DELIVERY_MESSAGE =
  env.VITE_WHATSAPP_DELIVERY_MESSAGE || '%C2%A1Hola!+Me+gustar%C3%ADa+hacer+un+pedido'

const EVENT_MESSAGE =
  env.VITE_WHATSAPP_EVENT_MESSAGE ||
  '%C2%A1Hola!+Me+gustar%C3%ADa+reservar+una+fecha+para+un+evento'

export const MENUS = {
  hamburguesas: {
    path: env.VITE_MENU_HAMBURGUESAS_PATH || '/menu-hamburguesas.pdf',
    view: env.VITE_MENU_HAMBURGUESAS_VIEW_PATH || '/menu-hamburguesas.html',
  },
  platos: {
    path: env.VITE_MENU_PLATOS_PATH || '/menu-platos.pdf',
    view: env.VITE_MENU_PLATOS_VIEW_PATH || '/menu-platos.html',
  },
  bebidas: {
    path: env.VITE_MENU_BEBIDAS_PATH || '/menu-bebidas.pdf',
    view: env.VITE_MENU_BEBIDAS_VIEW_PATH || '/menu-bebidas.html',
  },
  simplex: {
    path: env.VITE_MENU_SIMPLEX_PATH || '/menu-simplex.pdf',
    view: env.VITE_MENU_SIMPLEX_VIEW_PATH || '/menu-simplex.html',
  },
} as const

export const DEV_SITE = {
  url: env.VITE_DEV_SITE_URL || 'https://desarrollosdigitalpower.com',
  name: env.VITE_DEV_SITE_NAME || 'DesarrollosDigitalPower.com',
}

export const INSTAGRAM = {
  user: env.VITE_INSTAGRAM_USER || '@dahausmerida',
  url: env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/dahausmerida',
}

export const MAPS = {
  garana: env.VITE_MAP_GARANA || '',
  metro: env.VITE_MAP_METROATLETIK || '',
  deck: env.VITE_MAP_DECK || '',
}

export const MAP_EMBEDS = {
  garana: env.VITE_MAP_EMBED_GARANA || 'https://www.google.com/maps?q=Garana%20Padel%20Club&output=embed',
  metro: env.VITE_MAP_EMBED_METROATLETIK || 'https://www.google.com/maps?q=Metro%20Atletik%20M%C3%A9rida&output=embed',
}

export const COMPANY = {
  name: 'Dahaus Mérida',
  city: 'Mérida, Venezuela',
  phone: '+58 414-700-9402',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  gbpUrl: env.VITE_GBP_URL || '',
}

export const LOCATIONS_INFO = [
  {
    id: 'garana',
    name: 'Dahaus Garana',
    address:
      env.VITE_ADDRESS_GARANA ||
      'Avenida Andrés Bello, Urb. El Corral, Mérida 5101, Venezuela',
    hours: 'Todos los días, 8:00 a.m. a 11:30 p.m.',
  },
  {
    id: 'metro',
    name: 'Dahaus Metroatletik',
    address:
      env.VITE_ADDRESS_METRO ||
      'Avenida Principal de Zumba, vía Estadio Metropolitano, Mérida 5101, Venezuela',
    hours: 'Martes a domingo, 3:00 p.m. a 11:30 p.m.',
  },
] as const

export const WHATSAPP_URLS = {
  delivery: `https://wa.me/${WHATSAPP_NUMBER}?text=${DELIVERY_MESSAGE}`,
  event: `https://wa.me/${WHATSAPP_NUMBER}?text=${EVENT_MESSAGE}`,
}