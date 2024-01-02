import Head from 'next/head';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '../../components/Button';
import { useUser } from '../../lib/customHooks';
import { formatPrice } from '../../utils/useFormatPrice';

export default function SucessPayment() {
    const { user, isLoading } = useUser();

    const orders = user?.orders.slice(-1)[0];

    return (
        <>
            <Head>
                <title>Página de Sucesso | Drago Tech</title>
            </Head>
            <div className={`container py-5 ${styles.sucessPage}`}>
                <div className='d-flex justify-content-center align-items-center flex-column mb-5'>
                    <div className={styles.imgContainer}>
                        <Image width={80} height={80} src="/images/sucessIcon.webp" alt="imagem de sucesso" />
                    </div>
                    <h5 className='text-success fw-bold py-3'>Pagamento realizado com sucesso</h5>
                </div>
                <div className='row align-items-center m-auto container'>
                    <div id='payment-details' className='col-md-8 mb-5'>
                        {isLoading ? <span className='mt-5 h1'>Carregando...</span> 
                            : orders && (
                            <div className={`mt-3 ${styles.paymentDetailsContainer}`}>
                                <div className='d-flex justify-content-between'>
                                    <span>Tipo de Pagamento</span>
                                    <h6>Cartão</h6>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Telefone</span>
                                    <h6>{orders.telefone}</h6>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Email</span>
                                    <h6>{orders.email}</h6>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Estado</span>
                                    <h6>{orders.estado}</h6>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Cidade</span>
                                    <h6>{orders.cidade}</h6>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Endereço</span>
                                    <h6>{orders.endereco}</h6>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>CEP</span>
                                    <h6>{orders.cep}</h6>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Items Comprados:</span>
                                    <div>{orders.orderProductName.map((item:any, index:number) => (
                                        <h6 className={styles.itemName} key={index}>{item}</h6>
                                    ))}</div>
                                </div>
                                <div className='d-flex justify-content-between mt-3'>
                                    <span>Valor do Pedido</span>
                                    <h6 className='fw-bold'>
                                        {formatPrice(orders.orderTotalPrice)}
                                    </h6>
                                </div>
                                <div className='mt-5 d-flex justify-content-center'>
                                    <Link href="/orderPage"><Button>Ver Pedidos</Button></Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='col-md-4'>
                        <Image width={486} height={486} className='img-fluid' src="/images/deliveryIsComing.webp" alt="imagem de entrega" />
                    </div>
                </div>
            </div>
        </>
    )
}