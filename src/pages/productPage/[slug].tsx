import styles from './styles.module.scss';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Button } from '../../components/Button';
import { ProductDescription } from '../../components/ProductDescription';
import { ProductAvaliationForm } from '../../components/ProductAvaliationForm';
import { ProductAvaliations } from '../../components/ProductAvaliations';
import { getProducts, getProductsDetails, submitFavorite } from '../../services/graphql';
import { CartContext } from '../../services/hooks/useCart/useCart';
import { useUser } from '../../lib/customHooks';
import { formatPrice } from '../../utils/useFormatPrice';
import { toast } from 'react-toastify';

interface ProductPageProps {
    productDetail: [] | any
}

export default function ProductPage({ productDetail }: ProductPageProps) {
    const { handleAddToCart } = useContext(CartContext);

    const { user } = useUser();

    const productName = productDetail.map((product:any) => product.name);
    const favoriteName = user && user.favorites.find((favorite: any) =>
    favorite.favoriteName.toLowerCase() === productName[0].toLowerCase());

    const [isFavorite, setIsFavorite] = useState(!!favoriteName);

    const productValue = productDetail.map((product:any) => ({
        id:product.id,
        image:product.image.url,
        name:product.name,
        description:product.description,
        slug:product.slug,
        commentsID:product.commentsID,
        portionValue:product.portion,
        price: formatPrice(product.price),
        promotion: formatPrice(product.price * 0.95),
        portion: formatPrice(user?.prime ? ((product.price * 0.95) / product.portion) : 
        product.price / product.portion),
    }));

    async function handleCreateFavorite() {
        try {
            const favoriteName = productDetail.map((product: any) => product.name).join(', ');
            const favoritePrice = productDetail.map((product: any) => product.price);
            const favoriteImage = productDetail.map((product: any) => product.image.url);
            const email = user?.email;

            await submitFavorite({
                favoriteName: favoriteName,
                favoritePrice: parseFloat(favoritePrice),
                favoriteImage: favoriteImage[0],
                email,
            });

            setIsFavorite(true);
            toast.success("Item adicionado aos favoritos", {
                position:toast.POSITION.TOP_RIGHT,
                theme:'colored'
            })
            
        } catch (error) {
            console.log('Tivemos um erro', error);
            alert('Você precisa estar logado para ter favoritos');
        }
    };

    useEffect(() => {
        // Atualiza o estado local diretamente quando o nome do favorito muda
        setIsFavorite(!!favoriteName);
      }, [favoriteName]);

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
                                    {product.commentsID.length === 0 ? '' :
                                        <img src="/images/FiveStars.png" alt="fivestar-image" />}
                                        <span>({product.commentsID.length})</span>
                                    </div>
                                    <div>
                                        <FaHeart
                                            onClick={handleCreateFavorite} 
                                            className={isFavorite ? styles.favoriteProduct : styles.icon} 
                                        />
                                    </div>
                                </div>
                                <div className={`m-auto ${styles.imgContainer}`}>
                                    <img src={product.image} alt="product-image" />
                                </div>
                            </div>
                            <div className={`col-md-6 ${styles.priceBox}`}>
                                <h4 className='fw-bold'>
                                    {user?.prime === true ? product.promotion : product.price}
                                </h4>
                                <h6 className='mt-3'>Á vista com o Prime em até 5% OFF</h6>
                                <h6 className='mt-3'>{product.promotion}</h6>
                                <h6>Em até {product.portionValue}x 
                                de {product.portion} sem juros no cartão
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