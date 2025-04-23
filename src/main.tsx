import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

if (import.meta.env.MODE === 'development') {
  await import('react-scan').then(({ scan }) => {
    scan({ enabled: true })
  })
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
)
