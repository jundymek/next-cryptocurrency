import { useState, useEffect } from 'react';

interface First {
  currency: string;
  minOffer: string;
  scale: number;
}

interface Second {
  currency: string;
  minOffer: string;
  scale: number;
}

interface Market {
  code: string;
  first: First;
  second: Second;
}

interface MarketData {
  market: Market;
  time: string;
  highestBid: string;
  lowestAsk: string;
  rate: string;
  previousRate: string;
}

export interface CryptoData {
  pair: string;
  firstCurrency: string;
  secondCurrency: string;
  name: string;
  price: string;
}

function useFetchCryptoData() {
  const [error, setError] = useState<string | null>(null);
  const [cryptos, setCryptos] = useState<CryptoData[] | undefined>(undefined);
  const getCryptoData = async (): Promise<any> => {
    try {
      const cryptoData = await fetch('http://localhost:3001/api/cryptos');
      const res = await cryptoData.json();
      setCryptos(res);
    } catch (err) {
      console.log(err);
      setError('Something went wrong');
    }
  };
  useEffect(() => {
    getCryptoData();
  }, []);

  return { error, cryptos };
}

const getFullName = (symbol: string) => {
  switch (symbol) {
    case 'BTC':
      return 'Bitcoin';
    case 'LTC':
      return 'Litecoin';
    case 'XRP':
      return 'Ripple';
    case 'ETH':
      return 'Ethereum';
    default:
      return 'Unknown';
  }
};

const getNecessaryData = (data: MarketData) => {
  return {
    pair: data.market.code,
    firstCurrency: data.market.first.currency,
    secondCurrency: data.market.second.currency,
    name: getFullName(data.market.first.currency),
    price: data.previousRate,
  };
};

export default useFetchCryptoData;
