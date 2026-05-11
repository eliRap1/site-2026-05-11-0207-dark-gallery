'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    const head = headRef.current
    const btn = btnRef.current
    if (!section || !head || !btn || prefersReduced) return

    const lines = head.querySelectorAll<HTMLElement>('.line-inner')

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        const tl = gsap.timeline()
        tl.fromTo(
          lines,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1.1, stagger: 0.1, ease: 'expo.out' }
        ).fromTo(
          btn,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
      },
    })

    // Magnetic button
    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * 0.35
      const dy = (e.clientY - cy) * 0.35
      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power3.out' })
    }
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)

    return () => {
      st.kill()
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-32 md:py-52 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden noise"
      style={{ background: 'var(--bg)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,169,110,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <p className="text-label mb-8" style={{ letterSpacing: '0.25em' }}>Begin a Conversation</p>

      <h2
        ref={headRef}
        className="font-display mb-12"
        style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', fontFamily: 'Times New Roman, serif', lineHeight: 0.92 }}
      >
        <span className="line-mask block">
          <span className="line-inner block" style={{ opacity: 0, transform: 'translateY(110%)' }}>
            Your Work
          </span>
        </span>
        <span className="line-mask block">
          <span className="line-inner block text-[var(--accent)] italic" style={{ opacity: 0, transform: 'translateY(110%)' }}>
            Deserves Dark.
          </span>
        </span>
      </h2>

      <p
        className="mb-12 max-w-md"
        style={{ color: 'var(--fg-dim)', lineHeight: 1.8 }}
      >
        We accept a limited number of new representation inquiries each year.
        Submit your proposal — we read everything.
      </p>

      <Link
        ref={btnRef}
        href="/contact"
        data-magnetic
        className="inline-block border border-[var(--accent)] text-[var(--accent)] px-12 py-5 text-xs tracking-[0.25em] uppercase hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors duration-500 magnetic"
        style={{ opacity: 0, willChange: 'transform' }}
      >
        Submit Proposal
      </Link>
    </section>
  )
}
