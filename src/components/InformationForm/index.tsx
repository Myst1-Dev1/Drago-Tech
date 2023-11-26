import { Button } from '../Button';
import { Input } from '../Input';

interface InformationFormProps {
    onHandleNextStep:() => void;
}

export function InformationForm({ onHandleNextStep } :InformationFormProps) {

    return (
        <div className={`py-5`}>
            <form className="d-flex flex-column justify-content-center align-items-center gap-4">
                <div className={`d-flex wrap gap-3`}>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="email">Email</label>
                        <Input required id='email' type='text' placeholder='johndoe@gmail.com' />
                    </div>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="tel">Número</label>
                        <Input required id='tel' type='tel' placeholder='55214002922' />
                     </div>
                </div>
                <div className={`w-100`}>
                    <label className='mb-3 fw-bold'>Endereço</label>
                    <Input required id='address' type='text' placeholder='Rua Sebastião Porto' />
                </div>
                <div className='w-100'>
                    <label className='mb-3 fw-bold'>Cidade</label>
                    <Input required id='city' type='text' placeholder='Santo Lorem' />
                </div>
                <div className={`d-flex wrap gap-3`}>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="state">Estado</label>
                        <Input required id='state' type='text' placeholder='RJ' />
                    </div>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="zipCode">CEP</label>
                        <Input required id='zipCode' type='tel' placeholder='XXXXXXX' />
                     </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <Button onClick={onHandleNextStep}>Prosseguir</Button>
                </div>
            </form>
        </div>
    )
}