import { getProducts } from '../../../services/graphql';
import { Products } from '../../../types/Products';
import { useContext, createContext, ReactNode, useState, useEffect } from 'react';

interface ProductsContextData {
    products: Products[];
}

interface ProductsProviderProps {
    children: ReactNode
}

export const ProductsContext = createContext(
    {} as ProductsContextData
);

export function ProductsProvider({ children }: ProductsProviderProps) {
    const [products, setProducts] = useState<Products[]>([]);

    useEffect(() => {
        getProducts()
        .then((product) => setProducts(product));
    }, [products]);

    return (
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductsContext);

    return context;
}