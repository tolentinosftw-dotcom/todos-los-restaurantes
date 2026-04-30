import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, getAdminSession } from '@/lib/admin-auth'
import { getRestaurantRecords, updateRestaurantRecord } from '@/lib/restaurant-store'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)
  if (session?.role !== 'owner') return NextResponse.json({ error: 'No autorizado.' }, { status: 403 })

  const { id } = await params
  const body = await request.json().catch(() => null) as { name?: string; nameEn?: string; user?: string; password?: string; logoUrl?: string; heroImageUrl?: string } | null
  if (!body?.name?.trim() || !body.user?.trim() || !body.password?.trim()) {
    return NextResponse.json({ error: 'Nombre, usuario y contrasena son obligatorios.' }, { status: 400 })
  }

  const restaurants = await getRestaurantRecords()
  if (restaurants.some((restaurant) => restaurant.id !== id && restaurant.user === body.user)) {
    return NextResponse.json({ error: 'Ese usuario ya existe.' }, { status: 409 })
  }

  const restaurant = await updateRestaurantRecord(id, {
    name: body.name.trim(),
    nameEn: body.nameEn?.trim(),
    user: body.user.trim(),
    password: body.password.trim(),
    logoUrl: body.logoUrl?.trim(),
    heroImageUrl: body.heroImageUrl?.trim()
  })

  if (!restaurant) return NextResponse.json({ error: 'Restaurante no encontrado.' }, { status: 404 })

  return NextResponse.json({
    restaurant: {
      id: restaurant.id,
      name: restaurant.name,
      user: restaurant.user,
      password: restaurant.password,
      logoUrl: restaurant.logoUrl,
      heroImageUrl: restaurant.heroImageUrl,
      style: restaurant.style,
      productCount: restaurant.categories.reduce((total, category) => total + category.items.length, 0),
      categoryCount: restaurant.categories.length
    }
  })
}
