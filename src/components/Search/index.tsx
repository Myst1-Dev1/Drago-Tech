import styles from './styles.module.scss';

import { FaSearch } from 'react-icons/fa';
import { useState, useContext, useEffect } from 'react';
import { ProductsContext } from '../../services/hooks/useProducts/useProducts';
import { Products } from '../../types/Products';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Search() {
    const { data } = useContext(ProductsContext);

    const router = useRouter();

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<Products[]>([]);

    function searchProducts() {
        if(search !== '') {
            const filteredProducts = data.filter((e:Products) => 
            e.node.name.toLowerCase().includes(search.toLowerCase()))

            setFilter(filteredProducts);
        } else {
            setFilter(data);
        };
    };

    useEffect(() => {
        searchProducts();
        // eslint-disable-next-line
    }, [search]); 

    return (
        <div className={`${styles.searchContainer}`}>
            <div className={`d-flex justify-content-between align-items-center
                ${styles.inputBox}`}>
                <input 
                    type="text" 
                    placeholder='Pesquisar ...'
                    value={search}
                    onChange={e => setSearch(e.target.value)} 
                />
                <FaSearch className = {styles.icon} />
            </div>
            {search !== '' ? 
                <div className={`${styles.searchContentContainer}`}>
                    {filter?.map(products => (
                        <Link onClick={() => setSearch('')} key={products.node.id}  href={`/productPage/${products.node.slug}`}>
                            <div
                                className={`d-flex align-items-center gap-2 ${styles.searchContent}`}>
                                <div className={styles.imgContainer}>
                                    <img src={products.node.image.url} alt="search-product-image" />
                                </div>
                                <span>{products.node.name}</span>
                            </div> 
                        </Link>
                    ))}
                </div>
            : ''}
        </div>
    )
}