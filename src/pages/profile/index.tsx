import { useRouter } from 'next/router';
import { useUser } from '../../lib/customHooks';
import { useEffect } from 'react';
import { parseCookies } from 'nookies';

export default function Profile() {
    const { user } = useUser();
    
    const router = useRouter();

    const { 'authenticated-cookie':authcookie } = parseCookies();

    useEffect(() => {
        if(!authcookie) {
            router.push('/signInPage');
        }
    },[]);

    return (
        <div>
            sou o profile

            <div className='container py-5'>
                { user && 
                <div>
                    <p>{user?.name}</p>
                    <p>{user?.city}</p>
                </div> }
            </div>
        </div>
    )
}