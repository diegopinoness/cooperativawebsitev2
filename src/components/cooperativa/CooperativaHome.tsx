import { useCooperativaEffects } from "./useCooperativaEffects";
import { tier1Clients, tier2Clients, services, cases, heroVideos, mesaAssets } from "./data";
import logo from "@/assets/cooperativa-logo.svg";
import CooperativaNav from "./CooperativaNav";
import { Words } from "./Words";

function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedIn({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconTikTok({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.58a8.24 8.24 0 004.82 1.56V7.7a4.85 4.85 0 01-1.05-.01z" />
    </svg>
  );
}

export default function CooperativaHome() {
  useCooperativaEffects();
  const tier2Loop = [...tier2Clients, ...tier2Clients];

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      <CooperativaNav variant="home" />

      {/* HERO */}
      <header id="hero">
        <div className="hero-bg">
          {[heroVideos.izquierda, heroVideos.medio, heroVideos.derecha].map((src, i) => (
            <div className="hero-img-col" key={i}>
              <video src={src} className="parallax-media" loop muted playsInline preload="metadata" />
            </div>
          ))}
        </div>
        <div className="hero-overlay" />
        <div className="hero-dividers" />
        <div className="hero-content">
          <h1 className="hero-title gs-hero-item iw-text">
            <Words>Las marcas que quieren</Words><br />
            <Words>ser </Words><em><Words>inolvidables</Words></em><br />
            <Words>nos llaman a nosotros.</Words>
          </h1>
          <p className="hero-subtitle gs-hero-item">
            Diseñamos experiencias BTL, activaciones de marca e influencer marketing<br />
            que convierten momentos en memorias: Y memorias en resultados.
          </p>
          <div className="hero-ctas gs-hero-item">
            <a href="#cases" className="btn-outline"><span>Ver nuestro trabajo</span></a>
            <a href="#culture" className="link-secondary">
              Conocer la agencia <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </header>

      {/* CLIENTES */}
      <section id="clients">
        <div className="container text-center">
          <p className="section-eyebrow justify-center gs-fade">MARCAS QUE CONFÍAN EN NOSOTROS</p>
          <h2 className="section-title text-center mx-auto gs-fade iw-text">
            <Words>Cuando una marca quiere</Words><br />
            <Words>que algo suceda </Words><em><Words>de verdad,</Words></em><br />
            <Words>buscan a Cooperativa</Words><em>.</em>
          </h2>

          <div className="clients-tier1 gs-fade">
            {tier1Clients.map((c) => (
              <div className="client-logo" key={c.name}>
                <img src={c.logo} alt={c.name} />
                <span className="client-hover-label">VER TRABAJO</span>
              </div>
            ))}
          </div>

          <div className="clients-tier2-wrapper gs-fade" id="tier2-wrapper">
            <div className="clients-marquee" id="tier2-marquee">
              {tier2Loop.map((c, i) => (
                <div className="client-logo" key={`${c.name}-${i}`}>
                  <img src={c.logo} alt={c.name} />
                  <span className="client-hover-label">VER TRABAJO</span>
                </div>
              ))}
            </div>
          </div>

          <div className="client-stat gs-fade">
            <div className="client-stat-number">
              <span className="text-teal">+</span>
              <span id="brandCounter" style={{ color: "var(--shadow)" }}>0</span>
              <span className="text-teal">.</span>
            </div>
            <div className="client-stat-desc">marcas activadas desde 2018</div>
            <div className="section-micro-cta">
              <a href="#cases" className="micro-cta-link">Mira cómo lo hemos hecho →</a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="services">
        <div className="container text-center">
          <p className="section-eyebrow teal justify-center gs-fade">
            LO QUE HACEMOS · <span className="text-white">Y CÓMO LO PENSAMOS</span>
          </p>
          <h2 className="section-title light gs-fade mx-auto iw-text">
            <Words>No ejecutamos campañas.</Words><br />
            <Words>Construimos experiencias</Words><br />
            <Words>que las personas </Words><em><Words>recuerdan</Words></em>.
          </h2>
        </div>
        <div className="container">
          <div className="services-grid gs-fade">
            {services.map((s) => (
              <div className="service-card" key={s.number}>
                <video src={s.video} className="service-bg-video" loop muted playsInline preload="none" />
                <div className="service-content">
                  <div className="service-number">{s.number}</div>
                  <h3 className="service-name" style={{ whiteSpace: "pre-line" }}>{s.name}</h3>
                  <p className="service-quote">{s.quote}</p>
                  <p className="service-desc">{s.desc}</p>
                  {s.tags.length > 0 && (
                    <div className="service-tags">
                      {s.tags.map((t) => <span className="service-tag" key={t}>{t}</span>)}
                    </div>
                  )}
                  <a href="#" className="service-link mt-auto">{s.cta}</a>
                </div>
              </div>
            ))}
          </div>
          <div className="services-footer gs-fade text-center">
            <p className="services-footer-phrase">
              La diferencia no está en hacer una cosa bien.<br />
              Está en saber cuándo y cómo combinarlas.
            </p>
          </div>
        </div>
      </section>

      {/* CASOS */}
      <section id="cases">
        <div className="cases-header px-60">
          <div className="cases-header-row" style={{ flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
            <div>
              <p className="section-eyebrow teal justify-center gs-fade">
                CASOS DE ÉXITO · <span className="text-white">EL TRABAJO QUE NOS DEFINE</span>
              </p>
              <h2 className="section-title light mb-0 mx-auto gs-fade iw-text">
                <Words>No prometemos resultados.</Words><br />
                <em><Words>Los tenemos.</Words></em>
              </h2>
            </div>
            <div className="cases-progress gs-fade" style={{ justifyContent: "center", width: "100%" }}>
              <span className="progress-label">← Desliza para ver los casos →</span>
              <div className="progress-bar" style={{ display: "none" }}>
                <div className="progress-fill" id="progressFill" />
              </div>
            </div>
          </div>
        </div>
        <div className="cases-track-wrapper">
          <div className="cases-track" id="casesTrack">
            {cases.map((c) => (
              <div className="case-card" key={c.num}>
                <img src={c.image} alt={c.client} className="case-bg" loading="lazy" />
                <div className="case-gradient" />
                <div className="case-content">
                  <div className="case-top">
                    <span className="case-num">{c.num}</span>
                    <span className="case-client-badge">{c.client}</span>
                  </div>
                  <div className="case-bottom">
                    <div className="case-service-type">{c.serviceType}</div>
                    <h3 className="case-title">{c.title}</h3>
                    <div className="case-reveal">
                      <div className="case-reveal-inner">
                        <div>
                          <h4 className="case-reveal-title">EL RETO</h4>
                          <p className="case-reveal-desc">{c.challenge}</p>
                        </div>
                        <div>
                          <h4 className="case-reveal-title">LO QUE HICIMOS</h4>
                          <p className="case-reveal-desc">{c.solution}</p>
                        </div>
                      </div>
                      <div className="case-reveal-inner" style={{ marginBottom: 40 }}>
                        {c.stats.map((st) => (
                          <div className="case-stat" key={st.label}>
                            <div className="case-stat-value">{st.value}</div>
                            <div className="case-stat-label">{st.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <a href="#" className="case-cta">Ver caso completo →</a>
                  </div>
                </div>
              </div>
            ))}
            <div className="case-card-end">
              <p>¿Quieres ver todo el trabajo?</p>
              <a href="#" className="btn-outline" style={{ borderColor: "var(--teal)" }}>
                <span>Ver todos los casos →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CULTURA / LA MESA */}
      <section id="culture" className="mesa-section">
        <div className="container text-center">
          <p className="section-eyebrow justify-center gs-fade">QUIÉNES SOMOS · MÁS ALLÁ DEL TRABAJO</p>
          <h2 className="section-title text-center mx-auto mb-6 gs-fade iw-text">
            <Words>Una agencia es tan buena</Words><br />
            <Words>como las personas que</Words><br />
            <em><Words>deciden</Words></em> <Words>construirla.</Words>
          </h2>
        </div>

        <div className="mesa-wrapper gs-fade">
          <svg id="mesaSvg" viewBox="0 0 1150 560" xmlns="http://www.w3.org/2000/svg" fill="none">
            <defs>
              <pattern id="paperGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(79,169,167,0.07)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <image id="table-asset" href={mesaAssets.mesa} width="1150" height="560" x="0" y="0" />
            <g id="chairs-container" />
          </svg>
        </div>

        <div className="container text-center">
          <p className="mesa-title text-center mx-auto gs-fade iw-text" style={{ marginTop: 60 }}>
            <em><Words>Creativity Is The New Cool Kids Table.</Words></em>
          </p>
        </div>

        <div className="container text-center" style={{ marginTop: 40 }}>
          <p className="mesa-footer-text gs-fade iw-text"><Words>(COME SIT WITH US)</Words></p>
        </div>
      </section>

      {/* MESA MODAL */}
      <div className="modal-overlay" id="modalOverlay">
        <div className="modal-panel" id="modalPanel">
          <div className="modal-header">
            <div>
              <p className="modal-left-eyebrow">Equipo Cooperativa.</p>
              <h3 className="modal-role-name" id="modalRoleName">Rol</h3>
            </div>
            <button className="modal-close" id="modalClose" aria-label="Cerrar">✕</button>
          </div>
          <div className="modal-members" id="modalMembers" />
        </div>
      </div>

      {/* CTA */}
      <section id="cta">
        <div className="cta-glow" />
        <div className="container container-narrow cta-content-wrapper">
          <p className="section-eyebrow teal justify-center mb-6 gs-fade">
            HABLEMOS · <span style={{ color: "white" }}>EL PRIMER PASO ES EL MÁS FÁCIL</span>
          </p>
          <h2 className="cta-headline gs-fade cta-headline-interactive">
            <span className="cta-line">
              <span className="cta-word">Tu</span>{" "}
              <span className="cta-word">próxima</span>{" "}
              <span className="cta-word">campaña</span>
            </span>
            <br />
            <span className="cta-line">
              <span className="cta-word">merece</span>{" "}
              <span className="cta-word">algo</span>{" "}
              <span className="cta-word">que</span>
            </span>
            <br />
            <em className="cta-line cta-line-em">
              <span className="cta-word">nadie</span>{" "}
              <span className="cta-word">ha</span>{" "}
              <span className="cta-word">visto</span>{" "}
              <span className="cta-word">antes</span><span style={{ color: "white" }}>.</span>
            </em>
          </h2>
          <p className="cta-subheadline gs-fade">
            Cuéntanos qué tienes en mente.<br />Nosotros te decimos cómo hacerlo inolvidable.
          </p>
          <div className="cta-actions gs-fade" style={{ marginTop: 40 }}>
            <a href="#" className="btn-solid modal-trigger">Quiero activar mi marca &nbsp; →</a>
            <a href="mailto:contacto@cooperativa.mx" className="cta-email">
              O escríbenos directamente<br />contacto@cooperativa.mx{"\u00a0\u00a0→"}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="Cooperativa." style={{ filter: "brightness(0) invert(1)", maxWidth: 200, height: "auto" }} />
            <p className="footer-brand-desc">
              Agencia de marketing experiencial, BTL e influencer marketing con sede en Ciudad de México. Construimos experiencias que las marcas no pueden ignorar y las personas no olvidan.
            </p>
          </div>
          <div>
            <p className="footer-col-title">Navegación</p>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#services">Servicios</a></li>
              <li><a href="#cases">Casos de Éxito</a></li>
              <li><a href="#clients">Clientes</a></li>
              <li><a href="#cta">Contacto</a></li>
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Servicios</p>
            <ul className="footer-links">
              <li><a href="#">Experiential Marketing &amp; BTL</a></li>
              <li><a href="#">Influencer Marketing</a></li>
              <li><a href="#">Relaciones Públicas</a></li>
              <li><a href="#">Activaciones de Marca</a></li>
              <li><a href="#">Eventos Corporativos</a></li>
              <li><a href="#">Lanzamientos de Producto</a></li>
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Contacto</p>
            <p className="footer-contact-item"><a href="mailto:contacto@cooperativa.mx">contacto@cooperativa.mx</a></p>
            <p className="footer-contact-item">Ciudad de México, México</p>
            <div className="footer-social-row">
              <a href="#" className="footer-social-icon" aria-label="Instagram"><IconInstagram size={16} /></a>
              <a href="#" className="footer-social-icon" aria-label="LinkedIn"><IconLinkedIn size={16} /></a>
              <a href="#" className="footer-social-icon" aria-label="TikTok"><IconTikTok size={16} /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Cooperativa. Todos los derechos reservados.</span>
          <span className="footer-tagline">Creativity Is The New Cool Kids Table.</span>
          <div className="footer-legal">
            <a href="#">Política de Privacidad</a>
            <a href="#">Términos de Uso</a>
          </div>
        </div>
      </footer>

      {/* CONTACT MODAL */}
      <div className="contact-overlay" id="contactOverlay">
        <div className="contact-panel" id="contactPanel">
          <button className="contact-panel-close" id="contactClose" aria-label="Cerrar">✕</button>
          <p className="contact-eyebrow">Cooperativa.</p>
          <h3 className="contact-title">Hablemos de tu próxima<br /><em>activación.</em></h3>
          <form className="contact-form" id="contactForm" noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="contactNombre">Nombre</label>
              <input type="text" className="form-input" id="contactNombre" name="nombre" placeholder="Tu nombre" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contactMarca">Marca que representas</label>
              <input type="text" className="form-input" id="contactMarca" name="marca" placeholder="Nombre de la marca" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contactMensaje">¿Qué tienes en mente?</label>
              <textarea className="form-input form-textarea" id="contactMensaje" name="mensaje" placeholder="Cuéntanos tu idea..." required />
            </div>
            <button type="submit" className="contact-submit">Enviar mensaje &nbsp; →</button>
          </form>
          <div className="contact-success" id="contactSuccess">
            <div className="success-check">✓</div>
            <h3 className="success-title">Recibido.</h3>
            <p className="success-text">
              Nos ponemos en contacto en menos de 24 horas.<br />Sin compromisos. Sin presiones.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}