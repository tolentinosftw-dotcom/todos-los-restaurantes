'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { MenuCategory, MenuStyle, MenuItem, defaultMenuStyle, sampleMenuData } from './types'

interface MenuContextType {
  categories: MenuCategory[]
  setCategories: (categories: MenuCategory[]) => void
  style: MenuStyle
  setStyle: (style: MenuStyle) => void
  updateStyle: (updates: Partial<MenuStyle>) => void
  addCategory: (name: string) => void
  removeCategory: (id: string) => void
  updateCategory: (id: string, name: string) => void
  addItem: (categoryId: string, item: Omit<MenuItem, 'id' | 'category'>) => void
  removeItem: (categoryId: string, itemId: string) => void
  updateItem: (categoryId: string, itemId: string, updates: Partial<MenuItem>) => void
  activeTab: 'products' | 'design' | 'preview'
  setActiveTab: (tab: 'products' | 'design' | 'preview') => void
  selectedCategory: string | null
  setSelectedCategory: (id: string | null) => void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)
const PRODUCT_DATA_COUNT = sampleMenuData.reduce((total, category) => total + category.items.length, 0)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<MenuCategory[]>(sampleMenuData)
  const [style, setStyle] = useState<MenuStyle>(defaultMenuStyle)
  const [activeTab, setActiveTab] = useState<'products' | 'design' | 'preview'>('products')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const saved = window.localStorage.getItem('crepes-menu-builder')
    if (!saved) return

    try {
      const parsed = JSON.parse(saved) as { categories?: MenuCategory[]; style?: MenuStyle }
      if (parsed.categories) {
        const savedCount = parsed.categories.reduce((total, category) => total + category.items.length, 0)
        setCategories(savedCount >= PRODUCT_DATA_COUNT ? parsed.categories : sampleMenuData)
      }
      if (parsed.style) {
        const nextStyle = { ...defaultMenuStyle, ...parsed.style }
        const subtitle = nextStyle.headerSubtitle?.toLowerCase() ?? ''
        if (subtitle.includes('menú digital editable') || subtitle.includes('menÃº digital editable')) {
          nextStyle.headerSubtitle = ''
        }
        setStyle(nextStyle)
      }
    } catch {
      window.localStorage.removeItem('crepes-menu-builder')
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('crepes-menu-builder', JSON.stringify({ categories, style }))
  }, [categories, style])

  const updateStyle = (updates: Partial<MenuStyle>) => {
    setStyle(prev => ({ ...prev, ...updates }))
  }

  const addCategory = (name: string) => {
    const newCategory: MenuCategory = {
      id: Date.now().toString(),
      name,
      items: []
    }
    setCategories(prev => [...prev, newCategory])
  }

  const removeCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id))
  }

  const updateCategory = (id: string, name: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, name } : cat
    ))
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
      addItem,
      removeItem,
      updateItem,
      activeTab,
      setActiveTab,
      selectedCategory,
      setSelectedCategory
    }}>
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu() {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}
