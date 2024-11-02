import styles from './home.module.css';
import {BiSearch} from 'react-icons/bi';
import {Link, useNavigate} from 'react-router-dom';
import {FormEvent, useEffect, useState} from 'react';

interface CoinProps {
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
    formatedPrice: string;
    formatedMarket: string;
    numberDelta: number;
}

export function Home() {
    const [coins, setCoins] = useState<CoinProps[]>([]);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        function getData() {
            fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=15&page=1&sparkline=false')
                .then(response => response.json())
                .then((data) => {
                    const price = Intl.NumberFormat("pt-BR", {
                        style: 'currency',
                        currency: 'BRL'
                    });
                    const formatResult = data.map((item: any) => {
                        const formated: CoinProps = {
                            ...item,
                            formatedPrice: price.format(item.current_price),
                            formatedMarket: price.format(item.market_cap),
                            numberDelta: item.price_change_percentage_24h
                        };
                        return formated;
                    });

                    setCoins(formatResult);
                }).catch(error => console.error("Erro ao buscar dados:", error));
        }
        getData();
    }, []);

    function handleSearch(e: FormEvent) {
        e.preventDefault();
        if (inputValue === '') return;
        navigate(`/detail/${inputValue}`);
    }

    return (
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
                        <th scope='col'>Valor mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Variação 24h</th>
                    </tr>
                </thead>

                <tbody id='tbody'>
                    {coins.map(coin => (
                        <tr key={coin.name} className={styles.tr}>
                            <td className={styles.tdLabel} data-label='Moeda'>
                                <Link className={styles.link} to={`/detail/${coin.name}`}>
                                    <span>{coin.name}</span> | {coin.symbol}
                                </Link>
                            </td>
                            <td className={styles.tdLabel} data-label='Mercado'>
                                {coin.formatedMarket}
                            </td>
                            <td className={styles.tdLabel} data-label='Preço'>
                                {coin.formatedPrice}
                            </td>
                            <td className={coin.numberDelta >= 0 ? styles.tdProfit : styles.tdLoss} data-label='Variação 24h'>
                                <span>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
