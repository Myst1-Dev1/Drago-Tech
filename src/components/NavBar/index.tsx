import styles from './styles.module.scss';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function NavBar() {
    const [responsiveNavBar, setResponsiveNavBar] = useState(false);

    const router = useRouter();

    function handleOpenResponsiveNavBar() {
        setResponsiveNavBar(true);
    }

    function handleCloseResponsiveNavBar() {
        setResponsiveNavBar(false);
    }

    useEffect(() => {
        setResponsiveNavBar(false);
    }, [router.pathname]);

    return (
        <>
            <div className={responsiveNavBar ? `${styles.responsiveNavBar}` : `py-3 ${styles.navBar}`}>
                <div className={`container d-flex gap-5 ${styles.navContent}`}>
                    <Link href="/">Início</Link>
                    <Link href="/shop">Loja</Link>
                    <Link href="">Sobre</Link>
                    <Link href="">Prime</Link>
                    <Link href="">Contato</Link>
                </div>
                <FaTimes onClick={handleCloseResponsiveNavBar} className={styles.closeResponsiveMenuIcon} />
            </div>
            <div className={styles.openMenuIconBox}>
                <FaBars onClick={handleOpenResponsiveNavBar} className={styles.responsiveOpenMenuIcon} />
            </div>
        </>
    )
}