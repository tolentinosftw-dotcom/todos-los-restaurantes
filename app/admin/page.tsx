import { ADMIN_SESSION_COOKIE, getAdminSession } from '@/lib/admin-auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ restaurante?: string; r?: string }> }) {
  const cookieStore = await cookies()
  const session = await getAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
  const params = await searchParams
  const restaurantId = session?.role === 'owner' ? params.restaurante || params.r : session?.restaurantId

  if (restaurantId) redirect(`/admin/restaurante/${restaurantId}`)
  if (session?.role === 'owner') redirect('/admin/dashboard')
  redirect('/admin/login')
}
