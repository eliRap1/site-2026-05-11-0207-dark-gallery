import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      id="footer"
      className="px-6 md:px-12 py-12 border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <p
            className="font-display text-2xl mb-4"
            style={{ fontFamily: 'Times New Roman, serif', color: 'var(--fg)' }}
          >
            VOID/GALLERY
          </p>
          <p style={{ color: 'var(--fg-dim)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '36ch' }}>
            An institution for artists who refuse the light.
            Representing 94 artists in 12 cities since 1997.
          </p>
        </div>

        <div>
          <p className="text-label mb-4">Navigate</p>
          <ul className="space-y-2">
            {['Works', 'Process', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  href={item === 'Contact' ? '/contact' : `/#${item.toLowerCase()}`}
                  className="text-sm hover:text-[var(--accent)] transition-colors duration-300"
                  style={{ color: 'var(--fg-dim)' }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-label mb-4">Locations</p>
          <ul className="space-y-2">
            {[
              '14 Bermondsey St, London',
              'Brunnenstr. 189, Berlin',
              'Itaewon-ro 14, Seoul',
            ].map((loc) => (
              <li key={loc} className="text-sm" style={{ color: 'var(--fg-dim)' }}>
                {loc}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto mt-12 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="text-label" style={{ fontSize: '0.65rem' }}>
          © 2026 Void Gallery. All rights reserved.
        </p>
        <p className="text-label" style={{ fontSize: '0.65rem', color: 'var(--fg-dim)' }}>
          Art is not decoration. Art is a question.
        </p>
      </div>
    </footer>
  )
}
