import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { PaginationContext } from '../../services/hooks/usePagination';

interface PaginationProps {
    data: [] | any;
}

export function Pagination({ data }:PaginationProps) {
    const { renderPaginationButtons, 
            handlePreviousPage,
            handleNextPage } = useContext(PaginationContext);

    return (
        <div className={`d-flex gap-3 justify-content-center align-items-center mt-5 ${styles.pagination}`}>
            <button onClick={handlePreviousPage}><FaArrowLeft /></button>
            {renderPaginationButtons(data)}
            <button onClick={() => handleNextPage(data)}><FaArrowRight /></button>
        </div>
    )
}