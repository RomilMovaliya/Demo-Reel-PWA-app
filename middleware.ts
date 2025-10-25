import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup", "/forgot-password", "/debug"];
const protectedRoutes = ["/reels", "/"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  // Get auth status from our custom cookie
  const authCookie = request.cookies.get('auth-status');
  const isAuthenticated = authCookie?.value === 'true';

  // Handle protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Handle public routes (redirect authenticated users away from login/signup)
  if (publicRoutes.includes(pathname) && pathname !== '/debug') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Handle root route
  if (pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Allow unauthenticated users to see home page
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
