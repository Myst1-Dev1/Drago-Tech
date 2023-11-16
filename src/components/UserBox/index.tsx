import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { useRouter } from 'next/router';
import styles from './styles.module.scss'
import Link from 'next/link'
import { destroyCookie } from 'nookies';

export function UserBox() {
    const router = useRouter();

    async function handleLogout() {
        destroyCookie(null, 'authenticated-cookie');
        router.reload();
        router.push('/signInPage');
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