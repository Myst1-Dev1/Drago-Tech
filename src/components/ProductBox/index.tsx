import Head from 'next/head';
import { Button } from '../Button';
import styles from './styles.module.scss';

interface ProductBoxProps {
    url:string;
    name:string;
    price:number;
    slug:string;
    id:string;
    handleAddToCart:(id:string) => void;
}

export function ProductBox({ url, name, price, slug, id, handleAddToCart }:ProductBoxProps) {

    return (
        <>
            <Head>
                <title>Loja</title>
            </Head>
            <div
                className={`col-md-4 d-flex justify-content-center align-items-center flex-column gap-3 
                ${styles.productBox}`}>
                <a className='d-flex justify-content-center align-items-center flex-column gap-3' 
                    href={`/productPage/${slug}`}
                >
                    <div className={styles.imgContainer}>
                        <img src={url} alt="product-image" />
                    </div>
                    <h6>{name}</h6>
                    <h5 className='fw-bold'>
                        {Intl.NumberFormat('pt-br', {
                            style:'currency',
                            currency:'BRL'
                        }).format(price)}
                    </h5>
                </a>
                <Button onClick={() => handleAddToCart(id)}>Adicionar ao carrinho</Button>
            </div>
        </>
    )
}