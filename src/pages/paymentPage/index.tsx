import Head from 'next/head';
import styles from './styles.module.scss';

import { MdPayment } from 'react-icons/md';
import { FaCheck, FaMapMarkedAlt } from 'react-icons/fa';
import { useState, FormEvent } from 'react';
import { InformationForm } from '../../components/InformationForm';
import { PaymentForm } from '../../components/PaymentForm';
import { ConclusionForm } from '../../components/ConclusionForm';

export default function PaymentPage() {

    const [step, setStep] = useState(1);

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
                    <InformationForm 
                        onHandleNextStep = {handleNextStep}
                        onHandlePrevStep = {handlePrevStep} 
                    />
                )}
                {step === 2 && (
                    <PaymentForm 
                        onHandleNextStep = {handleNextStep}
                        onHandlePrevStep = {handlePrevStep}
                    />
                )}
                {step === 3 && (
                    <ConclusionForm
                        onHandlePrevStep = {handlePrevStep}
                     />
                )}
            </div>
        </>
    )
}