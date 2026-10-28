import assert from 'node:assert/strict'
import test from 'node:test'
import { buildContributionCalendar } from '../src/contributions.js'

const day = (date, count = 0, level = 0) => ({ date, count, level })

test('aligns a partial week and month boundary with Sunday-first columns', () => {
  const calendar = buildContributionCalendar({ contributions: [
    day('2026-10-30', 2, 1), day('2026-10-31', 4, 2),
    day('2026-11-01', 6, 3), day('2026-11-02', 8, 4),
  ] })
  assert.equal(calendar.total, 20)
  assert.equal(calendar.weeks, 2)
  assert.deepEqual(calendar.days.map(({ column, row }) => [column, row]), [[0, 5], [0, 6], [1, 0], [1, 1]])
  assert.deepEqual(calendar.months, [{ label: 'Nov', column: 1 }])
})

test('keeps zero-contribution days and handles leap days in UTC', () => {
  const calendar = buildContributionCalendar({ contributions: [
    day('2024-02-28'), day('2024-02-29'), day('2024-03-01'),
  ] })
  assert.equal(calendar.total, 0)
  assert.equal(calendar.days.length, 3)
  assert.deepEqual(calendar.days.map(({ row }) => row), [3, 4, 5])
})

test('rejects unavailable or malformed data instead of drawing a misleading calendar', () => {
  for (const data of [null, {}, { error: 'Unavailable' }, { contributions: [] },
    { contributions: [null] }, { contributions: [day('2026-02-30')] },
    { contributions: [day('bad-date')] }, { contributions: [day('2026-10-28', -1)] },
    { contributions: [day('2026-10-28', 1, 5)] }, { contributions: [day('2026-10-28', '1')] },
    { contributions: [day('2026-10-28'), day('2026-10-30')] },
    { contributions: [day('2026-10-28'), day('2026-10-28')] },
  ]) assert.throws(() => buildContributionCalendar(data), /contribution data/i)
})
