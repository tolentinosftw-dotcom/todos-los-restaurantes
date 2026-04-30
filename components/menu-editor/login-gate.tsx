'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LoginGate() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password })
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null) as { error?: string } | null
        setError(payload?.error || 'No se pudo iniciar sesion.')
        return
      }

      const payload = await response.json().catch(() => null) as { role?: 'owner' | 'restaurant'; restaurantId?: string } | null
      const from = new URLSearchParams(window.location.search).get('from')

      if (payload?.role === 'owner') {
        window.location.assign(from?.startsWith('/admin/') ? from : '/admin/dashboard')
        return
      }

      window.location.assign(payload?.restaurantId ? `/admin/restaurante/${payload.restaurantId}` : '/admin')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6efe6] px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-lg border border-[#e6d7c5] bg-white p-6 shadow-xl">
        <div className="mb-6 text-center">
          <img src="/placeholder-logo.png" alt="Menu platform" className="mx-auto mb-3 h-14 w-14 rounded-lg object-cover" />
          <h1 className="text-2xl font-bold text-[#2f211b]">Panel de menus</h1>
          <p className="mt-1 text-sm text-[#8a5b3e]">Ingresa como dueno o restaurante.</p>
        </div>

        <div className="space-y-3">
          <Input value={user} onChange={(event) => setUser(event.target.value)} placeholder="Usuario" autoComplete="username" disabled={loading} />
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Contrasena"
            type="password"
            autoComplete="current-password"
            disabled={loading}
          />
        </div>

        {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

        <Button type="submit" className="mt-5 w-full bg-[#7f271c] hover:bg-[#682016]" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </main>
  )
}
