'use server'

import { appendFileSync } from 'fs'
import { join } from 'path'

export async function submitContact(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const type = String(formData.get('type') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  const entry = JSON.stringify({
    ts: new Date().toISOString(),
    name,
    email,
    type,
    message,
  })

  try {
    const logPath = join(process.cwd(), 'submissions.log')
    appendFileSync(logPath, entry + '\n', 'utf8')
  } catch {
    // Non-fatal — log path may not be writable in all envs
  }

  return { success: true }
}
