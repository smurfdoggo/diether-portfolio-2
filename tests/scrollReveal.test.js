import assert from 'node:assert/strict'
import test from 'node:test'
import { observeScrollReveals } from '../src/scrollReveal.js'

function browser(t, reduced = false) {
  const previous = globalThis.window
  const motion = new EventTarget()
  motion.matches = reduced
  const observed = new Set()
  let notify
  globalThis.window = {
    matchMedia: () => motion,
    IntersectionObserver: class {
      constructor(callback) { notify = callback }
      observe(element) { observed.add(element) }
      unobserve(element) { observed.delete(element) }
      disconnect() { observed.clear() }
    },
  }
  t.after(() => { globalThis.window = previous })
  const element = () => ({
    dataset: {},
    ownerDocument: { activeElement: null },
    contains: () => false,
    animations: 0,
    cancellations: 0,
    animate() {
      this.animations++
      return { finished: new Promise(() => {}), cancel: () => this.cancellations++ }
    },
  })
  return { motion, observed, element, enter: (target, isIntersecting = true) => notify([{ target, isIntersecting }]) }
}

test('reveals only on entry, once per element, including newly expanded projects', t => {
  const page = browser(t)
  const card = page.element()
  let stop = observeScrollReveals([card])
  assert.ok(page.observed.has(card))
  page.enter(card, false)
  assert.equal(card.animations, 0)
  page.enter(card)
  page.enter(card)
  assert.equal(card.animations, 1)
  assert.ok(!page.observed.has(card))
  stop()
  const extraProject = page.element()
  stop = observeScrollReveals([card, extraProject])
  assert.deepEqual([...page.observed], [extraProject])
  page.enter(extraProject)
  assert.equal(extraProject.animations, 1)
  stop()
})

test('reduced motion and unavailable browser APIs leave content unanimated', t => {
  const page = browser(t, true)
  const card = page.element()
  observeScrollReveals([card])()
  assert.equal(page.observed.size, 0)
  page.motion.matches = false
  delete window.IntersectionObserver
  observeScrollReveals([card])()
  assert.equal(card.animations, 0)
  assert.deepEqual(card.dataset, {})
})

test('changing motion preference cancels active animations and stops observation', t => {
  const page = browser(t)
  const card = page.element()
  const pendingCard = page.element()
  const stop = observeScrollReveals([card, pendingCard])
  page.enter(card)
  page.motion.matches = true
  page.motion.dispatchEvent(new Event('change'))
  assert.equal(card.cancellations, 1)
  assert.equal(page.observed.size, 0)
  page.enter(pendingCard)
  assert.equal(pendingCard.animations, 0)
  stop()
})

test('focused content stays visible and cleanup cancels active animations', t => {
  const page = browser(t)
  const focusedCard = page.element()
  focusedCard.contains = () => true
  const card = page.element()
  const stop = observeScrollReveals([focusedCard, card])
  page.enter(focusedCard)
  assert.equal(focusedCard.animations, 0)
  page.enter(card)
  stop()
  assert.equal(card.cancellations, 1)
  assert.equal(page.observed.size, 0)
})
