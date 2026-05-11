'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    if (!cursor || !ring) return

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power3.out' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power3.out' })
    }

    const onEnterLink = () => {
      gsap.to(ring, { scale: 2, opacity: 1, duration: 0.3, ease: 'power3.out' })
      gsap.to(cursor, { scale: 0.5, duration: 0.3, ease: 'power3.out' })
    }
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 0.6, duration: 0.3, ease: 'power3.out' })
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power3.out' })
    }

    window.addEventListener('mousemove', onMove)

    const links = document.querySelectorAll<HTMLElement>('a, button, [data-magnetic]')
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div id="cursor" aria-hidden="true" />
      <div id="cursor-ring" aria-hidden="true" />
    </>
  )
}
