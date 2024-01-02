import { useState, FormEvent } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import styles from './styles.module.scss';
import { Button } from '../Button';
import { submitComment } from '../../services/graphql';
import { useUser } from '../../lib/customHooks';
import { toast } from 'react-toastify';

interface ProductAvaliationFormProps {
    slug:string;
}

export function ProductAvaliationForm({ slug }: ProductAvaliationFormProps) {
    const { user, authenticated } = useUser();

    const [isOpenAvaliationForm, setIsOpenAvaliationForm] = useState(false);
    const [name, setName] = useState('');
    const [avaliation, setAvaliation] = useState('Muito ruim');
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleOpenAvaliationForm() {
        setIsOpenAvaliationForm(!isOpenAvaliationForm);
    }

    async function handleCreateComment(e?:FormEvent) {
        e?.preventDefault();
        setIsLoading(true);
        try {
            await submitComment({
                name: authenticated ? user?.name : name,
                avaliation:avaliation,
                comment:comment,
                slug:slug
            });
        } catch (error) {
            console.log('Tivemos um erro', error);
        }

        setName('');
        setAvaliation('Bom');
        setComment('');
        setIsLoading(false);

        toast.success("Comentário enviado para avaliação", {
            position:toast.POSITION.TOP_RIGHT,
            theme:'colored'
        })
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
                        value={authenticated ? user?.name : name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <select
                        value={avaliation}
                        onChange={e => setAvaliation(e.target.value)}
                        required
                    >
                        <option value="Muito ruim">Muito ruim</option>
                        <option value="Ruim">Ruim</option>
                        <option value="Bom">Bom</option>
                        <option value="Incrivel">Incrivel</option>
                        <option value="Espetacular">Espetacular</option>   
                    </select>
                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)} 
                        placeholder='Mensagem'
                        required
                    />
                    <Button type='submit'>
                        {isLoading ? <div className='spinner-border'><span className='sr-only'></span></div>  
                        : 'Enviar'}
                    </Button>
                </form>
            )}
        </div>
    )
}