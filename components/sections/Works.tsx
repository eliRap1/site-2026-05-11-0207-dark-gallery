'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORKS = [
  {
    id: '001',
    title: 'Penumbra Series',
    artist: 'Mara Voss',
    year: '2026',
    medium: 'Oil + obsidian resin',
    bg: '#0f0f0f',
    accent: '#c8a96e',
    desc: 'Seven large-format paintings exploring the threshold between shadow and form — where figures emerge from chromatic darkness.',
  },
  {
    id: '002',
    title: 'Signal/Noise',
    artist: 'Ren Takahashi',
    year: '2025',
    medium: 'Generative video, 4-channel',
    bg: '#0c0c10',
    accent: '#8b9fd4',
    desc: 'An algorithmic investigation of interference patterns in broadcast media. Real-time generative sculpture displayed on monolith screens.',
  },
  {
    id: '003',
    title: 'Sovereign Weight',
    artist: 'Oluwafemi Adeyemi',
    year: '2025',
    medium: 'Cast iron + carbon fiber',
    bg: '#100a08',
    accent: '#d4846b',
    desc: 'Industrial materials interrogated for their colonial histories. Twelve suspended forms that activate space through sheer physical presence.',
  },
  {
    id: '004',
    title: 'Ghost Protocol',
    artist: 'Yara Solís',
    year: '2024',
    medium: 'Archival pigment print',
    bg: '#080c0c',
    accent: '#6bd4c8',
    desc: 'Long-exposure portraits of empty bureaucratic spaces — waiting rooms, holding areas, corridors — rendered in monolithic silver.',
  },
  {
    id: '005',
    title: 'Recursion',
    artist: 'Dmitri Volkov',
    year: '2026',
    medium: 'Mirror, light, AI loop',
    bg: '#0a0a0f',
    accent: '#b86bd4',
    desc: 'A room-sized installation where an AI perpetually reconstructs the viewer\'s image using only fragments of prior visitors\' data.',
  },
]

export default function Works() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return

    if (prefersReduced) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const totalWidth = track.scrollWidth
      const viewportWidth = window.innerWidth

      const st = gsap.to(track, {
        x: -(totalWidth - viewportWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${totalWidth - viewportWidth}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        st.scrollTrigger?.kill()
      }
    })

    const cards = track.querySelectorAll<HTMLElement>('.work-card-inner')
    const cardTriggers: ScrollTrigger[] = []
    cards.forEach((card, i) => {
      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        onEnter: () => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9, delay: i * 0.1, ease: 'power3.out' }
          )
        },
      })
      cardTriggers.push(st)
    })

    return () => {
      mm.revert()
      cardTriggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <section id="works" ref={wrapperRef} className="relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="px-6 md:px-12 pt-20 pb-8">
        <p className="text-label mb-3">Current Exhibition</p>
        <h2
          className="font-display"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: 'Times New Roman, serif', lineHeight: 0.95 }}
        >
          Selected Works
        </h2>
      </div>

      <div
        ref={trackRef}
        className="h-scroll-track items-stretch"
        style={{ paddingLeft: '5vw', paddingRight: '5vw', gap: '2px' }}
      >
        {WORKS.map((work, i) => (
          <article
            key={work.id}
            className="work-card-inner flex-shrink-0 flex flex-col justify-end relative overflow-hidden"
            style={{
              width: 'clamp(320px, 38vw, 520px)',
              height: '70vh',
              minHeight: '500px',
              background: work.bg,
              opacity: 0,
            }}
          >
            <div className="absolute inset-0" style={{ background: work.bg }} />
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ background: work.accent, opacity: 0.6 }}
            />
            <span
              className="absolute top-6 right-6 font-display"
              style={{
                fontSize: '5rem',
                color: 'rgba(255,255,255,0.04)',
                fontFamily: 'Times New Roman, serif',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {work.id}
            </span>
            <div className="relative z-10 p-8 pb-10 border-t border-[var(--border)]">
              <p className="text-label mb-3" style={{ color: work.accent, opacity: 0.8 }}>
                {work.medium} — {work.year}
              </p>
              <h3
                className="font-display mb-2"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontFamily: 'Times New Roman, serif', lineHeight: 1.1 }}
              >
                {work.title}
              </h3>
              <p className="text-label mb-4" style={{ color: 'var(--fg-dim)' }}>{work.artist}</p>
              <p style={{ color: 'var(--fg-dim)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '32ch' }}>
                {work.desc}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3 px-6 md:px-12 py-4 text-label">
        <span>→ Scroll to explore</span>
        <div className="flex-1 h-px bg-[var(--border)]" style={{ maxWidth: '120px' }} />
        <span>{WORKS.length} works</span>
      </div>
    </section>
  )
}
