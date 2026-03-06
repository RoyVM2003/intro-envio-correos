import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { DiagnosisForm } from '../components/DiagnosisForm'
import { IntroFooter } from '../components/IntroFooter'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80'
const TEAM_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
const TIER_CARD_IMAGES = [
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=338&fit=crop&q=85',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=338&fit=crop&q=85',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=338&fit=crop&q=85',
]

const VALUE_CARDS = [
  { icon: 'fa-handshake', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=360&fit=crop&q=85' },
  { icon: 'fa-users', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=360&fit=crop&q=85' },
  { icon: 'fa-globe', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=360&fit=crop&q=85' },
]

const CONTINUITY_CARDS = [
  { icon: 'fa-headset' },
  { icon: 'fa-layer-group' },
]

const KEY_FIGURES = [
  { value: '24/7' },
  { value: 'Tier 1-3' },
  { value: '+1.500' },
  { value: '13+' },
]

export function IntroPage() {
  const { t } = useLanguage()
  const sectionRefs = useRef([])
  const stripPhrases = Array.isArray(t('intro.strip.phrases')) ? t('intro.strip.phrases') : ['ROI visible', 'Transformación digital', 'R&D e innovación', 'Soporte 24/7', 'Consultoría de negocio', 'Resultados medibles', 'Escala con tecnología', 'Helpdesk internacional', 'Campañas que impulsan', 'Métricas en tiempo real', 'Soporte Tier 1 a Tier 3']

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('intro-inview')
          }
        })
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.08 }
    )
    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })
    return () => observer.disconnect()
  }, [])

  const setRef = (i) => (el) => {
    sectionRefs.current[i] = el
  }

  return (
    <div className="intro">
      <section className="intro-hero">
        <div className="intro-hero-bg" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="intro-hero-overlay" />
        <div className="intro-hero-content">
          <div className="intro-hero-eyebrow">{t('intro.hero.eyebrow')}</div>
          <h1 className="intro-hero-title">
            {t('intro.hero.title1')}
            <br />
            {t('intro.hero.title2')}
          </h1>
          <p className="intro-hero-tagline intro-hero-tagline--lead">
            {t('intro.hero.tagline')}
          </p>
        </div>
      </section>

      {/* 3. MARQUEE */}
      <div className="intro-hero-strip" aria-hidden>
        <div className="intro-hero-strip-track">
          {stripPhrases.flatMap((phrase, idx) => [
            <span key={`p1-${idx}`} className="intro-hero-strip-phrase">{phrase}</span>,
            <span key={`d1-${idx}`} className="intro-hero-strip-dot" aria-hidden>◆</span>,
          ])}
          {stripPhrases.flatMap((phrase, idx) => [
            <span key={`p2-${idx}`} className="intro-hero-strip-phrase">{phrase}</span>,
            <span key={`d2-${idx}`} className="intro-hero-strip-dot" aria-hidden>◆</span>,
          ])}
        </div>
      </div>

      {/* 4. SECCIONES RESTANTES */}
      <section className="intro-split intro-scroll-section" ref={setRef(0)}>
        <div className="intro-split-dark">
          <div className="intro-split-dark-inner">
            <h2 className="intro-split-dark-title">{t('intro.split.title')}</h2>
            <p className="intro-split-dark-desc">{t('intro.split.desc')}</p>
            <div className="intro-split-dark-items">
              {['paper-plane', 'chart-line', 'reply', 'chart-pie'].map((icon, idx) => (
                <div key={idx} className="intro-split-dark-item">
                  <div className="intro-split-dark-item-icon"><i className={`fas fa-${icon}`} aria-hidden /></div>
                  <span className="intro-split-dark-item-label">{t(`intro.split.item${idx + 1}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="intro-split-light">
          <div className="intro-split-content intro-split-content--centered">
            <h2 className="intro-split-title">{t('intro.split.purposeTitle')}</h2>
            <p className="intro-split-text">{t('intro.split.purpose1')}</p>
            <p className="intro-split-text">{t('intro.split.purpose2')}</p>
            <div className="intro-split-image-wrap">
              <img src={TEAM_IMAGE} alt="" className="intro-split-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Cards de Valor */}
      <section className="intro-cards intro-scroll-section" id="valor" ref={setRef(1)}>
        <div className="intro-wrap">
          <p className="intro-cards-intro">{t('intro.cards.intro')}</p>
          <div className="intro-cards-grid">
            {VALUE_CARDS.map((card, i) => (
              <article key={i} className="intro-card">
                <div className="intro-card-image-wrap"><img src={card.image} alt="" className="intro-card-image" /></div>
                <div className="intro-card-icon"><i className={`fas ${card.icon}`} aria-hidden /></div>
                <h3 className="intro-card-title">{t(`intro.cards.card${i + 1}Title`)}</h3>
                <p className="intro-card-desc">{t(`intro.cards.card${i + 1}Desc`)}</p>
                <div className="intro-card-accent" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Info Boxes */}
      <section className="intro-info-boxes intro-scroll-section" ref={setRef(2)}>
        <div className="intro-info-boxes-inner">
          <article className="intro-info-box intro-info-box--dark">
            <div className="intro-info-box-icon"><i className="fas fa-rocket" /></div>
            <h2 className="intro-info-box-title">{t('intro.info.box1Title')}</h2>
            <p className="intro-info-box-text">{t('intro.info.box1Text')}</p>
          </article>
          <article className="intro-info-box intro-info-box--accent">
            <div className="intro-info-box-icon"><i className="fas fa-lightbulb" /></div>
            <h2 className="intro-info-box-title">{t('intro.info.box2Title')}</h2>
            <p className="intro-info-box-text">{t('intro.info.box2Text')}</p>
          </article>
        </div>
      </section>

      {/* ROI */}
      <section className="intro-roi intro-scroll-section" ref={setRef(3)}>
        <div className="intro-wrap intro-roi-inner">
          <h2 className="intro-roi-title">{t('intro.roi.title')}</h2>
          <p className="intro-roi-lead">{t('intro.roi.lead')}</p>
          <div className="intro-roi-text">
            <p>{t('intro.roi.p1')}</p>
            <p>{t('intro.roi.p2')}</p>
          </div>
        </div>
      </section>

      {/* Continuidad y Tiers */}
      <section className="intro-continuity intro-scroll-section" id="servicio" ref={setRef(4)}>
        <div className="intro-continuity-inner">
          <p className="intro-continuity-subtitle">{t('intro.continuity.subtitle')}</p>
          <h2 className="intro-continuity-title">{t('intro.continuity.title')}</h2>
          <div className="intro-continuity-row">
            {CONTINUITY_CARDS.map((card, i) => (
              <article key={i} className="intro-continuity-card">
                <div className="intro-continuity-card-icon"><i className={`fas ${card.icon}`} /></div>
                <h3 className="intro-continuity-card-title">{t(`intro.continuity.card${i + 1}Title`)}</h3>
                <p className="intro-continuity-card-text">{t(`intro.continuity.card${i + 1}Text`)}</p>
                <div className="intro-continuity-card-accent" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Detalle Tiers */}
      <section className="intro-tier intro-scroll-section" ref={setRef(5)}>
        <div className="intro-wrap intro-tier-content">
          <h2 className="intro-tier-main-title">{t('intro.tier.title')}</h2>
          <div className="intro-tier-grid">
            {[1, 2, 3].map((n, i) => (
              <div key={n} className="intro-tier-card">
                <div className="intro-tier-card-image-wrap"><img src={TIER_CARD_IMAGES[i]} alt="" className="intro-tier-card-image" /></div>
                <span className="intro-tier-badge">{t(`intro.tier.tier${n}`)}</span>
                <h3 className="intro-tier-title">{t(`intro.tier.tier${n}Title`)}</h3>
                <p className="intro-tier-desc">{t(`intro.tier.tier${n}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cifras */}
      <section className="intro-figures intro-scroll-section" id="cifras" ref={setRef(6)}>
        <div className="intro-wrap">
          <h2 className="intro-figures-title">{t('intro.figures.title')}</h2>
          <div className="intro-figures-grid">
            {KEY_FIGURES.map((fig, i) => (
              <div key={i} className="intro-figure">
                <span className="intro-figure-value">{fig.value}</span>
                <span className="intro-figure-label">{t(`intro.figures.fig${i + 1}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="intro-scroll-section" ref={setRef(7)}>
        <DiagnosisForm t={t} />
      </div>

      <IntroFooter />
    </div>
  )
}