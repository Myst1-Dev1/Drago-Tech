import Head from 'next/head';
import styles from './styles.module.scss';
import { FaTrashAlt } from 'react-icons/fa';

export default function WishListPage() {
    return (
        <>
            <Head>
                <title>Lista de desejos | Drago Tech</title>
            </Head>

            <div className='container py-5'>
                <h2 className='fw-bold'>Lista de desejos</h2>

                <div className={`mt-5 table-responsive ${styles.wishListContainer}`}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col">Nome</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>
                                    <div className={styles.imgContainer}>
                                        <img src="/images/productImageExample.png" alt="wishlist-product" />
                                    </div>
                                </td>
                                <td>AMD Ryzen 5700</td>
                                <td className="fw-bold">R$:1.230,90</td>
                                <td><FaTrashAlt className={`${styles.icon}`} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}