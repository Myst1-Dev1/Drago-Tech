import Head from 'next/head';
import styles from './styles.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
import { useUser } from '../../lib/customHooks';
import { deleteFavorite } from '../../services/graphql';
import { formatPrice } from '../../utils/useFormatPrice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export default function WishListPage() {
    const { user, setUser } = useUser();

    const [isLoading, setIsLoading] = useState(false);

    async function handleDeleteFavorite(id:any) {
        setIsLoading(true);

        try {
          const idObj = {
            id: id
          }

          await deleteFavorite(idObj);

          setUser((prevUser:any) => ({
            ...prevUser,
            favorites: prevUser.favorites.filter((favorite:any) => favorite.id !== id),
        }));

          setIsLoading(false);

          toast.success("Favorito deletado com sucesso", {
            position:toast.POSITION.TOP_RIGHT,
            theme:'colored'
          })
        } catch (error) {
          console.log('Deu erro ao tentar deletar o favorito', error);
          toast.error("Erro ao deletar o favorito", {
            position:toast.POSITION.TOP_RIGHT,
            theme:'colored'
          })
        }
      }

      const { user: currentUser } = useUser();
      useEffect(() => {
          setUser(currentUser);
      }, [currentUser]);

    return (
        <>
            <Head>
                <title>Lista de desejos | Drago Tech</title>
            </Head>

            <div className='container py-5'>
                <h2 className='fw-bold'>Lista de desejos</h2>
                {user === null ? 
                    <div className='py-5 d-flex justify-content-center align-items-center'>
                        <div className={`spinner-border`}></div>
                    </div> 
                : user &&
                <div className={`mt-5 table-responsive ${styles.wishListContainer}`}>
                    {isLoading ? 
                        <div className='py-5 d-flex justify-content-center align-items-center'>
                            <div className={`spinner-border`}></div> 
                        </div> 
                        :
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
                                {user?.favorites.map((favorite:any, index:number) => (
                                    <tr key={favorite.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            <div className={styles.imgContainer}>
                                                <img src={favorite.favoriteImage} alt="wishlist-product" />
                                            </div>
                                        </td>
                                        <td><h6>{favorite.favoriteName}</h6></td>
                                        <td className="fw-bold">
                                            {formatPrice(user?.prime === true ? 
                                                favorite.favoritePrice * 0.95 
                                                : favorite.favoritePrice)}
                                        </td>
                                        <td>
                                            <FaTrashAlt
                                                onClick={() => handleDeleteFavorite(favorite.id)} 
                                                className={`${styles.icon}`} 
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
                }
            </div>
        </>
    )
}