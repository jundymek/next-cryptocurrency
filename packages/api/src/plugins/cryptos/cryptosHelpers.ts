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
        [
          'BTC',
          'LTC',
          'XRP',
          'ETH',
          'DASH',
          'BCC',
          'LSK',
          'GAME',
          'BTG',
          'XIN',
          'ZEC',
          'GNT',
          'OMG',
          'REPv2',
          'ZRX',
          'PAY',
          'BAT',
          'NEU',
          'TRX',
          'AMLT',
          'EXY',
          'BOB',
          'LML',
          'BSV',
          'BCP',
          'XBX',
          'XLM',
          'ALG',
          'LINK',
          'MKR',
          'NPXS',
          'SRN',
          'GGC',
          'QARK',
          'USDT',
          'USDC',
        ].includes(item.firstCurrency) && item.secondCurrency === 'PLN',
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
    case 'BCC':
      return 'Bitcoin Cash';
    case 'LSK':
      return 'Lisk';
    case 'GAME':
      return 'Game Credits';
    case 'BTG':
      return 'Bitcoin Gold';
    case 'XIN':
      return 'Infinity Economics';
    case 'ZEC':
      return 'Zcash';
    case 'GNT':
      return 'GOLEM';
    case 'OMG':
      return 'OmiseGO';
    case 'REPv2':
      return 'Augur v2';
    case 'ZRX':
      return 'Ox';
    case 'PAY':
      return 'TenX';
    case 'BAT':
      return 'Basic Attention Token';
    case 'NEU':
      return 'Neumark';
    case 'TRX':
      return 'Tron';
    case 'AMLT':
      return 'AMLT';
    case 'EXY':
      return 'Experty';
    case 'BOB':
      return "Bob's Repair";
    case 'LML':
      return 'Lisk Mashine Learning';
    case 'BSV':
      return 'Bitcoin SV';
    case 'BCP':
      return 'Blockchain Poland';
    case 'XBX':
      return 'Bitex Global XBX Coin';
    case 'XLM':
      return 'Stellar';
    case 'ALG':
      return 'Algory';
    case 'LINK':
      return 'Chainlink';
    case 'MKR':
      return 'Maker';
    case 'NPXS':
      return 'Pundi X';
    case 'SRN':
      return 'Sirin Labs';
    case 'GGC':
      return 'Global Game Coin';
    case 'QARK':
      return 'QANplatform';
    case 'USDT':
      return 'Tether';
    case 'USDC':
      return 'USD Coin';
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
