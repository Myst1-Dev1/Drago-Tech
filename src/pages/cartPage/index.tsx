import Head from 'next/head';
import styles from './styles.module.scss';

import { useState, useContext } from 'react'
import { FaLuggageCart, FaTrashAlt } from 'react-icons/fa';
import { Button } from '../../components/Button';
import { CartContext } from '../../services/hooks/useCart/useCart';
import { useRouter } from 'next/router';

export default function CartPage() {
    const [isOpenCart, setIsOpenCart] = useState(false);

    const router = useRouter();

    const { 
            cart, 
            handleAddToCart, 
            handleReduceItemQuantity,
            handleRemoveItemToCart,
            handleCleanCart, 
            totalCart } = useContext(CartContext);

    const totalCartPrice = Intl.NumberFormat('pt-br', {
        style:'currency',
        currency:'BRL'
    }).format(totalCart);

    const cartValues = cart.map(item => ({
        id: item.product.node.id,
        name: item.product.node.name,
        image: item.product.node.image.url,
        quantity: item.quantity,
        portion:item.product.node.portion,
        price: new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }).format(item.product.node.price * item.quantity),
        parceledValue:new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }).format((item.product.node.price * item.quantity) / item.product.node.portion)
    }));

    function handleOpenCart() {
        setIsOpenCart(!isOpenCart);
    }

    function handleRedirectToContinuePay() {
        router.push('/shop');
    }

    return (
        <>
            <Head><title>Carrinho de Compras | Drago Tech</title></Head>

            <div className={`container mt-5 ${styles.cartPage}`}>
                <div className='d-flex justify-content-between align-items-center wrap'>
                    <h2 className='fw-bold'>Carrinho de Compras</h2>
                    <span onClick={handleCleanCart} role='button'>Limpar Carrinho</span>
                </div>
                {cartValues.length === 0 ? <span className='text-danger'>Seu carrinho está vazio</span> 
                    : cartValues?.map(item => (
                    <div key={item.id} 
                        className={`mt-5 d-flex wrap gap-5 align-items-center ${styles.productBox}`}>
                        <div className={styles.imgContainer}>
                            <img src={item.image} alt="product-image" />
                        </div>
                        <div>
                            <h5 className='fw-bold mb-0'>{item.name}</h5>
                            <h6 className='fw-bold mt-3'>
                            Com desconto no PIX: {item.price}
                            </h6>
                            <h6 className='fw-bold'>
                                Parcelado no cartão até {item.portion} vezes sem juros {item.parceledValue}
                            </h6>
                        </div>
                        <div className={`d-flex flex-column gap-3 ${styles.amountContainer}`}>
                            <h6>Quant.</h6>
                            <div className='d-flex'>
                                <div
                                    onClick={() => handleReduceItemQuantity(item.id)} 
                                    className={` ${styles.amountBox}`}>
                                    <h6>-</h6>
                                </div>
                                <div className={` ${styles.amountBox}`}>
                                    <h6>{item.quantity}</h6>
                                </div>
                                <div
                                    onClick={() => handleAddToCart(item.id)} 
                                    className={` ${styles.amountBox}`}>
                                    <h6>+</h6>
                                </div>
                            </div>
                            <div className={`d-flex gap-3 ${styles.deleteProductBox}`}>
                                <FaTrashAlt
                                    onClick={(() => handleRemoveItemToCart(item.id))} 
                                    className={styles.icon} />
                                <h6>Remover</h6>
                            </div>
                        </div>
                        <div className={styles.priceBox}>
                            <h6 className='fw-bold'>Preço á vista no PIX</h6>
                            <h6 className={`fw-bold mt-3 ${styles.rose}`}>
                                {item.price}
                            </h6>
                        </div>
                    </div>
                ))}
                
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
                            <h6>Valor Total</h6>
                            <span>{totalCartPrice}</span>
                        </div>
                        <div className={`mt-3 d-flex justify-content-between align-items-center`}>
                            <h6>Frete:</h6>
                            <span>R$:0</span>
                        </div>
                        {/* <div className='mt-3 d-flex justify-content-center align-items-center'>
                            <span>(em até 3x de {parceledTotalPrice} sem juros)</span>
                        </div> */}
                        <div className='mt-3 d-flex flex-column gap-3 justify-content-center align-items-center'>
                            <span>Valor á vista no PIX</span>
                            <h4 className={`mb-0 fw-bold ${styles.rose}`}>{totalCartPrice}</h4>
                            {/* <span>(Economize R$:64,90)</span> */}
                        </div>
                        <div className={`mt-3 d-flex flex-column gap-3 justify-content-center align-items-center ${styles.buttonContainer}`}>
                            <Button>Ir para o pagamento</Button>
                            <div className={styles.continuePay}>
                                <button onClick={handleRedirectToContinuePay}>Continuar Comprando</button>
                            </div>
                        </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}