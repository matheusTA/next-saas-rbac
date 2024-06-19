import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const responseNext = NextResponse.next()

  if (pathname.startsWith('/org')) {
    const [, , slug] = pathname.split('/')

    responseNext.cookies.set('org', slug)
  } else {
    responseNext.cookies.delete('org')
  }

  return responseNext
}
