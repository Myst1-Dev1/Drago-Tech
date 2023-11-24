import styles from './styles.module.scss'
import { FaDragon } from "react-icons/fa";

export function Logo() {
    return (
        <div className={`d-flex gap-3 align-items-center ${styles.logoContainer}`}>
            <h3>
                <span className={`h3`}>Drago</span> Tech
            </h3>
            <FaDragon className={`h3 ${styles.icon}`} />
        </div>
    )
}