import { useEffect, useState } from 'react';
import styles from './detail.module.css';
import { useNavigate, useParams } from 'react-router-dom';

interface CoinProp {
    name: string;
    delta_24h: string;
    show_symbol: string | null;
    rank: string;
    price: string;
    symbol: string;
    volume_24h: string;
    market_cap: string;
    formattedPrice: string;
    formattedMarket: string;
}

interface DataProp {
    0: CoinProp;
}

export function Detail() {
    const { cripto } = useParams();
    const [detail, setDetail] = useState<CoinProp>();
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        function getData() {
            fetch(`http://localhost:4000/coins?symbol=${cripto}`)
            .then(response => response.json())
            .then((data: DataProp) => {

                if(!(data[0])) {
                    navigate('/')
                }

                let price = Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
                
                const resultData = {
                    ...data[0],
                    formattedPrice: price.format(Number(data[0].price)),
                    formattedMarket: price.format(Number(data[0].market_cap)),
                    delta_24h: data[0].delta_24h.replace(',', '.')
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
                    <strong>Delta 24h:</strong> 
                    <span className={Number(detail?.delta_24h) >= 0 ? styles.profit : styles.loss}>{detail?.delta_24h}</span>
                </p>
            </section>
        </div>
    )
}