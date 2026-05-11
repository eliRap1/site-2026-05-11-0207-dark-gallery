'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(
      nav,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    )

    const st = ScrollTrigger.create({
      start: 'top -80',
      onEnter: () => gsap.to(nav, { backgroundColor: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(12px)', duration: 0.4 }),
      onLeaveBack: () => gsap.to(nav, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.4 }),
    })

    return () => st.kill()
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
      style={{ opacity: 0 }}
    >
      <Link href="/" className="font-display text-xl tracking-tight text-[var(--fg)]" style={{ fontFamily: 'Times New Roman, serif' }}>
        VOID/GALLERY
      </Link>
      <ul className="hidden md:flex items-center gap-8 text-label">
        {['Works', 'Process', 'Contact'].map((item) => (
          <li key={item}>
            <Link
              href={item === 'Contact' ? '/contact' : `/#${item.toLowerCase()}`}
              className="text-[var(--fg-dim)] hover:text-[var(--fg)] transition-colors duration-300"
            >
              {item}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/contact"
            className="border border-[var(--accent)] text-[var(--accent)] px-4 py-2 text-xs tracking-widest uppercase hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300"
          >
            Inquire
          </Link>
        </li>
      </ul>
    </nav>
  )
}
