import Head from 'next/head';
import { Button } from '../Button';
import styles from './styles.module.scss';
import { formatPrice } from '../../utils/useFormatPrice';
import { useUser } from '../../lib/customHooks';
import Link from 'next/link';

interface ProductBoxProps {
    url:string;
    name:string;
    price:number;
    slug:string;
    id:string;
    handleAddToCart:(id:string) => void;
}

export function ProductBox({ url, name, price, slug, id, handleAddToCart }:ProductBoxProps) {
    const { user } = useUser();

    const primeValue = user?.prime === true ? price * 0.95 : price;

    return (
        <>
            <Head>
                <title>Loja</title>
            </Head>
            <div
                className={`col-md-4 d-flex justify-content-center align-items-center flex-column gap-3 
                ${styles.productBox}`}>
                <Link className='d-flex justify-content-center align-items-center flex-column gap-3' 
                    href={`/productPage/${slug}`}
                >
                    <div className={styles.imgContainer}>
                        <img src={url} alt="product-image" />
                    </div>
                    <h6>{name}</h6>
                    <h5 className='fw-bold'>{formatPrice(primeValue)}</h5>
                </Link>
                <Button onClick={() => handleAddToCart(id)}>Adicionar ao carrinho</Button>
            </div>
        </>
    )
}