export const THEME_STORAGE_KEY = 'diether-portfolio-theme'

const palettes = [
  ['blue', 'Royal Blue', '#2563eb', '#60a5fa', '#f7f9fd', '#06b6d4'],
  ['emerald', 'Emerald', '#087f5b', '#34d399', '#f4faf5', '#14b8a6'],
  ['crimson', 'Crimson', '#be123c', '#fb7185', '#fff7f8', '#f97316'],
  ['amber', 'Amber', '#a85b05', '#fbbf24', '#fcf7e7', '#ef4444'],
  ['violet', 'Violet', '#6650d8', '#a78bfa', '#fafaf7', '#d946ef'],
  ['teal', 'Teal', '#0f766e', '#2dd4bf', '#f2f9f8', '#6366f1'],
  ['wine', 'Wine', '#a21caf', '#e879f9', '#fbf5fa', '#ec4899'],
]

export const themes = [
  ...palettes.map(([id, name, accent, , paper, secondary]) => ({ id, name, mode: 'light', accent, paper, secondary })),
  ...palettes.map(([id, name, , accent, , secondary]) => ({ id: `dark-${id}`, name: `Dark ${id === 'blue' ? 'Blue' : name}`, mode: 'dark', accent, paper: '#14161d', secondary })),
  { id: 'neon', name: 'Neon', mode: 'dark', accent: '#bef264', paper: '#101711', secondary: '#22d3ee' },
]

export function getTheme(id) {
  return themes.find(theme => theme.id === id) ?? themes.find(theme => theme.id === 'violet')
}

export function getThemeProperties(theme) {
  const dark = theme.mode === 'dark'
  return {
    '--color-accent': theme.accent,
    '--color-paper': theme.paper,
    '--color-surface': dark ? '#20232d' : '#ffffff',
    '--color-ink': dark ? '#f4f4f5' : '#252624',
    '--color-muted': dark ? '#b4b8c4' : '#62665e',
    '--color-line': dark ? '#363946' : '#e7e8e0',
    '--color-sidebar': dark ? '#191c24' : `color-mix(in srgb, ${theme.accent} 3%, ${theme.paper})`,
    '--color-on-accent': dark ? '#14161d' : '#ffffff',
  }
}
