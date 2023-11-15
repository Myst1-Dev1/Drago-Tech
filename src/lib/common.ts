import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';

export function storeTokenInCookies(token:any) {
    setCookie(undefined, 'authenticated-cookie', token, {
        maxAge: 60 * 60 * 4,
    });
}

export function getTokenFromCookies() {
    const { 'authenticated-cookie': isAuthenticated } = parseCookies();

    return isAuthenticated;
}

export async function getAuthenticatedUser() {
    const defaultReturnObject = { authenticated: false, user: null };

    try {
        const token = getTokenFromCookies();

        if(!token) {
            return defaultReturnObject;
        };

        const response = await axios({
            method: 'POST',
            url: '/api/auth/getuser',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

        const { authenticated = false } = response.data;
        return authenticated ? response.data : false;
        
    } catch (error) {
        console.log('getAuthenticatedUser, Something Went Wrong', error);
        return defaultReturnObject;
    }
}