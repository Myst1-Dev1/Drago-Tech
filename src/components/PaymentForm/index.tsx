import { useState, useEffect, FormEvent } from 'react';

import {
    PaymentElement,
    useStripe,
    useElements
  } from "@stripe/react-stripe-js";
import styles from './styles.module.scss';

interface PaymentFormProps {
    paymentIntent: string | any;
}

export function PaymentForm({paymentIntent }:PaymentFormProps) {
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
            return_url: "http://localhost:3000/sucessPayment",
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
        <div className={`py-5 ${styles.paymentFormContainer}`}>

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
                      {isLoading ? <div className="spinner" id="spinner"></div> : "Realizar Pagamento"}
                  </span>
              </button>
              {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    )
}