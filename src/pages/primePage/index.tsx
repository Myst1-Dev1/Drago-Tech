import { FaPercent, FaRocket, FaTicketAlt } from 'react-icons/fa';
import styles from './styles.module.scss';
import { Button } from '../../components/Button';
import Head from 'next/head';

export default function PrimePage() {
    return (
        <>
            <Head>
                <title>Prime | Drago Tech</title>
            </Head>
            <div className={`row p-0 m-0 align-items-center ${styles.primeContainer}`}>
                <div className={`col-md-6 text-light d-flex flex-column justify-content-center align-items-center gap-3 m-auto container py-5 ${styles.primeSubtitles}`}>
                    <h2 className='fw-bold'>Seja Prime na <br /> Drago Tech</h2>
                    <p>
                        Assine o nosso prime e tenha descontos em nossos produtos
                        confirá abaixo os beneficios de ser prime
                    </p>
                    <div className='mt-4 mb-4 d-flex wrap gap-5'>
                        <div className={`d-flex flex-column gap-3 justify-content-center align-items-center ${styles.primeBenefitBox}`}>
                            <FaPercent className={styles.icon} />
                            <h6>Descontos <br /> Exclusivos</h6>
                        </div>
                        <div className={`d-flex flex-column gap-3 justify-content-center align-items-center ${styles.primeBenefitBox}`}>
                            <FaRocket className={styles.icon} />
                            <h6>Entrega <br /> Ágil</h6>
                        </div>
                        <div className={`d-flex flex-column gap-3 justify-content-center align-items-center ${styles.primeBenefitBox}`}>
                            <FaTicketAlt className={styles.icon} />
                            <h6>Cupoms <br /> Extra</h6>
                        </div>
                    </div>
                    <h2 className='fw-bold'>TA ESPERANDO O QUE?</h2>
                    <h5 className='fw-bold'>Assine Já !</h5>
                    <h5 className='fw-bold'>R$: 19,90</h5>
                    <Button>Quero ser Prime</Button>
                </div>
                <div className='text-light col-md-6'>
                    <div className={styles.imgContainer}>
                        <img src="/images/primeImage.png" alt="primePage-image" />
                    </div>
                </div>
            </div>
        </>
    )
}