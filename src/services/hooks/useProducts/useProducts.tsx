import { getProducts, getNewProducts } from '../../../services/graphql';
import { Products } from '../../../types/Products';
import { useContext, createContext, ReactNode, useState, useEffect } from 'react';

interface ProductsContextData {
    products: Products[];
    newProducts: Products[];
}

interface ProductsProviderProps {
    children: ReactNode
}

export const ProductsContext = createContext(
    {} as ProductsContextData
);

export function ProductsProvider({ children }: ProductsProviderProps) {
    const [products, setProducts] = useState<Products[]>([]);
    const [newProducts, setNewProducts] = useState<Products[]>([]);

    useEffect(() => {
        getProducts()
        .then((product) => setProducts(product));
    }, []);

    useEffect(() => {
        getNewProducts()
        .then((product) => setNewProducts(product));
    }, []);

    return (
        <ProductsContext.Provider value={{products, newProducts}}>
            {children}
        </ProductsContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductsContext);

    return context;
}