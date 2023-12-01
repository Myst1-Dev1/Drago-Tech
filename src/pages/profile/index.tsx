import styles from './styles.module.scss'
import Head from 'next/head';

import { useUser } from '../../lib/customHooks';
import { Button } from '../../components/Button';
import { ChartGraph } from '../../components/ChartGraph';
import { ProfileForm } from '../../components/ProfileForm';
import { useState } from 'react';

export default function Profile() {
    const { user } = useUser();

    const [isUpdateUserProfileOpen, setIsUpdateUserProfileOpen] = useState(false);

    const createdAt = user?.orders?.map((order:any) => new Date(order?.createdAt).toLocaleDateString('pt-BR', {month: 'long'}));

    const orderValue = user?.orders?.map((order:any) => order?.orderTotalPrice);

    console.log(orderValue);

    function handleOpenUpdateUserProfile() {
        setIsUpdateUserProfileOpen(!isUpdateUserProfileOpen);
    }

    return (
        <>
            <Head>
                <title>Perfil | Drago Tech</title>
            </Head>
            {user === null ? 'carregando' : user &&
            <div className={`row m-auto container mt-5 ${styles.profilePage}`}>
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
                            <h6>{user.email}</h6>
                        </div>
                        <div className={`d-flex justify-content-between`}>
                            <h6 className='fw-bold'>Telefone:</h6>
                            <h6>{user.phone}</h6>
                        </div>
                        <div className={`d-flex justify-content-between`}>
                            <h6 className='fw-bold'>Estado:</h6>
                            <h6>{user.state}</h6>
                        </div>
                        <div className={`d-flex justify-content-between`}>
                            <h6 className='fw-bold'>Cidade:</h6>
                            <h6>{user.city}</h6>
                        </div>
                        <div className={`d-flex justify-content-between`}>
                            <h6 className='fw-bold'>Endereço:</h6>
                            <h6>{user.address}</h6>
                        </div>
                        <div className={`d-flex justify-content-between`}>
                            <h6 className='fw-bold'>CEP:</h6>
                            <h6>{user.zipCode}</h6>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <Button onClick={handleOpenUpdateUserProfile}>Atualizar Perfil</Button>
                    </div>
                </div>
                <div className={`col-md-6 ${styles.graphContainer}`}>
                    <h4 className='fw-bold mb-5'>Gastos dos Últimos Pedidos</h4>
                    <ChartGraph graphDate = {createdAt} orderValue = {orderValue} />
                </div>
            </div>}
            {isUpdateUserProfileOpen && <ProfileForm />}
        </>
    )
}