import { Products } from '../../types/Products';
import { ProductBox } from '../ProductBox';
import styles from './styles.module.scss';

interface MostSaledProductsProps {
    onProducts: Products[];
}

export function MostSaledProducts({ onProducts }: MostSaledProductsProps) {

    return (
        <div className={`mb-5 container ${styles.newProducts}`}>
            <h2 className='fw-bold'>Produtos Mais Vendidos</h2>
            <div className='mt-5 m-auto row gap-5 justify-content-center align-items-center'>
                {onProducts.map(product => (
                    <ProductBox
                        key={product?.node.id}
                        name={product?.node.name}
                        url={product?.node.image.url}
                        price={product?.node.price}
                        slug={product?.node.slug}
                    />
                ))}
            </div>
        </div>
    )
}