export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

export interface MenuStyle {
  backgroundColor: string
  primaryColor: string
  secondaryColor: string
  textColor: string
  priceColor: string
  accentColor: string

  titleFontSize: number
  descriptionFontSize: number
  priceFontSize: number
  categoryFontSize: number
  fontFamily: string

  imageSize: 'small' | 'medium' | 'large' | 'full'
  imagePosition: 'left' | 'right' | 'top' | 'background'
  cardStyle: 'minimal' | 'bordered' | 'shadow' | 'glass'
  columns: 1 | 2 | 3
  spacing: 'compact' | 'normal' | 'spacious'
  textAlign: 'left' | 'center' | 'right'
  borderRadius: number

  showLogo: boolean
  logoUrl: string
  heroImageUrl: string
  headerText: string
  headerSubtitle: string
  headerStyle: 'centered' | 'left' | 'overlay'
}

export const defaultMenuStyle: MenuStyle = {
  backgroundColor: '#fff8ef',
  primaryColor: '#7f271c',
  secondaryColor: '#8a5b3e',
  textColor: '#2f211b',
  priceColor: '#7f271c',
  accentColor: '#d8b56d',

  titleFontSize: 18,
  descriptionFontSize: 14,
  priceFontSize: 16,
  categoryFontSize: 25,
  fontFamily: 'Georgia',

  imageSize: 'medium',
  imagePosition: 'left',
  cardStyle: 'shadow',
  columns: 2,
  spacing: 'normal',
  textAlign: 'left',
  borderRadius: 8,

  showLogo: true,
  logoUrl: '/logo.webp',
  heroImageUrl: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1600&q=80',
  headerText: 'Crepes & Waffles Interior',
  headerSubtitle: '',
  headerStyle: 'centered'
}

export const sampleMenuData: MenuCategory[] = [
  {
    id: '1',
    name: 'Crepes Dulces',
    items: [
      {
        id: '1-1',
        name: 'Crepe de Nutella',
        description: 'Crepe relleno de Nutella, fresas frescas y crema batida.',
        price: 28000,
        image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=900&q=80',
        category: '1'
      },
      {
        id: '1-2',
        name: 'Crepe de Frutas',
        description: 'Mezcla de frutas de temporada, miel y helado de vainilla.',
        price: 32000,
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80',
        category: '1'
      },
      {
        id: '1-3',
        name: 'Crepe Banano Split',
        description: 'Banano, chocolate, helado y nueces caramelizadas.',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
        category: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Waffles',
    items: [
      {
        id: '2-1',
        name: 'Waffle Clásico',
        description: 'Waffle belga tradicional con mantequilla y miel de maple.',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=900&q=80',
        category: '2'
      },
      {
        id: '2-2',
        name: 'Waffle con Helado',
        description: 'Waffle crujiente con dos bolas de helado y salsa de chocolate.',
        price: 30000,
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80',
        category: '2'
      }
    ]
  },
  {
    id: '3',
    name: 'Crepes Salados',
    items: [
      {
        id: '3-1',
        name: 'Crepe de Pollo',
        description: 'Pollo desmechado, champiñones y salsa bechamel.',
        price: 38000,
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
        category: '3'
      },
      {
        id: '3-2',
        name: 'Crepe Caprese',
        description: 'Tomate fresco, mozzarella, albahaca y reducción de balsámico.',
        price: 36000,
        image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80',
        category: '3'
      }
    ]
  }
]
