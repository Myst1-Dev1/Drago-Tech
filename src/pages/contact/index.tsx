import Head from 'next/head';
import styles from './styles.module.scss';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useState, FormEvent } from 'react';
import axios from 'axios';

export default function Contact() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSendEmail(e:FormEvent) {
        e.preventDefault();

        try {
            setIsLoading(true);

            const response = await axios.post('/api/sendEmail', {
                to: email,
                subject: subject,
                text: message,
            }, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              const data = response.data;

              setIsLoading(false);

              if (data.success) {
                  console.log('E-mail enviado com sucesso!');
              } else {
                  console.error('Erro ao enviar e-mail:', data.error);
              }
          } catch (error) {
              console.error('Erro de rede:', error);
          }

          setEmail('');
          setSubject('');
          setMessage('');
    }

    return (
        <>
            <Head>
                <title>Contato | Drago Tech</title>
            </Head>
            <h2 className='fw-bold text-center mt-5'>Nos Envie uma Mensagem</h2>

            <div className={`container m-auto row justify-content-between py-3 ${styles.contact}`}>
                <form
                    onSubmit={handleSendEmail} 
                    className='col-md-6 d-flex flex-column justify-content-center align-items-center gap-3'>
                    <Input 
                        type='email' 
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <Input 
                        type='text' 
                        placeholder='Assunto'
                        value={subject}
                        onChange={e => setSubject(e.target.value)} 
                    />
                    <textarea 
                        placeholder='Mensagem'
                        value={message}
                        onChange={e => setMessage(e.target.value)} 
                    />
                    <Button type='submit'>
                        {isLoading ? 
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div> 
                            : 'Enviar'
                        }
                    </Button>
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