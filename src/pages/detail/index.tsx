import { useEffect, useState } from 'react';
import styles from './detail.module.css';
import { useNavigate, useParams } from 'react-router-dom';

interface CoinProp {
    symbol: string;
    name: string;
    price: string;
    market_cap: string;
    volume_24h: string;
    low_24h: string;
    high_24h: string;
    total_volume_24h: string;
    delta_24h: string;
    show_symbol?: string | null;
    rank: string;
    formattedPrice: string;
    formattedMarket: string;
    formattedLowPrice: string;
    formattedHighPrice: string;
    error?: string;
}

export function Detail() {
    const { cripto } = useParams();
    const [detail, setDetail] = useState<CoinProp>();
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        function getData() {
            fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=dd724b190c23be82&pref=BRL&symbol=${cripto}`)
            .then(response => response.json())
            .then((data: CoinProp) => {

                if(data.error) {
                    navigate('/')
                }

                let price = Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
                
                const resultData = {
                    ...data,
                    formattedPrice: price.format(Number(data.price)),
                    formattedMarket: price.format(Number(data.market_cap)),
                    formattedLowPrice: price.format(Number(data.low_24h)),
                    formattedHighPrice: price.format(Number(data.high_24h)),
                    delta_24h: data.delta_24h.replace(',', '.')
                }

                // console.log(resultData);
                setDetail(resultData);
                setLoading(false);
            })
            
        }

        getData()
    }, [cripto])

    if(loading) {
        return(
            <div className={styles.container}>
                <h4 className={styles.center}>Carregando informações...</h4>
            </div>
        )
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.center}>{detail?.name}</h1>
            <p className={styles.center}>{detail?.symbol}</p>

            <section className={styles.content}>
                <p>
                    <strong>Rank:</strong> {detail?.rank}°
                </p>
                <p>
                    <strong>Preço:</strong> {detail?.formattedPrice}
                </p>
                <p>
                    <strong>Valor de Mercado:</strong> {detail?.formattedMarket}
                </p>
                <p>
                    <strong>Maior Preço em 24h:</strong> {detail?.formattedHighPrice}
                </p>
                <p>
                    <strong>Menor Preço em 24h:</strong> {detail?.formattedLowPrice}
                </p>
                <p>
                    <strong>Delta 24h:</strong> 
                    <span className={Number(detail?.delta_24h) >= 0 ? styles.profit : styles.loss}>{detail?.delta_24h}</span>
                </p>
            </section>
        </div>
    )
}