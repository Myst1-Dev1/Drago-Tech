import { FormEvent, useContext, useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { submitOrder } from '../../services/graphql';
import { useUser } from '../../lib/customHooks';
import { CartContext } from '../../services/hooks/useCart/useCart';

interface InformationFormProps {
    onSetStep:any;
    onStep:number;
}

export function InformationForm({ onSetStep, onStep } :InformationFormProps) {
    const { user } = useUser();
    const { totalCart } = useContext(CartContext);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    async function handleCreateOrder (e?:FormEvent) {
        e?.preventDefault();
        try {
            await submitOrder({
                email: email,
                telefone: phone,
                endereco: address,
                cidade: city,
                estado: state,
                cep: zipCode,
                orderTotalPrice: parseFloat(totalCart),
                userEmail: user.email
            });
            console.log('Pedido enviado com sucesso!');

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
                            value={email}
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
                            value={phone}
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
                        value={address}
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
                        value={city}
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
                            value={state}
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
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)} 
                        />
                     </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <Button type='submit'>Prosseguir</Button>
                </div>
            </form>
        </div>
    )
}