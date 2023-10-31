import styles from './styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { ProductBox } from '../../components/ProductBox';
import { FaEllipsisV } from 'react-icons/fa';
import { ProductsContext } from '../../services/hooks/useProducts/useProducts';
import { useTitle } from '../../utils/useTitle';
import { CartContext } from '../../services/hooks/useCart/useCart';
import { Products } from '../../types/Products';
import { CheckboxFilter } from '../../components/CheckboxFilter';
import { Pagination } from '../../components/Pagination';

export default function Shop() {
    const [priceFilter, setPriceFilter] = useState(6000);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

    const { products } = useContext(ProductsContext);
    const { handleAddToCart } = useContext(CartContext);

    const itensPerPage = 6;
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = filteredProducts.slice(startIndex, endIndex);

    function filterByPrice() {
        const priceFiltered = products.filter(product => product.node.price <= priceFilter);
        
        setFilteredProducts(priceFiltered);
    };

    useEffect(() => {
        filterByPrice();
    }, [priceFilter]);

    useTitle('Loja | Drago Tech')

    return (
        <>
            <div className={`px-5 py-5 ${styles.shop}`}>
                <div className={`d-flex gap-3 m-auto ${styles.shopContainer}`}>
                    <div className={`${styles.filter}`}>
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
                    </div>
                    <div className={`${styles.responsiveFilterButton}`}>
                            <FaEllipsisV />
                            <h5 className='mb-0'>Filtro</h5>
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
                    onItensPerPage={itensPerPage} 
                    onCurrentPage={currentPage}
                    onSetCurrentPage={setCurrentPage}
                />
            </div>
        </>
    )
}