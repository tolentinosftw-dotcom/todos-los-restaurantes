import { AdminApp } from '@/components/menu-editor/admin-app'
import { LoginGate } from '@/components/menu-editor/login-gate'
import { MenuProvider } from '@/lib/menu-context'

export default function AdminPage() {
  return (
    <MenuProvider>
      <LoginGate>
        <AdminApp />
      </LoginGate>
    </MenuProvider>
  )
}
