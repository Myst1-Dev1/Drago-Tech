import Link from 'next/link';
import styles from './styles.module.scss';

export function ProductsCollection() {
    return (
        <div className={`mb-5 ${styles.productCollections}`}>
            <div className='row justify-content-center gap-5 align-items-center m-auto'>
                <div className={`col-md-4 px-4 text-light d-flex gap-3 justify-content-center align-items-center 
                    ${styles.collectionBox}`}>
                    <div className='d-flex flex-column gap-3'>
                        <h5 className='fw-bold'>Coleção de Laptops</h5>
                        <Link href="/shop"><h6>Compre Agora</h6></Link>
                    </div>
                    <img src='/images/laptopImage.png' />
                </div>
                <div className={`col-md-4 px-4 text-light d-flex gap-3 justify-content-center align-items-center 
                    ${styles.collectionBox}`}>
                    <div className='d-flex flex-column gap-3'>
                        <h5 className='fw-bold'>Coleção de Periféricos</h5>
                        <Link href="/shop"><h6>Compre Agora</h6></Link>
                    </div>
                    <img src='/images/periphericsImage.png' />
                </div>
                <div className={`col-md-4 px-4 text-light d-flex gap-3 justify-content-center align-items-center 
                    ${styles.collectionBox}`}>
                    <div className='d-flex flex-column gap-3'>
                        <h5 className='fw-bold'>Coleção de Câmeras</h5>
                        <Link href="/shop"><h6>Compre Agora</h6></Link>
                    </div>
                    <img src='/images/cameraImage.png' />
                </div>
            </div>
        </div>
    )
}