import { FaPercent, FaRocket, FaTicketAlt } from 'react-icons/fa';
import styles from './styles.module.scss';
import { Button } from '../../components/Button';
import Head from 'next/head';
import { loadStripe } from '@stripe/stripe-js';
import { useUser } from '../../lib/customHooks';
import { updateUserPrime } from '../../services/graphql';

export default function PrimePage() {
    const { user, authenticated } = useUser();

    async function handleRedirectToCheckout() {
        if(authenticated === false) {
            alert('Você precisa estar logado para isso')
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
                    <Button onClick={handleRedirectToCheckout}>Quero ser Prime</Button>
                    }
                </div>
                <div className='text-light col-md-6'>
                    <div className={styles.imgContainer}>
                        <img src="/images/primeImage.png" alt="primePage-image" />
                    </div>
                </div>
            </div>
        </>
    )
}