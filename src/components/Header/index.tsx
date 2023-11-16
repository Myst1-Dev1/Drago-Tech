import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { NavBar } from '../NavBar';
import styles from './styles.module.scss';
import { FaDragon, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { CartContext } from '../../services/hooks/useCart/useCart';
import { Search } from '../Search';
import { parseCookies } from 'nookies';
import { useUser } from '../../lib/customHooks';
import { UserBox } from '../UserBox';
import { useRouter } from 'next/router';

export function Header() {
    const { authenticated } = useUser();

    const router = useRouter();

    const { cart, setCart } = useContext(CartContext);

    const [isUserBoxOpen, setIsUserBoxOpen] = useState(false);

    function handleOpenUserBox() {
        setIsUserBoxOpen(!isUserBoxOpen);
    }

    useEffect(() => {
        const { 'cart-token': token } = parseCookies();

        if(token) {
            setCart(JSON.parse(token));
        }
    }, []);

    useEffect(() => {
        setIsUserBoxOpen(false);
    },[router.pathname]);

    return (
        <>
            <div className={`text-light w-100 ${styles.header}`}>
                <div className='d-flex wrap py-5 justify-content-between align-items-center container m-auto'>
                    <div className='d-flex gap-3 align-items-center'>
                        <h3>
                            <span className={`h3 ${styles.rose}`}>Drago</span> Tech
                        </h3>
                        <FaDragon className={`h3 ${styles.rose}`} />
                    </div>
                    <Search />
                    <div className={`d-flex gap-4 ${styles.headerIcons}`}>
                        <Link href="/wishlistPage" className='d-flex flex-column gap-3 justify-content-center align-items-center'>
                            <FaHeart className={styles.icon} />
                            <h6>Lista de desejos</h6>
                        </Link>
                        <Link className='d-flex flex-column gap-3 justify-content-center align-items-center' href="/cartPage">
                            <FaShoppingCart className={styles.icon} />
                            {cart?.length !== 0 ? 
                                <div className={`d-flex justify-content-center align-items-center ${styles.cartQuantity}`}>
                                    <span>{cart?.length}</span>
                                </div> 
                            : ''}
                            <h6>Seu carrinho</h6>
                        </Link>
                        {authenticated ? 
                            <div className={styles.userContainer}>
                                <div onClick={handleOpenUserBox} className={styles.imgContainer}>
                                    <img src="/images/imgUser.png" alt="icone de usuário" />
                                </div>
                               {isUserBoxOpen && <UserBox />}
                            </div>
                            :
                            <Link 
                                href="/signUpPage" 
                                className='d-flex flex-column gap-3 justify-content-center align-items-center'>
                                <FaUser className={styles.icon} />
                                <h6>Criar conta</h6>
                            </Link>
                        }
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    )
}