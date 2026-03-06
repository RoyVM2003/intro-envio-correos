import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { DiagnosisForm } from '../components/DiagnosisForm'

const LOGO_URL = 'https://osdemsdigital.com/wp-content/uploads/2026/03/loogo-app.png'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80'
const TEAM_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
const TIER_CARD_IMAGES = [
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=338&fit=crop&q=85',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=338&fit=crop&q=85',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=338&fit=crop&q=85',
]

const VALUE_CARDS = [
  {
    icon: 'fa-handshake',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=360&fit=crop&q=85',
    title: 'Fidelización a tu marca',
    desc: 'Generando relaciones sólidas y duraderas más allá de la venta.',
  },
  {
    icon: 'fa-users',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=360&fit=crop&q=85',
    title: 'Empodera a tu equipo',
    desc: 'Con más movilidad, eficiencia operativa y herramientas listas para el futuro.',
  },
  {
    icon: 'fa-globe',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=360&fit=crop&q=85',
    title: 'Optimiza operaciones',
    desc: 'Conectando la demanda del cliente con tu cadena de suministro y comunicación.',
  },
]

const TIER_LEVELS = [
  { level: 'Tier 1', title: 'Soporte básico', desc: 'Primera línea. Atiende el 70-80% de los incidentes habituales con procedimientos definidos.' },
  { level: 'Tier 2', title: 'Soporte avanzado', desc: 'Técnicos especializados para problemas de mayor complejidad, configuraciones y diagnóstico profundo.' },
  { level: 'Tier 3', title: 'Nivel experto', desc: 'Ingenieros que desarrollan soluciones, investigan causa raíz y gestionan la infraestructura más compleja.' },
]

const KEY_FIGURES = [
  { value: '24/7', label: 'Servicio internacional' },
  { value: 'Tier 1-3', label: 'Niveles de soporte' },
  { value: '+1.500', label: 'Clientes' },
  { value: '13+', label: 'Países' },
]

const INFO_BOXES_LIGHT = [
  {
    title: 'Business Consulting',
    text: 'Para que la transformación digital de tu negocio sea un éxito, hace falta un enfoque de consultoría holístico y pragmático que abarque personas, procesos y tecnología con resultados tangibles. Tanto si buscas apoyo en el éxito estratégico como en el operativo, nuestro enfoque orientado al ROI impulsa la calidad, las mejores prácticas y la innovación constante.',
  },
  {
    title: 'Consultoría B2B (Technological Trailblazers)',
    text: 'En consultoría B2B (Business to Business), la innovación está en el ADN de OSDEMS: llevamos a nuestros clientes las innovaciones del mañana hoy. Lo hacemos con nuestro centro de R&D interno que desarrolla soluciones específicas por sector y rol, y con un ecosistema de plataformas punteras que están cambiando el mercado. Este enfoque híbrido en consultoría B2B garantiza la mejor solución disponible para tu negocio.',
  },
]

const CONTINUITY_CARDS = [
  {
    icon: 'fa-headset',
    title: 'Mantener la continuidad operativa',
    text: 'Una vez desplegadas y enriquecidas, tus soluciones han de mantenerse, protegerse y prepararse para el futuro, tanto en infraestructura como en aplicaciones de negocio. Nuestra división de Atención al Cliente se encarga de ello con un Helpdesk internacional abierto 24/7 con soporte Tier 1 a Tier 3.',
  },
  {
    icon: 'fa-layer-group',
    title: 'Soporte Tier 1 a Tier 3',
    text: 'Se refiere a los niveles de soporte técnico que estructuran la atención al cliente según la complejidad del problema: desde la atención básica (Nivel 1) para incidencias habituales, pasando por soporte técnico avanzado (Nivel 2), hasta expertos o ingenieros que resuelven fallos críticos (Nivel 3). Tier 1 atiende el 70-80% de los incidentes; Tier 2 aborda problemas de mayor complejidad y diagnóstico; Tier 3 soluciona problemas de arquitectura o fallos complejos.',
  },
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
    const sections = sectionRefs.current
    for (let i = 0; i < 9; i++) {
      if (sections[i]) observer.observe(sections[i])
    }
    return () => observer.disconnect()
  }, [])

  const setRef = (i) => (el) => {
    sectionRefs.current[i] = el
  }

  return (
    <div className="intro">
      {/* Hero — botón Iniciar sesión flotando sobre la imagen, sin franja */}
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

      {/* Franja bajo hero — marquee en bucle, muchas frases */}
      <div className="intro-hero-strip" aria-hidden>
        <div className="intro-hero-strip-track">
          {stripPhrases.flatMap((phrase) => [
            <span key={`${phrase}-1`} className="intro-hero-strip-phrase">{phrase}</span>,
            <span key={`${phrase}-1-dot`} className="intro-hero-strip-dot" aria-hidden>◆</span>,
          ])}
          {stripPhrases.flatMap((phrase) => [
            <span key={`${phrase}-2`} className="intro-hero-strip-phrase">{phrase}</span>,
            <span key={`${phrase}-2-dot`} className="intro-hero-strip-dot" aria-hidden>◆</span>,
          ])}
        </div>
      </div>

      {/* Split: recuadro azul (cada ítem con icono arriba + frase, centrados) + Propósito centrado */}
      <section className="intro-split intro-scroll-section" ref={setRef(0)}>
        <div className="intro-split-dark">
          <div className="intro-split-dark-inner">
            <h2 className="intro-split-dark-title">{t('intro.split.title')}</h2>
            <p className="intro-split-dark-desc">{t('intro.split.desc')}</p>
            <div className="intro-split-dark-items">
              <div className="intro-split-dark-item">
                <div className="intro-split-dark-item-icon"><i className="fas fa-paper-plane" aria-hidden /></div>
                <span className="intro-split-dark-item-label">{t('intro.split.item1')}</span>
              </div>
              <div className="intro-split-dark-item">
                <div className="intro-split-dark-item-icon"><i className="fas fa-chart-line" aria-hidden /></div>
                <span className="intro-split-dark-item-label">{t('intro.split.item2')}</span>
              </div>
              <div className="intro-split-dark-item">
                <div className="intro-split-dark-item-icon"><i className="fas fa-reply" aria-hidden /></div>
                <span className="intro-split-dark-item-label">{t('intro.split.item3')}</span>
              </div>
              <div className="intro-split-dark-item">
                <div className="intro-split-dark-item-icon"><i className="fas fa-chart-pie" aria-hidden /></div>
                <span className="intro-split-dark-item-label">{t('intro.split.item4')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="intro-split-light">
          <div className="intro-split-content intro-split-content--centered">
            <h2 className="intro-split-title">{t('intro.split.purposeTitle')}</h2>
            <p className="intro-split-text">
              {t('intro.split.purpose1')}
            </p>
            <p className="intro-split-text">
              {t('intro.split.purpose2')}
            </p>
            <div className="intro-split-image-wrap">
              <img src={TEAM_IMAGE} alt="" className="intro-split-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Tarjetas de valor + cuadros corporativos (conceptos que respaldan) */}
      <section className="intro-cards intro-scroll-section intro-scroll-from-left" id="valor" ref={setRef(1)}>
        <div className="intro-wrap">
          <p className="intro-cards-intro">
            {t('intro.cards.intro')}
          </p>
          <div className="intro-cards-grid">
            {VALUE_CARDS.map((card, i) => (
              <article key={card.icon} className="intro-card">
                {card.image && (
                  <div className="intro-card-image-wrap">
                    <img src={card.image} alt="" className="intro-card-image" />
                  </div>
                )}
                <div className="intro-card-icon">
                  <i className={`fas ${card.icon}`} aria-hidden />
                </div>
                <h3 className="intro-card-title">{t(`intro.cards.card${i + 1}Title`)}</h3>
                <p className="intro-card-desc">{t(`intro.cards.card${i + 1}Desc`)}</p>
                <div className="intro-card-accent" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cuadros de información — B2B + Consultoría (contraste, vida) */}
      <section className="intro-info-boxes intro-scroll-section" ref={setRef(2)}>
        <div className="intro-info-boxes-inner">
          <article className="intro-info-box intro-info-box--dark">
            <div className="intro-info-box-icon"><i className="fas fa-rocket" aria-hidden /></div>
            <h2 className="intro-info-box-title">{t('intro.info.box1Title')}</h2>
            <p className="intro-info-box-text">{t('intro.info.box1Text')}</p>
          </article>
          <article className="intro-info-box intro-info-box--accent">
            <div className="intro-info-box-icon"><i className="fas fa-lightbulb" aria-hidden /></div>
            <h2 className="intro-info-box-title">{t('intro.info.box2Title')}</h2>
            <p className="intro-info-box-text">{t('intro.info.box2Text')}</p>
          </article>
        </div>
      </section>

      {/* Apartado ROI — para directivos y dueños (sin imagen de fondo) */}
      <section className="intro-roi intro-scroll-section intro-scroll-from-left" ref={setRef(3)}>
        <div className="intro-wrap intro-roi-inner">
          <h2 className="intro-roi-title">{t('intro.roi.title')}</h2>
          <p className="intro-roi-lead">
            {t('intro.roi.lead')}
          </p>
          <div className="intro-roi-text">
            <p>{t('intro.roi.p1')}</p>
            <p>{t('intro.roi.p2')}</p>
          </div>
        </div>
      </section>

      {/* Continuidad + Tier — dos recuadros lado a lado (estilo Azure / cards) */}
      <section className="intro-continuity intro-scroll-section" id="servicio" ref={setRef(4)}>
        <div className="intro-continuity-inner">
          <p className="intro-continuity-subtitle">{t('intro.continuity.subtitle')}</p>
          <h2 className="intro-continuity-title">{t('intro.continuity.title')}</h2>
          <p className="intro-continuity-intro">
            {t('intro.continuity.intro')}
          </p>
          <div className="intro-continuity-row">
            {CONTINUITY_CARDS.map((card, i) => (
              <article key={card.icon} className="intro-continuity-card">
                <div className="intro-continuity-card-icon">
                  <i className={`fas ${card.icon}`} aria-hidden />
                </div>
                <h3 className="intro-continuity-card-title">{t(`intro.continuity.card${i + 1}Title`)}</h3>
                <p className="intro-continuity-card-text">{t(`intro.continuity.card${i + 1}Text`)}</p>
                <div className="intro-continuity-card-accent" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Niveles Tier 1, 2, 3 (detalle) — imagen de referencia en cada cuadro */}
      <section className="intro-tier intro-scroll-section intro-scroll-from-left" ref={setRef(5)}>
        <div className="intro-wrap intro-tier-content">
          <h2 className="intro-tier-main-title">{t('intro.tier.title')}</h2>
          <p className="intro-tier-roi-callout">
            {t('intro.tier.roiCallout')}
          </p>
          <p className="intro-tier-lead">
            {t('intro.tier.lead')}
          </p>
          <p className="intro-tier-intro">
            {t('intro.tier.intro')}
          </p>
          <div className="intro-tier-grid">
            <div className="intro-tier-card">
              <div className="intro-tier-card-image-wrap">
                <img src={TIER_CARD_IMAGES[0]} alt="" className="intro-tier-card-image" />
              </div>
              <span className="intro-tier-badge">{t('intro.tier.tier1')}</span>
              <h3 className="intro-tier-title">{t('intro.tier.tier1Title')}</h3>
              <p className="intro-tier-desc">{t('intro.tier.tier1Desc')}</p>
            </div>
            <div className="intro-tier-card">
              <div className="intro-tier-card-image-wrap">
                <img src={TIER_CARD_IMAGES[1]} alt="" className="intro-tier-card-image" />
              </div>
              <span className="intro-tier-badge">{t('intro.tier.tier2')}</span>
              <h3 className="intro-tier-title">{t('intro.tier.tier2Title')}</h3>
              <p className="intro-tier-desc">{t('intro.tier.tier2Desc')}</p>
            </div>
            <div className="intro-tier-card">
              <div className="intro-tier-card-image-wrap">
                <img src={TIER_CARD_IMAGES[2]} alt="" className="intro-tier-card-image" />
              </div>
              <span className="intro-tier-badge">{t('intro.tier.tier3')}</span>
              <h3 className="intro-tier-title">{t('intro.tier.tier3Title')}</h3>
              <p className="intro-tier-desc">{t('intro.tier.tier3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cifras (conteo publicación) */}
      <section className="intro-figures intro-scroll-section" id="cifras" ref={setRef(6)}>
        <div className="intro-wrap">
          <p className="intro-figures-subtitle">{t('intro.figures.subtitle')}</p>
          <h2 className="intro-figures-title">{t('intro.figures.title')}</h2>
          <div className="intro-figures-grid">
            {KEY_FIGURES.map((fig, i) => (
              <div key={fig.value} className="intro-figure">
                <span className="intro-figure-value">{fig.value}</span>
                <span className="intro-figure-label">{t(`intro.figures.fig${i + 1}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario Diagnóstico Estratégico — envío a /api/v1/contact */}
      <div className="intro-scroll-section" ref={setRef(7)}>
        <DiagnosisForm t={t} />
      </div>

      {/* Cierre de contenido — CTA */}
      <section className="intro-cta intro-cta--compact intro-scroll-section" ref={setRef(8)}>
        <div className="intro-wrap intro-cta-inner">
          <p className="intro-cta-heading">{t('intro.cta.heading')}</p>
          <p className="intro-cta-text">{t('intro.cta.text')}</p>
        </div>
      </section>
    </div>
  )
}
