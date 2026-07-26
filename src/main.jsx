import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/tokens.css'
import './styles/base.css'
import './styles/utilities.css'
import './styles/layout.css'
import './styles/components/site-header.css'
import './styles/components/site-footer.css'
import './styles/components/hero-section.css'
import './styles/components/home-sections.css'
import './styles/components/listing-detail-modal.css'
import './styles/pages/professionals-page.css'
import App from './App.jsx'
import { AppProvider } from './state/app-provider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
