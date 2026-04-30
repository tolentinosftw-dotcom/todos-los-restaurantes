import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
  isOwnerLoginValid
} from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as { user?: string; password?: string } | null
  const user = body?.user ?? ''
  const password = body?.password ?? ''
  const ownerAdmin = isOwnerLoginValid(user, password)

  if (!ownerAdmin) {
    return NextResponse.json({ error: 'Usuario o contrasena incorrectos.' }, { status: 401 })
  }

  const response = NextResponse.json({
    ok: true,
    role: 'owner'
  })
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: await createAdminSession({ role: 'owner', user }),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE
  })

  return response
}
