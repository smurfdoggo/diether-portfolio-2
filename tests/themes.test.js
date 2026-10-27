import assert from 'node:assert/strict'
import test from 'node:test'
import { getTheme, getThemeProperties, themes } from '../src/themes.js'

function luminance(hex) {
  const rgb = hex.match(/[a-f\d]{2}/gi).map(value => {
    const channel = parseInt(value, 16) / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
}

function contrast(a, b) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

test('invalid or missing saved selections fall back to the original violet theme', () => {
  assert.equal(getTheme('removed-theme').id, 'violet')
  assert.equal(getTheme(null).id, 'violet')
  assert.equal(getTheme('dark-amber').name, 'Dark Amber')
})

test('every palette keeps body text, links, and primary buttons readable', () => {
  for (const theme of themes) {
    const colors = getThemeProperties(theme)
    const pairs = [
      ['--color-ink', '--color-paper'],
      ['--color-muted', '--color-paper'],
      ['--color-muted', '--color-surface'],
      ['--color-accent', '--color-paper'],
      ['--color-accent', '--color-surface'],
      ['--color-on-accent', '--color-accent'],
    ]
    for (const [foreground, background] of pairs) {
      assert.ok(contrast(colors[foreground], colors[background]) >= 4.5, `${theme.name}: ${foreground} on ${background}`)
    }
  }
})
