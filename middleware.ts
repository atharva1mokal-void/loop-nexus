import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'default-secret-key-change-it';
const key = new TextEncoder().encode(SECRET_KEY);

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session');
    const { pathname } = request.nextUrl;

    // Direct dashboard or root access should require login
    const protectedPaths = ['/', '/dashboard', '/admin', '/projects', '/insights', '/intelligence', '/profile', '/attendance', '/hackathons', '/notifications'];
    // Chat is protected? Yes, user mentioned "only team members can store data" and "chat"
    if (pathname.startsWith('/chat')) {
        protectedPaths.push('/chat');
    }

    const isProtected = protectedPaths.some(path => pathname === path || pathname.startsWith(path + '/'));

    let payload = null;
    if (session) {
        try {
            // Verify JWT
            const verified = await jwtVerify(session.value, key);
            payload = verified.payload;
        } catch (e) {
            // Invalid token
            payload = null;
        }
    }

    if (isProtected && !payload) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname === '/login' && payload) {
        if (payload.role === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
