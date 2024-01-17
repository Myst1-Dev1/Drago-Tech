import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { useContext, createContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

interface UserProviderProps {
    children: ReactNode
}

interface UserContextData {
    user:null | any;
    data: any;
    isLoading:boolean;
    authenticated:false | any;
    getAuthenticatedUser: () => Promise<void>;
    storeTokenInCookies:(token:any) => void;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({children}:UserProviderProps) {

    function storeTokenInCookies(token:any) {
        setCookie(undefined, 'authenticated-cookie', token, {
            maxAge: 60 * 60 * 4,
        });
    }

    function getTokenFromCookies() {
        const { 'authenticated-cookie': isAuthenticated } = parseCookies();
    
        return isAuthenticated;
    }

    async function getAuthenticatedUser() {
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

    const { data, isLoading } = useQuery({
        queryKey:['userData'],
        queryFn:getAuthenticatedUser
      });

      const user = data?.user || null;
      const authenticated = data?.authenticated || false;

    return (
        <UserContext.Provider value={{user, data, isLoading, authenticated, getAuthenticatedUser, storeTokenInCookies}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);

    return context;
}