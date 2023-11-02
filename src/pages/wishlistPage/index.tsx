import Head from 'next/head';
import styles from './styles.module.scss';

export default function WishListPage() {
    return (
        <>
            <Head>
                <title>Lista de desejos | Drago Tech</title>
            </Head>

            <div className='container py-5'>
                <h2 className='fw-bold'>Lista de desejos</h2>
            </div>
        </>
    )
}