import { Link } from 'react-router-dom'
import styles from './header.module.css' 
import logoImg from '../../assets/logo.svg'

export function Header() {
    return(
        <header className={styles.container}>
            <div>
                <Link to="/">
                    <img src={logoImg} alt="Logo Cripto" />
                </Link>
            </div>
        </header>
    )
}