import { Button } from '../../components/Button';
import styles from './styles.module.scss';
import Link from 'next/link';
import Head from 'next/head';

export default function SignUpPage() {
    return (
        <>
            <Head>
                <title>Página de cadastro | Drago Tech</title>
            </Head>
            <div className={`container py-5 d-flex flex-column justify-content-center align-items-center 
                ${styles.signUpPage}`}>
                <h2 className='fw-bold'>Criar conta</h2>
                <form className='d-flex flex-column justify-content-center align-items-center gap-4 mt-5'>
                    <div className={`d-flex gap-3 ${styles.inputBox}`}>
                        <input type="text" placeholder='Nome'/>
                        <input type="tel" placeholder='Telefone'/>
                    </div>
                    <div className={`d-flex gap-3 ${styles.inputBox}`}>
                        <input type="email" placeholder='Email'/>
                        <input type="text" placeholder='Endereço'/>
                    </div>
                    <div className={`d-flex gap-3 ${styles.inputBox}`}>
                        <input type="password" placeholder='Senha'/>
                        <input type="password" placeholder='Confirmar senha'/>
                    </div>
                    <Button>Criar conta</Button>
                    <h6 className='fw-bold'>Já possui uma conta? <Link href="/signInPage">Entrar</Link></h6>
                </form>
            </div>
        </>
    )
}