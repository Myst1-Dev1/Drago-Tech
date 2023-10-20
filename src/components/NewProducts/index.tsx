import styles from './styles.module.scss';

interface NewProductsProps {
    onProducts:any;
}

export function NewProducts({ onProducts }: NewProductsProps) {
    const newProductsData = onProducts.slice(0, 6);

    return (
        <div className={`mb-5 container ${styles.newProducts}`}>
            <h2 className='fw-bold'>Novos Produtos</h2>
            <div className='mt-5 m-auto row gap-5 justify-content-center align-items-center'>
                {newProductsData.map((product:any) => (
                    <div key={product.id} 
                        className={`col-md-4 d-flex justify-content-center align-items-center flex-column gap-3 
                        ${styles.productBox}`}>
                        <a className='d-flex justify-content-center align-items-center flex-column gap-3' 
                            href=""
                        >
                            <div className={styles.imgContainer}>
                                <img src={product.image.url} alt="product-image" />
                            </div>
                            <h6>{product.name}</h6>
                            <h5 className='fw-bold'>
                                {Intl.NumberFormat('pt-br', {
                                    style:'currency',
                                    currency:'BRL'
                                }).format(product.price)}
                            </h5>
                        </a>
                        <button>Adicionar ao carrinho</button>
                    </div>
                ))}
            </div>
        </div>
    )
}