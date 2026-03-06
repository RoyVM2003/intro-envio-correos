import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const LOGO_URL = 'https://osdemsdigital.com/wp-content/uploads/2026/03/loogo-app.png'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80'
const TEAM_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'

const VALUE_CARDS = [
  {
    icon: 'fa-handshake',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
    title: 'Generando relaciones sólidas y duraderas',
    desc: 'Más allá de la venta. Consultoría B2B (Business to Business) que impulsa tu negocio con experiencias personalizadas y campañas que conectan.',
  },
  {
    icon: 'fa-users',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&q=80',
    title: 'Empodera a tu equipo',
    desc: 'Con más movilidad, eficiencia operativa y herramientas listas para el futuro.',
  },
  {
    icon: 'fa-globe',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80',
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
  { value: '+15.000', label: 'Clientes' },
  { value: '13+', label: 'Países' },
]

const INFO_BOXES_LIGHT = [
  {
    title: 'Business Consulting',
    text: 'Para que la transformación digital de tu negocio sea un éxito, hace falta un enfoque de consultoría holístico y pragmático que abarque personas, procesos y tecnología con resultados tangibles. Tanto si buscas apoyo en el éxito estratégico como en el operativo, nuestro enfoque orientado al ROI impulsa la calidad, las mejores prácticas y la innovación constante.',
  },
  {
    title: 'Consultoría B2B (Technological Trailblazers)',
    text: 'En consultoría B2B (Business to Business), la innovación está en el ADN de OSDEMS: llevamos a nuestros clientes las innovaciones del mañana hoy. Lo hacemos con nuestro centro de I+D interno que desarrolla soluciones específicas por sector y rol, y con un ecosistema de plataformas punteras que están cambiando el mercado. Este enfoque híbrido en consultoría B2B garantiza la mejor solución disponible para tu negocio.',
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
  const sectionRefs = useRef([])

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
    for (let i = 0; i < 6; i++) {
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
        <Link to="/login" className="intro-hero-login">Iniciar sesión</Link>
        <div className="intro-hero-content">
          <div className="intro-hero-eyebrow">TU SOCIO EN TRANSFORMACIÓN</div>
          <h1 className="intro-hero-title">
            Innovación que habla
            <br />
            el idioma del crecimiento
          </h1>
          <p className="intro-hero-tagline intro-hero-tagline--lead">
            Menos tiempo perdido. Más resultados. Escala con lo que vende.
          </p>
        </div>
      </section>

      {/* Franja bajo hero — marquee en bucle, muchas frases */}
      <div className="intro-hero-strip" aria-hidden>
        <div className="intro-hero-strip-track">
          {[
            'Transformación digital',
            'I+D e innovación',
            'Soporte 24/7',
            'Consultoría de negocio',
            'Resultados medibles',
            'Escala con tecnología',
            'Helpdesk internacional',
            'Campañas que impulsan',
            'Métricas en tiempo real',
            'Soporte Tier 1 a Tier 3',
          ].flatMap((phrase) => [
            <span key={`${phrase}-1`} className="intro-hero-strip-phrase">{phrase}</span>,
            <span key={`${phrase}-1-dot`} className="intro-hero-strip-dot" aria-hidden>◆</span>,
          ])}
          {[
            'Transformación digital',
            'I+D e innovación',
            'Soporte 24/7',
            'Consultoría de negocio',
            'Resultados medibles',
            'Escala con tecnología',
            'Helpdesk internacional',
            'Campañas que impulsan',
            'Métricas en tiempo real',
            'Soporte Tier 1 a Tier 3',
          ].flatMap((phrase) => [
            <span key={`${phrase}-2`} className="intro-hero-strip-phrase">{phrase}</span>,
            <span key={`${phrase}-2-dot`} className="intro-hero-strip-dot" aria-hidden>◆</span>,
          ])}
        </div>
      </div>

      {/* Split: recuadro azul (cada ítem con icono arriba + frase, centrados) + Propósito centrado */}
      <section className="intro-split intro-scroll-section" ref={setRef(0)}>
        <div className="intro-split-dark">
          <div className="intro-split-dark-inner">
            <h2 className="intro-split-dark-title">Qué ofrece la aplicación</h2>
            <p className="intro-split-dark-desc">Herramientas integradas para comunicar, medir y escalar tu negocio.</p>
            <div className="intro-split-dark-items">
              <div className="intro-split-dark-item">
                <div className="intro-split-dark-item-icon"><i className="fas fa-paper-plane" aria-hidden /></div>
                <span className="intro-split-dark-item-label">Envíos masivos de correos</span>
              </div>
              <div className="intro-split-dark-item">
                <div className="intro-split-dark-item-icon"><i className="fas fa-chart-line" aria-hidden /></div>
                <span className="intro-split-dark-item-label">Dashboard con seguimiento de correos</span>
              </div>
              <div className="intro-split-dark-item">
                <div className="intro-split-dark-item-icon"><i className="fas fa-reply" aria-hidden /></div>
                <span className="intro-split-dark-item-label">Respuestas y métricas en tiempo real</span>
              </div>
              <div className="intro-split-dark-item">
                <div className="intro-split-dark-item-icon"><i className="fas fa-chart-pie" aria-hidden /></div>
                <span className="intro-split-dark-item-label">Seguimiento de ganancias y ROI</span>
              </div>
            </div>
          </div>
        </div>
        <div className="intro-split-light">
          <div className="intro-split-content intro-split-content--centered">
            <h2 className="intro-split-title">Propósito</h2>
            <p className="intro-split-text">
              Lanza campañas de correo masivo a tu lista de contactos, diseña mensajes con ayuda de IA y haz seguimiento desde un mismo panel: envíos, aperturas, respuestas y rendimiento.
            </p>
            <p className="intro-split-text">
              Pensado para equipos que quieren medir el impacto y las ganancias de sus campañas sin depender de múltiples herramientas.
            </p>
            <div className="intro-split-image-wrap">
              <img src={TEAM_IMAGE} alt="" className="intro-split-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Tarjetas de valor + cuadros corporativos (conceptos que respaldan) */}
      <section className="intro-cards intro-scroll-section" id="valor" ref={setRef(1)}>
        <div className="intro-wrap">
          <p className="intro-cards-intro">
            Qué nos respalda
          </p>
          <div className="intro-cards-grid">
            {VALUE_CARDS.map((card) => (
              <article key={card.title} className="intro-card">
                {card.image && (
                  <div className="intro-card-image-wrap">
                    <img src={card.image} alt="" className="intro-card-image" />
                  </div>
                )}
                <div className="intro-card-icon">
                  <i className={`fas ${card.icon}`} aria-hidden />
                </div>
                <h3 className="intro-card-title">{card.title}</h3>
                <p className="intro-card-desc">{card.desc}</p>
                <div className="intro-card-accent" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cuadros de información — Business Consulting + Consultoría B2B */}
      <section className="intro-info-boxes intro-scroll-section" ref={setRef(2)}>
        <div className="intro-info-boxes-inner">
          {INFO_BOXES_LIGHT.map((box) => (
            <article key={box.title} className="intro-info-box">
              <h2 className="intro-info-box-title">{box.title}</h2>
              <p className="intro-info-box-text">{box.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Continuidad + Tier — dos recuadros lado a lado (estilo Azure / cards) */}
      <section className="intro-continuity intro-scroll-section" id="servicio" ref={setRef(3)}>
        <div className="intro-continuity-inner">
          <p className="intro-continuity-subtitle">Soporte y mantenimiento</p>
          <h2 className="intro-continuity-title">Continuidad operativa y soporte</h2>
          <p className="intro-continuity-intro">
            Tus soluciones mantenidas, seguras y listas para el futuro. Atención al cliente estructurada por niveles de complejidad.
          </p>
          <div className="intro-continuity-row">
            {CONTINUITY_CARDS.map((card) => (
              <article key={card.title} className="intro-continuity-card">
                <div className="intro-continuity-card-icon">
                  <i className={`fas ${card.icon}`} aria-hidden />
                </div>
                <h3 className="intro-continuity-card-title">{card.title}</h3>
                <p className="intro-continuity-card-text">{card.text}</p>
                <div className="intro-continuity-card-accent" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Niveles Tier 1, 2, 3 (detalle) — imagen de fondo ligera */}
      <section className="intro-tier intro-scroll-section" ref={setRef(4)}>
        <div className="intro-tier-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=60)' }} aria-hidden />
        <div className="intro-tier-overlay" aria-hidden />
        <div className="intro-wrap intro-tier-content">
          <h2 className="intro-tier-main-title">Servicio que no duerme</h2>
          <p className="intro-tier-lead">
            Tus soluciones mantenidas, seguras y listas para el futuro. Atención al Cliente 
            con <strong>Helpdesk internacional 24/7</strong> y <strong>soporte Tier 1 a Tier 3</strong>.
          </p>
          <p className="intro-tier-intro">
            Los niveles de soporte técnico estructuran la atención al cliente según la complejidad del problema:
          </p>
          <div className="intro-tier-grid">
            {TIER_LEVELS.map((t) => (
              <div key={t.level} className="intro-tier-card">
                <span className="intro-tier-badge">{t.level}</span>
                <h3 className="intro-tier-title">{t.title}</h3>
                <p className="intro-tier-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cifras (conteo publicación) */}
      <section className="intro-figures intro-scroll-section" id="cifras" ref={setRef(5)}>
        <div className="intro-wrap">
          <p className="intro-figures-subtitle">En números</p>
          <h2 className="intro-figures-title">Cifras clave</h2>
          <div className="intro-figures-grid">
            {KEY_FIGURES.map((fig) => (
              <div key={fig.label} className="intro-figure">
                <span className="intro-figure-value">{fig.value}</span>
                <span className="intro-figure-label">{fig.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre de contenido — sin botón Iniciar ni footer (siempre visible) */}
      <section className="intro-cta intro-cta--compact">
        <div className="intro-wrap intro-cta-inner">
          <p className="intro-cta-heading">Tu siguiente paso</p>
          <p className="intro-cta-text">Accede al panel y lanza tus campañas. Todo lo que necesitas, en un solo lugar.</p>
        </div>
      </section>
    </div>
  )
}
