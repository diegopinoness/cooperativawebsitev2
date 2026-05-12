import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import CooperativaNav from "@/components/cooperativa/CooperativaNav";
import logo from "@/assets/cooperativa-logo.svg";
import { Words } from "@/components/cooperativa/Words";
import "@/cooperativa.css";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "Newsletter — Cooperativa." },
      {
        name: "description",
        content:
          "Entérate de las tendencias y novedades del experiential marketing — el newsletter mensual de Cooperativa. Cultura, marcas y experiencias que importan.",
      },
      { property: "og:title", content: "Newsletter — Cooperativa." },
      {
        property: "og:description",
        content:
          "Tendencias y novedades del experiential marketing — cultura, marcas y experiencias que importan. Mensual, sin relleno.",
      },
    ],
  }),
  component: NewsletterPage,
});

const featured = {
  num: "Issue 24",
  date: "Mayo · 2026",
  tag: "Cultura de marca",
  title: "Por qué las marcas que se atreven están ganando la conversación.",
  excerpt:
    "Una lectura sobre cómo el contexto cultural se volvió el activo más subestimado del marketing — y por qué ya no se puede ignorar.",
};

const issues = [
  {
    num: "23",
    date: "Abr · 2026",
    title: "Lo que aprendimos activando 12 ciudades en 30 días.",
    tags: ["BTL", "Logística"],
  },
  {
    num: "22",
    date: "Abr · 2026",
    title: "El nuevo manual del influencer marketing post-algoritmo.",
    tags: ["Influencers", "Estrategia"],
  },
  {
    num: "21",
    date: "Mar · 2026",
    title: "Cuándo una activación deja de ser activación y se vuelve memoria.",
    tags: ["Insight", "Experiencia"],
  },
  {
    num: "20",
    date: "Mar · 2026",
    title: "Diseñar para Gen Z sin disfrazarse de Gen Z.",
    tags: ["Audiencia", "Diseño"],
  },
  {
    num: "19",
    date: "Feb · 2026",
    title: "El brief perfecto no existe. Esto es lo más cerca que hemos visto.",
    tags: ["Proceso", "Creatividad"],
  },
  {
    num: "18",
    date: "Feb · 2026",
    title: "Cómo medir lo que no se puede contar (y por qué importa).",
    tags: ["Métricas", "BTL"],
  },
];

const topics = [
  "Cultura",
  "Marcas",
  "Experiencial",
  "Influencers",
  "Insights",
  "Producción",
  "Casos",
  "Audiencias",
];

function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Reveal-on-scroll for .nl-fade / .nl-stagger
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll<HTMLElement>(".nl-fade, .nl-stagger");
    if (reduced) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Cursor + navbar scroll
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, rafId = 0;
    const cleanups: Array<() => void> = [];
    if (cursor && ring && supportsHover) {
      const onMove = (e: MouseEvent) => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursor.style.left = mouseX + "px"; cursor.style.top = mouseY + "px";
      };
      document.addEventListener("mousemove", onMove);
      const tick = () => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + "px"; ring.style.top = ringY + "px";
        rafId = requestAnimationFrame(tick);
      };
      tick();
      const inter = document.querySelectorAll("a, button, .nl-issue, .nl-topic");
      const enter = () => { cursor.classList.add("hovering"); ring.classList.add("hovering"); };
      const leave = () => { cursor.classList.remove("hovering"); ring.classList.remove("hovering"); };
      inter.forEach((el) => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });
      cleanups.push(() => {
        document.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(rafId);
        inter.forEach((el) => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
      });
    }

    const navbar = document.getElementById("navbar");
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (navbar) {
            if (window.scrollY > 60) navbar.classList.add("scrolled");
            else navbar.classList.remove("scrolled");
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    const onHam = () => {
      if (!hamburger || !navLinks) return;
      const open = navLinks.classList.toggle("open");
      hamburger.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    };
    hamburger?.addEventListener("click", onHam);
    cleanups.push(() => hamburger?.removeEventListener("click", onHam));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="newsletter-page">
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      <CooperativaNav variant="newsletter" />

      {/* HERO */}
      <header className="nl-hero">
        <div className="nl-hero-grid" />
        <h1 className="nl-fade iw-text">
          <Words>Entérate de todas las</Words><br />
          <Words>tendencias y novedades</Words><br />
          <Words>del </Words><em><Words>experiential marketing.</Words></em>
        </h1>
        <p className="nl-hero-sub nl-fade">
          Mesa servida — el newsletter mensual de Cooperativa. Cultura, marcas
          y experiencias que importan. Una vez al mes, sin relleno.
        </p>

        <form id="nl-subscribe" className="nl-subscribe nl-fade" onSubmit={onSubscribe}>
          <input
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
            required
            disabled={submitted}
          />
          <button type="submit">
            {submitted ? "Listo ✓" : (<>Suscribirme <ArrowUpRight size={14} strokeWidth={2.2} /></>)}
          </button>
        </form>
        <p className="nl-subscribe-note nl-fade">
          <span className="text-teal">●</span> Sin spam · Cancela cuando quieras
        </p>

        <div className="nl-hero-meta nl-fade">
          <span className="nl-hero-meta-item"><span className="nl-hero-meta-dot" />+8,400 lectores</span>
          <span className="nl-hero-meta-sep" />
          <span className="nl-hero-meta-item"><span className="nl-hero-meta-dot" />24 issues</span>
          <span className="nl-hero-meta-sep" />
          <span className="nl-hero-meta-item"><span className="nl-hero-meta-dot" />Lectura 6 min</span>
        </div>
      </header>

      {/* FEATURED */}
      <section className="nl-section">
        <div className="nl-section-head nl-fade">
          <div>
            <p className="nl-section-eyebrow">Última edición</p>
            <h2 className="nl-section-title iw-text">
              <Words>Lo más reciente,</Words><br />
              <em><Words>fresco de la imprenta.</Words></em>
            </h2>
          </div>
          <p className="nl-section-aside">
            Una vez al mes, una lectura corta sobre algo que vimos, hicimos o
            pensamos. Sin métricas vacías. Sin frases recicladas.
          </p>
        </div>

        <div className="nl-featured-wrap">
          <a href="#" className="nl-featured nl-fade">
            <div className="nl-featured-cover">
              <span className="nl-featured-cover-num">24</span>
            </div>
            <div className="nl-featured-body">
              <div className="nl-featured-meta">
                <span className="nl-featured-tag">{featured.tag}</span>
                <span>{featured.num}</span>
                <span>·</span>
                <span>{featured.date}</span>
              </div>
              <h3 className="nl-featured-title">{featured.title}</h3>
              <p className="nl-featured-excerpt">{featured.excerpt}</p>
              <span className="nl-featured-cta">
                Leer la edición <ArrowUpRight size={14} strokeWidth={2.2} />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="nl-section" style={{ paddingTop: 0 }}>
        <div className="nl-section-head nl-fade">
          <div>
            <p className="nl-section-eyebrow">Archivo</p>
            <h2 className="nl-section-title iw-text">
              <Words>Las ediciones </Words><em><Words>anteriores.</Words></em>
            </h2>
          </div>
          <p className="nl-section-aside">
            Empieza por la que más te llame — todas se leen en menos de lo que
            tarda un café.
          </p>
        </div>

        <div className="nl-issues nl-stagger">
          {issues.map((it) => (
            <a href="#" className="nl-issue" key={it.num}>
              <span className="nl-issue-arrow"><ArrowUpRight size={14} strokeWidth={2.2} /></span>
              <span className="nl-issue-num">{it.num}</span>
              <span className="nl-issue-date">{it.date}</span>
              <h3 className="nl-issue-title">{it.title}</h3>
              <div className="nl-issue-tags">
                {it.tags.map((t) => <span className="nl-issue-tag" key={t}>{t}</span>)}
              </div>
            </a>
          ))}
        </div>

        <div className="nl-topics nl-fade">
          {topics.map((t) => (
            <a href="#" className="nl-topic" key={t}>{t}</a>
          ))}
        </div>
      </section>

      {/* MINI FOOTER */}
      <footer style={{ padding: "60px 40px 80px", textAlign: "center" }} className="nl-fade">
        <Link to="/" aria-label="Volver al inicio" style={{ display: "inline-block" }}>
          <img src={logo} alt="Cooperativa." style={{ filter: "brightness(0) invert(1)", maxWidth: 160, opacity: 0.8 }} />
        </Link>
        <p style={{ marginTop: 24, fontFamily: "Syne, sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
          <Link to="/" style={{ color: "inherit" }}>← Volver al sitio</Link>
          <span style={{ margin: "0 14px" }}>·</span>
          <a href="mailto:contacto@cooperativa.mx" style={{ color: "inherit" }}><Mail size={11} style={{ display: "inline", marginRight: 6 }} />contacto@cooperativa.mx</a>
        </p>
      </footer>
    </div>
  );
}