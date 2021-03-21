import React from 'react';
import CryptosAuthUser from './cryptosAuthUser/CryptosAuthUser';
import CryptosNotAuthUser from './CryptosNotAuthUser';
import { useAuthState } from '../../context/authContext';
import { ClippedSection } from '../shared/styledComponents/ClippedSection';
// @ts-ignore
import bgImage from '../../assets/btc_wallet.jpg';
import { useCryptosState } from '../../context/cryptosContext';
import { useWindowWidth } from '../../customHooks/useWindowWidth';

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
  const { cryptos, error, isLoading } = useCryptosState();

  console.log(isLoading);

  if (error) return <div>{error}Jakiś tam error na serwerze</div>;

  const width = useWindowWidth();

  const visibleCryptos = cryptos?.filter((item: CryptoData) =>
    mainPageCurrences.find((el) => el.symbol === item.firstCurrency),
  );

  return (
    <ClippedSection className="bg-gray-700 py-6 sm:py-0" bgImage={bgImage} windowWidth={width}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:py-28">
        {token ? (
          <CryptosAuthUser cryptos={cryptos} />
        ) : (
          <CryptosNotAuthUser visibleCryptos={visibleCryptos} isLoading={isLoading} />
        )}
      </div>
    </ClippedSection>
  );
});

export default Cryptos;
