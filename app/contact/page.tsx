import type { Metadata } from 'next'
import ContactForm from './ContactForm'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Contact — Void Gallery',
  description: 'Submit a representation inquiry, collector question, or press request to Void Gallery.',
}

export default function ContactPage() {
  return (
    <>
      <div
        className="min-h-screen px-6 md:px-12 pt-32 pb-20"
        style={{ background: 'var(--bg)' }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-label mb-4">Get in Touch</p>
          <h1
            className="font-display mb-6"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontFamily: 'Times New Roman, serif',
              lineHeight: 0.9,
            }}
          >
            Contact
          </h1>
          <p className="mb-16" style={{ color: 'var(--fg-dim)', lineHeight: 1.8, maxWidth: '44ch' }}>
            We accept a limited number of new inquiries each year. All submissions are reviewed
            personally. We respond within 7 days.
          </p>

          <ContactForm />

          <div className="mt-20 pt-8 grid md:grid-cols-3 gap-8 border-t" style={{ borderColor: 'var(--border)' }}>
            {[
              { label: 'London', address: '14 Bermondsey St\nLondon SE1 3PB\ninfo@voidgallery.art' },
              { label: 'Berlin', address: 'Brunnenstr. 189\n10119 Berlin\nberlin@voidgallery.art' },
              { label: 'Seoul', address: 'Itaewon-ro 14\nYongsan-gu\nseoul@voidgallery.art' },
            ].map(({ label, address }) => (
              <div key={label}>
                <p className="text-label mb-3">{label}</p>
                <p className="text-sm whitespace-pre-line" style={{ color: 'var(--fg-dim)', lineHeight: 1.8 }}>
                  {address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
