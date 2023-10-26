import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import styles from './styles.module.scss';

interface ProductAvaliationsProps {
    comments:[] | any
}

export function ProductAvaliations({ comments }:ProductAvaliationsProps) {
    console.log(comments);

    const date = new Date(comments.map((comment:any) => comment.createdAt));
    const createdAt = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year:'numeric' });

    return (
        <div className={`container ${styles.productAvaliations}`}>
            <div className={`d-flex align-items-center gap-3 ${styles.subTitle}`}>
                <FaStar className={styles.icon} />
                <h5 className='fw-bold mb-0'>Avaliação dos usuários</h5>
            </div>
            <div className={`row justify-content-between mt-5 ${styles.avaliationsContainer}`}>
                {comments.length === 0 ? 'Produto sem comentários 😢' : comments.map((comment:any) => (
                    <div key={comment.id} className={`col-md-6 d-flex flex-column gap-3 ${styles.avaliationBox}`}>
                        <h6 className='fw-bold mb-0'>{comment.name}</h6>
                        {/* <div>
                            <img src="/images/FiveStars.png" alt="five-star-avaliation-image" />
                        </div> */}
                        <span>{comment.avaliation}</span>
                        <span>Avaliado em  {createdAt}</span>
                        <p>{comment.comment}</p>
                    </div>
                ))}
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