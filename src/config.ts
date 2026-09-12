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

export const MENU_PATH = env.VITE_MENU_PATH || '/menu.pdf'

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

export const WHATSAPP_URLS = {
  delivery: `https://wa.me/${WHATSAPP_NUMBER}?text=${DELIVERY_MESSAGE}`,
  event: `https://wa.me/${WHATSAPP_NUMBER}?text=${EVENT_MESSAGE}`,
}