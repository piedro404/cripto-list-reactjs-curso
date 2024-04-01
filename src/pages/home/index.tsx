import styles from './home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'
import { useEffect, useState, FormEvent } from 'react'

// https://coinlib.io/api/v1/coinlist?key=dd724b190c23be82
// json-server --watch data.json --port 4000

interface CoinProps {
    name: string;
    delta_24h: string;
    price: string;
    symbol: string;
    volume_24h: string;
    market_cap: string;
    formattedPrice: string;
    formattedMarket: string;
}

interface DataProps {
    coins: CoinProps[];
}

export function Home() {
    const [coins, setCoins] = useState<CoinProps[]>([])
    const [inputValue, setInputValue] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        function getData() {
            fetch("http://localhost:4000/coinlist")
            .then(response => response.json())
            .then((data: DataProps) => {
                let coinsData = data.coins.slice(0, 15);

                let price = Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })

                const formatResult = coinsData.map((item) => {
                    const formatted = {
                        ...item,
                        formattedPrice: price.format(Number(item.price)),
                        formattedMarket: price.format(Number(item.market_cap)),
                        delta_24h: item.delta_24h.replace(',', '.')
                    }

                    return formatted
                })

                console.log(formatResult);
                setCoins(formatResult);
            })
            .catch((err) => {
                console.log(err);
            })
        }

        getData();
    }, [])
    
    function handleSearch(event: FormEvent) {
        event.preventDefault();
        
        if(inputValue === "") {
            return;
        }
       
        navigate(`/detail/${inputValue}`)
    }

    return(
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSearch}>
                <input
                    placeholder='Digite o simbolo da moeda: BTC...'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
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
                    {coins.map( coin => (
                        <tr key={coin.name} className={styles.tr}>
                            <td className={styles.tdLabel} data-label="Moeda">
                                <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                                    <span>{coin.name}</span> | {coin.symbol}
                                </Link>
                            </td>

                            <td className={styles.tdLabel} data-label="Mercado">
                                {coin.formattedMarket}
                            </td>

                            <td className={styles.tdLabel} data-label="Preço">
                                {coin.formattedPrice}
                            </td>

                            <td className={Number(coin?.delta_24h) >= 0 ? styles.tdProfit : styles.tdLoss} data-label="Volume">
                                <span>{coin.delta_24h}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </main>
    )
}