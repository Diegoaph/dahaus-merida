import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss'
import App from './App'

// Aplicar el tema claro al body para que las variables estén disponibles en estilos globales
document.body.classList.add('theme--light')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <App />
  </StrictMode>,
)
