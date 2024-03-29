import styles from './home.module.css'
import { Link } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'

export function Home() {
    return(
        <main className={styles.container}>
            <form className={styles.form}>
                <input
                    placeholder='Digite o simbolo da moeda: BTC...'
                />
                <button type='submit'>
                    <BiSearch size={30} color='#FFF' />
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor Mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                    </tr>
                </thead>

                <tbody id='tbody'>
                    <tr className={styles.tr}>
                        <td className={styles.tdLabel} data-label="Moeda">
                            <Link className={styles.link} to="/detail/btc">
                                <span>Bitcoin</span> | BTC
                            </Link>
                        </td>

                        <td className={styles.tdLabel} data-label="Mercado">
                            R$ 19253
                        </td>

                        <td className={styles.tdLabel} data-label="Preço">
                            R$ 40.982
                        </td>

                        <td className={styles.tdProfit} data-label="Volume">
                            <span>-5.3</span>
                        </td>
                    </tr>
                </tbody>
            </table>

        </main>
    )
}