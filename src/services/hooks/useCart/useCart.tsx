import { useContext, useState, createContext, ReactNode } from 'react';
import { ProductsContext } from '../useProducts/useProducts';
import { CartProducts } from '../../../types/CartProducts';

interface CartProductsData {
    cart: CartProducts[];
    handleAddToCart:(id:string) => void;
    handleReduceItemQuantity:(id:string) => void;
    handleRemoveItemToCart:(id:string) => void;
    handleCleanCart:() => void;
    totalCart:number;
};

interface CartProviderProps {
    children: ReactNode
};

export const CartContext = createContext(
    {} as CartProductsData
);

export function CartProvider({ children }:CartProviderProps) {
    const [ cart, setCart ] = useState<CartProducts[]>([]);

    const totalCart = cart.reduce((total, current) => {
        return total + (current.product.node.price * current.quantity)
    }, 0);

    const { products } = useContext(ProductsContext);

    function handleAddToCart(id:string) {
        const productItem = products.find(product => product.node.id === id);

        const alreadyInCart = cart.find(item => item.product.node.id === id);
    
        const newCart = alreadyInCart
            ? cart.map(item => (item.product.node.id === id ? { ...item, quantity: item.quantity + 1 } : item))
            : [...cart, { product: productItem!, quantity: 1 }];
    
        setCart(newCart);
    };

    function handleReduceItemQuantity(id:string) {
        const alreadyInCart = cart.find(item => item.product.node.id === id);

        const newCart = alreadyInCart!.quantity > 1 
        ? cart.map(item => (item.product.node.id === id) ? {...item, quantity: item.quantity - 1} : item)
        : [...cart];

        setCart(newCart);
    };

    function handleRemoveItemToCart(id:string) {
        const newCart:CartProducts[] = cart.filter(item => item.product.node.id !== id);
        setCart(newCart);
    }

    function handleCleanCart() {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ 
                cart, 
                handleAddToCart, 
                handleReduceItemQuantity,
                handleRemoveItemToCart,
                handleCleanCart,
                totalCart 
                }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);

    return context;
}