'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = ['hero', 'manifesto', 'works', 'process', 'cta']

export default function SectionDots() {
  const dotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const dots = dotsRef.current?.querySelectorAll('.section-dot')
    if (!dots) return

    const triggers: ScrollTrigger[] = []

    SECTIONS.forEach((id, i) => {
      const el = document.getElementById(id)
      if (!el) return
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          dots.forEach((d) => d.classList.remove('active'))
          dots[i]?.classList.add('active')
        },
        onEnterBack: () => {
          dots.forEach((d) => d.classList.remove('active'))
          dots[i]?.classList.add('active')
        },
      })
      triggers.push(st)
    })

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <nav
      ref={dotsRef}
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3"
    >
      {SECTIONS.map((id) => (
        <button
          key={id}
          className="section-dot"
          aria-label={`Go to ${id} section`}
          onClick={() => {
            const el = document.getElementById(id)
            el?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
      ))}
    </nav>
  )
}
