'use client'

import { useRef, useState } from 'react'
import { submitContact } from './actions'

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('submitting')
    const data = new FormData(formRef.current)
    const result = await submitContact(data)
    if (result.success) {
      setStatus('success')
      formRef.current.reset()
    } else {
      setStatus('error')
      setErrorMsg(result.error ?? 'Something went wrong.')
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
      aria-label="Contact form"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <label className="block">
          <span className="text-label block mb-2">Name *</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="w-full bg-transparent border border-[var(--border)] px-4 py-3 text-sm text-[var(--fg)] placeholder-[var(--fg-dim)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-300"
          />
        </label>
        <label className="block">
          <span className="text-label block mb-2">Email *</span>
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="w-full bg-transparent border border-[var(--border)] px-4 py-3 text-sm text-[var(--fg)] placeholder-[var(--fg-dim)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-300"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-label block mb-2">Inquiry Type</span>
        <select
          name="type"
          className="w-full bg-[var(--bg)] border border-[var(--border)] px-4 py-3 text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-300"
        >
          <option value="artist-representation">Artist Representation</option>
          <option value="collector">Collector Inquiry</option>
          <option value="press">Press &amp; Media</option>
          <option value="partnerships">Partnerships</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label className="block">
        <span className="text-label block mb-2">Message *</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us about your work or inquiry..."
          className="w-full bg-transparent border border-[var(--border)] px-4 py-3 text-sm text-[var(--fg)] placeholder-[var(--fg-dim)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-300 resize-none"
        />
      </label>

      {status === 'error' && (
        <p className="text-sm" style={{ color: 'var(--red)' }}>
          {errorMsg}
        </p>
      )}

      {status === 'success' ? (
        <p
          className="text-sm py-4 px-6 border"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          Received. We read every submission and will respond within 7 days.
        </p>
      ) : (
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="border border-[var(--accent)] text-[var(--accent)] px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
        </button>
      )}
    </form>
  )
}
