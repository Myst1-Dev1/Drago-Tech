import Link from 'next/link';
import Image from 'next/image';
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
                    <Image width={150} height={150} src='/images/laptopImage.webp' alt='coleção de laptops' />
                </div>
                <div className={`col-md-4 px-4 text-light d-flex gap-3 justify-content-center align-items-center 
                    ${styles.collectionBox}`}>
                    <div className='d-flex flex-column gap-3'>
                        <h5 className='fw-bold'>Coleção de Periféricos</h5>
                        <Link href="/shop"><h6>Compre Agora</h6></Link>
                    </div>
                    <Image width={150} height={150} src='/images/periphericsImage.webp' alt='coleção de perifericos'/>
                </div>
                <div className={`col-md-4 px-4 text-light d-flex gap-3 justify-content-center align-items-center 
                    ${styles.collectionBox}`}>
                    <div className='d-flex flex-column gap-3'>
                        <h5 className='fw-bold'>Coleção de Câmeras</h5>
                        <Link href="/shop"><h6>Compre Agora</h6></Link>
                    </div>
                    <Image width={150} height={150} src='/images/cameraImage.webp' alt='coleção de câmeras'/>
                </div>
            </div>
        </div>
    )
}