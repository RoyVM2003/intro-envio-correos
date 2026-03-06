import { useState } from 'react'
import { Panel } from './Panel'
import { FormGroup } from './FormGroup'
import { Message } from './Message'
import { useLanguage } from '../context/LanguageContext'
import { createCampaign, updateCampaign, deleteCampaign } from '../services/campaignService'

export function CampaignForm({
  campaigns,
  selectedCampaignId,
  onSelectedCampaignIdChange,
  onCampaignCreated,
  onCampaignUpdated,
  onCampaignDeleted,
  subject,
  body,
  onSubjectChange,
  onBodyChange,
  disabled = false,
}) {
  const { t: tFn } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: 'info' })

  const handleSave = async () => {
    const sub = (typeof subject === 'string' ? subject : subject?.value ?? '').trim()
    const b = (typeof body === 'string' ? body : body?.value ?? '').trim()
    if (!sub || !b) {
      setMessage({ text: tFn('campana.writeSubject'), type: 'err' })
      return
    }
    const id = selectedCampaignId || ''
    setLoading(true)
    setMessage({ text: id ? tFn('campana.updating') : tFn('campana.creating'), type: 'info' })
    try {
      const data = id
        ? await updateCampaign(id, { name: sub, subject: sub, body: b })
        : await createCampaign({ name: sub, subject: sub, body: b })
      const newId = data.id ?? data.campaign_id ?? data.id_campaign ?? data.data?.id ?? data.data?.id_campaign ?? id
      setMessage({ text: tFn('campana.saved'), type: 'ok' })
      if (id) {
        onCampaignUpdated?.(id, { name: sub, subject: sub, body: b })
      } else if (newId) {
        onCampaignCreated?.({ ...data, id: newId, name: sub, subject: sub, body: b })
        onSelectedCampaignIdChange?.(String(newId))
      }
    } catch (err) {
      const msg = err.data?.message ?? err.data?.error ?? (typeof err.data === 'object' ? JSON.stringify(err.data) : err.message)
      setMessage({ text: tFn('campana.saveFail') + ' ' + String(msg ?? ''), type: 'err' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    const id = selectedCampaignId || ''
    if (!id || !window.confirm(tFn('campana.deleteConfirm'))) return
    setLoading(true)
    setMessage({ text: '', type: 'info' })
    try {
      await deleteCampaign(id)
      setMessage({ text: tFn('campana.deleted'), type: 'ok' })
      onCampaignDeleted?.(id)
      onSelectedCampaignIdChange?.('')
      onSubjectChange?.('')
      onBodyChange?.('')
      try {
        const raw = window.localStorage.getItem('panel_deleted_campaign_ids')
        const arr = raw ? JSON.parse(raw) : []
        const list = Array.isArray(arr) ? arr : []
        if (!list.includes(id)) {
          list.push(id)
          window.localStorage.setItem('panel_deleted_campaign_ids', JSON.stringify(list))
        }
      } catch {}
    } catch (err) {
      const msg = err.data?.message ?? err.data?.error ?? (typeof err.data === 'object' ? JSON.stringify(err.data) : err.message)
      const text = String(msg || '')
      const isAlreadyDeleted = /no encontrada/i.test(text) || /ya está eliminada/i.test(text) || /ya esta eliminada/i.test(text)
      if (isAlreadyDeleted) {
        setMessage({ text: tFn('campana.alreadyDeleted'), type: 'ok' })
        onCampaignDeleted?.(id)
        onSelectedCampaignIdChange?.('')
        onSubjectChange?.('')
        onBodyChange?.('')
      } else {
        setMessage({ text: tFn('campana.deleteFail') + ' ' + text, type: 'err' })
      }
    } finally {
      setLoading(false)
    }
  }

  const list = Array.isArray(campaigns) ? campaigns : []
  const subVal = typeof subject === 'string' ? subject : subject?.value ?? ''
  const bodyVal = typeof body === 'string' ? body : body?.value ?? ''

  return (
    <Panel title={tFn('campana.panel2Title')} icon="fas fa-envelope">
      <FormGroup label={tFn('campana.campaignsLabel')} id="selCampaign" hint={tFn('campana.campaignsHint')}>
        <select
          id="selCampaign"
          value={selectedCampaignId || ''}
          onChange={(e) => {
            if (disabled) return
            const value = e.target.value
            onSelectedCampaignIdChange?.(value)
            if (!value) { onSubjectChange?.(''); onBodyChange?.('') }
          }}
          disabled={disabled}
        >
          <option value="">{tFn('campana.createNew')}</option>
          {list.map((c) => {
            const cid = c.id ?? c.campaign_id
            const name = ((c.name ?? c.subject) || tFn('panel.campaign')).slice(0, 60) || tFn('panel.campaign') + ' #' + cid
            return <option key={cid} value={cid}>{name}</option>
          })}
        </select>
      </FormGroup>
      <FormGroup label={tFn('campana.asuntoLabel')} id="campSubject">
        <input type="text" id="campSubject" placeholder={tFn('campana.asuntoPlaceholder')} value={subVal} autoComplete="off" onChange={(e) => onSubjectChange?.(e.target.value)} disabled={disabled} />
      </FormGroup>
      <FormGroup label={tFn('campana.mensajeLabel')} id="campBody">
        <textarea id="campBody" placeholder={tFn('campana.mensajePlaceholder')} value={bodyVal} autoComplete="off" onChange={(e) => onBodyChange?.(e.target.value)} disabled={disabled} />
      </FormGroup>
      <div className="form-group" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button type="button" className="btn btn-secondary" onClick={handleSave} disabled={loading || disabled}>
          <i className="fas fa-save" aria-hidden /> {tFn('campana.guardar')}
        </button>
        {selectedCampaignId && (
          <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={loading || disabled}>
            <i className="fas fa-trash" aria-hidden /> {tFn('campana.eliminar')}
          </button>
        )}
      </div>
      <Message text={message.text} type={message.type} className="mt-1" />
    </Panel>
  )
}
