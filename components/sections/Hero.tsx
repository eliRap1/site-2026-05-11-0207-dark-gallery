'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const section = sectionRef.current
    const bg = bgRef.current
    const headline = headlineRef.current
    const sub = subRef.current
    const cta = ctaRef.current
    const grid = gridRef.current
    if (!section || !bg || !headline || !sub || !cta || !grid) return

    const lines = headline.querySelectorAll<HTMLElement>('.line-inner')

    if (prefersReduced) {
      gsap.set([lines, sub, cta], { opacity: 1, y: 0 })
      return
    }

    // Entrance animation
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo(
      lines,
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.2, stagger: 0.12, ease: 'expo.out' }
    )
      .fromTo(sub, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.6')
      .fromTo(cta, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')

    // Scrubbed hero pin + parallax
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      })

      pinTl.to(bg, { yPercent: 30, ease: 'none' }, 0)
      pinTl.to(headline, { yPercent: -25, letterSpacing: '0.1em', opacity: 0, ease: 'none' }, 0)
      pinTl.to(sub, { yPercent: -40, opacity: 0, ease: 'none' }, 0)
      pinTl.fromTo(grid, { opacity: 0 }, { opacity: 0.15, ease: 'none' }, 0.3)
    })

    // Cursor parallax
    const onPointerMove = (e: PointerEvent) => {
      if (prefersReduced) return
      const cx = (e.clientX / window.innerWidth - 0.5) * 2
      const cy = (e.clientY / window.innerHeight - 0.5) * 2
      gsap.to(bg, { x: cx * 20, y: cy * 15, duration: 1.2, ease: 'power3.out' })
    }
    section.addEventListener('pointermove', onPointerMove)

    return () => {
      mm.revert()
      section.removeEventListener('pointermove', onPointerMove)
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section) st.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex h-screen min-h-[600px] flex-col items-center justify-center overflow-hidden noise"
      style={{ background: 'var(--bg)' }}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute"
          style={{
            top: '10%',
            left: '-10%',
            width: '70%',
            height: '70%',
            background: 'radial-gradient(ellipse at 30% 40%, rgba(200,169,110,0.07) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '5%',
            right: '-5%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(ellipse at 70% 60%, rgba(200,169,110,0.04) 0%, transparent 55%)',
          }}
        />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{
              top: `${12 + i * 12}%`,
              height: '1px',
              background: 'rgba(200,169,110,0.04)',
            }}
          />
        ))}
      </div>

      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          zIndex: 1,
          backgroundImage:
            'linear-gradient(rgba(200,169,110,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.08) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0,
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl w-full">
        <p className="text-label mb-8" style={{ letterSpacing: '0.25em' }}>
          Est. 1997 — London, Berlin, Seoul
        </p>

        <h1 ref={headlineRef} className="font-display leading-[0.9] mb-8" style={{ fontFamily: 'Times New Roman, serif' }}>
          <span className="line-mask block" style={{ fontSize: 'clamp(4rem, 12vw, 11rem)' }}>
            <span className="line-inner block text-[var(--fg)]">WHERE DARK</span>
          </span>
          <span className="line-mask block" style={{ fontSize: 'clamp(4rem, 12vw, 11rem)' }}>
            <span className="line-inner block text-[var(--accent)] italic">ART LIVES</span>
          </span>
        </h1>

        <p ref={subRef} className="max-w-lg mx-auto mb-10" style={{ color: 'var(--fg-dim)', fontSize: '1.05rem', lineHeight: 1.6, opacity: 0 }}>
          An institution for artists who refuse the light. Void Gallery presents work that exists
          at the edge of perception — where form dissolves and meaning accumulates.
        </p>

        <a
          ref={ctaRef}
          href="#works"
          data-magnetic
          className="inline-block border border-[var(--accent)] text-[var(--accent)] px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-500"
          style={{ opacity: 0 }}
        >
          View Collection
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-label" style={{ fontSize: '0.6rem' }}>Scroll</span>
        <div
          className="w-px bg-[var(--accent)]"
          style={{ height: '40px', opacity: 0.5 }}
        />
      </div>
    </section>
  )
}
