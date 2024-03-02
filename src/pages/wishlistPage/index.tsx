import Head from 'next/head';
import Image from 'next/image';
import styles from './styles.module.scss';

import { FaTrashAlt } from 'react-icons/fa';
import { deleteFavorite } from '../../services/graphql';
import { formatPrice } from '../../utils/useFormatPrice';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../services/queryClient';
import { useContext, useState } from 'react';
import { UserContext } from '../../services/hooks/useUser/useUser';

export default function WishListPage() {
    const { user } = useContext(UserContext);
    const [isLoading , setIsLoading] = useState(false);

    async function handleDeleteFavorite(id:any) {
        setIsLoading(true)
        try {
          const idObj = {
            id: id
          }

          await deleteFavorite(idObj);

          toast.success("Favorito deletado com sucesso", {
            position:toast.POSITION.TOP_RIGHT,
            theme:'colored'
          })

          setIsLoading(false);
        } catch (error) {
          console.log('Deu erro ao tentar deletar o favorito', error);
          toast.error("Erro ao deletar o favorito", {
            position:toast.POSITION.TOP_RIGHT,
            theme:'colored'
          })
        }
      }

    const mutation:any = useMutation({
        mutationFn: handleDeleteFavorite,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['userData']})
        }
    })

    function handleClickToDelete(id:any) {
        mutation.mutate(id);
    }

    return (
        <>
            <Head>
                <title>Lista de desejos | Drago Tech</title>
            </Head>

            <div className='container py-5'>
                <h2 className='fw-bold'>Lista de desejos</h2>
                {isLoading ? 
                    <div className='py-5 d-flex justify-content-center align-items-center'>
                        <div className={`spinner-border`}></div>
                    </div> 
                : user &&
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
                            {user?.favorites.map((favorite:any, index:number) => (
                                <tr key={favorite.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <div className={styles.imgContainer}>
                                            <Image width={150} height={150} src={favorite.favoriteImage} alt="wishlist-product" />
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
                                            onClick={() => handleClickToDelete(favorite.id)} 
                                            className={`${styles.icon}`} 
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                }
            </div>
        </>
    )
}