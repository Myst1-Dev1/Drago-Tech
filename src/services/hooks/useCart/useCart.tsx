import { useContext, useState, createContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { ProductsContext } from '../useProducts/useProducts';
import { CartProducts } from '../../../types/CartProducts';
import { useRouter } from 'next/router';
import { setCookie, destroyCookie } from 'nookies';
import { useUser } from '../../../lib/customHooks';
import { toast } from 'react-toastify';

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
    const { user } = useUser();

    const [ cart, setCart ] = useState<CartProducts[]>([]);

    const router = useRouter();

    const totalCart = cart.reduce((total, current) => {
        const productPrice = user?.prime ? current.product.node.price * 0.95 : current.product.node.price;
        return total + productPrice * current.quantity;
    }, 0).toFixed(2);

    const { products } = useContext(ProductsContext);

    function handleAddToCart(id:string) {
        const productItem = products.find(product => product.node.id === id);

        const alreadyInCart = cart.find(item => item.product.node.id === id);
    
        const newCart = alreadyInCart
            ? cart.map(item => (item.product.node.id === id ? { ...item, quantity: item.quantity + 1 } : item))
            : [...cart, { product: productItem!, quantity: 1 }];
    
        setCookie(undefined, 'cart-token', JSON.stringify(newCart), {
            maxAge:60 * 60 * 1 // 1 hour
        })
        setCart(newCart);

        toast.success("Item adicionado ao carrinho", {
            position:toast.POSITION.TOP_RIGHT,
            theme:'colored'
        })
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