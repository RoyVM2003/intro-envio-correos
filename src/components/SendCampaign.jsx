import { useState } from 'react'
import { Panel } from './Panel'
import { Message } from './Message'
import { useLanguage } from '../context/LanguageContext'
import { sendCampaign } from '../services/campaignService'

export function SendCampaign({ subject, message: body, hasImportedExcel, onSendSuccess }) {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: 'info' })
  const safeSubject = (typeof subject === 'string' ? subject : '').trim()
  const safeBody = (typeof body === 'string' ? body : '').trim()
  const canSend = hasImportedExcel === true

  const handleSend = async () => {
    if (!canSend) {
      setMessage({ text: t('campana.sendFirstExcel'), type: 'err' })
      return
    }
    if (!safeSubject || !safeBody) {
      setMessage({ text: t('campana.writeSubjectBody'), type: 'err' })
      return
    }
    setLoading(true)
    setMessage({ text: t('campana.sending'), type: 'info' })
    try {
      await sendCampaign(safeSubject, safeBody)
      setMessage({ text: t('campana.sendSuccess'), type: 'ok' })
      onSendSuccess?.()
    } catch (err) {
      const msg = err.data?.message ?? err.data?.error ?? (typeof err.data === 'object' ? JSON.stringify(err.data) : err.message)
      setMessage({ text: t('campana.sendFail') + ' ' + msg, type: 'err' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Panel title={t('campana.panel3Title')} icon="fas fa-paper-plane">
      {!canSend && (
        <div className="msg err send-blocked-msg" role="alert" style={{ marginBottom: '1rem' }}>
          <strong className="send-blocked-title">{t('campana.sendBlocked')}</strong> {t('campana.sendBlockedDesc')}
        </div>
      )}
      <p className="form-group hint">
        {t('campana.sendHint')}
      </p>
      <div className="email-preview">
        <div className="email-preview-header">
          <span className="email-preview-label">{t('campana.previewLabel')}</span>
          <span className="email-preview-small">{t('campana.previewSmall')}</span>
        </div>
        <div className="email-preview-body">
          <p className="email-preview-subject">
            <span>{t('campana.subjectLabel')}</span> {safeSubject || <em>{t('campana.noSubject')}</em>}
          </p>
          <div className="email-preview-message">
            {safeBody ? <pre>{safeBody}</pre> : <em>{t('campana.noBody')}</em>}
          </div>
        </div>
      </div>
      <button type="button" className="btn" onClick={handleSend} disabled={loading || !canSend}>
        {!canSend ? (<><i className="fas fa-lock" aria-hidden /> {t('campana.importFirst')}</>) : loading ? (<><span className="btn-spinner" aria-hidden /> {t('campana.sending')}</>) : (<><i className="fas fa-paper-plane" aria-hidden /> {t('campana.sendBtn')}</>)}
      </button>
      <Message text={message.text} type={message.type} className="mt-1" />
    </Panel>
  )
}
