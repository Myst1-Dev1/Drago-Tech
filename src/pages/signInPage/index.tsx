import Head from 'next/head';
import styles from './styles.module.scss';
import { Button } from '../../components/Button';
import Link from 'next/link';
import { FaLock, FaUser } from 'react-icons/fa';

export default function SignInPage() {
    return (
        <>
            <Head>
                <title>Página de login | Drago Tech</title>
            </Head>
            <div className={`container py-5 d-flex flex-column justify-content-center align-items-center 
                ${styles.signInPage}`}>
                <h2 className='fw-bold'>Criar conta</h2>
                <form className='d-flex flex-column justify-content-center align-items-center gap-4 mt-5'>
                    <div className={`d-flex align-items-center gap-2 ${styles.inputBox}`}>
                        <FaUser className={styles.icon} />
                        <input type="email" placeholder='Email'/>
                    </div>
                    <div className={`d-flex align-items-center gap-2 ${styles.inputBox}`}>
                        <FaLock className={styles.icon} />
                        <input type="password" placeholder='Senha'/>
                    </div>
                    <Button>Entrar</Button>
                    <h6 className='fw-bold'>Novo por aqui? <Link href="/signUpPage">Criar conta</Link></h6>
                </form>
            </div>
        </>
    )
}