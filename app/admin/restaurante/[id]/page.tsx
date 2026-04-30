import { AdminApp } from '@/components/menu-editor/admin-app'
import { ADMIN_SESSION_COOKIE, getAdminSession } from '@/lib/admin-auth'
import { MenuProvider } from '@/lib/menu-context'
import { getRestaurantRecord } from '@/lib/restaurant-store'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RestaurantAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  const session = await getAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
  const { id } = await params

  if (!session) redirect(`/admin/login?from=/admin/restaurante/${id}`)

  if (session.role === 'restaurant' && session.restaurantId !== id) {
    redirect(`/admin/restaurante/${session.restaurantId}`)
  }

  const restaurant = await getRestaurantRecord(id)
  const profile = {
    id: restaurant.id,
    name: restaurant.name,
    logoUrl: restaurant.logoUrl,
    heroImageUrl: restaurant.heroImageUrl,
    style: restaurant.style
  }

  return (
    <MenuProvider restaurant={profile} initialCategories={restaurant.categories} initialStyle={restaurant.style} editable>
      <AdminApp ownerMode={session.role === 'owner'} />
    </MenuProvider>
  )
}
