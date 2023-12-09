import Head from 'next/head';
import styles from './styles.module.scss';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { MdPayment } from 'react-icons/md';
import { FaCheck, FaMapMarkedAlt } from 'react-icons/fa';
import { useState, useEffect, useContext } from 'react';
import { InformationForm } from '../../components/InformationForm';
import { PaymentForm } from '../../components/PaymentForm';
import { CartContext } from '../../services/hooks/useCart/useCart';
import { formatPrice } from '../../utils/useFormatPrice';
import { useUser } from '../../lib/customHooks';

export default function PaymentPage() {
    const { user } = useUser();

    const { totalCart, cart } = useContext(CartContext);

    const [step, setStep] = useState(1);
    const [clientSecret, setClientSecret] = useState('');
    const [paymentIntent, setPaymentIntent] = useState('');

    const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);

    const amountValue = parseFloat(totalCart);

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

            <div className={`m-auto py-5 ${styles.paymentContainer}`}>
                <div className='row m-auto'>
                    <div className='col-md-8 m-auto d-flex flex-column justify-content-center align-items-center'>
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
                            <InformationForm
                                onSetStep = {setStep}
                                onStep = {step}
                            />
                        </div>
                        )}
                        <div>
                        {step === 2 && (
                            <div>
                                {clientSecret && (
                                    <Elements options={options} stripe={stripePromise}>
                                        <PaymentForm
                                        paymentIntent={paymentIntent}
                                    />
                                    </Elements>
                                )}
                            </div>
                        )}
                        </div>
                    </div>
                    <div className={`col-md-4`}>
                        <h5 className='mb-5 fw-bold'>Carrinho</h5>
                        <div className={`d-flex flex-column justify-content-between ${styles.cartContainer}`}>
                            <div>
                                {cart.map(item => (
                                    <div key={item.product.node.id} 
                                        className={`d-flex align-items-center gap-3 ${styles.cartBox}`}>
                                        <div className={styles.imgContainer}>
                                            <img src={item.product.node.image.url} alt="produto do carrinho" />
                                        </div>
                                        <div>
                                            <h6 className={styles.itemName}>{item.product.node.name}</h6>
                                            <h6>
                                                {formatPrice(user?.prime === true ? item.product.node.price * 0.95 :
                                                    item.product.node.price)}
                                            </h6>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='mt-5 d-flex justify-content-between'>
                                <h6>Total:</h6>
                                <h6 className='fw-bold'>{formatPrice(totalCart)}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}