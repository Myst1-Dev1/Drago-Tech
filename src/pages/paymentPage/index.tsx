import Head from 'next/head';
import styles from './styles.module.scss';

import { MdPix } from 'react-icons/md';
import { FaCopy, FaCreditCard } from 'react-icons/fa';
import { useState, useContext } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { CartContext } from '../../services/hooks/useCart/useCart';

export default function PaymentPage() {
    const { cart, totalCart } = useContext(CartContext);

    const [cardPayment, setCardPayment] = useState(false)
    const [pixPayment, setPixPayment] = useState(false)

    function handleOpenCardPayment() {
        setCardPayment(!cardPayment);
    }
    function handleOpenPixPayment() {
        setPixPayment(!pixPayment);
    }

    return (
        <>
            <Head>
                <title>Pagamento | Drago Tech</title>
            </Head>

            <div className={`row m-auto container py-5 ${styles.paymentContainer}`}>
                <div className={`col-md-6 ${styles.formContainer}`}>
                    <div className={`d-flex gap-3 ${styles.paymentMethodBox}`}>
                        <button onClick={handleOpenPixPayment} className='d-flex justify-content-center align-items-center gap-3'>
                            <MdPix className={styles.pix} /> PIX
                        </button>
                        <button onClick={handleOpenCardPayment} className='d-flex justify-content-center align-items-center gap-3'>
                            <FaCreditCard className={styles.cardIcon} /> Cartão
                        </button>
                    </div>
                    {pixPayment && (
                        <div className={`mt-5 ${styles.pixMethod}`}>
                        <h5 className='fw-bold'>Escaneie o QR Code em sua tela</h5>
                        <h5 className='fw-bold'>Ou Pague com o Código</h5>
                        <div className='d-flex flex-column justify-content-center align-items-center m-auto'>
                            <div className={styles.imgContainer}>
                                <img src="/images/qr-code.png" alt="qrcode-image" />
                            </div>
                            <div className={`d-flex align-items-center ${styles.qrCodeValueBox}`}>
                                <input type='text' defaultValue="000000000000adfdfd48480004848"/>
                                <FaCopy className={styles.icon} />
                            </div>
                        </div>
                        </div>
                    )}

                    {cardPayment && (
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
                        <div className='m-auto'>
                            <Button>Realizar Pagamento</Button>
                        </div>
                        </form>
                    )}
                </div>

                <div className={`col-md-6`}>
                    <h3 className='fw-bold'>Seu Carrinho</h3>
                    <div className={`mt-5 ${styles.cartProductsContainer}`}>
                        <div className={` ${styles.cartProductsBox}`}>
                            {cart.map(cart => (
                                <div key={cart.product.node.id} 
                                    className='d-flex align-items-center gap-3 mb-3'>
                                    <div className={styles.imgContainer}>
                                        <img src={cart.product.node.image.url} alt="cart-product-image" />
                                    </div>
                                    <div>
                                        <h6 className='fw-bold'>{cart.product.node.name}</h6>
                                        <h6 className='fw-bold'>
                                            {Intl.NumberFormat('pt-br', {
                                                style:'currency',
                                                currency:'BRL'
                                            }).format(cart.product.node.price)}
                                        </h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='d-flex justify-content-between'>
                            <h5>Total:</h5>
                            <h5>{Intl.NumberFormat('pt-br', {
                                style:'currency',
                                currency:'BRL'
                            }).format(totalCart)}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}