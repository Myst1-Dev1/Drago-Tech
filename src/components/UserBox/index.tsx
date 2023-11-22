import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { useRouter } from 'next/router';
import styles from './styles.module.scss'
import Link from 'next/link'
import { destroyCookie } from 'nookies';
import axios from 'axios';

export function UserBox() {
    const router = useRouter();

    async function handleLogout() {
        try {
            const response = await axios({
                method:'delete',
                url:'/api/auth/signout',
            });

            destroyCookie(null, 'authenticated-cookie');
            router.push('/signInPage');
            router.reload();

            console.log(response);
        } catch (error) {
            console.log('erro', error);
        }    
    }
    
    return (
        <div className={`mt-3 ${styles.userBox}`}>
            <Link href="/profile" className='d-flex gap-2 align-items-center'>
                <FaUserAlt className={styles.icon} />
                <h6 className='mb-0'>Meu Perfil</h6>
            </Link>

            <FaSignOutAlt onClick={handleLogout} className={`${styles.icon} mt-3`} />
        </div>
    )
}