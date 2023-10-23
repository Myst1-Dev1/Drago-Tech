import styles from './styles.module.scss';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';

export function NavBar() {
    return (
        <>
            <div className={`py-3 ${styles.navBar}`}>
                <div className='container d-flex gap-5'>
                    <Link href="/">Início</Link>
                    <Link href="/shop">Loja</Link>
                    <Link href="">Sobre</Link>
                    <Link href="">Prime</Link>
                    <Link href="">Contato</Link>
                </div>
            </div>
            <div className={styles.openMenuIconBox}>
                <FaBars className={styles.responsiveOpenMenuIcon} />
            </div>
        </>
    )
}