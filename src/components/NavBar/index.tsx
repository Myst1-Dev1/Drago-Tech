import styles from './styles.module.scss';

export function NavBar() {
    return (
        <div className={`py-3 ${styles.navBar}`}>
            <div className='container d-flex gap-5'>
                <a href="">Início</a>
                <a href="">Loja</a>
                <a href="">Sobre</a>
                <a href="">Prime</a>
                <a href="">Contato</a>
            </div>
        </div>
    )
}