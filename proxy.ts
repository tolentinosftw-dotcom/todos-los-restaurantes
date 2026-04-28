import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/admin/:path*']
}

const DEV_ADMIN_USER = 'Admincrepes1.'
const DEV_ADMIN_PASSWORD = 'Adminwaffles1.'

export function proxy(request: NextRequest) {
  const adminUser = process.env.ADMIN_USER || (process.env.NODE_ENV === 'development' ? DEV_ADMIN_USER : '')
  const adminPassword = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === 'development' ? DEV_ADMIN_PASSWORD : '')

  if (!adminUser || !adminPassword) {
    return new NextResponse('Admin credentials are not configured.', { status: 503 })
  }

  const authorization = request.headers.get('authorization')
  const credentials = parseBasicAuth(authorization)

  if (credentials && secureCompare(credentials.user, adminUser) && secureCompare(credentials.password, adminPassword)) {
    return NextResponse.next()
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Crepes Admin", charset="UTF-8"',
      'Cache-Control': 'no-store'
    }
  })
}

function parseBasicAuth(authorization: string | null) {
  if (!authorization?.startsWith('Basic ')) return null

  try {
    const decoded = atob(authorization.slice('Basic '.length))
    const separator = decoded.indexOf(':')
    if (separator === -1) return null

    return {
      user: decoded.slice(0, separator),
      password: decoded.slice(separator + 1)
    }
  } catch {
    return null
  }
}

function secureCompare(actual: string, expected: string) {
  const actualBytes = new TextEncoder().encode(actual)
  const expectedBytes = new TextEncoder().encode(expected)
  const length = Math.max(actualBytes.length, expectedBytes.length)
  let result = actualBytes.length ^ expectedBytes.length

  for (let index = 0; index < length; index += 1) {
    result |= (actualBytes[index] ?? 0) ^ (expectedBytes[index] ?? 0)
  }

  return result === 0
}
