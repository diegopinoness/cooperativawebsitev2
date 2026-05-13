import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chairs, mesaAssets } from "./data";

gsap.registerPlugin(ScrollTrigger);

const SVG_NS = "http://www.w3.org/2000/svg";
function svgEl<T extends SVGElement>(tag: string, attrs: Record<string, string | number>): T {
  const el = document.createElementNS(SVG_NS, tag) as unknown as T;
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
}

export function useCooperativaEffects() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. CUSTOM CURSOR
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let rafId = 0;
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    if (cursor && ring && supportsHover) {
      const onMove = (e: MouseEvent) => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
      };
      document.addEventListener("mousemove", onMove);
      const animateRing = () => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + "px";
        ring.style.top = ringY + "px";
        rafId = requestAnimationFrame(animateRing);
      };
      animateRing();

      const interactables = document.querySelectorAll(
        "a, button, .case-card, .team-member, .client-logo, .chair-group"
      );
      const onEnter = () => {
        cursor.classList.add("hovering");
        ring.classList.add("hovering");
      };
      const onLeave = () => {
        cursor.classList.remove("hovering");
        ring.classList.remove("hovering");
      };
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
      cleanups.push(() => {
        document.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(rafId);
        interactables.forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    // 2. NAVBAR SCROLL EFFECT
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

    // 2.5 SMOOTH SCROLL for hash links
    const hashLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    );
    const hashHandlers = hashLinks.map((link) => {
      const h = (e: MouseEvent) => {
        const hash = link.getAttribute("href");
        if (!hash || hash === "#") return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        const navLinks = document.getElementById("navLinks");
        const hamburger = document.getElementById("hamburger");
        if (navLinks?.classList.contains("open")) {
          navLinks.classList.remove("open");
          hamburger?.classList.remove("open");
          hamburger?.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
        (target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
      };
      link.addEventListener("click", h);
      return [link, h] as const;
    });
    cleanups.push(() => hashHandlers.forEach(([el, h]) => el.removeEventListener("click", h)));

    // 2.6 HAMBURGER
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    const onHamburger = () => {
      if (!hamburger || !navLinks) return;
      const isOpen = navLinks.classList.toggle("open");
      hamburger.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    };
    hamburger?.addEventListener("click", onHamburger);
    cleanups.push(() => hamburger?.removeEventListener("click", onHamburger));

    // 3. GLOBAL FADE-INS
    const fadeElements = document.querySelectorAll(".gs-fade");
    fadeElements.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: "top 85%" },
        opacity: 1,
        y: 0,
        duration: reduced ? 0 : 1.2,
        ease: "power3.out",
      });
    });

    // 4. HERO TIMELINE
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .to(".hero-bg", { opacity: 1, duration: reduced ? 0 : 2, delay: 0.2 })
      .to(
        ".gs-hero-item",
        { opacity: 1, y: 0, duration: reduced ? 0 : 1.5, stagger: 0.2, ease: "power4.out" },
        "-=1.2"
      );

    // 4.1 PARALLAX HERO MEDIA — desktop only (mobile is choppy)
    const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
    if (!reduced && !isMobileViewport) {
      gsap.utils.toArray<HTMLElement>(".parallax-media").forEach((media) => {
        gsap.to(media, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }

    // 4.2 HERO VIDEO PLAY
    document.querySelectorAll<HTMLVideoElement>(".parallax-media").forEach((vid) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) vid.play().catch(() => {});
            else vid.pause();
          });
        },
        { threshold: 0.01, rootMargin: "200px 0px" }
      );
      obs.observe(vid);
      cleanups.push(() => obs.disconnect());
    });

    // 4.5 SERVICE HOVER VIDEO
    document.querySelectorAll<HTMLElement>(".service-card").forEach((card) => {
      const vid = card.querySelector<HTMLVideoElement>(".service-bg-video");
      if (!vid) return;
      const enter = () => vid.play().catch(() => {});
      const leave = () => vid.pause();
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      });
    });

    // 4.6 MARQUEE PLAY/PAUSE
    const tier2Marquee = document.getElementById("tier2-marquee");
    const tier2Wrapper = document.getElementById("tier2-wrapper");
    if (tier2Marquee && tier2Wrapper) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            tier2Marquee.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
          });
        },
        { threshold: 0.05 }
      );
      obs.observe(tier2Wrapper);
      cleanups.push(() => obs.disconnect());
    }

    // 5. HORIZONTAL CASES SCROLL (desktop only)
    const track = document.getElementById("casesTrack");
    const trackWrapper = document.querySelector(".cases-track-wrapper");
    const progressFill = document.getElementById("progressFill");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (track && trackWrapper && !isMobile) {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 60);
      const tlCases = gsap.timeline();
      tlCases.to(track, { x: getScrollAmount, ease: "none", duration: 1 });
      tlCases.to({}, { duration: 0.1 });
      const st = ScrollTrigger.create({
        trigger: trackWrapper as Element,
        start: "top 15%",
        end: () => `+=${getScrollAmount() * -1 * 1.1}`,
        pin: true,
        animation: tlCases,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!progressFill) return;
          const actualProgress = Math.min(1, self.progress / 0.9);
          (progressFill as HTMLElement).style.width = Math.max(0, actualProgress * 100) + "%";
        },
      });
      cleanups.push(() => st.kill());
    }

    // 6. COUNTER
    const counterST = ScrollTrigger.create({
      trigger: ".client-stat",
      start: "top 85%",
      once: true,
      onEnter: () => {
        const counterEl = document.getElementById("brandCounter");
        if (!counterEl) return;
        gsap.to({ val: 0 }, {
          val: 50,
          duration: 2.5,
          ease: "power3.out",
          onUpdate() {
            counterEl.innerText = String(Math.round((this.targets()[0] as { val: number }).val));
          },
        });
      },
    });
    cleanups.push(() => counterST.kill());

    // 7. LA MESA — build chairs + interactions
    const TABLE_TOP = 120;
    const TABLE_BOTTOM = 405;
    const TOP_CY = TABLE_TOP + 22 - 26;
    const BOT_CY = TABLE_BOTTOM - 22 + 26;
    const HEAD_CX = 134;
    const HEAD_CY = 260;
    const HOVER_OFFSET = 28;
    const CLICK_OFFSET = 62;

    const makeLabel = (roleText: string, lx: number, ly: number) => {
      const labelG = svgEl<SVGGElement>("g", { class: "chair-label" });
      const charW = 6.5;
      const w = Math.max(roleText.length * charW + 20, 80);
      const h = 22;
      const bx = lx - w / 2;
      const by = ly - h / 2;
      labelG.appendChild(svgEl("rect", { class: "label-bg", x: bx, y: by, width: w, height: h, rx: 4 }));
      labelG.appendChild(svgEl("line", { class: "label-teal-line", x1: bx + 8, y1: by + h, x2: bx + w - 8, y2: by + h }));
      const txt = svgEl<SVGTextElement>("text", { class: "label-text", x: lx, y: ly + 3.5, "text-anchor": "middle", "dominant-baseline": "middle" });
      txt.textContent = roleText.toUpperCase();
      labelG.appendChild(txt);
      return labelG;
    };

    const drawChair = (chair: typeof chairs[number]) => {
      const g = svgEl<SVGGElement>("g", {
        class: "chair-group",
        id: "chair-" + chair.id,
        "data-id": chair.id,
        "data-side": chair.side,
      });
      const cx = chair.side === "left" ? HEAD_CX : chair.cx;
      const cy = chair.side === "top" ? TOP_CY : chair.side === "bottom" ? BOT_CY : HEAD_CY;
      g.dataset.baseCx = String(cx);
      g.dataset.baseCy = String(cy);
      g.setAttribute("transform", `translate(${cx},${cy})`);
      const chairW = 80, chairH = 75;
      const imgX = -chairW / 2, imgY = -chairH / 2 + 2;
      const imgAttrs: Record<string, string | number> = {
        class: "chair-seat",
        href: mesaAssets.silla,
        x: imgX, y: imgY, width: chairW, height: chairH,
      };
      if (chair.side === "bottom") imgAttrs.transform = "rotate(180)";
      else if (chair.side === "left") imgAttrs.transform = "rotate(-90)";
      g.appendChild(svgEl("image", imgAttrs));
      if (chair.side === "top") g.appendChild(makeLabel(chair.role, 0, -44));
      else if (chair.side === "bottom") g.appendChild(makeLabel(chair.role, 0, 44));
      else g.appendChild(makeLabel(chair.role, -62, 0));
      return g;
    };

    const container = document.getElementById("chairs-container");
    if (container) {
      container.innerHTML = "";
      chairs.forEach((c) => container.appendChild(drawChair(c)));
    }

    let activeChairId: string | null = null;
    const overlay = document.getElementById("modalOverlay");
    const panel = document.getElementById("modalPanel");
    const roleName = document.getElementById("modalRoleName");
    const membersEl = document.getElementById("modalMembers");
    const closeBtn = document.getElementById("modalClose");

    const setChairTransform = (el: SVGGElement, ox: number, oy: number) => {
      const cx = parseFloat(el.dataset.baseCx || "0");
      const cy = parseFloat(el.dataset.baseCy || "0");
      el.setAttribute("transform", `translate(${cx + ox},${cy + oy})`);
    };

    const openMesaModal = (chair: typeof chairs[number]) => {
      if (!roleName || !membersEl || !overlay || !panel) return;
      roleName.textContent = chair.role;
      membersEl.innerHTML = "";
      chair.members.forEach((m, i) => {
        const card = document.createElement("div");
        card.className = "member-card";
        card.style.animationDelay = i * 0.07 + "s";
        card.innerHTML = `
          <div class="member-photo"><div class="member-photo-inner">
            <svg class="member-silhouette" width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="28" r="18" fill="#4FA9A7" opacity="0.5"/>
              <path d="M10,90 Q10,58 40,58 Q70,58 70,90" fill="#4FA9A7" opacity="0.5"/>
            </svg>
          </div></div>
          <div class="member-info">
            <p class="member-name">${m.name}</p>
            <p class="member-title-text">${m.title}</p>
          </div>`;
        membersEl.appendChild(card);
      });
      overlay.classList.add("is-open");
      setTimeout(() => panel.classList.add("is-open"), 10);
    };

    const closeMesaModal = () => {
      panel?.classList.remove("is-open");
      overlay?.classList.remove("is-open");
      if (activeChairId) {
        const prev = document.getElementById("chair-" + activeChairId) as SVGGElement | null;
        if (prev) {
          prev.classList.remove("is-active");
          setChairTransform(prev, 0, 0);
        }
        activeChairId = null;
      }
    };

    const chairGroups = Array.from(document.querySelectorAll<SVGGElement>(".chair-group"));
    const chairHandlers: Array<[SVGGElement, string, EventListener]> = [];
    chairGroups.forEach((el) => {
      const side = el.dataset.side as "top" | "bottom" | "left";
      const enter = () => {
        if (el.dataset.id === activeChairId) return;
        const jx = (Math.random() - 0.5) * 4;
        const jy = (Math.random() - 0.5) * 4;
        if (side === "top") setChairTransform(el, jx, -HOVER_OFFSET + jy);
        if (side === "bottom") setChairTransform(el, jx, HOVER_OFFSET + jy);
        if (side === "left") setChairTransform(el, -HOVER_OFFSET + jx, jy);
      };
      const leave = () => {
        if (el.dataset.id === activeChairId) return;
        setChairTransform(el, 0, 0);
      };
      const click = () => {
        const id = el.dataset.id!;
        if (activeChairId === id) {
          closeMesaModal();
          return;
        }
        if (activeChairId) {
          const prev = document.getElementById("chair-" + activeChairId) as SVGGElement | null;
          if (prev) {
            prev.classList.remove("is-active");
            setChairTransform(prev, 0, 0);
          }
        }
        activeChairId = id;
        setTimeout(() => {
          el.classList.add("is-active");
          if (side === "top") setChairTransform(el, 0, -CLICK_OFFSET);
          if (side === "bottom") setChairTransform(el, 0, CLICK_OFFSET);
          if (side === "left") setChairTransform(el, -CLICK_OFFSET, 0);
          const data = chairs.find((c) => c.id === id);
          if (data) openMesaModal(data);
        }, 120);
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      el.addEventListener("click", click);
      chairHandlers.push([el, "mouseenter", enter as EventListener]);
      chairHandlers.push([el, "mouseleave", leave as EventListener]);
      chairHandlers.push([el, "click", click as EventListener]);
    });
    cleanups.push(() => chairHandlers.forEach(([el, ev, h]) => el.removeEventListener(ev, h)));

    const onMesaClose = () => closeMesaModal();
    closeBtn?.addEventListener("click", onMesaClose);
    const onOverlay = (e: MouseEvent) => { if (e.target === overlay) closeMesaModal(); };
    overlay?.addEventListener("click", onOverlay as EventListener);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMesaModal(); };
    document.addEventListener("keydown", onKey);
    cleanups.push(() => {
      closeBtn?.removeEventListener("click", onMesaClose);
      overlay?.removeEventListener("click", onOverlay as EventListener);
      document.removeEventListener("keydown", onKey);
    });

    // 8. CONTACT MODAL
    const contactOverlay = document.getElementById("contactOverlay");
    const contactClose = document.getElementById("contactClose");
    const contactForm = document.getElementById("contactForm") as HTMLFormElement | null;
    const contactSuccess = document.getElementById("contactSuccess");

    const openContactModal = () => {
      contactOverlay?.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };
    const closeContactModal = () => {
      contactOverlay?.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(() => {
        if (contactForm) { contactForm.style.display = ""; contactForm.reset(); }
        contactSuccess?.classList.remove("is-visible");
      }, 400);
    };

    const triggers = Array.from(document.querySelectorAll<HTMLElement>(".modal-trigger"));
    const triggerHandlers = triggers.map((btn) => {
      const h = (e: Event) => { e.preventDefault(); openContactModal(); };
      btn.addEventListener("click", h);
      return [btn, h] as const;
    });
    const onContactClose = () => closeContactModal();
    contactClose?.addEventListener("click", onContactClose);
    const onContactOverlay = (e: MouseEvent) => { if (e.target === contactOverlay) closeContactModal(); };
    contactOverlay?.addEventListener("click", onContactOverlay as EventListener);
    const onContactKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && contactOverlay?.classList.contains("is-open")) closeContactModal();
    };
    document.addEventListener("keydown", onContactKey);
    const onSubmit = (e: Event) => {
      e.preventDefault();
      if (contactForm) contactForm.style.display = "none";
      contactSuccess?.classList.add("is-visible");
    };
    contactForm?.addEventListener("submit", onSubmit);

    cleanups.push(() => {
      triggerHandlers.forEach(([btn, h]) => btn.removeEventListener("click", h));
      contactClose?.removeEventListener("click", onContactClose);
      contactOverlay?.removeEventListener("click", onContactOverlay as EventListener);
      document.removeEventListener("keydown", onContactKey);
      contactForm?.removeEventListener("submit", onSubmit);
    });

    // refresh ScrollTrigger after layout settles
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
    cleanups.push(() => clearTimeout(refreshTimeout));

    return () => {
      cleanups.forEach((c) => c());
      ScrollTrigger.getAll().forEach((s) => s.kill());
      gsap.killTweensOf("*");
    };
  }, []);
}