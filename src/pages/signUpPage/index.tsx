import { Button } from '../../components/Button';
import styles from './styles.module.scss';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import Head from 'next/head';
import { Input } from '../../components/Input';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    async function handleCreateUser(e?:FormEvent) {
        e?.preventDefault();

        try {
            if (password !== confirmPassword) {
                setIsError(true);
                return;
              }

            setIsLoading(true);

            const response = await axios({
                method: 'post',
                url: '/api/auth/signup',
                data: {
                    name, email, phone, address, city, state, zipCode, password
                },
                headers: {
                    'Access-Control-Allow-Origin': 'https://drago-tech.vercel.app/signUpPage'
                }
            });

            toast.success("Cadastro feito com sucesso", {
                position:toast.POSITION.TOP_RIGHT,
                theme:'light'
            })

            if (!response?.data?.token) {
                console.log('Something went wrong during signing up: ', response);
                return;
              }

        } catch (error) {
            console.log('Tivemos um erro');
        }

        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setCity('');
        setState('');
        setZipCode('');
        setPassword('');
        setConfirmPassword('');

        router.push('/signInPage');
    };

    return (
        <>
            <Head>
                <title>Página de cadastro | Drago Tech</title>
            </Head>
            <div className={`container py-5 d-flex flex-column justify-content-center align-items-center 
                ${styles.signUpPage}`}>
                <h2 className='fw-bold'>Criar conta</h2>
                <form
                    onSubmit={handleCreateUser}
                    className='d-flex flex-column justify-content-center align-items-center gap-4 mt-5'>
                    <div className={`d-flex gap-3 ${styles.inputBox}`}>
                        <Input 
                            type="text" 
                            placeholder='Nome'
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Input 
                            type="tel" 
                            placeholder='Telefone'
                            required
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className={`d-flex gap-3 ${styles.inputBox}`}>
                        <Input 
                            type="email" 
                            placeholder='Email'
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Input 
                            type="text" 
                            placeholder='Endereço'
                            required
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    <div className={`d-flex gap-3 ${styles.inputBox}`}>
                        <Input 
                            type="text" 
                            placeholder='Cidade'
                            required
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <Input 
                            type="text" 
                            placeholder='Estado'
                            required
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                    </div>
                    <div className={`w-100 d-flex gap-3 ${styles.inputBox}`}>
                        <Input 
                            type="number" 
                            placeholder='CEP'
                            required
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}
                        />
                    </div>
                    <div className='d-flex flex-column gap-3'>
                        <div className={`d-flex gap-3 ${styles.inputBox}`}>
                            <Input 
                                type="password" 
                                placeholder='Senha'
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Input 
                                type="password" 
                                placeholder='Confirmar senha'
                                required
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {isError ?
                            <span className='text-center text-danger fw-bold'>
                                As senhas não coincidem
                            </span>
                        : ''}
                    </div>
                    <Button type='submit'>
                        {isLoading ? <div className='spinner-border'><span className='sr-only'></span></div> 
                        : 'Criar conta'}
                    </Button>
                    <h6 className='fw-bold'>Já possui uma conta? <Link href="/signInPage">Entrar</Link></h6>
                </form>
            </div>
        </>
    )
}