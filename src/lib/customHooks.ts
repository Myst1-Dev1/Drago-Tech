import { getAuthenticatedUser } from './common';
import { useQuery } from '@tanstack/react-query';

export function useUser() {

    const { data, isLoading } = useQuery({
      queryKey:['userData'],
      queryFn:getAuthenticatedUser
    })

    const user = data?.user || null;
    const authenticated = data?.authenticated || false;

    return { user ,authenticated, data, isLoading };
}