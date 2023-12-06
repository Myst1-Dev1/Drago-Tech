import { FaStar } from 'react-icons/fa';
import styles from './styles.module.scss';
import { Pagination } from '../Pagination';
import { useContext } from 'react';
import { PaginationContext } from '../../services/hooks/usePagination';
import { formatData } from '../../utils/useFormatData';

interface ProductAvaliationsProps {
    comments:[] | any
}

export function ProductAvaliations({ comments }:ProductAvaliationsProps) {
    const { startIndex, endIndex } = useContext(PaginationContext);

    const currentItens = comments.slice(startIndex, endIndex);

    return (
        <div className={`container ${styles.productAvaliations}`}>
            <div className={`d-flex align-items-center gap-3 ${styles.subTitle}`}>
                <FaStar className={styles.icon} />
                <h5 className='fw-bold mb-0'>Avaliação dos usuários</h5>
            </div>
            <div className={`row justify-content-between mt-5 ${styles.avaliationsContainer}`}>
                {currentItens?.length === 0 ? 'Produto sem comentários 😢' : comments.map((comment:any) => (
                    <div key={comment.id} className={`col-md-6 d-flex flex-column gap-3 ${styles.avaliationBox}`}>
                        <h6 className='fw-bold mb-0'>{comment.name}</h6>
                        <span>{comment.avaliation}</span>
                        <span>Avaliado em {formatData(comment.createdAt)}</span>
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </div>
            {comments.length === 0 ? '' :
                <Pagination
                    data={comments}
                />
            }
        </div>
    )
}