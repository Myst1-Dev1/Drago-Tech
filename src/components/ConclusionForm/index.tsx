import { useRouter } from 'next/router';
import { Button } from '../Button';
import styles from './styles.module.scss';

interface ConclusionFormProps {
    onHandlePrevStep:() => void;
}

export function ConclusionForm({ onHandlePrevStep }: ConclusionFormProps) {
    const router = useRouter();

    function exampleOfConclusion() {
        alert('Seu pedido foi feito com sucesso');
        router.push('/');
    }

    return (
        <div className={`py-5 container ${styles.conclusionContainer}`}>
            <div className='d-flex flex-column gap-3 mb-3'>
                <div className='d-flex justify-content-between'>
                    <h6 className='fw-bold'>Nome:</h6>
                    <h6>John Doe</h6>
                </div>
                <div>
                    <h6 className='fw-bold'>Contato:</h6>
                    <div className='d-flex justify-content-between'>
                        <h6 className='fw-bold'>Número: 21 94754 7854</h6>
                        <h6>Email: Johndoe@gmail.com</h6>
                    </div>
                </div>
                <div>
                    <h6 className='fw-bold'>Endereço:</h6>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column'>
                            <h6>Rua: Sebastiao Loren Porto</h6>
                            <h6>Estado: Paraguai</h6>
                        </div>
                        <div className='d-flex flex-column'>
                            <h6>Cidade: Loren Ipsun Porto Velho</h6>
                            <h6>CEP: 24578-478</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`py-3 ${styles.cartDetails}`}>
                <table className='table table-borderless'>
                    <thead>
                        <tr>
                            <th className='fw-bold'>Item</th>
                            <th className='fw-bold'>Preço</th>
                            <th className='fw-bold'>Quantidade</th>
                            <th className='fw-bold'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Teclado Gamer Redragon ...</td>
                            <td>R$:180,70</td>
                            <td className='text-center'>2</td>
                            <td>R$:361,40</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={`d-flex justify-content-between py-3 ${styles.paymentDetails}`}>
                <h6 className='fw-bold'>Detalhes do Pagamento</h6>
                <div>
                    <h6>Cartão de Credito Número: *********</h6>
                    <h6>Código de Segurança: 444</h6>
                    <h6>Data de expedição: 02/25</h6>
                </div>
            </div>
            <div className='mt-3 d-flex justify-content-between'>
                <Button onClick={onHandlePrevStep}>Voltar</Button>
                <Button onClick={exampleOfConclusion}>Finalizar</Button>
            </div>
        </div>
    )
}