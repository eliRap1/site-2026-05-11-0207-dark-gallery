'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const QUOTES = [
  {
    text: 'Void Gallery doesn\'t show you art. It makes you feel that you\'ve been seen by it.',
    author: 'Frieze Magazine',
    role: 'Print Edition, March 2025',
  },
  {
    text: 'There is no institution in Europe — perhaps anywhere — doing more ambitious work with emerging artists working in darkness.',
    author: 'Artnet News',
    role: 'Annual Gallery Report',
  },
  {
    text: 'They gave my work a room. They gave it a reason. That distinction matters enormously.',
    author: 'Mara Voss',
    role: 'Artist, Penumbra Series',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    if (!section || prefersReduced) return

    const items = section.querySelectorAll<HTMLElement>('.testimonial-item')
    const triggers: ScrollTrigger[] = []

    items.forEach((item, i) => {
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.0, delay: i * 0.12, ease: 'power3.out' }
          )
        },
      })
      triggers.push(st)
    })

    const accent = section.querySelector<HTMLElement>('.accent-line')
    if (accent) {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        animation: gsap.fromTo(accent, { yPercent: -30 }, { yPercent: 30 }),
      })
      triggers.push(st)
    }

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
      style={{ background: 'var(--bg-2)' }}
    >
      <div
        className="accent-line absolute left-0 top-0 w-px bg-[var(--accent)] will-change-transform"
        style={{ height: '120%', opacity: 0.2 }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <p className="text-label mb-3">Critical Response</p>
        <h2
          className="font-display mb-20"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: 'Times New Roman, serif', lineHeight: 0.95 }}
        >
          What They Said
        </h2>

        <div className="grid md:grid-cols-3 gap-px" style={{ borderTop: '1px solid var(--border)' }}>
          {QUOTES.map((q, i) => (
            <div
              key={i}
              className="testimonial-item pt-8 pr-8"
              style={{ opacity: 0 }}
            >
              <p
                className="font-display mb-8"
                style={{
                  fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                  fontFamily: 'Times New Roman, serif',
                  lineHeight: 1.6,
                  color: 'var(--fg)',
                }}
              >
                &ldquo;{q.text}&rdquo;
              </p>
              <div>
                <p style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>{q.author}</p>
                <p className="text-label mt-1" style={{ fontSize: '0.65rem' }}>{q.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
