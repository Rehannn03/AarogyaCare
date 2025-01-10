import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('accessToken');
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    if (tokenCookie || token) {
        if (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    } else if (
        !tokenCookie &&
        !token &&
        url.pathname !== '/sign-in' &&
        url.pathname !== '/sign-up' &&
        url.pathname !== '/'
    ) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
}

export const config = {
    matcher: ['/sign-in', '/sign-up', '/'],
};
