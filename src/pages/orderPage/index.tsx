import Head from 'next/head';
import styles from './styles.module.scss';

import { useContext } from 'react';
import { useUser } from '../../lib/customHooks';
import { Button } from '../../components/Button';

import { formatPrice } from '../../utils/useFormatPrice';
import { formatData } from '../../utils/useFormatData';
import { Pagination } from '../../components/Pagination';
import { PaginationContext } from '../../services/hooks/usePagination';
import { updateReceivedProduct } from '../../services/graphql';
import { useRouter } from 'next/router';

export default function OrderPage() {
    const { startIndex, endIndex } = useContext(PaginationContext);
    const { user } = useUser();

    const orderData = user?.orders?.slice(startIndex, endIndex);

    const order = user?.orders;

    const router = useRouter();

    console.log(order);

    async function handleReceivedProduct(id:any) {
        try {
            await updateReceivedProduct({
                id:id,
                isReceived:true
            });

            console.log('Pedido recebido com sucesso');

           router.push('/sucessDelivery');
        } catch (error) {
            console.log('Tivemos um erro', error);
        }
    }

    return (
        <>
            <Head>
                <title>Pedidos | Drago Tech</title>
            </Head>

            <div className={`container py-5`}>
                <h2>Seus Pedidos</h2>

                <div className={`mt-5 row gap-5 justify-content-center m-auto ${styles.orderContainer}`}>
                    {user === null ? 'Carregando...' : orderData?.map((order:any) => (
                        <div key={order.id} className={`d-flex flex-column justify-content-between col-md-4 ${styles.orderBox}`}>
                            <div>
                                <div className='d-flex justify-content-between'>
                                    <h6>Pedido</h6>
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
                            </div>
                            <div className='mt-3'>
                                {order.isReceived === true ?
                                    <Button className='bg-success w-100 p-3 border-0 rounded text-light'>Recebido</Button> 
                                    :
                                   
                                    <Button onClick={() => handleReceivedProduct(order.id)}>Recebi meu Pedido</Button>
                                }
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination data={order} />
            </div>
        </>
    )
}