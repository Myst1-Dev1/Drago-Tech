import Head from 'next/head';
import styles from './styles.module.scss';

import { useState } from 'react'
import { FaLuggageCart, FaTrashAlt } from 'react-icons/fa';
import { Button } from '../../components/Button';

export default function CartPage() {
    const [isOpenCart, setIsOpenCart] = useState(false);

    function handleOpenCart() {
        setIsOpenCart(!isOpenCart);
    }

    return (
        <>
            <Head><title>Carrinho de Compras | Drago Tech</title></Head>

            <div className={`container mt-5 ${styles.cartPage}`}>
                <div className='d-flex justify-content-between align-items-center wrap'>
                    <h2 className='fw-bold'>Carrinho de Compras</h2>
                    <span role='button'>Limpar Carrinho</span>
                </div>
                <div className='mt-5 d-flex wrap gap-5 align-items-center'>
                    <div className={styles.imgContainer}>
                        <img src="/images/cartImage.png" alt="" />
                    </div>
                    <div>
                        <h5 className='fw-bold mb-0'>HyperX Teclado Gamer Alloy Core</h5>
                        <h6 className='fw-bold mt-3'>Com desconto no PIX: R$ 145,90</h6>
                        <h6 className='fw-bold'>Parcelado no cartão até 3 vezes sem juros R$: 210,50</h6>
                    </div>
                    <div className={`d-flex flex-column gap-3 ${styles.amountContainer}`}>
                        <h6>Quant.</h6>
                        <div className='d-flex'>
                            <div className={` ${styles.amountBox}`}>
                                <h6>-</h6>
                            </div>
                            <div className={` ${styles.amountBox}`}>
                                <h6>1</h6>
                            </div>
                            <div className={` ${styles.amountBox}`}>
                                <h6>+</h6>
                            </div>
                        </div>
                        <div className={`d-flex gap-3 ${styles.deleteProductBox}`}>
                            <FaTrashAlt className={styles.icon} />
                            <h6>Remover</h6>
                        </div>
                    </div>
                    <div className={styles.priceBox}>
                        <h6 className='fw-bold'>Preço á vista no PIX</h6>
                        <h6 className={`fw-bold mt-3 ${styles.rose}`}>R$: 145,90</h6>
                    </div>
                </div>
                
                <div className={`d-flex flex-column justify-content-end align-items-end mt-5 ${styles.cartContainer}`}>
                    <div className='d-flex align-items-center gap-3'>
                        <FaLuggageCart onClick={handleOpenCart} className={styles.icon} />
                        <h5 className='fw-bold mb-0'>Ver carrinho</h5>
                    </div>
                    {isOpenCart &&
                    (
                        <div className={`mt-5 ${styles.cartContent}`}>
                        <h5 className='fw-bold'>Resumo</h5>
                        <div className={`mt-3 d-flex justify-content-between align-items-center ${styles.productValue}`}>
                            <h6>Valor dos produtos</h6>
                            <span>R$:145,90</span>
                        </div>
                        <div className={`mt-3 d-flex justify-content-between align-items-center`}>
                            <h6>Frete:</h6>
                            <span>R$:0</span>
                        </div>
                        <div className={`mt-3 d-flex justify-content-between align-items-center`}>
                            <h6>Total:</h6>
                            <span>R$:145,90</span>
                        </div>
                        <div className='mt-3 d-flex justify-content-center align-items-center'>
                            <span>(em até 3x de R$: 210,50 sem juros)</span>
                        </div>
                        <div className='mt-3 d-flex flex-column gap-3 justify-content-center align-items-center'>
                            <span>Valor á vista no PIX</span>
                            <h4 className={`mb-0 fw-bold ${styles.rose}`}>R$: 145,90</h4>
                            <span>(Economize R$:64,90)</span>
                        </div>
                        <div className={`mt-3 d-flex flex-column gap-3 justify-content-center align-items-center ${styles.buttonContainer}`}>
                            <Button>Ir para o pagamento</Button>
                            <div className={styles.continuePay}>
                                <button>Continuar Comprando</button>
                            </div>
                        </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}