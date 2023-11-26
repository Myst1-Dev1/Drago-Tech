import Head from 'next/head';
import styles from './styles.module.scss';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { MdPayment } from 'react-icons/md';
import { FaCheck, FaMapMarkedAlt } from 'react-icons/fa';
import { useState, FormEvent, useEffect, useContext } from 'react';
import { InformationForm } from '../../components/InformationForm';
import { PaymentForm } from '../../components/PaymentForm';
import { ConclusionForm } from '../../components/ConclusionForm';
import { CartContext } from '../../services/hooks/useCart/useCart';

export default function PaymentPage() {
    const { totalCart, cart } = useContext(CartContext);

    const [step, setStep] = useState(1);
    const [clientSecret, setClientSecret] = useState('');
    const [paymentIntent, setPaymentIntent] = useState('');

    const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);

    function handleNextStep (e?:FormEvent) {
        e?.preventDefault();
        if (step < 3) {
            setStep(step + 1);
          } else {
            setStep(3);
          }
      };
    
    function handlePrevStep (e?:FormEvent) {
    e?.preventDefault();
    if (step > 1) {
        setStep(step - 1);
        } else {
        setStep(1);
        }
    };

    console.log(totalCart);

    const amountValue = parseInt(totalCart);

    console.log(amountValue * 100);

    useEffect(() => {
    fetch('/api/createStripePayment', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            amount: amountValue * 100,
            payment_intent_id: '',
          }),
    })
    .then((res) => res.json())
    .then((data) => {
        setClientSecret(data.client_secret), setPaymentIntent(data.id);
      });
}, []);

    const appearance = {
        theme: 'stripe',
      };
      const options:any = {
        clientSecret,
        appearance,
      };
    
    return (
        <>
            <Head>
                <title>Pagamento | Drago Tech</title>
            </Head>

            <div className={`d-flex flex-column justify-content-center align-items-center py-5 ${styles.paymentContainer}`}>
                <div className={`d-flex align-items-center justify-content-center wrap gap-5 ${styles.multiStepContainer}`}>
                    <div className={`d-flex flex-column justify-content-center align-items-center gap-3`}>
                        <div className={`d-flex justify-content-center align-items-center ${styles.active}`}>
                            <FaMapMarkedAlt className={styles.icon} />
                        </div>
                        <h6 className='fw-bold'>Informações</h6>
                    </div>
                    <div className={`d-flex flex-column justify-content-center align-items-center gap-3`}>
                        <div className={`d-flex justify-content-center align-items-center 
                            ${step === 2 || step === 3 ? styles.active : styles.multiStepBox}`}>
                            <MdPayment className={styles.icon} />
                        </div>
                        <h6 className='fw-bold text-center'>Pagamento</h6>
                    </div>
                    <div className={`d-flex flex-column justify-content-center align-items-center gap-3`}>
                        <div className={`d-flex justify-content-center align-items-center 
                            ${step === 3 ? styles.active : styles.multiStepBox}`}>
                            <FaCheck className={styles.icon} />
                        </div>
                        <h6 className='fw-bold text-center'>Conclusão</h6>
                    </div>
                </div>

                {step === 1 && (
                   <div>
                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                             <InformationForm
                                paymentIntent={paymentIntent}
                                onHandleNextStep = {handleNextStep}
                                onHandlePrevStep = {handlePrevStep} 
                            />
                        </Elements>
                    )}
                   </div>
                )}
                <div>
                {/* {step === 2 && (
                    <div>
                        {clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                                <PaymentForm 
                                onHandleNextStep = {handleNextStep}
                                onHandlePrevStep = {handlePrevStep}
                            />
                            </Elements>
                        )}
                    </div>
                )} */}
                </div>
                {step === 3 && (
                    <ConclusionForm
                        onHandlePrevStep = {handlePrevStep}
                     />
                )}
            </div>
        </>
    )
}