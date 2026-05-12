import type { ReactNode } from "react";
import logo from "@/assets/cooperativa-logo.svg";
import { Link } from "@tanstack/react-router";
import { Sparkles, Trophy, Mail, Newspaper, ArrowUpRight, Home as HomeIcon } from "lucide-react";

type Item =
  | { type: "hash"; href: string; icon: ReactNode; label: string }
  | { type: "route"; to: string; icon: ReactNode; label: string };

export default function CooperativaNav({ variant = "home" }: { variant?: "home" | "newsletter" }) {
  const isNewsletter = variant === "newsletter";
  const items: Item[] = isNewsletter
    ? [
        { type: "route", to: "/", icon: <HomeIcon size={13} strokeWidth={2.2} />, label: "Home" },
        { type: "hash", href: "/#services", icon: <Sparkles size={13} strokeWidth={2.2} />, label: "Servicios" },
        { type: "hash", href: "/#cases", icon: <Trophy size={13} strokeWidth={2.2} />, label: "Casos" },
        { type: "route", to: "/newsletter", icon: <Newspaper size={13} strokeWidth={2.2} />, label: "Newsletter" },
      ]
    : [
        { type: "hash", href: "#services", icon: <Sparkles size={13} strokeWidth={2.2} />, label: "Servicios" },
        { type: "hash", href: "#cases", icon: <Trophy size={13} strokeWidth={2.2} />, label: "Casos de Éxito" },
        { type: "route", to: "/newsletter", icon: <Newspaper size={13} strokeWidth={2.2} />, label: "Newsletter" },
        { type: "hash", href: "#cta", icon: <Mail size={13} strokeWidth={2.2} />, label: "Contacto" },
      ];

  return (
    <nav id="navbar">
      <Link to="/" className="nav-logo" aria-label="Cooperativa — Inicio">
        <img src={logo} alt="Cooperativa Logo" />
      </Link>
      <ul className="nav-links" id="navLinks">
        {items.map((it, i) => (
          <li key={i}>
            {it.type === "hash" ? (
              <a href={it.href}>{it.icon}<span>{it.label}</span></a>
            ) : (
              <Link to={it.to}>{it.icon}<span>{it.label}</span></Link>
            )}
          </li>
        ))}
      </ul>
      {isNewsletter ? (
        <a href="#nl-subscribe" className="nav-cta">
          <span>Suscribirme</span>
          <ArrowUpRight size={16} strokeWidth={2.2} className="nav-cta-arrow" />
        </a>
      ) : (
        <a href="#cta" className="nav-cta modal-trigger">
          <span>Hablemos</span>
          <ArrowUpRight size={16} strokeWidth={2.2} className="nav-cta-arrow" />
        </a>
      )}
      <button className="hamburger" id="hamburger" aria-label="Abrir menú" aria-expanded="false">
        <span /><span /><span />
      </button>
    </nav>
  );
}