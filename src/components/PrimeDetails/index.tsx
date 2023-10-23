import { Button } from '../Button';
import styles from './styles.module.scss';

export function PrimeDetails() {
    return (
        <div className={`text-light container-fluid d-flex gap-3 flex-column justify-content-center align-items-center mb-5 
            ${styles.primeDetails}`}>
            <h2 className='fw-bold'>Conheça Nosso Prime e Tenha</h2>
            <h2 className='fw-bold'>Descontos Exclusivos</h2>
            <Button>Quero ser Prime</Button>
        </div>
    )
}