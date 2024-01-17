import Head from 'next/head';
import styles from './styles.module.scss';
import { Button } from '../../components/Button';
import Link from 'next/link';
import { FormEvent, useState, useContext } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { api } from '../../services/axios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../services/queryClient';
import { UserContext } from '@/services/hooks/useUser/useUser';

export default function SignInPage() {
    const { storeTokenInCookies } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading , setLoading] = useState(false);

    const router = useRouter();

    async function handleSignIn(e:FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await api.post('/auth/signin', {email, password}, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });

            toast.success("Login feito com sucesso", {
                position:toast.POSITION.TOP_RIGHT,
                theme:'light'
            })

            if(!response.data?.token) {
                console.log('Você não tem um token de authenticação', response);
                return;
            };

            storeTokenInCookies(response.data.token);
            router.push('/');
        } catch (error) {
            console.log('Tivemos um erro', error);
            setIsError(true);
            setLoading(false);
        }

        setEmail('');
        setPassword('');
    }

    const mutation = useMutation({
        mutationFn:handleSignIn,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['userData']})
        }
    })

    return (
        <>
            <Head>
                <title>Página de login | Drago Tech</title>
            </Head>
            <div className={`container py-5 d-flex flex-column justify-content-center align-items-center 
                ${styles.signInPage}`}>
                <h2 className='fw-bold'>Entrar</h2>
                <form onSubmit={mutation.mutate} 
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
                    {isError ? 
                        <span className='text-center text-danger fw-bold'>
                            Email ou senha incorretos
                        </span>
                    : ''}
                    <Button type='submit'>{loading ? 
                        <div className='spinner-border'><span className='sr-only'></span></div> : 'Entrar'}
                    </Button>
                    <h6 className='fw-bold'>Novo por aqui? <Link href="/signUpPage">Criar conta</Link></h6>
                </form>
            </div>
        </>
    )
}