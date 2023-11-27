import Head from 'next/head';
import styles from './styles.module.scss';
import { Button } from '../../components/Button';
import html2canvas from 'html2canvas';
import Link from 'next/link';

export default function SucessPage() {
    async function handleScreenShot() {
        const paymentDetails:any = document.getElementById('payment-details');
        const screenshot = await html2canvas(paymentDetails);
        const link = document.createElement('a');
        link.href = screenshot.toDataURL();
        link.download = 'payment_details_screenshot.png';
        link.click();
    }

    return (
        <>
            <Head>
                <title>Página de Sucesso | Drago Tech</title>
            </Head>
            <div id='payment-details' className={`container d-flex flex-column justify-content-center align-items-center py-5 ${styles.sucessPage}`}>
                <div className={styles.imgContainer}>
                    <img src="/images/sucessIcon.png" alt="imagem de sucesso" />
                </div>
                <h5 className='text-success fw-bold py-3'>Pagamento realizado com sucesso</h5>
                <div className={`mt-3 ${styles.paymentDetailsContainer}`}>
                    <div className='d-flex justify-content-between'>
                        <span>Tipo de Pagamento</span>
                        <h6>Cartão</h6>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <span>Telefone</span>
                        <h6>21 4002 8922</h6>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <span>Email</span>
                        <h6>johndoe@gmail.com</h6>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <span>Estado</span>
                        <h6>RJ</h6>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <span>Cidade</span>
                        <h6>São Gonçalo</h6>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <span>Endereço</span>
                        <h6>Rua Lorem Porto Ipsum</h6>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <span>CEP</span>
                        <h6>24758-470</h6>
                    </div>
                    <div className='d-flex justify-content-between mt-3'>
                        <span>Valor do Pedido</span>
                        <h6 className='fw-bold'>R$:120,00</h6>
                    </div>
                    <div className='mt-5 d-flex justify-content-center gap-5'>
                        <Button onClick={handleScreenShot}>Print</Button>
                        <Link href="/"><Button>Fechar</Button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}