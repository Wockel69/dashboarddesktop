import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isAuth = !!token;
  const isLoginPage = pathname === '/login';
  const isPublicPath = ['/login', '/forgot-password', '/reset-password'].some(
    p => pathname === p || pathname.startsWith(p + '/')
  );

  // Spezialfall: Root-Pfad direkt behandeln
  if (pathname === '/') {
    // Wenn eingeloggt, weiter zum Dashboard
    if (isAuth) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } 
    // Wenn nicht eingeloggt, weiter zum Login
    else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 1. Wenn eingeloggt & versucht /login aufzurufen → redirect zum Dashboard
  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Wenn nicht eingeloggt & NICHT auf public Page → redirect zu /login
  if (!isAuth && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Zugriff ist erlaubt
  return NextResponse.next();
}

export const config = {
  // Matcher: auf alle “normalen” Seiten anwenden, nicht aber auf statische Dateien etc.
  matcher: [
    '/((?!api|_next|_static|_vercel|favicon.ico|.*\\..*).*)',
  ],
};
