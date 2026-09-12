/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DOMAIN: string
  readonly VITE_WHATSAPP_NUMBER: string
  readonly VITE_WHATSAPP_DELIVERY_MESSAGE: string
  readonly VITE_WHATSAPP_EVENT_MESSAGE: string
  readonly VITE_INSTAGRAM_USER: string
  readonly VITE_INSTAGRAM_URL: string
  readonly VITE_MENU_HAMBURGUESAS_PATH: string
  readonly VITE_MENU_HAMBURGUESAS_VIEW_PATH: string
  readonly VITE_MENU_PLATOS_PATH: string
  readonly VITE_MENU_PLATOS_VIEW_PATH: string
  readonly VITE_MENU_BEBIDAS_PATH: string
  readonly VITE_MENU_BEBIDAS_VIEW_PATH: string
  readonly VITE_MENU_SIMPLEX_PATH: string
  readonly VITE_MENU_SIMPLEX_VIEW_PATH: string
  readonly VITE_DEV_SITE_URL: string
  readonly VITE_DEV_SITE_NAME: string
  readonly VITE_MAP_GARANA: string
  readonly VITE_MAP_METROATLETIK: string
  readonly VITE_MAP_DECK: string
  readonly VITE_MAP_EMBED_GARANA: string
  readonly VITE_MAP_EMBED_METROATLETIK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}