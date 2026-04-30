import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, getAdminSession } from '@/lib/admin-auth'
import { saveRestaurantMenu } from '@/lib/restaurant-store'
import { MenuCategory, MenuStyle } from '@/lib/types'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)
  const { id } = await params
  const canEdit = session?.role === 'owner' || (session?.role === 'restaurant' && session.restaurantId === id)
  if (!canEdit) return NextResponse.json({ error: 'No autorizado.' }, { status: 403 })

  const body = await request.json().catch(() => null) as { categories?: MenuCategory[]; style?: MenuStyle } | null
  if (!Array.isArray(body?.categories) || !body.style) {
    return NextResponse.json({ error: 'Menu invalido.' }, { status: 400 })
  }

  const restaurant = await saveRestaurantMenu(id, { categories: body.categories, style: body.style })
  if (!restaurant) return NextResponse.json({ error: 'Restaurante no encontrado.' }, { status: 404 })

  return NextResponse.json({ ok: true })
}
