import Head from 'next/head';
import styles from './styles.module.scss';
import { Button } from '../../components/Button';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { setCookie } from 'nookies';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignIn(e:FormEvent) {
        e.preventDefault();

        try {
            const response = await axios({
                method:'post',
                url:'/api/auth/signin',
                data: {
                    email, password
                }
            });

            if(!response.data?.token) {
                console.log('Você não tem um token de authenticação', response);
                return;
            };

            setCookie(undefined, 'jwt-cookie', response.data.token, {
                maxAge:30 * 24 * 60 * 60,
            });
        } catch (error) {
            console.log('Tivemos um erro', error);
        }

        setEmail('');
        setPassword('');
    }

    return (
        <>
            <Head>
                <title>Página de login | Drago Tech</title>
            </Head>
            <div className={`container py-5 d-flex flex-column justify-content-center align-items-center 
                ${styles.signInPage}`}>
                <h2 className='fw-bold'>Entrar</h2>
                <form onSubmit={handleSignIn} 
                    className='d-flex flex-column justify-content-center align-items-center gap-4 mt-5'>
                    <div className={`d-flex align-items-center gap-2 ${styles.inputBox}`}>
                        <FaUser className={styles.icon} />
                        <input 
                            type="email" 
                            placeholder='Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={`d-flex align-items-center gap-2 ${styles.inputBox}`}>
                        <FaLock className={styles.icon} />
                        <input 
                            type="password" 
                            placeholder='Senha'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type='submit'>Entrar</Button>
                    <h6 className='fw-bold'>Novo por aqui? <Link href="/signUpPage">Criar conta</Link></h6>
                </form>
            </div>
        </>
    )
}