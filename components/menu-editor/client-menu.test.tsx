import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defaultMenuStyle } from '@/lib/types'
import { ClientMenu } from './client-menu'

const categories = [
  {
    id: 'jugos-y-batidos',
    name: 'Jugos y Batidos',
    color: '#2f8f6b',
    items: [
      {
        id: 'mora',
        name: 'Mora',
        description: 'Jugo natural con hielo.',
        price: 7900,
        image: '/imagenesmenucrepes/mora.jpg',
        category: 'jugos-y-batidos'
      }
    ]
  },
  {
    id: 'waffles',
    name: 'Waffles',
    color: '#b06b2f',
    items: [
      {
        id: 'waffle',
        name: 'Waffle con helado',
        description: 'Waffle con helado y chocolate.',
        price: 15000,
        image: '/imagenesmenucrepes/waffle.jpg',
        category: 'waffles'
      }
    ]
  }
]

vi.mock('@/lib/menu-context', () => ({
  useMenu: () => ({
    categories,
    style: defaultMenuStyle
  })
}))

describe('ClientMenu', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders products, prices and category controls from menu data', () => {
    render(<ClientMenu />)

    expect(screen.getByRole('button', { name: /Jugos y Batidos/i })).toBeInTheDocument()
    expect(screen.getByText('Mora')).toBeInTheDocument()
    expect(screen.getByText(/\$ 7\.900|\$7\.900/)).toBeInTheDocument()
  })

  it('translates product names, descriptions and category buttons when language changes', () => {
    render(<ClientMenu />)

    fireEvent.click(screen.getByRole('button', { name: 'English' }))

    expect(screen.getByRole('button', { name: 'Juices and Shakes' })).toBeInTheDocument()
    expect(screen.getByText('Blackberry')).toBeInTheDocument()
    expect(screen.getByText(/juice natural with hielo/i)).toBeInTheDocument()
  })

  it('uses category color on category buttons', () => {
    render(<ClientMenu />)

    const categoryButton = screen.getByRole('button', { name: 'Jugos y Batidos' })
    expect(categoryButton).toHaveStyle({ color: '#2f8f6b' })
  })
})
