import Head from 'next/head';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useUser } from '../../lib/customHooks';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { deleteFavorite } from '../../services/graphql';

export default function WishListPage() {
    const { user } = useUser();

    const router = useRouter();

    const { 'authenticated-cookie':authcookie } = parseCookies();

    async function handleDeleteFavorite(id:any) {
        try {
          const idObj = {
            id: id
          }

          await deleteFavorite(idObj);
          alert('Favorito deletado com sucesso');
        } catch (error) {
          console.log('Deu erro ao tentar deletar o favorito', error);
          alert('Erro ao deletar o favorito');
        }
      }

    useEffect(() => {
        if(!authcookie) {
            router.push('/signInPage');
        }
    },[]);

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
                        {user &&
                            <tbody>
                               {user.favorites.map((favorite:any, index:number) => (
                                    <tr key={favorite.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            <div className={styles.imgContainer}>
                                                <img src={favorite.favoriteImage} alt="wishlist-product" />
                                            </div>
                                        </td>
                                        <td><h6>{favorite.favoriteName}</h6></td>
                                        <td className="fw-bold">
                                            {Intl.NumberFormat('pt-br', {
                                                style:'currency',
                                                currency:'BRL'
                                            }).format(favorite.favoritePrice)}
                                        </td>
                                        <td>
                                            <FaTrashAlt
                                                onClick = {() => handleDeleteFavorite(favorite.id)} 
                                                className={`${styles.icon}`} 
                                            />
                                        </td>
                                    </tr>
                               ))}
                            </tbody>
                        }
                    </table>
                </div>
            </div>
        </>
    )
}