import { FormEvent, useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import styles from './styles.module.scss';
import { updateUser } from '../../services/graphql';
import { useUser } from '../../lib/customHooks';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../services/queryClient';

export function ProfileForm() {
    const { user } = useUser();

    const [name, setName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleUpdateUserData(e?:FormEvent) {
        e?.preventDefault();
        setIsLoading(true);

        try {
            if (password !== confirmPassword) {
                setIsError(true);
                return;
            }

            await updateUser({
                name: name,
                address: address,
                phone: phone,
                city: city,
                state: state,
                password: password,
                zipCode: zipCode,
                email: user?.email
            });

            setIsLoading(false);

            toast.success("Dados atualizados com sucesso", {
                position:toast.POSITION.TOP_RIGHT,
                theme:'light'
            });

        } catch (error) {
            console.log('Erro ao atualizar dados do usuário', error);
        }
    }

    const mutation = useMutation({
        mutationFn:handleUpdateUserData,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['userData']})
        }
    })

    return (
        <div className={`mb-5 container ${styles.profileFormContainer}`}>
            <form onSubmit={mutation.mutate} className='d-flex flex-column gap-3'>
                <div className={`row ${styles.inputBox}`}>
                    <div className='col-md-6 mb-3 d-flex flex-column gap-3'>
                        <label className='fw-bold' htmlFor="name">Nome</label>
                        <Input 
                            type='text' 
                            id='name' 
                            placeholder='John Doe'
                            required
                            value={name}
                            onChange={e => setName(e.target.value)} 
                        />
                    </div>
                    <div className='col-md-6 d-flex flex-column gap-3'>
                        <label className='fw-bold' htmlFor="zipCode">CEP</label>
                        <Input 
                            type='tel' 
                            id='zipCode' 
                            placeholder='XXXXXXXX'
                            required
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}  
                        />
                    </div>
                </div>
                <div className={`row ${styles.inputBox}`}>
                    <div className='col-md-6 mb-3 d-flex flex-column gap-3'>
                        <label className='fw-bold' htmlFor="phone">Telefone</label>
                        <Input 
                            type='tel' 
                            id='phone' 
                            placeholder='40028922'
                            required
                            value={phone}
                            onChange={e => setPhone(e.target.value)} 
                        />
                    </div>
                    <div className='col-md-6 d-flex flex-column gap-3'>
                        <label className='fw-bold' htmlFor="state">Estado</label>
                        <Input 
                            type='text' 
                            id='state' 
                            placeholder='RS'
                            required
                            value={state}
                            onChange={e => setState(e.target.value)}  
                        />
                    </div>
                </div>
                <div className={`row ${styles.inputBox}`}>
                    <div className='col-md-6 mb-3 d-flex flex-column gap-3'>
                        <label className='fw-bold' htmlFor="city">Cidade</label>
                        <Input 
                            type='text' 
                            id='city' 
                            placeholder='São João'
                            required
                            value={city}
                            onChange={e => setCity(e.target.value)}  
                        />
                    </div>
                    <div className='col-md-6 d-flex flex-column gap-3'>
                        <label className='fw-bold' htmlFor="address">Endereço</label>
                        <Input 
                            type='text' 
                            id='address' 
                            placeholder='Rua São Sebastião'
                            required
                            value={address}
                            onChange={e => setAddress(e.target.value)}  
                        />
                    </div>
                </div>
                <div className='d-flex flex-column gap-3'>
                     <div className={`row ${styles.inputBox}`}>
                    
                        <div className='col-md-6 mb-3 d-flex flex-column gap-3'>
                            <label className='fw-bold' htmlFor="new-password">Nova Senha</label>
                            <Input 
                                type='password' 
                                id='new-password' 
                                placeholder='********'
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className='col-md-6 d-flex flex-column gap-3'>
                            <label className='fw-bold' htmlFor="new-password-confirmation">Confirme a senha</label>
                            <Input 
                                type='password' 
                                id='new-password-confirmation' 
                                placeholder='********'
                                required
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {isError ?
                            <span className='text-center text-danger fw-bold'>
                                As senhas não coincidem
                            </span>
                        : ''}
                </div>
                <div className='m-auto mt-3'>
                    <Button type='submit'>
                        {isLoading ? 
                            <div className='spinner-border'><span className='sr-only'></span></div>  
                        : 'Atualizar Dados'}
                    </Button>
                </div>
            </form>
        </div>
    )
}