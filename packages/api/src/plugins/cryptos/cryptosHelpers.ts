const fetch = require('node-fetch');

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

export async function getCryptoData() {
  const data = await fetch('https://api.bitbay.net/rest/trading/ticker');
  const res = await data.json();
  const cryptos = Object.keys(res.items)
    .map((pair) => getNecessaryData(res.items[pair]))
    .filter(
      (item) =>
        ['BTC', 'LTC', 'XRP', 'ETH', 'DASH'].includes(item.firstCurrency) &&
        item.secondCurrency === 'PLN',
    );

  return cryptos;
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
    case 'DASH':
      return 'Dash';
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
