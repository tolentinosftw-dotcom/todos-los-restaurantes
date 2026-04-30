'use client'

import { useMemo, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MenuStyle } from '@/lib/types'
import { Copy, ExternalLink, LogOut, Pencil, Plus, Save, Users, type LucideIcon } from 'lucide-react'

export interface DashboardRestaurant {
  id: string
  name: string
  user: string
  password: string
  logoUrl: string
  heroImageUrl: string
  style: MenuStyle
  productCount: number
  categoryCount: number
}

const emptyForm = {
  name: '',
  nameEn: '',
  user: '',
  password: '',
  logoUrl: '/placeholder-logo.png',
  heroImageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80'
}

export function OwnerDashboard({ initialRestaurants }: { initialRestaurants: DashboardRestaurant[] }) {
  const [restaurants, setRestaurants] = useState(initialRestaurants)
  const [selectedId, setSelectedId] = useState(initialRestaurants[0]?.id ?? '')
  const selected = restaurants.find((restaurant) => restaurant.id === selectedId) ?? restaurants[0]
  const [status, setStatus] = useState('')
  const [creating, setCreating] = useState(false)
  const [createForm, setCreateForm] = useState(emptyForm)
  const [editForm, setEditForm] = useState(() => formFromRestaurant(selected))

  const totals = useMemo(() => {
    return restaurants.reduce(
      (acc, restaurant) => ({
        products: acc.products + restaurant.productCount,
        categories: acc.categories + restaurant.categoryCount
      }),
      { products: 0, categories: 0 }
    )
  }, [restaurants])

  const selectRestaurant = (restaurant: DashboardRestaurant) => {
    setSelectedId(restaurant.id)
    setEditForm(formFromRestaurant(restaurant))
    setStatus('')
  }

  const saveSelected = async () => {
    if (!selected) return
    setStatus('Guardando perfil...')

    const response = await fetch(`/api/restaurants/${selected.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)
    })
    const payload = await response.json().catch(() => null) as { restaurant?: DashboardRestaurant; error?: string } | null

    if (!response.ok || !payload?.restaurant) {
      setStatus(payload?.error || 'No se pudo guardar.')
      return
    }

    setRestaurants((current) => current.map((restaurant) => restaurant.id === payload.restaurant!.id ? payload.restaurant! : restaurant))
    setEditForm(formFromRestaurant(payload.restaurant))
    setStatus('Perfil guardado.')
  }

  const createRestaurant = async () => {
    setStatus('Creando usuario...')
    const response = await fetch('/api/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createForm)
    })
    const payload = await response.json().catch(() => null) as { restaurant?: DashboardRestaurant; error?: string } | null

    if (!response.ok || !payload?.restaurant) {
      setStatus(payload?.error || 'No se pudo crear.')
      return
    }

    setRestaurants((current) => [...current, payload.restaurant!])
    setCreateForm(emptyForm)
    setCreating(false)
    selectRestaurant(payload.restaurant)
    setStatus('Usuario creado.')
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.assign('/admin/login')
  }

  const copyPublicLink = async (id: string) => {
    const url = `${window.location.origin}/cliente?restaurante=${id}`
    await navigator.clipboard?.writeText(url)
    setStatus('Link publico copiado.')
  }

  const copyEditorLink = async (id: string) => {
    const url = `${window.location.origin}/admin/restaurante/${id}`
    await navigator.clipboard?.writeText(url)
    setStatus('Link de edicion copiado.')
  }

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#221c18]">
      <header className="sticky top-0 z-30 border-b border-[#ded2c1] bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">Dashboard maestro</h1>
            <p className="text-sm text-[#725a49]">Crea usuarios, administra perfiles y entra a editar cualquier menu.</p>
          </div>
          <div className="flex items-center gap-2">
            {status && <span className="hidden text-sm text-[#725a49] md:block">{status}</span>}
            <Button onClick={() => setCreating(true)} className="bg-[#263238] hover:bg-[#1d272c]">
              <Plus className="h-4 w-4" />
              Crear usuario
            </Button>
            <Button variant="outline" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Stat label="Usuarios" value={restaurants.length} />
            <Stat label="Categorias" value={totals.categories} />
            <Stat label="Productos" value={totals.products} />
          </div>

          <div className="space-y-2">
            {restaurants.map((restaurant) => (
              <button
                key={restaurant.id}
                onClick={() => selectRestaurant(restaurant)}
                className={`w-full rounded-lg border bg-white p-3 text-left shadow-sm transition-colors ${selected?.id === restaurant.id ? 'border-[#263238] ring-2 ring-[#263238]/15' : 'border-[#e2d7c9] hover:border-[#b9a894]'}`}
              >
                <div className="flex items-center gap-3">
                  <img src={restaurant.logoUrl || '/placeholder-logo.png'} alt="" className="h-12 w-12 rounded-md object-cover" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{restaurant.name}</p>
                    <p className="truncate text-xs text-[#725a49]">{restaurant.user}</p>
                    <p className="text-xs text-[#9a7b61]">{restaurant.productCount} productos</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-4">
          {creating && (
            <ProfileForm
              title="Crear nuevo restaurante"
              form={createForm}
              setForm={setCreateForm}
              primaryAction={{ label: 'Crear usuario', icon: Plus, onClick: createRestaurant }}
              secondaryAction={{ label: 'Cancelar', onClick: () => setCreating(false) }}
            />
          )}

          {selected && (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Users className="h-5 w-5 text-[#263238]" />
                        {selected.name}
                      </CardTitle>
                      <p className="mt-1 text-sm text-[#725a49]">
                        Usuario: <span className="font-mono">{selected.user}</span> · Clave: <span className="font-mono">{selected.password}</span>
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={() => copyPublicLink(selected.id)}>
                        <Copy className="h-4 w-4" />
                        Copiar link
                      </Button>
                      <Button variant="outline" onClick={() => copyEditorLink(selected.id)}>
                        <Copy className="h-4 w-4" />
                        Link editor
                      </Button>
                      <Button variant="outline" asChild>
                        <a href={`/cliente?restaurante=${selected.id}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                          Ver menu
                        </a>
                      </Button>
                      <Button className="bg-[#263238] hover:bg-[#1d272c]" asChild>
                        <a href={`/admin/restaurante/${selected.id}`}>
                          <Pencil className="h-4 w-4" />
                          Editar menu completo
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-44 overflow-hidden rounded-lg bg-[#ece4da]">
                    <img src={selected.heroImageUrl || '/placeholder.jpg'} alt="" className="h-full w-full object-cover" />
                  </div>
                </CardContent>
              </Card>

              <ProfileForm
                title="Perfil y acceso"
                form={editForm}
                setForm={setEditForm}
                primaryAction={{ label: 'Guardar cambios', icon: Save, onClick: saveSelected }}
              />
            </>
          )}
        </section>
      </div>
    </main>
  )
}

function ProfileForm({
  title,
  form,
  setForm,
  primaryAction,
  secondaryAction
}: {
  title: string
  form: typeof emptyForm
  setForm: Dispatch<SetStateAction<typeof emptyForm>>
  primaryAction: { label: string; icon: LucideIcon; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
}) {
  const Icon = primaryAction.icon

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Field label="Nombre en espanol" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
        <Field label="Name in English" value={form.nameEn} onChange={(value) => setForm((current) => ({ ...current, nameEn: value }))} />
        <Field label="Usuario" value={form.user} onChange={(value) => setForm((current) => ({ ...current, user: value }))} />
        <Field label="Contrasena" value={form.password} onChange={(value) => setForm((current) => ({ ...current, password: value }))} />
        <Field label="Logo URL" value={form.logoUrl} onChange={(value) => setForm((current) => ({ ...current, logoUrl: value }))} />
        <Field label="Portada URL" value={form.heroImageUrl} onChange={(value) => setForm((current) => ({ ...current, heroImageUrl: value }))} />
        <div className="flex flex-wrap justify-end gap-2 md:col-span-2">
          {secondaryAction && <Button variant="outline" onClick={secondaryAction.onClick}>{secondaryAction.label}</Button>}
          <Button onClick={primaryAction.onClick} className="bg-[#263238] hover:bg-[#1d272c]">
            <Icon className="h-4 w-4" />
            {primaryAction.label}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="space-y-1">
      <Label>{label}</Label>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[#e2d7c9] bg-white p-3 text-center shadow-sm">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-[#725a49]">{label}</p>
    </div>
  )
}

function formFromRestaurant(restaurant: DashboardRestaurant | undefined) {
  return {
    name: restaurant?.name ?? '',
    nameEn: restaurant?.style.headerTextEn ?? '',
    user: restaurant?.user ?? '',
    password: restaurant?.password ?? '',
    logoUrl: restaurant?.logoUrl ?? '/placeholder-logo.png',
    heroImageUrl: restaurant?.heroImageUrl ?? ''
  }
}
