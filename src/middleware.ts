import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request:NextRequest) {
    const token = request.cookies.get('authenticated-cookie')?.value;

    const signInURL = new URL('/signInPage', request.url);
    const homeURL = new URL('/', request.url);

    if(!token) {
        if(request.nextUrl.pathname === '/signInPage') {
            return NextResponse.next();
        }

        return NextResponse.redirect(signInURL);
    }

    if(request.nextUrl.pathname === 'signInPage' || request.nextUrl.pathname === 'signUnPage') {
        return NextResponse.redirect(homeURL);
    }
}

export const config = {
    matcher: [
        '/wishlistPage',
        '/profile',
        '/orderPage', 
        '/sucessPayment', 
        '/sucessDelivery', 
        '/paymentPage',
        '/paymentError',
        '/primeSucessPayment']
}