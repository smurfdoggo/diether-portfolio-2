import assert from 'node:assert/strict'
import test from 'node:test'
import { buildMailto } from '../src/contact.js'

test('keeps special characters and newlines inside the email draft', () => {
  const url = new URL(buildMailto({
    name: 'Alex & Jo',
    email: 'alex+work@example.com',
    message: 'Hello Diether,\nLet’s build A&B? #next',
  }))
  assert.equal(url.protocol, 'mailto:')
  assert.equal(url.pathname, 'besadiether031@gmail.com')
  assert.equal(url.searchParams.get('subject'), 'Portfolio inquiry from Alex & Jo')
  assert.equal(url.searchParams.get('body'), 'Hello Diether,\nLet’s build A&B? #next\n\nFrom: Alex & Jo\nEmail: alex+work@example.com')
  assert.equal(url.hash, '')
  assert.equal([...url.searchParams].length, 2)
})

test('trims accidental surrounding whitespace from contact fields', () => {
  const url = new URL(buildMailto({ name: '  Alex  ', email: ' alex@example.com ', message: ' Hello!  ' }))
  assert.equal(url.searchParams.get('subject'), 'Portfolio inquiry from Alex')
  assert.equal(url.searchParams.get('body'), 'Hello!\n\nFrom: Alex\nEmail: alex@example.com')
})
