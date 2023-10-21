import { Button } from '../Button';
import styles from './styles.module.scss';
import { FaCartPlus, FaPercentage, FaRocket } from 'react-icons/fa';

export function PrimeDetails() {
    return (
        <div className={`text-light container-fluid d-flex gap-3 flex-column justify-content-center align-items-center mb-5 
            ${styles.primeDetails}`}>
            <h2 className='fw-bold'>Assine o prime e se torne um dragão</h2>
            <h2 className='fw-bold'>Confira os beneficios</h2>
            <div className='d-flex wrap gap-5 py-3'>
                <div className={`d-flex flex-column justify-content-center align-items-center gap-3 
                    ${styles.primeBox}`}>
                    <FaCartPlus className={styles.icon} />
                    <h6>Promoções <br /> exclusivas</h6>
                </div>
                <div className={`d-flex flex-column justify-content-center align-items-center gap-3 
                    ${styles.primeBox}`}>
                    <FaPercentage className={styles.icon} />
                    <h6>Desconto <br /> no frete</h6>
                </div>
                <div className={`d-flex flex-column justify-content-center align-items-center gap-3 
                    ${styles.primeBox}`}>
                    <FaRocket className={styles.icon} />
                    <h6>Entrega <br /> mais rapida</h6>
                </div>
            </div>
            <Button>Quero ser Prime</Button>
        </div>
    )
}