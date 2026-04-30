import { describe, expect, it } from 'vitest'
import { formatMenuPrice, languages, translateText, uiCopy } from './menu-i18n'

describe('menu i18n', () => {
  it('exposes Spanish and English as the menu languages', () => {
    expect(languages.map((language) => language.code)).toEqual(['es', 'en'])
    expect(languages.map((language) => language.label)).toEqual(['Espanol', 'English'])
  })

  it('translates category buttons and known product names from JSON dictionaries', () => {
    expect(translateText('Jugos y Batidos', 'en')).toBe('Juices and Shakes')
    expect(translateText('Jugos y Batidos', 'zh')).toBe('\u679c\u6c41\u548c\u5976\u6614')
    expect(translateText('Mora', 'en')).toBe('Blackberry')
    expect(translateText('Cebolla Gratinada', 'zh')).toBe('\u7117\u70e4\u6d0b\u8471\u6c64')
    expect(translateText('Pollo Trufa Mexicano', 'zh')).toBe('\u58a8\u897f\u54e5\u677e\u9732\u9e21\u8089\u53ef\u4e3d\u997c')
  })

  it('translates product descriptions with exact JSON text before word fallback', () => {
    expect(translateText('Pollo con queso y champinones', 'en')).toBe('Chicken with cheese and mushrooms')
    expect(translateText('Waffle con helado', 'fr')).toBe('Gaufre avec glace')
    expect(translateText('Sopa de cebolla, con pan y queso gratinado.', 'zh')).toBe('\u6d0b\u8471\u6c64\uff0c\u914d\u9762\u5305\u548c\u7117\u70e4\u5976\u916a\u3002')
    expect(translateText('Producto sin traduccion completa', 'zh')).toBe('Producto sin traduccion completa')
  })

  it('formats prices and pending-price labels for the active language', () => {
    expect(formatMenuPrice(7900, 'es')).toContain('$')
    expect(formatMenuPrice(7900, 'en')).toContain('COP')
    expect(formatMenuPrice(0, 'fr')).toBe(uiCopy.fr.pendingPrice)
  })
})
