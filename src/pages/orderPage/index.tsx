import Head from 'next/head';
import styles from './styles.module.scss';
import Link from 'next/link';

import { useContext } from 'react';
import { useUser } from '../../lib/customHooks';
import { Button } from '../../components/Button';

import { formatPrice } from '../../utils/useFormatPrice';
import { formatData } from '../../utils/useFormatData';
import { Pagination } from '../../components/Pagination';
import { PaginationContext } from '../../services/hooks/usePagination';

export default function OrderPage() {
    const { startIndex, endIndex } = useContext(PaginationContext);
    const { user } = useUser();

    const orderData = user?.orders?.slice(startIndex, endIndex);

    const order = user?.orders;

    return (
        <>
            <Head>
                <title>Pedidos | Drago Tech</title>
            </Head>

            <div className={`container py-5`}>
                <h2>Seus Pedidos</h2>

                <div className={`mt-5 row gap-5 justify-content-center m-auto ${styles.orderContainer}`}>
                    {user === null ? 'Carregando...' : orderData?.map((order:any, index:number) => (
                        <div key={index} className={`col-md-4 ${styles.orderBox}`}>
                            <div className='d-flex justify-content-between'>
                                <h6>Pedido Nº: {index + 1}</h6>
                                <h6>{formatData(order.createdAt)}</h6>
                            </div>
                            <div className='mt-3'>
                                <h6>Items Comprados:</h6>
                                <ol>
                                {order.orderProductName.map((item:any) => (
                                    <li>{item}</li>
                                ))}
                                 </ol>
                            </div>
                            <div className='d-flex justify-content-between mt-3'>
                                <h6>Total Da Compra</h6>
                                <h6 className='fw-bold'>{formatPrice(order.orderTotalPrice)}</h6>
                            </div>
                            <div className='mt-3'>
                                <Link href="/"><Button>Ver Pedido</Button></Link>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination data={order} />
            </div>
        </>
    )
}