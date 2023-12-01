import { Button } from '../Button';
import { Input } from '../Input';
import styles from './styles.module.scss';

export function ProfileForm() {
    return (
        <div className={`mb-5 container ${styles.profileFormContainer}`}>
            <form className='d-flex flex-column gap-3'>
                <div className={`row ${styles.inputBox}`}>
                    <div className='col-md-6 mb-3 d-flex flex-column gap-3'>
                        <label className='fw-bold' htmlFor="name">Nome</label>
                        <Input type='text' id='name' placeholder='John Doe' />
                    </div>
                    <div className='col-md-6 d-flex flex-column gap-3'>
                        <label className='fw-bold' htmlFor="email">Email</label>
                        <Input type='email' id='email' placeholder='johndoe@gmail.com' />
                    </div>
                </div>
                <div className={`row ${styles.inputBox}`}>
                    <div className='col-md-6 mb-3 d-flex flex-column gap-3'>
                        <label className='fw-bold' htmlFor="phone">Telefone</label>
                        <Input type='tel' id='phone' placeholder='40028922' />
                    </div>
                    <div className='col-md-6 d-flex flex-column gap-3'>
                        <label className='fw-bold' htmlFor="state">Estado</label>
                        <Input type='text' id='state' placeholder='RS' />
                    </div>
                </div>
                <div className={`row ${styles.inputBox}`}>
                    <div className='col-md-6 mb-3 d-flex flex-column gap-3'>
                        <label className='fw-bold' htmlFor="city">Cidade</label>
                        <Input type='tel' id='city' placeholder='São João' />
                    </div>
                    <div className='col-md-6 d-flex flex-column gap-3'>
                        <label className='fw-bold' htmlFor="address">Endereço</label>
                        <Input type='text' id='address' placeholder='Rua São Sebastião' />
                    </div>
                </div>
                <div className={`d-flex flex-column gap-3 ${styles.inputBox}`}>
                    <label className='fw-bold' htmlFor="zipCode">CEP</label>
                    <Input type='tel' id='zipCode' placeholder='XXXXXXXX' />
                </div>
                <div className='m-auto mt-3'>
                    <Button>Atualizar Dados</Button>
                </div>
            </form>
        </div>
    )
}