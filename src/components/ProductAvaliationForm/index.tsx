import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import styles from './styles.module.scss';
import { Button } from '../Button';

export function ProductAvaliationForm() {
    const [isOpenAvaliationForm, setIsOpenAvaliationForm] = useState(false);

    function handleOpenAvaliationForm() {
        setIsOpenAvaliationForm(!isOpenAvaliationForm);
    }

    return (
        <div className={`container ${styles.productAvaliationForm}`}>
            <div className={`d-flex align-items-center gap-3 ${styles.subTitle}`}>
                {isOpenAvaliationForm ? <FaTimes onClick={handleOpenAvaliationForm} className={styles.icon} /> :
                <FaPlus onClick={handleOpenAvaliationForm} className={styles.icon} />
                }
                <h5 className='fw-bold mb-0'>Avaliar Produto</h5>
            </div>
            {isOpenAvaliationForm && (
                <form className={`d-flex flex-column gap-3 mt-5 ${styles.formContainer}`}>
                    <input type="text" placeholder='Nome' className={styles.inputBox} />
                    <select>
                        <option value="Bom">Bom</option>
                        <option value="Ruim">Ruim</option>
                        <option value="Incrivel">Incrivel</option>
                        <option value="Espetacular">Espetacular</option>
                        <option value="Perfeito">Pefeito</option>
                    </select>
                    <textarea placeholder='Mensagem'/>
                    <Button type='submit'>Enviar</Button>
                </form>
            )}
        </div>
    )
}