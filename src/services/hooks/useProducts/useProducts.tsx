import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../services/graphql';
import { Products } from '../../../types/Products';
import { useContext, createContext, ReactNode } from 'react';

interface ProductsContextData {
    isLoading:boolean;
    data:any;
}

interface ProductsProviderProps {
    children: ReactNode
}

export const ProductsContext = createContext(
    {} as ProductsContextData
);

export function ProductsProvider({ children }: ProductsProviderProps) {

    async function getProductsData() {
        const products = await getProducts();
        return products;
    }

    const { data, isLoading } = useQuery<Products[]>({
        queryKey: ['products'],
        queryFn: getProductsData
    });

    return (
        <ProductsContext.Provider value={{data, isLoading}}>
            {children}
        </ProductsContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductsContext);

    return context;
}