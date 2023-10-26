import { Products } from '../../types/Products';
import { ProductBox } from '../ProductBox';
import styles from './styles.module.scss';

interface NewProductsProps {
    onProducts:Products[];
    onHandleAddToCart:(id:string) => void;
}

export function NewProducts({ onProducts, onHandleAddToCart }: NewProductsProps) {

    return (
        <div className={`mb-5 container ${styles.newProducts}`}>
            <h2 className='fw-bold'>Novos Produtos</h2>
            <div className='mt-5 m-auto row gap-5 justify-content-center align-items-center'>
                {onProducts?.map(product => (
                    <ProductBox
                        key={product?.node.id}
                        name={product?.node.name}
                        url={product?.node.image.url}
                        price={product?.node.price}
                        slug={product?.node.slug}
                        id={product?.node.id}
                        handleAddToCart={onHandleAddToCart}
                    />
                ))}
            </div>
        </div>
    )
}