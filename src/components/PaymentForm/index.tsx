import { useState } from 'react';
import { MdOutlinePix, MdPayment } from 'react-icons/md';
import { Button } from '../Button';
import styles from './styles.module.scss';
import { FaCopy } from 'react-icons/fa';
import { Input } from '../Input';

interface PaymentFormProps {
    onHandleNextStep:() => void;
    onHandlePrevStep:() => void;
}

export function PaymentForm({ onHandleNextStep, onHandlePrevStep }:PaymentFormProps) {
    // const [paymentMethod, setPaymentMethod] = useState(true);
    // const [pixMethod, setPixMethod] = useState(false);
    // const [cardMethod, setCardMethod] = useState(false);

    // function handleOpenPixMethod() {
    //     setPaymentMethod(false);
    //     setPixMethod(true);
    // }

    // function handleOpenCardMethod() {
    //     setPaymentMethod(false);
    //     setCardMethod(true);
    // }

    return (
        <div className={`py-5 ${styles.paymentFormContainer}`}>
            {/* {paymentMethod && (
                <div className={`d-flex justify-content-center align-items-center gap-5 ${styles.paymentMethodContainer}`}>
                <Button onClick={handleOpenPixMethod}>
                    <div className='d-flex align-items-center justify-content-center m-auto gap-3'>
                        <MdOutlinePix className={styles.pixIcon} /> PIX
                    </div> 
                </Button>
                <Button onClick={handleOpenCardMethod}>
                    <div className='d-flex align-items-center justify-content-center m-auto gap-3'>
                        <MdPayment className={styles.cardIcon} /> Cartão
                    </div>
                </Button>
                </div>
            )}

            {pixMethod && (
                <form className={`d-flex flex-column gap-3 justify-content-center align-items-center ${styles.pixBox}`}>
                    <h5 className='fw-bold'>Escaneie o QR Code em sua tela</h5>
                    <h5 className='fw-bold'>Ou Pague com o Código</h5>
                    <div className='d-flex flex-column justify-content-center align-items-center m-auto'>
                        <div className={`${styles.imgContainer}`}>
                            <img src="/images/qr-code.png" alt="qrcode-image" />
                        </div>
                        <div className={`d-flex align-items-center ${styles.qrCodeValueBox}`}>
                            <input type='text' defaultValue="000000000000adfdfd48480004848"/>
                            <FaCopy className={styles.icon} />
                        </div>
                        <div className='d-flex justify-content-between gap-5 py-5'>
                            <Button onClick={onHandlePrevStep}>Voltar</Button>
                            <Button onClick={onHandleNextStep}>Prosseguir</Button>
                        </div>
                    </div>
                </form>
            )} */}

            <form className='d-flex flex-column gap-3 mt-5'>
                <div className={` ${styles.inputBox}`}>
                    <label className='mb-3 fw-bold' htmlFor="cardName">Nome Impresso no Cartão</label>
                    <Input id='cardName' type='text' placeholder='JOHN DOE' />
                </div>
                <div className={` ${styles.inputBox}`}>
                    <label className='mb-3 fw-bold' htmlFor="cardNumber">Número do Cartão</label>
                    <Input id='cardNumber' type='number' placeholder='XXXX-XXXX-XXXX' />
                </div>
                <div className={`d-flex gap-5 ${styles.inputBox}`}>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="dateCard">Validade do Cartão</label>
                        <Input id='dateCard' type='number' placeholder='04/2030' />
                    </div>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="cvc">CVC</label>
                        <Input id='cvc' type='number' placeholder='123' />
                    </div>
                </div>
                <div className='d-flex justify-content-between py-3'>
                    <Button onClick={onHandlePrevStep}>Voltar</Button>
                    <Button onClick={onHandleNextStep}>Prosseguir</Button>
                </div>
            </form>
        </div>
    )
}