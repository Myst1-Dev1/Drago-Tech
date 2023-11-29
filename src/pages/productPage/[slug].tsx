import styles from './styles.module.scss';
import Head from 'next/head';
import { useContext } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Button } from '../../components/Button';
import { ProductDescription } from '../../components/ProductDescription';
import { ProductAvaliationForm } from '../../components/ProductAvaliationForm';
import { ProductAvaliations } from '../../components/ProductAvaliations';
import { getProducts, getProductsDetails, submitFavorite } from '../../services/graphql';
import { CartContext } from '../../services/hooks/useCart/useCart';
import { useUser } from '../../lib/customHooks';
import { formatPrice } from '../../utils/useFormatPrice';

interface ProductPageProps {
    productDetail: [] | any
}

export default function ProductPage({ productDetail }: ProductPageProps) {
    const { handleAddToCart } = useContext(CartContext);

    const { user } = useUser();

    const productValue = productDetail.map((product:any) => ({
        id:product.id,
        image:product.image.url,
        name:product.name,
        description:product.description,
        slug:product.slug,
        commentsID:product.commentsID,
        price: formatPrice(product.price),
        promotion: formatPrice(product.price * 0.95),
        portion: formatPrice(product.price / product.portion),
    }));

    async function handleCreateFavorite() {

        try {
            const favoriteName = productDetail.map((product: any) => product.name).join(', ');
            const favoritePrice = productDetail.map((product: any) => product.price);
            const favoriteImage = productDetail.map((product: any) => product.image.url);
            const email = user.email;

            const favoriteData = {
            favoriteName: favoriteName,
            favoritePrice: parseFloat(favoritePrice[0]),
            favoriteImage: favoriteImage[0],
            email: email,
            };

            await submitFavorite(favoriteData);
            alert('Produto adicionado ao favoritos com sucesso');
            
        } catch (error) {
            console.log('Tivemos um erro', error);
            alert('Você precisa estar logado para ter favoritos');
        }
    };
    
    const productName = productDetail.map((product:any) => product.name);
    const favoriteName = user && user.favorites.find((favorite: any) =>
    favorite.favoriteName.toLowerCase() === productName[0].toLowerCase());
   
    return (
        <>
            <Head>
                <title>Página do produto | Drago Tech</title>
            </Head>
            {productValue.map((product:any) => (
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
                                    <div>
                                        <FaHeart
                                            onClick={handleCreateFavorite} 
                                            className={favoriteName ? styles.favoriteProduct : styles.icon} 
                                        />
                                    </div>
                                </div>
                                <div className={`m-auto ${styles.imgContainer}`}>
                                    <img src={product.image} alt="product-image" />
                                </div>
                            </div>
                            <div className={`col-md-6 ${styles.priceBox}`}>
                                <h4 className='fw-bold'>{product.price}</h4>
                                <h6 className='mt-3'>Á vista com o Prime com até 5% OFF</h6>
                                <h6 className='mt-3'>{product.promotion}</h6>
                                <h6>Em até {product.portion}x 
                                de {product.price} sem juros no cartão
                                 </h6>
                                <h6 className='mb-5'>Ou em 1x no cartão com 5% OFF</h6>
                                <Button onClick={() => handleAddToCart(product.id)}>
                                    <div className='d-flex align-items-center justify-content-center gap-3'>
                                    <FaShoppingCart /> Comprar
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <ProductDescription name={product.name} description={product.description} />
                    <ProductAvaliationForm slug={product.slug} />
                    <ProductAvaliations comments ={product.commentsID} />
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