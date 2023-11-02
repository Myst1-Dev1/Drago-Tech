import styles from './styles.module.scss';
import { ProductsCollection } from "../components/ProductsCollection";
import { NewProducts } from "../components/NewProducts";
import { PrimeDetails } from "../components/PrimeDetails";
import { Button } from "../components/Button";
import { MostSaledProducts } from "../components/MostSaledProducts";
import { useContext } from "react";
import { ProductsContext } from "../services/hooks/useProducts/useProducts";
import { useTitle } from "../utils/useTitle";
import { CartContext } from '../services/hooks/useCart/useCart';

export default function Home() {
    const { newProducts } = useContext(ProductsContext);
    const { handleAddToCart } = useContext(CartContext);

    useTitle('Início Drago | Tech');

    return (
        <>
            <div className={styles.home}>
                <div className={`d-flex wrap text-light justify-content-center align-items-center 
                    ${styles.banner}`}>
                    <div className="col-md-6">
                        <img className="img-fluid" src="/images/bannerImage.png" alt="image-banner" />
                    </div>
                    <div className="d-flex flex-column gap-3 col-md-6">
                        <h3>Os Melhores Equipamentos <br /> Você Encontra Aqui</h3>
                        <Button>Ver loja</Button>
                    </div>
                </div>
            </div>
            <ProductsCollection />
            <NewProducts onProducts = {newProducts} onHandleAddToCart = {handleAddToCart} />
            <PrimeDetails />
            <MostSaledProducts onProducts = {newProducts} onHandleAddToCart = {handleAddToCart} />
        </>
    )
}