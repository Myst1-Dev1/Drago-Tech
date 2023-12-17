import styles from './styles.module.scss';
import Head from 'next/head';
import Image from 'next/image';

import { Button } from '../../components/Button';
import { FaPercent, FaRocket, FaTicketAlt } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { useUser } from '../../lib/customHooks';
import { updateUserPrime } from '../../services/graphql';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function PrimePage() {
    const { user, authenticated } = useUser();

    const [isLoading, setIsLoading] = useState(false);

    async function handleRedirectToCheckout() {
        if(authenticated === false) {
            toast.error("Você precisa estar logado para isso", {
                position:toast.POSITION.TOP_RIGHT,
                theme:'colored'
            })
        }

        const stripe:any = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);
        const { sessionId } = await fetch('/api/createCheckoutSession', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                email:user?.email
            })
          }).then((res) => res.json());

          await updateUserPrime({email: user?.email, prime:true});

          setIsLoading(true);

          const { error } = await stripe.redirectToCheckout({
            sessionId,
          });
      
          if (error) {
            console.error('Tivemos um erro ao criar uma assinatura', error);
          }
    }

    return (
        <>
            <Head>
                <title>Prime | Drago Tech</title>
            </Head>
            <div className={`row p-0 m-0 align-items-center ${styles.primeContainer}`}>
                <div className={`col-md-6 text-light d-flex flex-column justify-content-center align-items-center gap-3 m-auto container py-5 ${styles.primeSubtitles}`}>
                    <h2 className='fw-bold'>Seja Prime na <br /> Drago Tech</h2>
                    <p>
                        Assine o nosso prime e tenha descontos em nossos produtos
                        confirá abaixo os beneficios de ser prime
                    </p>
                    <div className='mt-4 mb-4 d-flex wrap gap-5'>
                        <div className={`d-flex flex-column gap-3 justify-content-center align-items-center ${styles.primeBenefitBox}`}>
                            <FaPercent className={styles.icon} />
                            <h6>Descontos <br /> Exclusivos</h6>
                        </div>
                        <div className={`d-flex flex-column gap-3 justify-content-center align-items-center ${styles.primeBenefitBox}`}>
                            <FaRocket className={styles.icon} />
                            <h6>Entrega <br /> Ágil</h6>
                        </div>
                        <div className={`d-flex flex-column gap-3 justify-content-center align-items-center ${styles.primeBenefitBox}`}>
                            <FaTicketAlt className={styles.icon} />
                            <h6>Cupoms <br /> Extra</h6>
                        </div>
                    </div>
                    <h2 className='fw-bold'>TA ESPERANDO O QUE?</h2>
                    <h5 className='fw-bold'>Assine Já !</h5>
                    <h5 className='fw-bold'>R$: 19,90</h5>
                    {user?.prime === true ? <h5 className='fw-bold'>Você já possui o prime</h5> 
                        : 
                    <Button onClick={handleRedirectToCheckout}>
                        {isLoading ? <div className='spinner-border'><span className='sr-only'></span></div>  
                        : 'Quero ser Prime'}
                    </Button>
                    }
                </div>
                <div className='text-light col-md-6'>
                    <div className={styles.imgContainer}>
                        <Image
                            className='img-fluid' 
                            width={800} 
                            height={500} 
                            src="/images/primeImage.webp" 
                            alt="primePage-image"
                            priority 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}