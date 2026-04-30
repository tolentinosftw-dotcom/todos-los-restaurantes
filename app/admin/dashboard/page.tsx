import { OwnerDashboard } from '@/components/menu-editor/owner-dashboard'
import { ADMIN_SESSION_COOKIE, getAdminSession } from '@/lib/admin-auth'
import { getRestaurantRecords } from '@/lib/restaurant-store'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const session = await getAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)

  if (session?.role !== 'owner') redirect('/admin')

  const restaurants = await getRestaurantRecords()
  const dashboardRestaurants = restaurants.map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.name,
    user: restaurant.user,
    password: restaurant.password,
    logoUrl: restaurant.logoUrl,
    heroImageUrl: restaurant.heroImageUrl,
    style: restaurant.style,
    productCount: restaurant.categories.reduce((total, category) => total + category.items.length, 0),
    categoryCount: restaurant.categories.length
  }))

  return <OwnerDashboard initialRestaurants={dashboardRestaurants} />
}
