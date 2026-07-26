import { Outlet } from 'react-router-dom'
import { SiteFooter } from '../components/layout/site-footer.jsx'
import { SiteHeader } from '../components/layout/site-header.jsx'

export function RootLayout() {
  return (
    <div className="app-shell">
      <div className="page-shell">
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
