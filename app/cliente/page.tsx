import { ClientMenu } from '@/components/menu-editor/client-menu'
import { MenuProvider } from '@/lib/menu-context'
import { getRestaurantRecord } from '@/lib/restaurant-store'

export default async function ClientPage({ searchParams }: { searchParams: Promise<{ restaurante?: string; r?: string }> }) {
  const params = await searchParams
  const restaurantId = params.restaurante || params.r
  const restaurant = await getRestaurantRecord(restaurantId)
  const profile = {
    id: restaurant.id,
    name: restaurant.name,
    logoUrl: restaurant.logoUrl,
    heroImageUrl: restaurant.heroImageUrl,
    style: restaurant.style
  }

  return (
    <MenuProvider restaurant={profile} initialCategories={restaurant.categories} initialStyle={restaurant.style}>
      <ClientMenu />
    </MenuProvider>
  )
}
