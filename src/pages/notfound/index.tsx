import { Link } from 'react-router-dom'
import styles from './notfound.module.css'

export function NotFound() {
    return(
        <div className={styles.container}>
            <h1>Você ta muito longe de casa amigo...</h1>
            <Link to='/'>
                Voltar para Home
            </Link>
        </div>
    )
}