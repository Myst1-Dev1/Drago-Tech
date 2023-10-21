import { Products } from '../../types/Products';
import { ProductBox } from '../ProductBox';
import styles from './styles.module.scss';

interface NewProductsProps {
    onProducts:Products[];
}

export function NewProducts({ onProducts }: NewProductsProps) {
    const newProductsData = onProducts.slice(0, 6);

    return (
        <div className={`mb-5 container ${styles.newProducts}`}>
            <h2 className='fw-bold'>Novos Produtos</h2>
            <div className='mt-5 m-auto row gap-5 justify-content-center align-items-center'>
                {newProductsData.map(product => (
                    <ProductBox
                        key={product.id}
                        name={product.name}
                        url={product.image.url}
                        price={product.price}
                        slug={product.slug}
                    />
                ))}
            </div>
        </div>
    )
}