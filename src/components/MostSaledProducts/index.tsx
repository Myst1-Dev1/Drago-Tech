import { Products } from '../../types/Products';
import { ProductBox } from '../ProductBox';
import styles from './styles.module.scss';

interface MostSaledProductsProps {
    onProducts: Products[];
}

export function MostSaledProducts({ onProducts }: MostSaledProductsProps) {
    const mostSaledProductsData = onProducts.slice(6, 12);

    return (
        <div className={`mb-5 container ${styles.newProducts}`}>
            <h2 className='fw-bold'>Produtos Mais Vendidos</h2>
            <div className='mt-5 m-auto row gap-5 justify-content-center align-items-center'>
                {mostSaledProductsData.map(product => (
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