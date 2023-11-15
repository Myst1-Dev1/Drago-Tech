import { useState, useEffect } from 'react';
import { getAuthenticatedUser } from './common';
import Router from 'next/router';

export function useUser() {
    const [user, setUser] = useState<null | any>(null);
    const [authenticated, setAutenticated] = useState(false);

    useEffect(() => {
        async function getUserDetails() {
          const { authenticated, user } = await getAuthenticatedUser();
          if (!authenticated) {
            Router.push('/signInPage');
            return;
          }
          setUser(user);
          setAutenticated(authenticated);
        }
        getUserDetails();
      }, []);

      return { user, authenticated };
}