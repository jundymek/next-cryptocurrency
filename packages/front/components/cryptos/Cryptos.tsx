import React from 'react';
import CryptosAuthUser from './cryptosAuthUser/CryptosAuthUser';
import CryptosNotAuthUser from './CryptosNotAuthUser';
import { useAuthState } from '../../context/authContext';
import LoadingSpinner from '../shared/loadingSpinner/LoadingSpinner';
import { ClippedSection } from '../shared/styledComponents/ClippedSection';
// @ts-ignore
import bgImage from '../../assets/btc_wallet.jpg';
import { useCryptosState } from '../../context/cryptosContext';

export interface Currency {
  symbol: string;
  name: string;
}

export interface CryptoData {
  pair: string;
  firstCurrency: string;
  secondCurrency: string;
  name: string;
  price: string;
}

const Cryptos = React.memo(() => {
  const mainPageCurrences = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'LTC', name: 'Litecoin' },
    { symbol: 'XRP', name: 'Ripple' },
    { symbol: 'ETH', name: 'Ethereum' },
  ];

  const { token } = useAuthState();
  const { cryptos, error } = useCryptosState();

  if (error) return <div>{error}Jakiś tam error na serwerze</div>;

  if (!cryptos)
    return (
      <div className="flex w-full justify-center bg-white h-screen">
        <LoadingSpinner />
      </div>
    );

  const visibleCryptos = cryptos.filter((item: CryptoData) =>
    mainPageCurrences.find((el) => el.symbol === item.firstCurrency),
  );

  return (
    <ClippedSection className="bg-gray-700" bgImage={bgImage}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:py-40">
        {token ? (
          <CryptosAuthUser cryptos={cryptos} />
        ) : (
          <CryptosNotAuthUser visibleCryptos={visibleCryptos} />
        )}
      </div>
    </ClippedSection>
  );
});

export default Cryptos;
