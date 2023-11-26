import { Button } from '../Button';
import { Input } from '../Input';

import { useState, useEffect, FormEvent, useContext } from 'react';

import {
    PaymentElement,
    useStripe,
    useElements
  } from "@stripe/react-stripe-js";

interface InformationFormProps {
    onHandleNextStep:() => void;
    onHandlePrevStep:() => void;
    paymentIntent:string | any;
}

export function InformationForm({ onHandleNextStep, onHandlePrevStep, paymentIntent } :InformationFormProps) {

    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<null | any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [locAmount, setLocAmount] = useState("300");

    useEffect(() => {
        if (!stripe) {
            return;
          }
      
          const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
          );
      
          if (!clientSecret) {
            return;
          }
      
          stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }:any) => {
            switch (paymentIntent.status) {
              case "succeeded":
                setMessage("Payment succeeded!");
                break;
              case "processing":
                setMessage("Your payment is processing.");
                break;
              case "requires_payment_method":
                setMessage("Your payment was not successful, please try again.");
                break;
              default:
                setMessage("Something went wrong.");
                break;
            }
          });
    }, [stripe]);

    const handleAmount = async (val:any) => {
      setLocAmount(val);
      fetch('api/createStripePayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: val * 100,
          payment_intent_id: paymentIntent.paymentIntent,
        }),
      });
    };

    const handleSubmit = async (e?:FormEvent) => {
        e?.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js hasn't yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        setIsLoading(true);
    
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "http://localhost:3000/sucessPage",
          },
        });
    
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage('error');
        } else {
          setMessage("An unexpected error occurred.");
        }
    
        setIsLoading(false);
      };
    
      const paymentElementOptions:any = {
        layout: "tabs",
      };

    return (
        <div className={`py-5`}>
            {/* <form className="d-flex flex-column gap-3">
                <div className={`d-flex wrap gap-3 `}>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="email">Email</label>
                        <Input required id='email' type='text' placeholder='johndoe@gmail.com' />
                    </div>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="tel">Número</label>
                        <Input required id='tel' type='tel' placeholder='55214002922' />
                     </div>
                </div>
                <div className={`py-3`}>
                    <label className='mb-3 fw-bold' htmlFor="address">Endereço</label>
                    <Input required id='address' type='text' placeholder='Rua Sebastião Porto' />
                </div>
                <div>
                    <label className='mb-3 fw-bold' htmlFor="city">Cidade</label>
                    <Input required id='city' type='text' placeholder='Santo Lorem' />
                </div>
                <div className={`d-flex justify-content-between wrap py-3 gap-3`}>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="state">Estado</label>
                        <Input required id='state' type='text' placeholder='RJ' />
                    </div>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="cep">CEP</label>
                        <Input required id='cep' type='number' placeholder='XXXXXXXX' />
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <Button onClick={onHandlePrevStep}>Voltar</Button>
                    <Button onClick={onHandleNextStep}>Prosseguir</Button>
                </div>
            </form> */}
            <form id="payment-form" onSubmit={handleSubmit}>

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <input
                  className='d-none'
                  id="amount"
                  type="text"
                  value={locAmount}
                  onChange={(e) => handleAmount(e.target.value)}
                  placeholder="Enter email address"
                />
                <button
                    className='bg-danger text-light rounded border-0 py-3 w-100 mt-3' 
                    disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    )
}