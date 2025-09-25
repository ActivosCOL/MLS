import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verificar si la ruta pertenece al dashboard
  if (request.nextUrl.pathname.startsWith('/blog') ||
      request.nextUrl.pathname.startsWith('/categories') ||
      request.nextUrl.pathname.startsWith('/authors') ||
      request.nextUrl.pathname.startsWith('/newsletter') ||
      request.nextUrl.pathname.startsWith('/pqrs') ||
      request.nextUrl.pathname.startsWith('/contactanos') ||
      request.nextUrl.pathname.startsWith('/aplicaciones') ||
      request.nextUrl.pathname.startsWith('/aliados') ||
      request.nextUrl.pathname.startsWith('/afiliados') ||
      request.nextUrl.pathname.startsWith('/banners')) {
    
    // Obtener el token de las cookies
    const token = request.cookies.get('access_token')?.value

    // Si no hay token, redirigir al login
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// Configurar las rutas que deben ser protegidas
export const config = {
  matcher: [
    '/blog/:path*',
    '/categories/:path*',
    '/authors/:path*',
    '/newsletter/:path*',
    '/pqrs/:path*',
    '/contactanos/:path*',
    '/aplicaciones/:path*',
    '/aliados/:path*',
    '/afiliados/:path*',
    '/banners/:path*'
  ],
} 