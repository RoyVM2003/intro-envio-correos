import { useState, useRef } from 'react'
import { Panel } from './Panel'
import { Message } from './Message'
import { useLanguage } from '../context/LanguageContext'
import { importExcel } from '../services/excelService'

export function ExcelImport({ onImportSuccess }) {
  const { t } = useLanguage()
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: 'info' })
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const applyFile = (f) => {
    if (!f) return
    setFile(f)
    setFileName(f.name)
    setMessage({ text: '', type: 'info' })
  }

  const handleChange = (e) => applyFile(e.target.files?.[0])

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    applyFile(e.dataTransfer.files?.[0])
  }

  const handleImport = async () => {
    if (!file) {
      setMessage({ text: t('campana.excelChoose'), type: 'err' })
      return
    }
    setLoading(true)
    setMessage({ text: t('campana.excelImporting'), type: 'info' })
    try {
      const data = await importExcel(file)
      const inserted = data.insertedCount ?? 0
      const duplicates = (data.duplicateCount ?? 0) + (data.internalDuplicateCount ?? 0)
      const errors = data.errorCount ?? 0

      let text
      const rep = (s, n, d, e) => String(s).replace(/\{\{n\}\}/g, n).replace(/\{\{d\}\}/g, d).replace(/\{\{e\}\}/g, e)
      if (inserted > 0 && errors === 0) {
        text = duplicates > 0 ? rep(t('campana.excelOk1'), inserted, duplicates, errors) : rep(t('campana.excelOk2'), inserted, duplicates, errors)
      } else if (inserted === 0 && duplicates > 0 && errors === 0) {
        text = rep(t('campana.excelOk3'), inserted, duplicates, errors)
      } else if (errors > 0) {
        text = inserted > 0 ? rep(t('campana.excelPartial'), inserted, duplicates, errors) : rep(t('campana.excelError'), inserted, duplicates, errors)
      } else {
        text = t('campana.excelEmpty')
      }

      setMessage({ text, type: errors > 0 && inserted === 0 ? 'err' : 'ok' })
      onImportSuccess?.()
    } catch (err) {
      const msg =
        err.data?.message ||
        err.data?.error ||
        (err.data && typeof err.data === 'object' ? JSON.stringify(err.data) : err.message)
      const is401 = err.status === 401
      const text = is401
        ? (t('campana.excelFail') + ' No autorizado (401). Cierra sesión y vuelve a iniciar sesión; si sigue fallando, el backend debe aceptar el header Authorization para este usuario.')
        : (t('campana.excelFail') + ' ' + msg)
      setMessage({ text, type: 'err' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Panel title={t('campana.panel1Title')} icon="fas fa-users">
      <p className="form-hint-text">
        {t('campana.excelHint')}
      </p>
      <div
        className={`upload-zone${dragging ? ' upload-zone--drag' : ''}${file ? ' upload-zone--ready' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        aria-label={t('campana.excelImportZone')}
      >
        <div className={`upload-zone-icon${file ? ' upload-zone-icon--ready' : ''}`}>
          <i className={file ? 'fas fa-file-circle-check' : 'fas fa-cloud-arrow-up'} aria-hidden />
        </div>
        <div className="upload-zone-info">
          <strong>{file ? fileName : t('campana.excelDrag')}</strong>
          <span>{file ? t('campana.excelReady') : t('campana.excelClick')}</span>
        </div>
        {file && (
          <div className="upload-zone-badge">
            <i className="fas fa-check" aria-hidden />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        id="fileExcel"
        accept=".xlsx,.xls"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <details className="upload-format-hint">
        <summary>{t('campana.excelFormatTitle')}</summary>
        <ul>
          <li>{t('campana.excelFormat1')}</li>
          <li>{t('campana.excelFormat2')}</li>
          <li>{t('campana.excelFormat3')}</li>
        </ul>
      </details>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleImport}
        disabled={loading || !file}
      >
        {loading ? (<><span className="btn-spinner" aria-hidden /> {t('campana.excelImporting')}</>) : (<><i className="fas fa-upload" aria-hidden /> {t('campana.excelImportBtn')}</>)}
      </button>
      <Message text={message.text} type={message.type} className="mt-1" />
    </Panel>
  )
}
