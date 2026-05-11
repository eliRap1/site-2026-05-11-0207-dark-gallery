'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 847, label: 'Works exhibited', suffix: '' },
  { value: 94, label: 'International artists', suffix: '' },
  { value: 27, label: 'Years in the dark', suffix: '' },
  { value: 12, label: 'Cities worldwide', suffix: '' },
]

const MANIFESTO_LINES = [
  'We do not collect art.',
  'We hold space for ideas',
  'too heavy for daylight.',
]

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const textBlockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const section = sectionRef.current
    const stats = statsRef.current
    const textBlock = textBlockRef.current
    if (!section || !stats || !textBlock) return

    const lines = textBlock.querySelectorAll<HTMLElement>('.line-inner')
    const statNumbers = stats.querySelectorAll<HTMLElement>('[data-stat]')

    if (prefersReduced) {
      gsap.set(lines, { opacity: 1, y: 0 })
      statNumbers.forEach((el) => {
        el.textContent = el.dataset.stat ?? ''
      })
      return
    }

    // Line reveal
    const lineReveal = ScrollTrigger.create({
      trigger: textBlock,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(
          lines,
          { y: '105%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1.0, stagger: 0.1, ease: 'expo.out' }
        )
      },
    })

    // Stat counters
    const statTriggers: ScrollTrigger[] = []
    statNumbers.forEach((el) => {
      const target = parseFloat(el.dataset.stat ?? '0')
      const counter = { val: 0 }
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(counter, {
            val: target,
            duration: 2,
            ease: 'power3.out',
            onUpdate: () => {
              el.textContent = Math.floor(counter.val).toString()
            },
            onComplete: () => {
              el.textContent = target.toString()
            },
          })
        },
      })
      statTriggers.push(st)
    })

    // Parallax on side label
    const label = section.querySelector<HTMLElement>('.side-label')
    const paralSt = label
      ? ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          animation: gsap.fromTo(label, { yPercent: -40 }, { yPercent: 40 }),
        })
      : null

    return () => {
      lineReveal.kill()
      statTriggers.forEach((t) => t.kill())
      paralSt?.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
      style={{ background: 'var(--bg-2)' }}
    >
      <span
        className="side-label hidden md:block absolute left-6 top-1/2 -translate-y-1/2 text-label will-change-transform"
        style={{ writingMode: 'vertical-rl', color: 'var(--fg-dim)' }}
      >
        MANIFESTO — 2026
      </span>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div ref={textBlockRef}>
          <p className="text-label mb-6">Our Doctrine</p>
          <div
            className="font-display leading-[1.05] mb-10"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontFamily: 'Times New Roman, serif' }}
          >
            {MANIFESTO_LINES.map((line, i) => (
              <span key={i} className="line-mask block">
                <span className="line-inner block" style={{ opacity: 0, transform: 'translateY(105%)' }}>
                  {line}
                </span>
              </span>
            ))}
          </div>
          <p style={{ color: 'var(--fg-dim)', lineHeight: 1.8, maxWidth: '38ch' }}>
            Void Gallery was founded on a single premise: that the most important work happens
            in the margins of visibility. We represent 94 artists across 12 cities who share
            an obsession with what cannot easily be seen.
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 gap-8">
          {STATS.map(({ value, label, suffix }) => (
            <div key={label} className="border-t border-[var(--border)] pt-6">
              <div
                className="font-display mb-2"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--accent)', fontFamily: 'Times New Roman, serif' }}
              >
                <span data-stat={value}>0</span>
                {suffix}
              </div>
              <p className="text-label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
