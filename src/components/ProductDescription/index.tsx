import { FaClipboardList } from 'react-icons/fa';
import styles from './styles.module.scss';

interface ProductDescriptionProps {
    description:string;
    name:string
}

export function ProductDescription({ name, description }: ProductDescriptionProps) {
    return (
        <div className={`container ${styles.productDescription}`}>
            <div className={`d-flex align-items-center gap-3 ${styles.subTitle}`}>
                <FaClipboardList className={styles.icon} />
                <h5 className='fw-bold mb-0'>Descrição do Produto</h5>
            </div>
            <div className='mt-5'>
                <h6 className='fw-bold'>{name}</h6>
                <p className='mt-3'>
                   {description}
                </p>
            </div>
        </div>
    )
}