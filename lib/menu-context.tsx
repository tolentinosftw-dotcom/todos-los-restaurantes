'use client'

import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import { MenuCategory, MenuStyle, MenuItem, getCategoryColor, sampleMenuData } from './types'
import { defaultRestaurant, getRestaurantById, getRestaurantTemplateCategories, RestaurantProfile } from './restaurants'

interface MenuContextType {
  categories: MenuCategory[]
  setCategories: Dispatch<SetStateAction<MenuCategory[]>>
  style: MenuStyle
  setStyle: (style: MenuStyle) => void
  updateStyle: (updates: Partial<MenuStyle>) => void
  addCategory: (name: string) => void
  removeCategory: (id: string) => void
  updateCategory: (id: string, updates: { name: string; nameEn?: string }) => void
  organizeCategories: () => void
  addItem: (categoryId: string, item: Omit<MenuItem, 'id' | 'category'>) => void
  removeItem: (categoryId: string, itemId: string) => void
  updateItem: (categoryId: string, itemId: string, updates: Partial<MenuItem>) => void
  activeTab: 'products' | 'design' | 'preview'
  setActiveTab: (tab: 'products' | 'design' | 'preview') => void
  selectedCategory: string | null
  setSelectedCategory: (id: string | null) => void
  restaurant: RestaurantProfile
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)
const PRODUCT_DATA_COUNT = sampleMenuData.reduce((total, category) => total + category.items.length, 0)
const lastCategory = sampleMenuData[sampleMenuData.length - 1]
const lastItem = lastCategory?.items[lastCategory.items.length - 1]
const firstItem = sampleMenuData[0]?.items[0]
const PRODUCT_DATA_SIGNATURE = `catalog-v3:${PRODUCT_DATA_COUNT}:${sampleMenuData.map(category => category.name).join('|')}:${firstItem?.name ?? ''}:${firstItem?.price ?? 0}:${firstItem?.image ?? ''}:${lastItem?.name ?? ''}:${lastItem?.price ?? 0}:${lastItem?.image ?? ''}`
const CATEGORY_RULES = [
  { id: 'jugos-bebidas', name: 'Jugos y Bebidas', words: ['jugo', 'jugos', 'jugi', 'limonada', 'batido', 'malteada', 'agua', 'gaseosa', 'soda', 'coca', 'schweppes', 'cerveza', 'vino', 'mimosa', 'cafe', 'café', 'capuccino', 'espresso', 'macchiato', 'chocolate', 'milo', 'chai', 'aromatica', 'aromática'] },
  { id: 'sopas-cremas', name: 'Sopas y Cremas', words: ['sopa', 'sopas', 'crema', 'cremas', 'lentejas', 'cebolla', 'ahuyama', 'covarachia', 'covarachía'] },
  { id: 'crepes-salados', name: 'Crepes Salados', words: ['crepe', 'crepes', 'pollo', 'ternera', 'lomo', 'lomito', 'stroganoff', 'mexicano', 'pita', 'pocket', 'salmon', 'salmón', 'camarones', 'calamares', 'atun', 'atún', 'palmitos'] },
  { id: 'waffles', name: 'Waffles', words: ['waffle', 'waffles'] },
  { id: 'ensaladas', name: 'Ensaladas', words: ['ensalada', 'ensaladas', 'kale', 'cesar', 'césar', 'tomatina'] },
  { id: 'postres-helados', name: 'Postres y Helados', words: ['postre', 'postres', 'helado', 'helados', 'cono', 'copa', 'arequipe', 'nutella', 'chocolate', 'frutos', 'parfait', 'tostada francesa', 'panqueque', 'pancake'] },
  { id: 'desayunos', name: 'Desayunos', words: ['desayuno', 'huevo', 'huevos', 'omelette', 'benedictine', 'açai', 'acai', 'tostada', 'parisien', 'campesino'] },
  { id: 'infantil', name: 'Menu Infantil', words: ['infantil', 'niño', 'niños', 'mickey', 'payaso', 'snowman', 'gummy', 'samy', 'piggy', 'rodolfo'] }
]
const GENERAL_CATEGORY_RULES = [
  { id: 'bebidas', name: 'Bebidas', nameEn: 'Drinks', words: ['jugo', 'jugos', 'limonada', 'batido', 'malteada', 'agua', 'gaseosa', 'soda', 'cerveza', 'vino', 'cafe', 'capuccino', 'espresso', 'latte', 'aromatica', 'coctel', 'bebida'] },
  { id: 'entradas', name: 'Entradas', nameEn: 'Starters', words: ['entrada', 'entradas', 'gyoza', 'bao', 'guacamole', 'nachos', 'sopa', 'crema', 'ceviche'] },
  { id: 'platos-fuertes', name: 'Platos fuertes', nameEn: 'Main dishes', words: ['pollo', 'carne', 'res', 'cerdo', 'pescado', 'salmon', 'pasta', 'pizza', 'burger', 'hamburguesa', 'taco', 'arroz', 'wok', 'parrilla', 'costilla'] },
  { id: 'acompanantes', name: 'Acompanantes', nameEn: 'Sides', words: ['papa', 'papas', 'patacon', 'yuca', 'ensalada', 'acompanante', 'side'] },
  { id: 'postres', name: 'Postres', nameEn: 'Desserts', words: ['postre', 'postres', 'helado', 'torta', 'brownie', 'cheesecake', 'chocolate', 'vainilla', 'dulce'] },
  { id: 'desayunos', name: 'Desayunos', nameEn: 'Breakfast', words: ['desayuno', 'huevo', 'huevos', 'omelette', 'tostada', 'pancake', 'waffle'] },
  { id: 'infantil', name: 'Menu Infantil', nameEn: 'Kids menu', words: ['infantil', 'nino', 'ninos', 'kids'] }
]

interface MenuProviderProps {
  children: ReactNode
  restaurantId?: string
  restaurant?: RestaurantProfile
  initialCategories?: MenuCategory[]
  initialStyle?: MenuStyle
  editable?: boolean
}

export function MenuProvider({ children, restaurantId, restaurant: restaurantProp, initialCategories, initialStyle, editable = false }: MenuProviderProps) {
  const restaurant = restaurantProp ?? getRestaurantById(restaurantId)
  const storageKey = `restaurant-menu-builder:${restaurant.id}`
  const [categories, setCategories] = useState<MenuCategory[]>(initialCategories ?? getRestaurantTemplateCategories(restaurant.id))
  const [style, setStyle] = useState<MenuStyle>(initialStyle ?? restaurant.style)
  const [activeTab, setActiveTab] = useState<'products' | 'design' | 'preview'>('products')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const baseCategories = initialCategories ?? getRestaurantTemplateCategories(restaurant.id)
    const baseStyle = initialStyle ?? restaurant.style

    setLoaded(false)
    setCategories(baseCategories)
    setStyle(baseStyle)
    setSelectedCategory(null)

    if (initialCategories || initialStyle) {
      setLoaded(true)
      return
    }

    const saved = window.localStorage.getItem(storageKey) || (restaurant.id === defaultRestaurant.id ? window.localStorage.getItem('crepes-menu-builder') : null)
    if (!saved) {
      setLoaded(true)
      return
    }

    try {
      const parsed = JSON.parse(saved) as { categories?: MenuCategory[]; style?: MenuStyle; dataSignature?: string }
      if (parsed.categories) {
        setCategories(parsed.dataSignature === PRODUCT_DATA_SIGNATURE ? ensureCategoryColors(parsed.categories) : baseCategories)
      }
      if (parsed.style) {
        const nextStyle = { ...baseStyle, ...parsed.style }
        const subtitle = nextStyle.headerSubtitle?.toLowerCase() ?? ''
        if (subtitle.includes('menú digital editable') || subtitle.includes('menÃº digital editable')) {
          nextStyle.headerSubtitle = ''
        }
        setStyle(nextStyle)
      }
    } catch {
      window.localStorage.removeItem(storageKey)
    } finally {
      setLoaded(true)
    }
  }, [initialCategories, initialStyle, restaurant.id, restaurant.style, storageKey])

  useEffect(() => {
    if (!loaded) return
    if (editable) return
    window.localStorage.setItem(storageKey, JSON.stringify({ categories, style, dataSignature: PRODUCT_DATA_SIGNATURE, restaurantId: restaurant.id }))
  }, [categories, editable, loaded, restaurant.id, storageKey, style])

  useEffect(() => {
    if (!loaded || !editable) return

    const timeout = window.setTimeout(() => {
      void fetch(`/api/restaurants/${restaurant.id}/menu`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories, style })
      })
    }, 500)

    return () => window.clearTimeout(timeout)
  }, [categories, editable, loaded, restaurant.id, style])

  const updateStyle = (updates: Partial<MenuStyle>) => {
    setStyle(prev => ({ ...prev, ...updates }))
  }

  const addCategory = (name: string) => {
    const newCategory: MenuCategory = {
      id: Date.now().toString(),
      name,
      color: getCategoryColor(name),
      items: []
    }
    setCategories(prev => [...prev, newCategory])
  }

  const removeCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id))
  }

  const updateCategory = (id: string, updates: { name: string; nameEn?: string }) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ))
  }

  const organizeCategories = () => {
    setCategories(prev => categorizeMenuByRules(prev, GENERAL_CATEGORY_RULES))
    setSelectedCategory(null)
  }

  const addItem = (categoryId: string, item: Omit<MenuItem, 'id' | 'category'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
      category: categoryId
    }
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, items: [...cat.items, newItem] }
        : cat
    ))
  }

  const removeItem = (categoryId: string, itemId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
        : cat
    ))
  }

  const updateItem = (categoryId: string, itemId: string, updates: Partial<MenuItem>) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { 
            ...cat, 
            items: cat.items.map(item => 
              item.id === itemId ? { ...item, ...updates } : item
            )
          }
        : cat
    ))
  }

  return (
    <MenuContext.Provider value={{
      categories,
      setCategories,
      style,
      setStyle,
      updateStyle,
      addCategory,
      removeCategory,
      updateCategory,
      organizeCategories,
      addItem,
      removeItem,
      updateItem,
      activeTab,
      setActiveTab,
      selectedCategory,
      setSelectedCategory,
      restaurant
    }}>
      {children}
    </MenuContext.Provider>
  )
}

function categorizeMenu(categories: MenuCategory[]) {
  return categorizeMenuByRules(categories, CATEGORY_RULES)
}

function categorizeMenuByRules(categories: MenuCategory[], rules: Array<{ id: string; name: string; nameEn?: string; words: string[] }>) {
  const buckets = new Map<string, MenuCategory>()

  for (const rule of rules) {
    buckets.set(rule.id, { id: rule.id, name: rule.name, nameEn: rule.nameEn, color: getCategoryColor(rule.name), items: [] })
  }
  buckets.set('otros', { id: 'otros', name: 'Otros', nameEn: 'Other', color: getCategoryColor('Otros'), items: [] })

  for (const item of categories.flatMap(category => category.items)) {
    const category = getItemCategory(item, rules)
    buckets.get(category.id)!.items.push({ ...item, category: category.id })
  }

  return Array.from(buckets.values()).filter(category => category.items.length > 0)
}

function ensureCategoryColors(categories: MenuCategory[]) {
  return categories.map((category) => ({
    ...category,
    color: category.color || getCategoryColor(category.name)
  }))
}

function getItemCategory(item: MenuItem, rules = CATEGORY_RULES) {
  const text = normalizeText(`${item.name} ${item.description}`)
  return rules.find(rule => rule.words.some(word => text.includes(normalizeText(word)))) ?? { id: 'otros', name: 'Otros' }
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function useMenu() {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}
