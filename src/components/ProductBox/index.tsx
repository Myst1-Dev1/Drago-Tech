import { Button } from '../Button';
import styles from './styles.module.scss';

interface ProductBoxProps {
    url:string;
    name:string;
    price:number;
    slug:string;
}

export function ProductBox({ url, name, price, slug }:ProductBoxProps) {
    return (
        <div
            className={`col-md-4 d-flex justify-content-center align-items-center flex-column gap-3 
            ${styles.productBox}`}>
            <a className='d-flex justify-content-center align-items-center flex-column gap-3' 
                href=""
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
            <Button>Adicionar ao carrinho</Button>
        </div>
    )
}