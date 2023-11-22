import styles from './styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { ProductBox } from '../../components/ProductBox';
import { FaEllipsisV, FaTimes } from 'react-icons/fa';
import { ProductsContext } from '../../services/hooks/useProducts/useProducts';
import { useTitle } from '../../utils/useTitle';
import { CartContext } from '../../services/hooks/useCart/useCart';
import { Products } from '../../types/Products';
import { CheckboxFilter } from '../../components/CheckboxFilter';
import { Pagination } from '../../components/Pagination';
import { PaginationContext } from '../../services/hooks/usePagination';

export default function Shop() {
    const { startIndex, endIndex } = useContext(PaginationContext);

    const [priceFilter, setPriceFilter] = useState(6000);
    const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
    const [responsiveFilter, setResponsiveFilter] = useState(false);

    const { products } = useContext(ProductsContext);
    const { handleAddToCart } = useContext(CartContext);

    const currentItens = filteredProducts.slice(startIndex, endIndex);

    function filterByPrice() {
        const priceFiltered = products.filter(product => product.node.price <= priceFilter);
        
        setFilteredProducts(priceFiltered);
    };

    function handleOpenResponsiveFilter() {
        setResponsiveFilter(true);
    }

    function handleCloseResponsiveFilter() {
        setResponsiveFilter(false);
    }

    useEffect(() => {
        filterByPrice();
    }, [priceFilter]);

    useTitle('Loja | Drago Tech')

    return (
        <>
            <div className={`px-5 py-5 ${styles.shop}`}>
                <div className={`d-flex gap-5 m-auto ${styles.shopContainer}`}>
                    <div className={responsiveFilter ? styles.overlay : ''}>
                        <div className={responsiveFilter ? `${styles.responsiveFilter}` : `${styles.filter}`}>
                            <div className='d-flex flex-column gap-2'>
                                <h5 className='fw-bold'>Preço</h5>
                                <h6>Intervalo de preço</h6>
                                <input
                                    name='rangeInput'
                                    type="range" 
                                    id='rangeInput'
                                    min={0} 
                                    max={6000} 
                                    value={priceFilter}
                                    onChange={e => setPriceFilter(Number(e.target.value))} 
                                />
                                    <span className='mt-2'>{Intl.NumberFormat('pt-br', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(priceFilter)}</span>
                            </div>
                            <CheckboxFilter onProducts={products} onSetFilteredProducts={setFilteredProducts} />
                            <FaTimes onClick={handleCloseResponsiveFilter} className={styles.closeResponsiveFilterIcon} />
                        </div>
                    </div>
                    <div className={`container ${styles.responsiveFilterButton}`}>
                        <FaEllipsisV onClick={handleOpenResponsiveFilter} />
                        <h6>Filtro</h6>
                    </div>
                    <div>
                        <div className='mt-5 m-auto row gap-5 justify-content-center align-items-center'>
                            {currentItens?.map((product:any) => (
                                <ProductBox
                                    key={product.node.id}
                                    name={product.node.name}
                                    url={product.node.image.url}
                                    price={product.node.price}
                                    slug={product.node.slug}
                                    id={product?.node.id}
                                    handleAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <Pagination 
                    data={filteredProducts}  
                />
            </div>
        </>
    )
}