import { describe, expect, it } from 'vitest'
import { getCategoryColor, sampleMenuData } from './types'

describe('menu data model', () => {
  it('loads the product catalog into stable categories', () => {
    const names = sampleMenuData.map((category) => category.name)

    expect(names).toContain('Jugos y Batidos')
    expect(names).toContain('Sopas y Entradas')
    expect(names).toContain('Waffles')
    expect(sampleMenuData.reduce((total, category) => total + category.items.length, 0)).toBe(157)
  })

  it('keeps juice products away from soup categories', () => {
    const juices = sampleMenuData.find((category) => category.name === 'Jugos y Batidos')
    const soups = sampleMenuData.find((category) => category.name === 'Sopas y Entradas')

    expect(juices?.items.map((item) => item.name)).toContain('Mora')
    expect(soups?.items.map((item) => item.name)).not.toContain('Mora')
  })

  it('assigns default colors for category customization', () => {
    expect(getCategoryColor('Jugos y Batidos')).toMatch(/^#[0-9a-f]{6}$/i)
    expect(getCategoryColor('Waffles')).not.toBe(getCategoryColor('Bebidas'))
    expect(sampleMenuData.every((category) => Boolean(category.color))).toBe(true)
  })
})
