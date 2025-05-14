import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app.tsx'

import 'primeicons/primeicons.css'
import "primereact/resources/themes/lara-light-cyan/theme.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
