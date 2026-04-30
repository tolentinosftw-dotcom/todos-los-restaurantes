import { NextRequest } from 'next/server'
import { defaultRestaurant } from './restaurants'

export const ADMIN_SESSION_COOKIE = 'restaurant_owner_session'
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8

const ADMIN_USER = '123456789'
const ADMIN_PASSWORD = '123456789a'
const DEV_ADMIN_SECRET = 'restaurant-menu-session'

export type AdminRole = 'owner' | 'restaurant'

export interface AdminSessionPayload {
  sub: 'admin'
  role: AdminRole
  restaurantId?: string
  restaurantName?: string
  user: string
  exp: number
  nonce: string
}

export function getAdminCredentials() {
  const user = ADMIN_USER
  const password = ADMIN_PASSWORD
  const secret = process.env.ADMIN_SESSION_SECRET || `${DEV_ADMIN_SECRET}:${password}`

  return { user, password, secret }
}

export function isOwnerLoginValid(user: string, password: string) {
  const { user: expectedUser, password: expectedPassword } = getAdminCredentials()
  const normalizedUser = user.trim()
  const normalizedPassword = password.trim()
  const acceptedPasswords = [expectedPassword, `${expectedPassword}.`]

  return secureCompare(normalizedUser, expectedUser) && acceptedPasswords.some((value) => secureCompare(normalizedPassword, value))
}

export async function createAdminSession(
  options: { role?: AdminRole; restaurant?: { id: string; name: string; user?: string }; user?: string } = {}
) {
  const { secret } = getAdminCredentials()
  const role = options.role ?? 'restaurant'
  const restaurant = options.restaurant ?? defaultRestaurant
  const payload = {
    sub: 'admin',
    role,
    restaurantId: role === 'restaurant' ? restaurant.id : undefined,
    restaurantName: role === 'restaurant' ? restaurant.name : undefined,
    user: options.user ?? restaurant.user ?? 'admin',
    exp: Date.now() + ADMIN_SESSION_MAX_AGE * 1000,
    nonce: crypto.randomUUID()
  } satisfies AdminSessionPayload
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const signature = await signValue(encodedPayload, secret)

  return `${encodedPayload}.${signature}`
}

export async function isAdminSessionValid(request: NextRequest) {
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  if (!session) return false

  return verifyAdminSession(session)
}

export async function getAdminSession(session?: string | null) {
  if (!session) return null

  const { secret } = getAdminCredentials()
  const [encodedPayload, signature] = session.split('.')
  if (!encodedPayload || !signature || !secret) return null

  const expectedSignature = await signValue(encodedPayload, secret)
  if (!secureCompare(signature, expectedSignature)) return null

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as Partial<AdminSessionPayload>
    if (payload.sub !== 'admin' || typeof payload.exp !== 'number' || payload.exp <= Date.now()) return null
    if ((payload.role !== 'owner' && payload.role !== 'restaurant') || !payload.user) return null
    if (payload.role === 'restaurant' && (!payload.restaurantId || !payload.restaurantName)) return null

    return payload as AdminSessionPayload
  } catch {
    return null
  }
}

export async function verifyAdminSession(session: string) {
  return Boolean(await getAdminSession(session))
}

export function secureCompare(actual: string, expected: string) {
  const actualBytes = new TextEncoder().encode(actual)
  const expectedBytes = new TextEncoder().encode(expected)
  const length = Math.max(actualBytes.length, expectedBytes.length)
  let result = actualBytes.length ^ expectedBytes.length

  for (let index = 0; index < length; index += 1) {
    result |= (actualBytes[index] ?? 0) ^ (expectedBytes[index] ?? 0)
  }

  return result === 0
}

async function signValue(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))
  return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)))
}

function base64UrlEncode(value: string) {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function base64UrlDecode(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  return atob(padded)
}
