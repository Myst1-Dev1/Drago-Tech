import { FaClipboardList } from 'react-icons/fa';
import styles from './styles.module.scss';

export function ProductDescription() {
    return (
        <div className={`container ${styles.productDescription}`}>
            <div className={`d-flex align-items-center gap-3 ${styles.subTitle}`}>
                <FaClipboardList className={styles.icon} />
                <h5 className='fw-bold mb-0'>Descrição do Produto</h5>
            </div>
            <div className='mt-5'>
                <h6 className='fw-bold'>Processador AMD Ryzen 7 5700X</h6>
                <p className='mt-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was popularised in
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum.
                </p>
            </div>
        </div>
    )
}