import { Button } from '../../components/Button';
import styles from './styles.module.scss';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import Head from 'next/head';
import { Input } from '../../components/Input';
import { createUser } from '../../services/graphql';
import { useRouter } from 'next/router';

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

    const router = useRouter();

    async function handleCreateUser(e?:FormEvent) {
        e?.preventDefault();

        try {
            const userObj = {name, email, phone, address, city, state, zipCode, password};

            await createUser(userObj);
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
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Input 
                            type="tel" 
                            placeholder='Telefone'
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className={`d-flex gap-3 ${styles.inputBox}`}>
                        <Input 
                            type="email" 
                            placeholder='Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Input 
                            type="text" 
                            placeholder='Endereço'
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    <div className={`d-flex gap-3 ${styles.inputBox}`}>
                        <Input 
                            type="text" 
                            placeholder='Cidade'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <Input 
                            type="text" 
                            placeholder='Estado'
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                    </div>
                    <div className={`w-100 ${styles.inputBox}`}>
                        <Input 
                            type="number" 
                            placeholder='CEP'
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}
                        />
                    </div>
                    <div className={`d-flex gap-3 ${styles.inputBox}`}>
                        <Input 
                            type="password" 
                            placeholder='Senha'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Input 
                            type="password" 
                            placeholder='Confirmar senha'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                       {/* {password !== confirmPassword ? 'as senhas não coincidem' : ''} */}
                    </div>
                    <Button type='submit'>Criar conta</Button>
                    <h6 className='fw-bold'>Já possui uma conta? <Link href="/signInPage">Entrar</Link></h6>
                </form>
            </div>
        </>
    )
}