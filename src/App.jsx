import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { LanguageSelector } from './components/LanguageSelector'
import { IntroTopBar } from './components/IntroTopBar'
import { IntroPage } from './pages/IntroPage'
import { LoginPage } from './pages/LoginPage'
import { PanelLoginPage } from './pages/PanelLoginPage'
import { HomePage } from './pages/HomePage'
import { PanelPage } from './pages/PanelPage'
import { CampanaPage } from './pages/CampanaPage'
import { AdminUsersPage } from './pages/AdminUsersPage'

export default function App() {
  const location = useLocation()
  const isIntro = location.pathname === '/'

  return (
    <AuthProvider>
      <LanguageProvider>
        {isIntro ? <IntroTopBar /> : <LanguageSelector />}
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<PanelLoginPage />} />
          <Route path="/acceso" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/panel" element={<PanelPage />} />
          <Route path="/campana" element={<CampanaPage />} />
          <Route path="/admin" element={<AdminUsersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LanguageProvider>
    </AuthProvider>
  )
}
