import Head from 'next/head';
import styles from './styles.module.scss';

import { useContext } from 'react';
import { Button } from '../../components/Button';

import { formatPrice } from '../../utils/useFormatPrice';
import { formatData } from '../../utils/useFormatData';
import { Pagination } from '../../components/Pagination';
import { PaginationContext } from '../../services/hooks/usePagination';
import { updateReceivedProduct } from '../../services/graphql';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { UserContext } from '../../services/hooks/useUser/useUser';

export default function OrderPage() {
    const { startIndex, endIndex } = useContext(PaginationContext);
    const { data } = useContext(UserContext);

    // Certifique-se de que orderData seja um array vazio caso data.user ou data.user.orders seja null ou undefined
    const orderData = data?.user?.orders ? data.user.orders.slice(startIndex, endIndex) : [];

    const order = data?.user?.orders;

    const router = useRouter();

    async function handleReceivedProduct(id:any) {
        try {
            await updateReceivedProduct({
                id:id,
                isReceived:true
            });

            toast.success("Pedido recebido com sucesso", {
                position:toast.POSITION.TOP_RIGHT,
                theme:'light'
            })

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
                    {data?.user === null ? 'Carregando...' : orderData?.map((order:any) => (
                        <div key={order.id} className={`d-flex flex-column justify-content-between col-md-4 ${styles.orderBox}`}>
                            <div>
                                <div className='d-flex justify-content-between'>
                                    <h6>Pedido</h6>
                                    <h6>{formatData(order.createdAt)}</h6>
                                </div>
                                <div className='mt-3'>
                                    <h6>Items Comprados:</h6>
                                    <ol>
                                    {order.orderProductName.map((item:any, index:number) => (
                                        // Use o índice como chave para evitar erros quando o item não tiver um ID único
                                        <li key={index}>{item}</li>
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
