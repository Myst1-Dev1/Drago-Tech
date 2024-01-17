import { FormEvent, useContext, useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { submitOrder } from '../../services/graphql';
import { CartContext } from '../../services/hooks/useCart/useCart';
import { UserContext } from '../../services/hooks/useUser/useUser';

interface InformationFormProps {
    onSetStep:any;
    onStep:number;
}

export function InformationForm({ onSetStep, onStep } :InformationFormProps) {
    const { user, authenticated } = useContext(UserContext);
    const { totalCart, cart } = useContext(CartContext);

    const productName = cart?.map(item => item.product.node.name);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleCreateOrder (e?:FormEvent) {
        e?.preventDefault();
        setIsLoading(true);
        try {
            await submitOrder({
                email: authenticated ? user.email : email,
                telefone: authenticated ? user.phone : phone,
                endereco: authenticated ? user.address : address,
                cidade: authenticated ? user.city : city,
                estado: authenticated ? user.state : state,
                cep: authenticated ? user.zipCode : zipCode,
                isReceived:false,
                orderTotalPrice: parseFloat(totalCart),
                orderProductName: productName && productName.length > 0 ? productName : ['Sem Produto'],
                userEmail: user.email
            });
            setIsLoading(false);

            if (onStep < 3) {
                onSetStep(onStep + 1);
              } else {
                onSetStep(3);
            }
        } catch (error) {
            console.log('Tivemos um erro ao criar um pedido', error);
        }
      };

    return (
        <div className={`py-5`}>
            <form onSubmit={handleCreateOrder} className="d-flex flex-column justify-content-center align-items-center gap-4">
                <div className={`d-flex wrap gap-3`}>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="email">Email</label>
                        <Input 
                            required 
                            id='email' 
                            type='email' 
                            placeholder='johndoe@gmail.com'
                            value={authenticated ? user.email : email}
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="tel">Telefone</label>
                        <Input 
                            required 
                            id='tel' 
                            type='tel' 
                            placeholder='55214002922'
                            value={authenticated ? user.phone : phone}
                            onChange={e => setPhone(e.target.value)} 
                        />
                     </div>
                </div>
                <div className={`w-100`}>
                    <label className='mb-3 fw-bold' htmlFor='address'>Endereço</label>
                    <Input 
                        required 
                        id='address' 
                        type='text' 
                        placeholder='Rua Sebastião Porto' 
                        value={authenticated ? user.address : address}
                        onChange={e => setAddress(e.target.value)}
                        />
                </div>
                <div className='w-100'>
                    <label className='mb-3 fw-bold' htmlFor='city'>Cidade</label>
                    <Input 
                        required 
                        id='city' 
                        type='text' 
                        placeholder='Santo Lorem' 
                        value={authenticated ? user.city : city}
                        onChange={e => setCity(e.target.value)}
                        />
                </div>
                <div className={`d-flex wrap gap-3`}>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="state">Estado</label>
                        <Input 
                            required 
                            id='state' 
                            type='text' 
                            placeholder='RJ'
                            value={authenticated ? user.state : state}
                            onChange={e => setState(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="zipCode">CEP</label>
                        <Input 
                            required 
                            id='zipCode' 
                            type='tel' 
                            placeholder='XXXXXXX'
                            value={authenticated ? user.zipCode : zipCode}
                            onChange={e => setZipCode(e.target.value)} 
                        />
                     </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <Button type='submit'>
                        {isLoading ? <div className='spinner-border'><span className='sr-only'></span></div> 
                        : 'Prosseguir'}
                    </Button>
                </div>
            </form>
        </div>
    )
}