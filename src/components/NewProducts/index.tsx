import { useContext } from 'react';
import { ProductBox } from '../ProductBox';
import styles from './styles.module.scss';
import { ProductsContext } from '../../services/hooks/useProducts/useProducts';

interface NewProductsProps {
    onHandleAddToCart:(id:string) => void;
}

export function NewProducts({ onHandleAddToCart }: NewProductsProps) {
    const { products } = useContext(ProductsContext);

    const productData = products.slice(0, 6);

    return (
        <div className={`mb-5 container ${styles.newProducts}`}>
            <h2 className='fw-bold'>Novos Produtos</h2>
            <div className='mt-5 m-auto row gap-5 justify-content-center align-items-center'>
                {productData?.map(product => (
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