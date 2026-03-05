import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getToken, getEmail, setToken, setEmail } from '../lib/api'
import { login as apiLogin } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [_, setTick] = useState(0)

  const login = useCallback(async (emailValue, password) => {
    const data = await apiLogin(emailValue, password)
    const t = data.token || data.accessToken || data.access_token
    if (!t) throw new Error('La API no devolvió token')
    setToken(t)
    setEmail(emailValue?.trim?.() || emailValue)
    setTick((n) => n + 1)
  }, [])

  const logout = useCallback(() => {
    setToken('')
    setEmail('')
    setTick((n) => n + 1)
  }, [])

  const token = getToken()
  const email = getEmail()

  return (
    <AuthContext.Provider value={{ token, email, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
