import { useState, FormEvent } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import styles from './styles.module.scss';
import { Button } from '../Button';
import { submitComment } from '../../services/graphql';

interface ProductAvaliationFormProps {
    slug:string;
}

export function ProductAvaliationForm({ slug }: ProductAvaliationFormProps) {
    const [isOpenAvaliationForm, setIsOpenAvaliationForm] = useState(false);
    const [name, setName] = useState('');
    const [avaliation, setAvaliation] = useState('Bom');
    const [comment, setComment] = useState('');

    function handleOpenAvaliationForm() {
        setIsOpenAvaliationForm(!isOpenAvaliationForm);
    }

    async function handleCreateComment(e?:FormEvent) {
        e?.preventDefault();
        try {
            const commentObj = {name, avaliation, comment, slug};

            await submitComment(commentObj);
        } catch (error) {
            console.log('Tivemos um erro', error);
        }

        setName('');
        setAvaliation('Bom');
        setComment('');

        alert('Seu comentário foi enviado para avaliação');
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
                <form onSubmit={handleCreateComment} className={`d-flex flex-column gap-3 mt-5 ${styles.formContainer}`}>
                    <input 
                        type="text" 
                        placeholder='Nome' 
                        className={styles.inputBox}
                        value={name}
                        onChange={e => setName(e.target.value)} 
                    />
                    <select
                        value={avaliation}
                        onChange={e => setAvaliation(e.target.value)}
                    >
                        <option value="Bom">Bom</option>
                        <option value="Ruim">Ruim</option>
                        <option value="Incrivel">Incrivel</option>
                        <option value="Espetacular">Espetacular</option>
                        <option value="Perfeito">Pefeito</option>
                    </select>
                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)} 
                        placeholder='Mensagem'
                    />
                    <Button type='submit'>Enviar</Button>
                </form>
            )}
        </div>
    )
}