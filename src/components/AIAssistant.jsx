import { useState } from 'react'
import { Panel } from './Panel'
import { FormGroup } from './FormGroup'
import { Message } from './Message'
import { useLanguage } from '../context/LanguageContext'
import { generateText, getSubjectAndBodyFromAIResponse } from '../services/aiService'

export function AIAssistant({ body, onBodyAppend, onSubjectChange, onSuggestionApplied }) {
  const { t } = useLanguage()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: 'info' })
  const [suggestion, setSuggestion] = useState({ subject: '', body: '' })

  const handleSuggest = async () => {
    const p = prompt.trim()
    if (!p) {
      setMessage({ text: t('campana.aiPromptRequired'), type: 'err' })
      return
    }
    setLoading(true)
    setSuggestion({ subject: '', body: '' })
    setMessage({ text: t('campana.aiGeneratingMsg'), type: 'info' })
    try {
      const data = await generateText(p)
      const { subject: suggestedSubject, body: suggestedBody } = getSubjectAndBodyFromAIResponse(data)
      setSuggestion({ subject: suggestedSubject || '', body: suggestedBody || '' })
      if (suggestedSubject) onSubjectChange?.(suggestedSubject)
      if (suggestedBody) {
        const currentBody = typeof body === 'string' ? body : ''
        onBodyAppend?.(currentBody ? currentBody + '\n\n' + suggestedBody : suggestedBody)
      }
      if (suggestedSubject || suggestedBody) {
        setMessage({ text: t('campana.aiDone'), type: 'ok' })
        onSuggestionApplied?.()
      } else {
        setMessage({ text: t('campana.aiNoResult'), type: 'err' })
      }
    } catch (err) {
      const msg = err.data?.message ?? err.data?.error ?? (typeof err.data === 'object' ? JSON.stringify(err.data) : err.message)
      setMessage({ text: t('campana.aiFail') + ' ' + msg, type: 'err' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Panel title={t('campana.panel2bTitle')} icon="fas fa-robot">
      <FormGroup label={t('campana.aiLabel')} id="aiPrompt">
        <textarea id="aiPrompt" className="ai-prompt-input" placeholder={t('campana.aiPlaceholder')} value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </FormGroup>
      <button type="button" className="btn btn-secondary" onClick={handleSuggest} disabled={loading}>
        {loading ? (<><span className="btn-spinner" aria-hidden /> {t('campana.aiGenerating')}</>) : (<><i className="fas fa-magic" aria-hidden /> {t('campana.aiSuggest')}</>)}
      </button>
      <Message text={message.text} type={message.type} className="mt-1" />
      {(suggestion.subject || suggestion.body) && (
        <div className="ai-suggestion-card">
          <div className="ai-suggestion-header">
            <span className="ai-suggestion-title">{t('campana.aiProposal')}</span>
            <span className="ai-suggestion-subtitle">{t('campana.aiApplied')}</span>
          </div>
          {suggestion.subject && <p className="ai-suggestion-subject"><span>{t('campana.aiSubjectLabel')}</span> {suggestion.subject}</p>}
          {suggestion.body && (
            <div className="ai-suggestion-body">
              <span className="ai-suggestion-label">{t('campana.aiBodyLabel')}</span>
              <pre>{suggestion.body}</pre>
            </div>
          )}
        </div>
      )}
    </Panel>
  )
}
