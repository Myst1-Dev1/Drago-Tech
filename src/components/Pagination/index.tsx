import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './styles.module.scss';

interface PaginationProps {
    data: [] | any;
    onSetCurrentPage:any;
    onItensPerPage:number;
    onCurrentPage:number;
}

export function Pagination({ data, onSetCurrentPage ,onItensPerPage, onCurrentPage }:PaginationProps) {

    const totalPages = Math.ceil(data.length / onItensPerPage);

    function renderPaginationButtons() {  
        const buttons = [];

        for(let i = 0; i < totalPages; i++) {
            if (i === onCurrentPage || i === onCurrentPage - 1 || i === onCurrentPage + 1 || i === totalPages) {
                buttons.push(
                    <button key={i} onClick={() => onSetCurrentPage(i)}>
                        {i + 1}
                    </button>
                );
            } else if (buttons[buttons.length - 1] !== '...') {
                buttons.push('...');
            }
        }

        return buttons;
    }

    function handlePreviousPage() {
        onSetCurrentPage(onCurrentPage - 1);
        if(onCurrentPage === 0) {
            onSetCurrentPage(onCurrentPage);
        }
    }

    function handleNextPage() {
        onSetCurrentPage(onCurrentPage + 1);
        if(onCurrentPage === Array(totalPages).length - 1) {
            onSetCurrentPage(onCurrentPage);
        }
    }

    return (
        <div className={`d-flex gap-3 justify-content-center align-items-center mt-5 ${styles.pagination}`}>
            <button onClick={handlePreviousPage}><FaArrowLeft /></button>
            {renderPaginationButtons()}
            <button onClick={handleNextPage}><FaArrowRight /></button>
        </div>
    )
}