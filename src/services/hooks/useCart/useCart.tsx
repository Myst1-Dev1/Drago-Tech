import { useContext, useState, createContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { ProductsContext } from '../useProducts/useProducts';
import { CartProducts } from '../../../types/CartProducts';
import { useRouter } from 'next/router';
import { setCookie, destroyCookie } from 'nookies';

interface CartProductsData {
    cart: CartProducts[];
    setCart:Dispatch<SetStateAction<CartProducts[]>>;
    handleAddToCart:(id:string) => void;
    handleReduceItemQuantity:(id:string) => void;
    handleRemoveItemToCart:(id:string) => void;
    handleCleanCart:() => void;
    totalCart:number | any;
};

interface CartProviderProps {
    children: ReactNode
};

export const CartContext = createContext(
    {} as CartProductsData
);

export function CartProvider({ children }:CartProviderProps) {
    const [ cart, setCart ] = useState<CartProducts[]>([]);

    const router = useRouter();

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
    
        router.push('/cartPage');
        setCookie(undefined, 'cart-token', JSON.stringify(newCart), {
            maxAge:60 * 60 * 1 // 1 hour
        })
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
        setCookie(undefined, 'cart-token', JSON.stringify(newCart));
        setCart(newCart);
    }

    function handleCleanCart() {
        setCart([]);
        destroyCookie(null, 'cart-token');
    }

    return (
        <CartContext.Provider value={{ 
                cart,
                setCart,
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