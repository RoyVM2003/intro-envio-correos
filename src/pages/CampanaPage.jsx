import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { ExcelImport } from '../components/ExcelImport'
import { CampaignForm } from '../components/CampaignForm'
import { AIAssistant } from '../components/AIAssistant'
import { SendCampaign } from '../components/SendCampaign'
import { Message } from '../components/Message'
import { listCampaigns } from '../services/excelService'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { getToken } from '../lib/api'

const HERO_IMG = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=90'

export function CampanaPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  useScrollReveal()
  const { email, logout } = useAuth()
  const raw = email ? String(email).split('@')[0] : ''
  const username = raw ? raw.replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || raw : t('panel.visitor')

  const [designAiTab, setDesignAiTab] = useState('design')
  const [campaigns, setCampaigns] = useState([])
  const [selectedCampaignId, setSelectedCampaignId] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [globalMsg, setGlobalMsg] = useState({ text: '', type: 'info' })
  const [hasImportedExcel, setHasImportedExcel] = useState(false)
  const [hasUsedAI, setHasUsedAI] = useState(false)
  const [hasSentCampaign, setHasSentCampaign] = useState(false)

  const hasSubjectAndBody = !!(subject?.trim() && body?.trim())
  /* Paso activo en la barra de progreso (solo visual): 1 → 2 → 3 según avance */
  const currentStep = hasSentCampaign ? 3 : (hasSubjectAndBody ? 3 : (hasImportedExcel ? 2 : 1))

  useEffect(() => {
    if (!getToken()) {
      navigate('/panel', { replace: true })
      return
    }
  }, [navigate])

  const addCampaign = useCallback((campaign) => {
    setCampaigns((prev) => {
      const id = campaign.id ?? campaign.campaign_id ?? campaign.id_campaign ?? campaign.data?.id ?? campaign.data?.id_campaign
      if (!id) return prev
      if (prev.some((c) => (c.id ?? c.campaign_id) === id)) return prev
      return [...prev, { id, name: campaign.name ?? campaign.subject, subject: campaign.subject, body: campaign.body }]
    })
  }, [])

  const updateCampaignInList = useCallback((id, { name, subject: s, body: b }) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        const cid = c.id ?? c.campaign_id ?? c.id_campaign
        if (String(cid ?? '') !== String(id ?? '')) return c
        return { ...c, name: name ?? c.name ?? c.nombre, subject: s ?? c.subject, body: b ?? c.body }
      })
    )
  }, [])

  const removeCampaign = useCallback((id) => {
    setCampaigns((prev) => prev.filter((c) => String(c.id ?? c.campaign_id ?? c.id_campaign ?? '') !== String(id)))
  }, [])

  const handleBodyAppend = useCallback((newBody) => setBody(newBody), [])

  useEffect(() => {
    if (!selectedCampaignId) return
    const cid = String(selectedCampaignId)
    const found = campaigns.find((c) => String(c.id ?? c.campaign_id ?? c.id_campaign ?? '') === cid)
    if (!found) return
    const s = found.subject ?? found.name ?? found.nombre ?? ''
    const b = found.body ?? found.message ?? ''
    if (typeof s === 'string') setSubject(s)
    if (typeof b === 'string') setBody(b)
    setHasUsedAI(true)
  }, [selectedCampaignId, campaigns])

  const getDeletedIds = () => {
    try {
      const raw = window.localStorage.getItem('panel_deleted_campaign_ids')
      if (!raw) return new Set()
      return new Set((JSON.parse(raw) || []).map((v) => String(v)))
    } catch {
      return new Set()
    }
  }

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('panel_campaigns')
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (!Array.isArray(parsed)) return
      const deletedIds = getDeletedIds()
      setCampaigns((prev) => {
        const base = parsed.filter((c) => !deletedIds.has(String(c.id ?? c.campaign_id ?? c.id_campaign ?? '')))
        if (!prev.length) return base
        const existingIds = new Set(prev.map((c) => String(c.id ?? c.campaign_id)))
        const merged = [...prev]
        base.forEach((c) => {
          const cid = String(c.id ?? c.campaign_id ?? '')
          if (!cid || existingIds.has(cid)) return
          merged.push(c)
          existingIds.add(cid)
        })
        return merged
      })
    } catch {}
  }, [])

  useEffect(() => {
    let cancelled = false
    const deletedIds = getDeletedIds()
    listCampaigns({ page: 1, limit: 50 })
      .then((items) => {
        if (cancelled || !Array.isArray(items)) return
        const mapped = items
          .map((c) => {
            const id = c.id ?? c.campaign_id ?? c.id_campaign ?? c._id
            if (!id || deletedIds.has(String(id))) return null
            return { id, name: c.name ?? c.subject ?? c.nombre ?? c.compania ?? 'Campaña', subject: c.subject ?? c.name ?? c.nombre ?? '', body: c.body ?? c.message ?? '' }
          })
          .filter(Boolean)
        if (mapped.length) setCampaigns((prev) => {
          const existingIds = new Set(prev.map((c) => String(c.id ?? c.campaign_id)))
          const merged = [...prev]
          mapped.forEach((c) => {
            if (!existingIds.has(String(c.id))) { merged.push(c); existingIds.add(String(c.id)) }
          })
          return merged
        })
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem('panel_campaigns', JSON.stringify(campaigns))
    } catch {}
  }, [campaigns])

  if (!getToken()) return null

  return (
    <div id="app" className="app-dark-page">
      <div className="app-dark-content">

        {/* Mismo hero que /panel */}
        <div className="home-hero home-hero--compact">
          <div className="home-hero-bg">
            <img src={HERO_IMG} className="home-hero-img" alt="" />
          </div>
          <div className="home-hero-overlay" />
          <div className="home-hero-greeting reveal reveal-slow reveal-from-left">
            <div className="home-hero-greeting-top">
              <span className="home-hero-greeting-label">{t('panel.greetingLabel')}</span>
            </div>
            <div className="home-hero-greeting-name">
              {t('panel.hello')}, <span className="hw-name-light">{username}</span>
            </div>
            <div className="home-hero-greeting-sub">{t('panel.prepared')}</div>
            <button type="button" className="home-hero-btn home-hero-btn--logout" onClick={() => { logout(); navigate('/', { replace: true }) }} aria-label={t('panel.logout')}>
              <i className="fas fa-right-from-bracket" aria-hidden /> {t('panel.logout')}
            </button>
          </div>
          <div className="home-hero-text reveal reveal-slow reveal-delay-1">
            <div className="home-hero-eyebrow">{t('panel.eyebrow')}</div>
            <h1 className="home-hero-h1">
              {t('panel.title1')}
              <br />
              {t('panel.title2')}
            </h1>
            <p className="home-hero-desc">
              {t('panel.desc')}
            </p>
          </div>
        </div>

        <div className="workflow-root">
          <div id="wf-strip" className="wf-strip reveal">
            <div className="wf-strip-inner">
              <h2 className="wf-strip-title">{t('campana.stepTitle')}</h2>
              <div className="wf-stl" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3} aria-label={t('campana.stepTitle')}>
                <span className={`wf-stl-step${currentStep === 1 ? ' wf-stl-step--active' : ''}${hasImportedExcel ? ' wf-stl-step--done' : ''}`}>
                  <span className="wf-stl-num">{hasImportedExcel ? <i className="fas fa-check" /> : '1'}</span>
                  <span className="wf-stl-label">{t('campana.step1')}</span>
                </span>
                <div className="wf-stl-line" />
                <span className={`wf-stl-step${currentStep === 2 ? ' wf-stl-step--active' : ''}${hasSubjectAndBody ? ' wf-stl-step--done' : ''}`}>
                  <span className="wf-stl-num">{hasSubjectAndBody ? <i className="fas fa-check" /> : '2'}</span>
                  <span className="wf-stl-label">{t('campana.step2')}</span>
                </span>
                <div className="wf-stl-line" />
                <span className={`wf-stl-step${currentStep === 3 ? ' wf-stl-step--active' : ''}${hasSentCampaign ? ' wf-stl-step--done' : ''}`}>
                  <span className="wf-stl-num">{hasSentCampaign ? <i className="fas fa-check" /> : '3'}</span>
                  <span className="wf-stl-label">{t('campana.step3')}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="wf-cards wf-cards--single" data-view="grid-3-pasos">
            <div className="wrap">
              <Message text={globalMsg.text} type={globalMsg.type} />
              <div
                className="wf-cards-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: 'auto auto',
                  gap: '0.35rem 1.5rem',
                  alignItems: 'stretch',
                }}
              >
                <section id="step-1" className="wf-grid-pane" style={{ minWidth: 0 }}>
                  <ExcelImport onImportSuccess={() => setHasImportedExcel(true)} />
                </section>
                <section id="step-2" className="wf-grid-pane">
                  <div className="cstab-root">
                    <div className="cstab-bar">
                      <button type="button" className={`cstab${designAiTab === 'design' ? ' cstab--active' : ''}`} onClick={() => setDesignAiTab('design')}>
                        <i className="fas fa-envelope-open-text" /> {t('campana.tabDesign')}
                      </button>
                      <button type="button" className={`cstab${designAiTab === 'ai' ? ' cstab--active' : ''}`} onClick={() => setDesignAiTab('ai')}>
                        <i className="fas fa-wand-magic-sparkles" /> {t('campana.tabAI')}
                      </button>
                    </div>
                    <div className={`cstab-pane${designAiTab === 'design' ? ' cstab-pane--active' : ''}`}>
                      <CampaignForm campaigns={campaigns} selectedCampaignId={selectedCampaignId} onSelectedCampaignIdChange={setSelectedCampaignId} onCampaignCreated={addCampaign} onCampaignUpdated={updateCampaignInList} onCampaignDeleted={removeCampaign} subject={subject} body={body} onSubjectChange={setSubject} onBodyChange={setBody} disabled={!hasImportedExcel} />
                    </div>
                    <div className={`cstab-pane${designAiTab === 'ai' ? ' cstab-pane--active' : ''}`}>
                      <AIAssistant body={body} onBodyAppend={handleBodyAppend} onSubjectChange={setSubject} onSuggestionApplied={() => setHasUsedAI(true)} />
                    </div>
                  </div>
                </section>
                <section id="step-3" className="wf-grid-pane wf-grid-pane--full" style={{ gridColumn: '1 / -1' }}>
                  <SendCampaign subject={subject} message={body} hasImportedExcel={hasImportedExcel} onSendSuccess={() => setHasSentCampaign(true)} />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
