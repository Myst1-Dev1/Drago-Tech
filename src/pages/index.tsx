import Head from "next/head";

import styles from './styles.module.scss';
import { ProductsCollection } from "../components/ProductsCollection";
import { NewProducts } from "../components/NewProducts";
import { getProducts } from "../services/graphql";
import { Products } from "../types/Products";
import { PrimeDetails } from "../components/PrimeDetails";
import { Button } from "../components/Button";
import { MostSaledProducts } from "../components/MostSaledProducts";
import { GetStaticProps } from "next";

interface HomeProps {
    products: Products[];
}

export default function Home({ products }: HomeProps) {
    return (
        <>
            <Head>
                <title>Início | Drago Tech</title>
            </Head>
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
            <NewProducts onProducts = {products} />
            <PrimeDetails />
            <MostSaledProducts onProducts = {products} />
        </>
    )
}

export const getStaticProps:GetStaticProps = async () => {
    const products = (await getProducts()) || [];

    console.log(products);
    
    return {
      props: { products }
    }
  }