import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { LanguageSelector } from './components/LanguageSelector'
import { IntroPage } from './pages/IntroPage'
import { LoginPage } from './pages/LoginPage'
import { PanelLoginPage } from './pages/PanelLoginPage'
import { HomePage } from './pages/HomePage'
import { PanelPage } from './pages/PanelPage'
import { CampanaPage } from './pages/CampanaPage'

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <LanguageSelector />
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/acceso" element={<PanelLoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/panel" element={<PanelPage />} />
          <Route path="/campana" element={<CampanaPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LanguageProvider>
    </AuthProvider>
  )
}
