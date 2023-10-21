import styles from './styles.module.scss';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

export function Button({ children, ...props }:ButtonProps) {
    return (
        <button className={styles.button} {...props}>{children}</button>
    )
}