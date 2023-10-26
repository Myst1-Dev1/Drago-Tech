import styles from './styles.module.scss';
import { useContext, useState } from 'react';
import { ProductBox } from '../../components/ProductBox';
import { FaEllipsisV, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ProductsContext } from '../../services/hooks/useProducts/useProducts';
import { useTitle } from '../../utils/useTitle';
import { CartContext } from '@/services/hooks/useCart/useCart';

export default function Shop() {
    const [priceFilter, setPriceFilter] = useState(6000);

    const { products } = useContext(ProductsContext);
    const { handleAddToCart } = useContext(CartContext);

    useTitle('Loja | Drago Tech')

    return (
        <>
            <div className={`px-5 py-5 ${styles.shop}`}>
                <div className={`d-flex m-auto ${styles.shopContainer}`}>
                    <div className={`${styles.filter}`}>
                        <div className='d-flex flex-column gap-2'>
                            <h5 className='fw-bold'>Preço</h5>
                            <h6>Intervalo de preço</h6>
                            <input
                                name='rangeInput'
                                type="range" 
                                id='rangeInput'
                                min={0} 
                                max={6000} 
                                value={priceFilter}
                                onChange={e => setPriceFilter(Number(e.target.value))} 
                            />
                                <span className='mt-2'>{Intl.NumberFormat('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(priceFilter)}</span>
                        </div>
                        <div className='mt-4'>
                            <h5 className='fw-bold'>Marcas</h5>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='redragon-mark' />
                                <label htmlFor="redragon-mark">Redragon</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='hyperX-mark' />
                                <label htmlFor="hyperX-mark">HyperX</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='sony-mark' />
                                <label htmlFor="sony-mark">Sony</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='lg-mark' />
                                <label htmlFor="lg-mark">LG</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='canon-mark' />
                                <label htmlFor="canon-mark">Canon</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='multilaser-mark' />
                                <label htmlFor="multilaser-mark">Multilaser</label>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <h5 className='fw-bold'>Categorias</h5>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='keyboard-category' />
                                <label htmlFor="keyboard-category">Teclado</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='mouse-category' />
                                <label htmlFor="mouse-category">Mouse</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='monitor-category' />
                                <label htmlFor="monitor-category">Monitor</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='mousePad-Category' />
                                <label htmlFor="mousePad-Category">MousePad</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='notebook-category' />
                                <label htmlFor="notebook-category">Notebook</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='tv-category' />
                                <label htmlFor="tv-category">TV</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='phone-category' />
                                <label htmlFor="phone-category">Celular</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='camera-category' />
                                <label htmlFor="camera-category">Câmera</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='eletrodomestic-category' />
                                <label htmlFor="eletrodomestic-category">Eletrodoméstico</label>
                            </div>
                            <div className='d-flex gap-3 mt-3'>
                                <input type="checkbox" id='hardware-category' />
                                <label htmlFor="hardware-category">Hardware</label>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.responsiveFilterButton}`}>
                        <FaEllipsisV />
                        <h5 className='mb-0'>Filtro</h5>
                    </div>
                    <div>
                        <div className='mt-5 m-auto row gap-5 justify-content-center align-items-center'>
                            {products?.map((product:any) => (
                                <ProductBox
                                    key={product.node.id}
                                    name={product.node.name}
                                    url={product.node.image.url}
                                    price={product.node.price}
                                    slug={product.node.slug}
                                    id={product?.node.id}
                                    handleAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`d-flex gap-3 justify-content-center align-items-center mt-5 ${styles.pagination}`}>
                    <button><FaArrowLeft /></button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button><FaArrowRight /></button>
                </div>
            </div>
        </>
    )
}