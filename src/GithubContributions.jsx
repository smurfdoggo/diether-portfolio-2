import { useEffect, useState } from 'react'
import { profile } from './data.js'
import { buildContributionCalendar } from './contributions.js'
import Icon from './Icon.jsx'

const username = new URL(profile.github).pathname.slice(1)
const contributionGuide = 'https://docs.github.com/en/account-and-profile/reference/profile-contributions-reference'

export default function GithubContributions() {
  const [calendar, setCalendar] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    let ignore = false
    const timeout = setTimeout(() => controller.abort(), 15000)
    // shortcut: public proxy caches GitHub data; use a server-side API if it becomes unreliable.
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('Contributions unavailable')
        return response.json()
      })
      .then(data => { if (!ignore) setCalendar(buildContributionCalendar(data)) })
      .catch(() => { if (!ignore) setFailed(true) })
      .finally(() => clearTimeout(timeout))
    return () => { ignore = true; clearTimeout(timeout); controller.abort() }
  }, [])

  return <section data-reveal aria-labelledby="github-heading" className="contributions-card mt-9 rounded-3xl border border-line bg-surface p-6 sm:p-8">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h3 id="github-heading" className="text-lg font-bold tracking-[-.035em]">GitHub contributions</h3>
        <p className="mt-1 text-xs text-muted" role="status">
          {calendar ? `${calendar.total.toLocaleString('en-US')} contributions in the last year` : failed ? 'Activity is temporarily unavailable. View it on GitHub.' : 'Loading contribution activity…'}
        </p>
      </div>
      <a className="inline-link" href={profile.github} target="_blank" rel="noreferrer" aria-label={`View ${username} on GitHub (opens in a new tab)`}>@{username}<Icon name="diagonal" className="h-4 w-4" /></a>
    </div>
    {calendar && <>
      <div className="contributions-scroll mt-6" tabIndex={0} role="region" aria-label="GitHub contribution calendar; scroll horizontally to see the full year">
        <svg className="contributions-calendar" viewBox={`0 0 ${36 + calendar.weeks * 13} 112`} role="img" aria-labelledby="github-calendar-title github-calendar-description">
          <title id="github-calendar-title">{calendar.total.toLocaleString('en-US')} GitHub contributions in the last year</title>
          <desc id="github-calendar-description">Daily activity from {calendar.days[0].date} to {calendar.days.at(-1).date}. Brighter green squares represent more contributions. Visit the GitHub profile for full activity details.</desc>
          {calendar.months.map(({ label, column }) => <text key={`${label}-${column}`} x={36 + column * 13} y="10">{label}</text>)}
          {[[1, 'Mon'], [3, 'Wed'], [5, 'Fri']].map(([row, label]) => <text key={label} x="0" y={29 + row * 13}>{label}</text>)}
          {calendar.days.map(day => <rect key={day.date} x={36 + day.column * 13} y={21 + day.row * 13} width="10" height="10" rx="2" data-level={day.level}>
            <title>{day.count} {day.count === 1 ? 'contribution' : 'contributions'} on {day.date}</title>
          </rect>)}
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted">
        <a className="hover:underline" href={contributionGuide} target="_blank" rel="noreferrer">Learn how GitHub counts contributions<span className="sr-only"> (opens in a new tab)</span></a>
        <div className="contributions-legend" aria-label="Contribution intensity from less to more"><span>Less</span>{[0, 1, 2, 3, 4].map(level => <i key={level} data-level={level} aria-hidden="true" />)}<span>More</span></div>
      </div>
    </>}
  </section>
}
