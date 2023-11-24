import Link from 'next/link';
import { Logo } from '../Logo';
import styles from './styles.module.scss';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

export function Footer() {
    return (
        <>
            <div className={`gap-4 d-flex flex-column justify-content-center align-items-center ${styles.footer}`}>
                <Logo />
                <div className='d-flex align-items-center gap-3'>
                    <Link href="/">Ínicio</Link>
                    <Link href="/shop">Loja</Link>
                    <Link href="/about">Sobre</Link>
                    <Link href="/primePage">Prime</Link>
                    <Link href="/contact">Contato</Link>
                </div>
                <div className='d-flex align-items-center gap-3'>
                    <FaFacebook className={styles.icon} />
                    <FaInstagram className={styles.icon} />
                    <FaTwitter className={styles.icon} />
                </div>
                <div className={`d-flex justify-content-center ${styles.copyright}`}>
                    <p className='mt-3'>© 2023 Design por <span className='fw-bold'>Myst1 Dev</span></p>
                </div>
            </div>
        </>
    )
}