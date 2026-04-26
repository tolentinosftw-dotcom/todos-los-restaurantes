'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ADMIN_USER = 'Admincrepes1.'
const ADMIN_PASSWORD = 'Adminwaffles1.'

export function LoginGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setIsAuthenticated(window.localStorage.getItem('crepes-admin-auth') === 'true')
  }, [])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (user === ADMIN_USER && password === ADMIN_PASSWORD) {
      window.localStorage.setItem('crepes-admin-auth', 'true')
      setIsAuthenticated(true)
      setError('')
      return
    }

    setError('Usuario o contraseña incorrectos')
  }

  if (isAuthenticated) return <>{children}</>

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6efe6] px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-lg border border-[#e6d7c5] bg-white p-6 shadow-xl">
        <div className="mb-6 text-center">
          <img src="/logo.webp" alt="Crepes & Waffles" className="mx-auto mb-3 h-14 w-14 rounded-lg object-cover" />
          <h1 className="text-2xl font-bold text-[#2f211b]">Área de admin</h1>
          <p className="mt-1 text-sm text-[#8a5b3e]">Ingresa para editar el menú.</p>
        </div>

        <div className="space-y-3">
          <Input value={user} onChange={(event) => setUser(event.target.value)} placeholder="Usuario" autoComplete="username" />
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Contraseña"
            type="password"
            autoComplete="current-password"
          />
        </div>

        {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

        <Button type="submit" className="mt-5 w-full bg-[#7f271c] hover:bg-[#682016]">
          Entrar
        </Button>
      </form>
    </main>
  )
}
