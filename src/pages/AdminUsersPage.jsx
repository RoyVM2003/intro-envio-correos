import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getToken } from '../lib/api'
import { adminGetUsers, adminUpdateUser } from '../lib/api'

/**
 * Panel de administración: listar usuarios y asignar rol administrador.
 * Solo accesible con token de administrador.
 */
export function AdminUsersPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ text: '', type: 'info' })
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    if (!getToken()) {
      navigate('/login', { replace: true })
      return
    }
    loadUsers()
  }, [navigate])

  async function loadUsers() {
    setLoading(true)
    setMessage({ text: '', type: 'info' })
    try {
      const list = await adminGetUsers()
      setUsers(Array.isArray(list) ? list : [])
    } catch (err) {
      setMessage({ text: err?.message || t('admin.errorLoad'), type: 'err' })
      if (String(err?.message || '').toLowerCase().includes('permiso')) {
        setTimeout(() => navigate('/panel', { replace: true }), 2000)
      }
    } finally {
      setLoading(false)
    }
  }

  async function assignAdmin(user) {
    const id = getId(user)
    if (!id) {
      setMessage({ text: t('admin.errorNoId'), type: 'err' })
      return
    }
    setUpdatingId(id)
    setMessage({ text: t('admin.assigning'), type: 'info' })
    try {
      // Probar primero role, luego panel_role (el backend puede usar uno u otro)
      try {
        await adminUpdateUser(id, { role: 'administrator' })
      } catch (e1) {
        await adminUpdateUser(id, { panel_role: 'administrator' })
      }
      setMessage({ text: t('admin.assignSuccess'), type: 'ok' })
      loadUsers()
    } catch (err) {
      setMessage({ text: err?.message || t('admin.assignError'), type: 'err' })
    } finally {
      setUpdatingId(null)
    }
  }

  function getId(u) {
    const raw = u?.user ?? u
    return raw?.id ?? raw?.userId ?? raw?.user_id ?? raw?._id ?? null
  }

  function isAdmin(u) {
    const raw = u?.user ?? u
    const r = (raw?.role ?? raw?.panel_role ?? raw?.panelRole ?? '').toLowerCase()
    return r === 'administrator' || r === 'admin'
  }

  const email = u => {
    const raw = u?.user ?? u
    return raw?.email ?? raw?.correo ?? '-'
  }
  const name = u => {
    const raw = u?.user ?? u
    return raw?.first_name ?? raw?.firstName ?? raw?.name ?? email(u).split('@')[0]
  }

  return (
    <div className="app-dark-page admin-page">
      <div className="app-dark-content">
        <header className="admin-header">
          <Link to="/panel" className="admin-back">
            <i className="fas fa-arrow-left" aria-hidden /> {t('admin.back')}
          </Link>
          <h1 className="admin-title">{t('admin.title')}</h1>
          <p className="admin-subtitle">{t('admin.subtitle')}</p>
        </header>

        {message.text && (
          <div className={`admin-msg admin-msg--${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        {loading ? (
          <p className="admin-loading">{t('admin.loading')}</p>
        ) : (
          <div className="admin-list">
            {users.length === 0 ? (
              <p className="admin-empty">{t('admin.empty')}</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{t('admin.colEmail')}</th>
                    <th>{t('admin.colName')}</th>
                    <th>{t('admin.colRole')}</th>
                    <th>{t('admin.colAction')}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => {
                    const id = getId(u)
                    const admin = isAdmin(u)
                    return (
                      <tr key={id ?? `user-${idx}`}>
                        <td>{email(u)}</td>
                        <td>{name(u)}</td>
                        <td>
                          <span className={`admin-badge admin-badge--${admin ? 'admin' : 'user'}`}>
                            {admin ? t('admin.roleAdmin') : t('admin.roleUser')}
                          </span>
                        </td>
                        <td>
                          {!admin && (
                            <button
                              type="button"
                              className="admin-btn-assign"
                              onClick={() => assignAdmin(u)}
                              disabled={updatingId === id}
                            >
                              {updatingId === id ? t('admin.assigning') : t('admin.assignAdmin')}
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
