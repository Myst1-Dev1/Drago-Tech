import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import styles from './styles.module.scss';

export function ProductAvaliations() {
    return (
        <div className={`container ${styles.productAvaliations}`}>
            <div className={`d-flex align-items-center gap-3 ${styles.subTitle}`}>
                <FaStar className={styles.icon} />
                <h5 className='fw-bold mb-0'>Avaliação dos usuários</h5>
            </div>
            <div className={`row justify-content-between mt-5 ${styles.avaliationsContainer}`}>
                <div className={`col-md-6 d-flex flex-column gap-3 ${styles.avaliationBox}`}>
                    <h6 className='fw-bold mb-0'>Anônimo</h6>
                    <div>
                        <img src="/images/FiveStars.png" alt="five-star-avaliation-image" />
                    </div>
                    <span>Avaliado em 26/03/2023</span>
                    <p>Produto Excelente adorei, melhor placa que já comprei</p>
                </div>
                <div className={`col-md-6 d-flex flex-column gap-3 ${styles.avaliationBox}`}>
                    <h6 className='fw-bold mb-0'>John Doe</h6>
                    <div>
                        <img src="/images/FiveStars.png" alt="five-star-avaliation-image" />
                    </div>
                    <span>Avaliado em 04/08/2023</span>
                    <p>Produto bom, mas sabe já vi muitos melhores essa loja já foi melhor</p>
                </div>
                <div className={`col-md-6 d-flex flex-column gap-3 ${styles.avaliationBox}`}>
                    <h6 className='fw-bold mb-0'>Anônimo</h6>
                    <div>
                        <img src="/images/FiveStars.png" alt="five-star-avaliation-image" />
                    </div>
                    <span>Avaliado em 26/03/2023</span>
                    <p>Produto Excelente adorei, melhor placa que já comprei</p>
                </div>
                <div className={`col-md-6 d-flex flex-column gap-3 ${styles.avaliationBox}`}>
                    <h6 className='fw-bold mb-0'>John Doe</h6>
                    <div>
                        <img src="/images/FiveStars.png" alt="five-star-avaliation-image" />
                    </div>
                    <span>Avaliado em 04/08/2023</span>
                    <p>Produto bom, mas sabe já vi muitos melhores essa loja já foi melhor</p>
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
    )
}