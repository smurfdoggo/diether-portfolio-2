export function buildContributionCalendar(data) {
  if (!Array.isArray(data?.contributions) || !data.contributions.length) {
    throw new Error('Invalid contribution data')
  }

  const months = []
  let total = 0
  let firstDate
  const days = data.contributions.map((day, index) => {
    const date = new Date(`${day?.date}T00:00:00Z`)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day?.date) || !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== day.date ||
      !Number.isSafeInteger(day.count) || day.count < 0 ||
      !Number.isInteger(day.level) || day.level < 0 || day.level > 4) {
      throw new Error('Invalid contribution data')
    }
    if (index === 0) firstDate = date
    if (date.getTime() !== firstDate.getTime() + index * 86400000) {
      throw new Error('Invalid contribution data: dates must be consecutive')
    }
    const column = Math.floor((firstDate.getUTCDay() + index) / 7)
    if (date.getUTCDate() === 1 || (index === 0 && date.getUTCDate() <= 7)) {
      months.push({ label: date.toLocaleDateString('en', { month: 'short', timeZone: 'UTC' }), column })
    }
    total += day.count
    return { ...day, column, row: date.getUTCDay() }
  })
  return { days, months, total, weeks: days.at(-1).column + 1 }
}
