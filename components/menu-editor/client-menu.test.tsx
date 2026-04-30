import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defaultMenuStyle } from '@/lib/types'
import { ClientMenu } from './client-menu'

const categories = [
  {
    id: 'platos-fuertes',
    name: 'Platos fuertes',
    nameEn: 'Main dishes',
    color: '#2f8f6b',
    items: [
      {
        id: 'burger',
        name: 'Hamburguesa artesanal',
        nameEn: 'Craft burger',
        description: 'Carne de la casa con queso y salsa especial.',
        descriptionEn: 'House patty with cheese and special sauce.',
        price: 28000,
        image: '/imagenesmenu/burger.jpg',
        category: 'platos-fuertes'
      }
    ]
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    nameEn: 'Drinks',
    color: '#b06b2f',
    items: [
      {
        id: 'limonada',
        name: 'Limonada natural',
        nameEn: 'Fresh lemonade',
        description: 'Limonada fresca con hierbabuena.',
        descriptionEn: 'Fresh lemonade with mint.',
        price: 8000,
        image: '/imagenesmenu/limonada.jpg',
        category: 'bebidas'
      }
    ]
  }
]

const style = {
  ...defaultMenuStyle,
  headerText: 'Burger House',
  headerTextEn: 'Burger House',
  headerSubtitle: 'Menu editable en espanol.',
  headerSubtitleEn: 'Editable menu in English.'
}

vi.mock('@/lib/menu-context', () => ({
  useMenu: () => ({
    categories,
    style,
    restaurant: {
      id: 'burger-house',
      name: 'Burger House',
      logoUrl: '/placeholder-logo.png',
      heroImageUrl: style.heroImageUrl,
      style
    }
  })
}))

describe('ClientMenu', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders products, prices and category controls from menu data', () => {
    render(<ClientMenu />)

    expect(screen.getByRole('button', { name: /Platos fuertes/i })).toBeInTheDocument()
    expect(screen.getByText('Hamburguesa artesanal')).toBeInTheDocument()
    expect(screen.getByText(/\$ 28\.000|\$28\.000/)).toBeInTheDocument()
  })

  it('uses editable English names, descriptions and category labels when language changes', () => {
    render(<ClientMenu />)

    fireEvent.click(screen.getByRole('button', { name: 'English' }))

    expect(screen.getByRole('button', { name: 'Main dishes' })).toBeInTheDocument()
    expect(screen.getByText('Craft burger')).toBeInTheDocument()
    expect(screen.getByText(/house patty with cheese/i)).toBeInTheDocument()
    expect(screen.getByText('Editable menu in English.')).toBeInTheDocument()
  })

  it('only exposes Spanish and English in the language picker', () => {
    render(<ClientMenu />)

    expect(screen.getByRole('button', { name: 'Espanol' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Francais' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Italiano' })).not.toBeInTheDocument()
  })

  it('uses category color on category buttons', () => {
    render(<ClientMenu />)

    const categoryButton = screen.getByRole('button', { name: 'Platos fuertes' })
    expect(categoryButton).toHaveStyle({ color: '#2f8f6b' })
  })
})
