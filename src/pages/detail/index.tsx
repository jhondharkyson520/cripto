import styles from './detail.module.css';
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

interface CoinGeckoResponse {
    symbol: string;
    name: string;
    market_data: {
        current_price: {
            brl: number;
        };
        market_cap: {
            brl: number;
        };
        low_24h: {
            brl: number;
        };
        high_24h: {
            brl: number;
        };
        price_change_percentage_24h: number;
    };
}

interface CoinProp {
    symbol: string;
    name: string;
    current_price: number;
    market_cap: number;
    low_24h: number;
    high_24h: number;
    price_change_percentage_24h: number;    
    formatedPrice: string;
    formatedMarket: string;
    formatedLowprice: string;
    formatedHighprice: string;
    numberDelta: number;
}


export function Detail() {
    const { cripto } = useParams();
    const [detail, setDetail] = useState<CoinProp>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                const criptoId = cripto?.toLowerCase();                
                const response = await fetch(`https://thingproxy.freeboard.io/fetch/https://api.coingecko.com/api/v3/coins/${criptoId}`);

                if(!response.ok) {
                    if(response.status === 404) {
                        throw new Error(`Criptoativo "${criptoId}" não encontrado.`);
                    } else if(response.status === 429) {
                        throw new Error('Muitas requisições, aguarde um momento.');
                    }
                    throw new Error('Network response was not ok');
                }
        
                const data: CoinGeckoResponse = await response.json();
                let price = Intl.NumberFormat("pt-BR", {
                    style: 'currency',
                    currency: 'BRL'
                });        
                const resultData: CoinProp = {
                    symbol: data.symbol,
                    name: data.name,
                    current_price: data.market_data.current_price.brl,
                    market_cap: data.market_data.market_cap.brl,
                    low_24h: data.market_data.low_24h.brl,
                    high_24h: data.market_data.high_24h.brl,
                    price_change_percentage_24h: data.market_data.price_change_percentage_24h,                    
                    formatedPrice: price.format(data.market_data.current_price.brl),
                    formatedMarket: price.format(data.market_data.market_cap.brl),
                    formatedLowprice: price.format(data.market_data.low_24h.brl),
                    formatedHighprice: price.format(data.market_data.high_24h.brl),
                    numberDelta: data.market_data.price_change_percentage_24h || 0
                };                
        
                setDetail(resultData);

            } catch(error) {
                console.error('Fetch error:', error);
                alert(error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        }
        
        const timeoutId = setTimeout(() => {
            getData();
        }, 1000);

        return () => clearTimeout(timeoutId);

    }, [cripto]);

    if(loading) {
        return (
            <div className={styles.container}>
                <h4 className={styles.center}>Carregando informações</h4>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.center}>{detail?.name}</h1>
            <p className={styles.center}>{detail?.symbol}</p>

            <section className={styles.content}>
                <p>
                    <strong>Preço: </strong> {detail?.formatedPrice}
                </p>

                <p>
                    <strong>Maior preço 24h: </strong> {detail?.formatedHighprice}
                </p>

                <p>
                    <strong>Menor preço 24h: </strong> {detail?.formatedLowprice}
                </p>

                <p>
                    <strong>Delta 24h: </strong>
                    <span className={detail?.numberDelta !== undefined && detail.numberDelta >= 0 ? styles.profit : styles.loss}>
                        {detail?.numberDelta}
                    </span>
                </p>

                <p>
                    <strong>Valor mercado: </strong> {detail?.formatedMarket}
                </p>
            </section>
        </div>
    );
}
