import { Button } from '../Button';
import { Input } from '../Input';

interface InformationFormProps {
    onHandleNextStep:() => void;
    onHandlePrevStep:() => void;
}

export function InformationForm({ onHandleNextStep, onHandlePrevStep } :InformationFormProps) {
    return (
        <div className={`py-5`}>
            <form className="d-flex flex-column gap-3">
                <div className={`d-flex wrap gap-3 `}>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="email">Email</label>
                        <Input required id='email' type='text' placeholder='johndoe@gmail.com' />
                    </div>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="tel">Número</label>
                        <Input required id='tel' type='tel' placeholder='55214002922' />
                     </div>
                </div>
                <div className={`py-3`}>
                    <label className='mb-3 fw-bold' htmlFor="address">Endereço</label>
                    <Input required id='address' type='text' placeholder='Rua Sebastião Porto' />
                </div>
                <div>
                    <label className='mb-3 fw-bold' htmlFor="city">Cidade</label>
                    <Input required id='city' type='text' placeholder='Santo Lorem' />
                </div>
                <div className={`d-flex justify-content-between wrap py-3 gap-3`}>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="state">Estado</label>
                        <Input required id='state' type='text' placeholder='RJ' />
                    </div>
                    <div>
                        <label className='mb-3 fw-bold' htmlFor="cep">CEP</label>
                        <Input required id='cep' type='number' placeholder='XXXXXXXX' />
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <Button onClick={onHandlePrevStep}>Voltar</Button>
                    <Button onClick={onHandleNextStep}>Prosseguir</Button>
                </div>
            </form>
        </div>
    )
}