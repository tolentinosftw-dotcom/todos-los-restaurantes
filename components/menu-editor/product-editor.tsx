'use client'

import { useState } from 'react'
import { useMenu } from '@/lib/menu-context'
import { MenuItem } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Check, Edit2, ImagePlus, Plus, Trash2, X } from 'lucide-react'

const emptyItem = { name: '', description: '', price: 0, image: '' }

export function ProductEditor() {
  const {
    categories,
    addCategory,
    removeCategory,
    updateCategory,
    addItem,
    removeItem,
    updateItem,
    selectedCategory,
    setSelectedCategory
  } = useMenu()

  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editCategoryName, setEditCategoryName] = useState('')
  const [showItemForm, setShowItemForm] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [newItem, setNewItem] = useState(emptyItem)

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return
    addCategory(newCategoryName.trim())
    setNewCategoryName('')
  }

  const handleAddItem = (categoryId: string) => {
    if (!newItem.name.trim()) return
    addItem(categoryId, {
      name: newItem.name.trim(),
      description: newItem.description.trim(),
      price: newItem.price,
      image: newItem.image || '/placeholder.jpg'
    })
    setNewItem(emptyItem)
    setShowItemForm(null)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => callback(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-5">
      <Card className="border-2 border-dashed border-[#d8b56d] bg-[#fff8ef]">
        <CardContent className="pt-4">
          <div className="flex gap-2">
            <Input
              placeholder="Nueva categoría"
              value={newCategoryName}
              onChange={(event) => setNewCategoryName(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && handleAddCategory()}
            />
            <Button onClick={handleAddCategory} className="bg-[#7f271c] hover:bg-[#682016]">
              <Plus className="mr-1 h-4 w-4" />
              Agregar
            </Button>
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => (
        <Card key={category.id} className={selectedCategory === category.id ? 'ring-2 ring-[#d8b56d]' : ''}>
          <CardHeader className="bg-[#f4eadf] pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                {editingCategory === category.id ? (
                  <div className="flex items-center gap-2">
                    <Input value={editCategoryName} onChange={(event) => setEditCategoryName(event.target.value)} autoFocus />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        if (editCategoryName.trim()) updateCategory(category.id, editCategoryName.trim())
                        setEditingCategory(null)
                      }}
                    >
                      <Check className="h-4 w-4 text-green-700" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setEditingCategory(null)}>
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ) : (
                  <button
                    className="max-w-full text-left"
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                  >
                    <CardTitle className="truncate text-xl text-[#2f211b]">{category.name}</CardTitle>
                  </button>
                )}
                <p className="mt-1 text-sm text-[#8a5b3e]">
                  {category.items.length} producto{category.items.length === 1 ? '' : 's'}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setEditingCategory(category.id)
                    setEditCategoryName(category.name)
                  }}
                >
                  <Edit2 className="h-4 w-4 text-[#7f271c]" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => removeCategory(category.id)}>
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 pt-4">
            {category.items.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-lg border border-[#eadfce] bg-white p-3">
                <ImagePicker
                  image={item.image}
                  label={item.name}
                  onChange={(url) => updateItem(category.id, item.id, { image: url })}
                />
                <div className="min-w-0 flex-1">
                  {editingItem === item.id ? (
                    <EditItemForm
                      item={item}
                      onSave={(updates) => {
                        updateItem(category.id, item.id, updates)
                        setEditingItem(null)
                      }}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="truncate font-semibold text-[#2f211b]">{item.name}</h4>
                        <span className="shrink-0 font-bold text-[#7f271c]">{formatPrice(item.price)}</span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-[#6c4a37]">{item.description}</p>
                    </>
                  )}
                </div>
                {editingItem !== item.id && (
                  <div className="flex shrink-0 flex-col gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditingItem(item.id)}>
                      <Edit2 className="h-4 w-4 text-[#7f271c]" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => removeItem(category.id, item.id)}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {showItemForm === category.id ? (
              <Card className="border-[#d8b56d] bg-[#fff8ef]">
                <CardContent className="space-y-3 pt-4">
                  <div className="flex gap-3">
                    <ImagePicker
                      image={newItem.image}
                      label="Nuevo producto"
                      large
                      onChange={(url) => setNewItem((prev) => ({ ...prev, image: url }))}
                    />
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Nombre del producto"
                        value={newItem.name}
                        onChange={(event) => setNewItem((prev) => ({ ...prev, name: event.target.value }))}
                      />
                      <Textarea
                        placeholder="Descripción"
                        value={newItem.description}
                        onChange={(event) => setNewItem((prev) => ({ ...prev, description: event.target.value }))}
                        className="min-h-20"
                      />
                      <Input
                        type="number"
                        placeholder="Precio en COP"
                        value={newItem.price || ''}
                        onChange={(event) => setNewItem((prev) => ({ ...prev, price: Number(event.target.value) }))}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => { setShowItemForm(null); setNewItem(emptyItem) }}>
                      Cancelar
                    </Button>
                    <Button className="bg-[#7f271c] hover:bg-[#682016]" onClick={() => handleAddItem(category.id)}>
                      Agregar producto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Button
                variant="outline"
                className="w-full border-dashed border-[#d8b56d] text-[#7f271c] hover:bg-[#fff8ef]"
                onClick={() => setShowItemForm(category.id)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Agregar producto
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ImagePicker({
  image,
  label,
  large = false,
  onChange
}: {
  image: string
  label: string
  large?: boolean
  onChange: (url: string) => void
}) {
  return (
    <label className={`relative shrink-0 cursor-pointer overflow-hidden rounded-lg bg-[#f4eadf] ${large ? 'h-28 w-28' : 'h-20 w-20'}`}>
      {image ? (
        <img src={image} alt={label} className="h-full w-full object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center">
          <ImagePlus className="h-7 w-7 text-[#b5884d]" />
        </span>
      )}
      <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/30">
        <ImagePlus className="h-6 w-6 text-white opacity-0 transition-opacity hover:opacity-100" />
      </span>
      <input type="file" accept="image/*" className="hidden" onChange={(event) => {
        const file = event.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onloadend = () => onChange(reader.result as string)
        reader.readAsDataURL(file)
      }} />
    </label>
  )
}

function EditItemForm({ item, onSave, onCancel }: { item: MenuItem; onSave: (updates: Partial<MenuItem>) => void; onCancel: () => void }) {
  const [editData, setEditData] = useState({
    name: item.name,
    description: item.description,
    price: item.price
  })

  return (
    <div className="space-y-2">
      <Input value={editData.name} onChange={(event) => setEditData((prev) => ({ ...prev, name: event.target.value }))} />
      <Textarea value={editData.description} onChange={(event) => setEditData((prev) => ({ ...prev, description: event.target.value }))} className="min-h-16" />
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={editData.price}
          onChange={(event) => setEditData((prev) => ({ ...prev, price: Number(event.target.value) }))}
          className="w-32"
        />
        <div className="ml-auto flex gap-1">
          <Button size="icon" variant="ghost" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
          <Button size="icon" className="bg-[#7f271c] hover:bg-[#682016]" onClick={() => onSave(editData)}>
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price)
}
