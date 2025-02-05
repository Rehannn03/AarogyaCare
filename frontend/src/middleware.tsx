import { NextRequest, NextResponse } from 'next/server'
//import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'
import { cookies } from 'next/headers'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('accessToken') 
    // const token = await getToken({req: request})
    const url = request.nextUrl

    if(tokenCookie && 
        (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') 
    )){
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (!tokenCookie && (url.pathname.startsWith('/') && url.pathname !== '/sign-in' && url.pathname !== '/sign-up' && url.pathname !== '/')){  
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/sign-in', '/sign-up', '/'],
}