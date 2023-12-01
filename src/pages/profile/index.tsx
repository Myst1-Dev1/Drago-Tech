import styles from './styles.module.scss'
import Head from 'next/head';

import { useUser } from '../../lib/customHooks';
import { Button } from '../../components/Button';
import { ChartGraph } from '../../components/ChartGraph';

export default function Profile() {
    const { user } = useUser();

    const createdAt = user?.orders?.map((order:any) => new Date(order.createdAt).toLocaleDateString('pt-BR', {month: 'long'}));

    const orderValue = user?.orders?.map((order:any) => order.orderTotalPrice);

    return (
        <>
            <Head>
                <title>Perfil | Drago Tech</title>
            </Head>
            <div className={`row m-auto container py-5 ${styles.profilePage}`}>
                <div className={`col-md-6 mb-5 ${styles.profileBox}`}>
                    <h4 className='fw-bold mb-5'>Perfil</h4>
                    <div className='d-flex align-items-center gap-3 mb-5'>
                        <div className={styles.imgContainer}>
                            <img src="/images/imgUser.png" alt="icone do usuário" />
                        </div>
                        <h5 className='fw-bold'>John Doe</h5>
                    </div>
                    <div className={`${styles.profileDetails}`}>
                        <div className={`d-flex justify-content-between`}>
                            <h6 className='fw-bold'>Email:</h6>
                            <h6>johndoe@gmail.com</h6>
                        </div>
                        <div className={`d-flex justify-content-between`}>
                            <h6 className='fw-bold'>Telefone:</h6>
                            <h6>40028922</h6>
                        </div>
                        <div className={`d-flex justify-content-between`}>
                            <h6 className='fw-bold'>Estado:</h6>
                            <h6>RS</h6>
                        </div>
                        <div className={`d-flex justify-content-between`}>
                            <h6 className='fw-bold'>Cidade:</h6>
                            <h6>Santo Joaquim</h6>
                        </div>
                        <div className={`d-flex justify-content-between`}>
                            <h6 className='fw-bold'>Endereço:</h6>
                            <h6>Rua Cristovão Aragão</h6>
                        </div>
                        <div className={`d-flex justify-content-between`}>
                            <h6 className='fw-bold'>CEP:</h6>
                            <h6>25478902</h6>
                        </div>
                    </div>
                    <div className='mt-3'><Button>Atualizar Perfil</Button></div>
                </div>
                <div className={`col-md-6 ${styles.graphContainer}`}>
                    <h4 className='fw-bold mb-5'>Gastos dos Últimos Pedidos</h4>
                    <ChartGraph graphDate = {createdAt} orderValue = {orderValue} />
                </div>
            </div>
        </>
    )
}