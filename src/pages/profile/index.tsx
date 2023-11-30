import styles from './styles.module.scss'
import Head from 'next/head';

import { useUser } from '../../lib/customHooks';

export default function Profile() {
    const { user } = useUser();

    console.log(user);

    return (
        <>
            <Head>
                <title>Perfil | Drago Tech</title>
            </Head>
            <div className={`container py-5 ${styles.profilePage}`}>
                <div className={`${styles.profileBox}`}>
                    <h4 className='fw-bold mb-5'>Perfil</h4>
                    <div className='d-flex align-items-center gap-3 mb-5'>
                        <div className={styles.imgContainer}>
                            <img src="/images/imgUser.png" alt="icone do usuário" />
                        </div>
                        <h5 className='fw-bold'>John Doe</h5>
                    </div>
                    <div className={`d-flex gap-3`}>
                        <h6 className='fw-bold'>Email:</h6>
                        <h6>johndoe@gmail.com</h6>
                    </div>
                    <div className={`d-flex gap-3`}>
                        <h6 className='fw-bold'>Telefone:</h6>
                        <h6>40028922</h6>
                    </div>
                </div>
            </div>
        </>
    )
}