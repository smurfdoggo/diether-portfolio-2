import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { getTheme, getThemeProperties, themes, THEME_STORAGE_KEY } from './themes.js'

export default function ThemePicker() {
  const [open, setOpen] = useState(false)
  const picker = useRef(null)
  const trigger = useRef(null)
  const [theme, setTheme] = useState(() => {
    try { return getTheme(localStorage.getItem(THEME_STORAGE_KEY)) }
    catch { return getTheme() }
  })

  useLayoutEffect(() => {
    const root = document.documentElement
    for (const [property, value] of Object.entries(getThemeProperties(theme))) root.style.setProperty(property, value)
    root.style.colorScheme = theme.mode
    root.dataset.theme = theme.id
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.paper)
    try { localStorage.setItem(THEME_STORAGE_KEY, theme.id) }
    catch { /* Theme switching still works when browser storage is unavailable. */ }
  }, [theme])

  useEffect(() => {
    const closeOutside = event => {
      if (!picker.current.contains(event.target)) setOpen(false)
    }
    document.addEventListener('click', closeOutside)
    return () => document.removeEventListener('click', closeOutside)
  }, [])

  return <div className="theme-picker" ref={picker}
    onBlur={event => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}
    onKeyDown={event => {
      if (event.key === 'Escape' && open) {
        event.preventDefault()
        event.stopPropagation()
        setOpen(false)
        trigger.current.focus()
      }
    }}>
    <button type="button" ref={trigger} className="theme-trigger" aria-label="Change color theme" aria-expanded={open} aria-controls="theme-panel" title={`Change color theme · ${theme.name}`} onClick={() => setOpen(!open)}><Icon name="palette" /></button>
    {open && <div id="theme-panel" className="theme-panel" aria-label="Color themes">
      {['light', 'dark'].map(mode => <fieldset key={mode}>
        <legend>{mode}</legend>
        {themes.filter(option => option.mode === mode).map(option => <label key={option.id} className="theme-option">
          <input className="sr-only" type="radio" name="portfolio-theme" value={option.id} checked={theme.id === option.id} onChange={() => setTheme(option)} />
          <span className="theme-swatch" style={{ background: `linear-gradient(135deg, ${option.accent}, ${option.secondary})` }} />
          <span>{option.name}</span>
          {theme.id === option.id && <Icon name="check" className="theme-check" />}
        </label>)}
      </fieldset>)}
    </div>}
  </div>
}
