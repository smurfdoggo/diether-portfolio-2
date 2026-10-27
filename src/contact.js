import { profile } from './data.js'

export function buildMailto({ name, email, message }) {
  const subject = `Portfolio inquiry from ${name.trim()}`
  const body = `${message.trim()}\n\nFrom: ${name.trim()}\nEmail: ${email.trim()}`
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
