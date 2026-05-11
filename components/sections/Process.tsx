'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    n: '01',
    title: 'Discovery',
    body: 'We spend months embedded with artists before representation. Not to assess market viability — to understand the internal logic of the work.',
  },
  {
    n: '02',
    title: 'Contextualization',
    body: 'Every exhibition is built around meaning, not aesthetics. We construct the intellectual architecture that allows difficult work to be entered without a key.',
  },
  {
    n: '03',
    title: 'Presentation',
    body: 'Lighting, spacing, sequence: these are compositional decisions equal in weight to the work itself. Our installations are total environments.',
  },
  {
    n: '04',
    title: 'Permanence',
    body: 'We track the work after it leaves. Our archive contains every piece ever exhibited — its provenance, its new context, its evolving meaning.',
  },
]

const MARQUEE_ITEMS = [
  'VOID GALLERY',
  '·',
  'ART FOR THE DARK',
  '·',
  'SINCE 1997',
  '·',
  'LONDON · BERLIN · SEOUL',
  '·',
  'WHERE FORM DISSOLVES',
  '·',
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    const pinContainer = pinContainerRef.current
    const stepsEl = stepsRef.current
    const marqueeInner = marqueeInnerRef.current
    if (!section || !pinContainer || !stepsEl || !marqueeInner) return

    const stepCards = stepsEl.querySelectorAll<HTMLElement>('.step-card')

    if (prefersReduced) {
      gsap.set(stepCards, { opacity: 1, y: 0 })
      return
    }

    // Marquee
    const marqueeWidth = marqueeInner.scrollWidth / 2
    const marqueeTl = gsap.to(marqueeInner, {
      x: -marqueeWidth,
      duration: 28,
      ease: 'none',
      repeat: -1,
    })

    // Speed marquee with scroll velocity
    const velocitySt = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity()) / 1000
        marqueeTl.timeScale(1 + Math.min(velocity * 0.8, 3))
        gsap.to(marqueeTl, { timeScale: 1, duration: 0.6, ease: 'power3.out', overwrite: true, delay: 0.1 })
      },
    })

    // Pinned section
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer,
          start: 'top top',
          end: `+=${stepCards.length * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      })

      stepCards.forEach((card, i) => {
        const offset = i / stepCards.length
        pinTl.fromTo(
          card,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.25, ease: 'power3.out' },
          offset
        )
        if (i < stepCards.length - 1) {
          pinTl.to(
            card,
            { opacity: 0.2, y: -30, duration: 0.2, ease: 'power3.in' },
            offset + 0.2
          )
        }
      })

      return () => pinTl.scrollTrigger?.kill()
    })

    mm.add('(max-width: 767px)', () => {
      stepCards.forEach((card) => {
        const st = ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
          },
        })
        return () => st.kill()
      })
    })

    return () => {
      marqueeTl.kill()
      velocitySt.kill()
      mm.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="process" style={{ background: 'var(--bg)' }}>
      <div
        ref={marqueeRef}
        className="overflow-hidden border-y border-[var(--border)] py-5"
        style={{ background: 'var(--bg-2)' }}
        aria-hidden="true"
      >
        <div ref={marqueeInnerRef} className="marquee-inner will-change-transform">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-display"
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                fontFamily: 'Times New Roman, serif',
                color: item === '·' ? 'var(--accent)' : 'var(--fg)',
                opacity: item === '·' ? 0.5 : 0.7,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div ref={pinContainerRef} className="relative">
        <div className="px-6 md:px-12 pt-20 pb-8">
          <p className="text-label mb-3">How We Work</p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: 'Times New Roman, serif', lineHeight: 0.95 }}
          >
            The Process
          </h2>
        </div>

        <div
          ref={stepsRef}
          className="relative px-6 md:px-12 pb-20 md:h-screen md:flex md:items-center"
        >
          <div className="w-full max-w-3xl mx-auto">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className="step-card absolute md:static w-full max-w-3xl"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  paddingTop: '2rem',
                  paddingBottom: '2rem',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <div className="flex gap-8 items-start">
                  <span
                    className="font-display flex-shrink-0"
                    style={{
                      fontSize: '4rem',
                      color: 'var(--accent)',
                      fontFamily: 'Times New Roman, serif',
                      lineHeight: 1,
                      opacity: 0.4,
                    }}
                  >
                    {step.n}
                  </span>
                  <div>
                    <h3
                      className="font-display mb-4"
                      style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontFamily: 'Times New Roman, serif' }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ color: 'var(--fg-dim)', lineHeight: 1.8, maxWidth: '52ch', fontSize: '1rem' }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
