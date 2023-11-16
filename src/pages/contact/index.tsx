import Head from 'next/head';
import styles from './styles.module.scss';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export default function Contact() {
    return (
        <>
            <Head>
                <title>Contato | Drago Tech</title>
            </Head>
            <h2 className='fw-bold text-center mt-5'>Nos Envie uma Mensagem</h2>

            <div className={`container m-auto row justify-content-between py-3 ${styles.contact}`}>
                <form className='col-md-6 d-flex flex-column justify-content-center align-items-center gap-3'>
                    <Input type='text' placeholder='Nome' />
                    <Input type='email' placeholder='Email' />
                    <textarea placeholder='Mensagem' />
                    <Button>Enviar</Button>
                </form>
                <div className={`col-md-6 py-5 ${styles.imgContainer}`}>
                    <img 
                        className='img-fluid' 
                        src="/images/contactImg.png" 
                        alt="secretaria que recebe as mensagems" 
                    />
                </div>
            </div>
        </>
    )
}