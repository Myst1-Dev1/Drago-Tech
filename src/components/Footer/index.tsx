import styles from './styles.module.scss';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

export function Footer() {
    return (
        <>
            <div className={`py-5 text-light ${styles.footer}`}>
                <div className='d-flex wrap m-auto justify-content-between container
                    '>
                    <div>
                        <h2 className='fw-bold'>Sobre</h2>
                        <p>Lorem ipsum is simply <br /> dummy lorem about <br /> the text.</p>
                        <div className='d-flex gap-3'>
                            <FaInstagram className={styles.icon} />
                            <FaFacebook className={styles.icon} />
                            <FaTwitter className={styles.icon} />
                        </div>
                    </div>
                    <div>
                        <h2 className='fw-bold'>Menu</h2>
                        <div className='d-flex flex-column gap-2'>
                            <a href="">Início</a>
                            <a href="">Loja</a>
                            <a href="">Sobre</a>
                            <a href="">Prime</a>
                            <a href="">Contato</a>
                        </div>
                    </div>
                    <div>
                        <h2 className='fw-bold'>Informação</h2>
                        <div className='d-flex flex-column gap-2'>
                            <a href="">Política de privacidade</a>
                            <a href="">Pedidos e retornos</a>
                            <a href="">Termos e condições</a>
                        </div>
                    </div>
                    <div>
                        <h2 className='fw-bold'>Serviço</h2>
                        <div className='d-flex flex-column gap-2'>
                            <a href="">Minha conta</a>
                            <a href="">Ver carrinho</a>
                            <a href="">Lista de desejos</a>
                            <a href="">Localizar meu pedido</a>
                            <a href="">Ajuda</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`py-3 ${styles.copyright}`}>
                <div className='text-center'>
                    <p>© 2023 copyright todos os direitos reservados. Design Por <span>Myst1 Dev</span></p>
                </div>
            </div>
        </>
    )
}