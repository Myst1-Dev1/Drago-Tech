import styles from './styles.module.scss';
import Head from 'next/head';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Button } from '../../components/Button';
import { ProductDescription } from '../../components/ProductDescription';
import { ProductAvaliationForm } from '../../components/ProductAvaliationForm';
import { ProductAvaliations } from '../../components/ProductAvaliations';
import { getProducts, getProductsDetails } from '@/services/graphql';

interface ProductPageProps {
    productDetail: [] | any
}

export default function ProductPage({ productDetail }: ProductPageProps) {
    return (
        <>
            <Head>
                <title>Página do produto | Drago Tech</title>
            </Head>
            {productDetail.map((product:any) => (
                <div key={product.id}>
                    <div className={`mt-5 container ${styles.productPage}`}>
                        <h2 className='fw-bold'>{product.name}</h2>
                        <div className='mt-5 row align-items-center'>
                            <div className={`col-md-6 ${styles.productBox}`}>
                                <div className={`mb-5 d-flex justify-content-between align-items-center ${styles.avaliationBox}`}>
                                    <div className='d-flex align-items-center gap-2'>
                                        <img src="/images/FiveStars.png" alt="fivestar-image" />
                                        <span>(106)</span>
                                    </div>
                                    <FaHeart className={styles.icon} />
                                </div>
                                <div className={` ${styles.imgContainer}`}>
                                    <img src={product.image.url} alt="product-image" />
                                </div>
                            </div>
                            <div className={`col-md-6 ${styles.priceBox}`}>
                                <h4 className='fw-bold'>
                                    {Intl.NumberFormat('pt-br', {
                                        style:'currency',
                                        currency:'BRL'
                                    }).format(product.price)}
                                </h4>
                                <h6 className='mt-3'>Á vista no PIX com até 5% OFF</h6>
                                <h6 className='mt-3'>
                                    {Intl.NumberFormat('pt-br', {
                                        style:'currency',
                                        currency:'BRL'
                                    }).format(product.price * 0.95)}
                                </h6>
                                <h6>Em até {product.portion}x 
                                de {Intl.NumberFormat('pt-br', {
                                        style:'currency',
                                        currency:'BRL'
                                    }).format(product.price / product.portion)} sem juros no cartão
                                 </h6>
                                <h6 className='mb-5'>Ou em 1x no cartão com 5% OFF</h6>
                                <Button>
                                    <div className='d-flex align-items-center justify-content-center gap-3'>
                                    <FaShoppingCart /> Comprar
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <ProductDescription name={product.name} description={product.description} />
                    <ProductAvaliationForm />
                    <ProductAvaliations />
                </div>
            ))}
        </>
    )
}

export async function getStaticProps({ params }:any) {
    const data = await getProductsDetails(params.slug);

    console.log(data);

    return {
      props: {
        productDetail: data,
      },
    };
  }

export async function getStaticPaths() {
    const products = await getProducts();
    return {
      paths: products.map(({ node: { slug } }:any) => ({ params: { slug } })),
      fallback: true,
    };
  }