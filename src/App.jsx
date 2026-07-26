import { Route, Routes } from 'react-router-dom'
import { RootLayout } from './layouts/root-layout.jsx'
import { HomePage } from './pages/home-page.jsx'
import { ProfessionCategoryPage } from './pages/profession-category-page.jsx'
import { ProfessionalsPage } from './pages/professionals-page.jsx'

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="professionals" element={<ProfessionalsPage />} />
        <Route
          path="professionals/:categoryId"
          element={<ProfessionCategoryPage />}
        />
      </Route>
    </Routes>
  )
}

export default App
