import styles from './styles.module.scss';
import Head from 'next/head';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Button } from '../../components/Button';
import { ProductDescription } from '../../components/ProductDescription';
import { ProductAvaliationForm } from '../../components/ProductAvaliationForm';
import { ProductAvaliations } from '../../components/ProductAvaliations';

export default function ProductPage() {
    // const router = useRouter();

    // const { slug } = router.query;

    return (
        <>
            <Head>
                <title>Página do produto | Drago Tech</title>
            </Head>
            <div className={`mt-5 container ${styles.productPage}`}>
                <h2 className='fw-bold'>
                    Processador AMD Ryzen 7 5700X, 3.4GHz (4.6GHz Max Turbo), Cache 36MB,
                    AM4, Sem Vídeo - 100-100000926WOF
                </h2>
                <div className='mt-5 row align-items-center'>
                    <div className={`col-md-6 ${styles.productBox}`}>
                        <div className={`d-flex justify-content-between align-items-center ${styles.avaliationBox}`}>
                            <div className='d-flex align-items-center gap-2'>
                                <img src="/images/FiveStars.png" alt="fivestar-image" />
                                <span>(106)</span>
                            </div>
                            <FaHeart className={styles.icon} />
                        </div>
                        <div className={` ${styles.imgContainer}`}>
                            <img src="/images/productImageExample.png" alt="product-image" />
                        </div>
                    </div>
                    <div className={`col-md-6 ${styles.priceBox}`}>
                        <h4 className='fw-bold'>R$ 1.248,99</h4>
                        <h6 className='mt-3'>Á vista no PIX com até 5% OFF</h6>
                        <h6 className='mt-3'>R$ 1.314,73</h6>
                        <h6>Em até 10x de R$ 131,47 sem juros no cartão</h6>
                        <h6 className='mb-5'>Ou em 1x no cartão com 5% OFF</h6>
                        <Button>
                            <div className='d-flex align-items-center justify-content-center gap-3'>
                            <FaShoppingCart /> Comprar
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <ProductDescription />
            <ProductAvaliationForm />
            <ProductAvaliations />
        </>
    )
}