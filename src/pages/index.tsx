import Head from "next/head";
import { useState, useEffect } from 'react';

import { Header } from "../components/Header";

import styles from './styles.module.scss';
import { ProductsCollection } from "../components/ProductsCollection";
import { NewProducts } from "../components/NewProducts";
import { getProducts } from "../services/graphql";

type Products = {
    name:string;
    brand:string;
    id:string;
    portion:number;
    price:number;
    slug:string;
    type:string;
    image: {
        url:string;
    }
}

export default function Home() {
    const [products, setProducts] = useState<Products[]>([]);

    useEffect(() => {
        getProducts()
        .then((products) => setProducts(products.products));
    }, []);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header />

            <div className={styles.home}>
                <div className={`d-flex wrap text-light justify-content-center align-items-center 
                    ${styles.banner}`}>
                    <div className="col-md-6">
                        <img className="img-fluid" src="/images/bannerImage.png" alt="image-banner" />
                    </div>
                    <div className="d-flex flex-column gap-3 col-md-6">
                        <h3>Os Melhores Equipamentos <br /> Você Encontra Aqui</h3>
                        <button>Ver loja</button>
                    </div>
                </div>
            </div>
            <ProductsCollection />
            <NewProducts onProducts = {products} />
        </>
    )
}