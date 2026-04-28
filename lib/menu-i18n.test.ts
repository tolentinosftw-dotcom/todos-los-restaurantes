import { describe, expect, it } from 'vitest'
import { formatMenuPrice, translateText, uiCopy } from './menu-i18n'

describe('menu i18n', () => {
  it('translates category buttons and known product names', () => {
    expect(translateText('Jugos y Batidos', 'en')).toBe('Juices and Shakes')
    expect(translateText('Jugos y Batidos', 'zh')).toBe('果汁和奶昔')
    expect(translateText('Mora', 'en')).toBe('Blackberry')
  })

  it('translates product descriptions with known words instead of leaving everything in Spanish', () => {
    expect(translateText('Pollo con queso y champiñones', 'en')).toBe('Chicken with cheese and mushrooms')
    expect(translateText('Waffle con helado', 'fr')).toBe('Gaufre avec glace')
  })

  it('formats prices and pending-price labels for the active language', () => {
    expect(formatMenuPrice(7900, 'es')).toContain('$')
    expect(formatMenuPrice(7900, 'en')).toContain('COP')
    expect(formatMenuPrice(0, 'fr')).toBe(uiCopy.fr.pendingPrice)
  })
})
