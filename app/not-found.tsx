import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      style={{ background: 'var(--bg)' }}
    >
      <p className="text-label mb-6" style={{ letterSpacing: '0.25em' }}>404</p>
      <h1
        className="font-display mb-6"
        style={{
          fontSize: 'clamp(3rem, 10vw, 8rem)',
          fontFamily: 'Times New Roman, serif',
          lineHeight: 0.9,
          color: 'var(--fg)',
        }}
      >
        Lost in
        <br />
        <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>the dark.</span>
      </h1>
      <p className="mb-10 max-w-sm" style={{ color: 'var(--fg-dim)', lineHeight: 1.7 }}>
        This page doesn&apos;t exist — or perhaps it&apos;s simply too dark to see.
        Return to the gallery.
      </p>
      <Link
        href="/"
        className="border border-[var(--accent)] text-[var(--accent)] px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-500"
      >
        Return to Void
      </Link>
    </div>
  )
}
