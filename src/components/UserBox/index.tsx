import styles from './styles.module.scss'
import Link from 'next/link'
import axios from 'axios';
import Image from 'next/image';

import { FaClipboardList, FaSignOutAlt, FaTimes, FaUserAlt } from 'react-icons/fa'
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { useUser } from '../../lib/customHooks';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../services/queryClient';

interface UserBoxProps {
    onsetIsUserBoxOpen:any;
    onIsUserBoxOpen:boolean
}

export function UserBox({ onIsUserBoxOpen ,onsetIsUserBoxOpen }: UserBoxProps) {
    const { user } = useUser();

    const router = useRouter();

    async function handleLogout() {
        try {
            const response = await axios({
                method:'delete',
                url:'/api/auth/signout',
            });

            destroyCookie(null, 'authenticated-cookie');
            router.push('/signInPage');

            console.log(response);
        } catch (error) {
            console.log('erro', error);
        }    
    }

    const mutation:any = useMutation({
        mutationFn:handleLogout,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['userData']})
        }
    })
    
    function handleCloseUserBox() {
        onsetIsUserBoxOpen(false);
    }
    
    return (
        <>
        {user &&
            <div className={`${onIsUserBoxOpen ? styles.userBox : styles.active}`}>
                <div className={`d-flex flex-column justify-content-between ${styles.userBoxContainer}`}>
                    <FaTimes onClick={handleCloseUserBox} className={styles.closeUserBoxIcon} />
                    <div>
                        <div className='d-flex align-items-center gap-3 mb-5'>
                            <div className={styles.imgContainer}>
                                <Image width={40} height={40} src="/images/imgUser.webp" alt="imagem do usuário logado" />
                            </div>
                            <h5 className='fw-bold'>{user.name}</h5>
                        </div>
                        <div className='d-flex flex-column gap-3'>
                            <div className='d-flex align-items-center gap-3'>
                                <FaUserAlt className={styles.icon} />
                                <Link href="/profile">Meu Perfil</Link>
                            </div>
                            <div className='d-flex align-items-center gap-3'>
                                <FaClipboardList className={styles.icon} />
                                <Link href="/orderPage">Meus Pedidos</Link>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex align-items-center gap-3'>
                        <FaSignOutAlt className={styles.icon} />
                        <h5 onClick={() => mutation.mutate({
                            id: Date.now(),
                            title: 'Logout user'
                        })} className='mb-0'>Sair</h5>
                    </div>
                </div>
            </div>
        }
        </>
    )
}