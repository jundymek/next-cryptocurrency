import React, { useState } from 'react';
import Options from '../options/Options';
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
  isVisible: boolean;
}

export interface CryptoData {
  pair: string;
  firstCurrency: string;
  secondCurrency: string;
  name: string;
  price: string;
}

const Cryptos = React.memo(() => {
  const [listOfCurrences, setListOfCurrences] = useState<Currency[]>([
    { symbol: 'BTC', name: 'Bitcoin', isVisible: true },
    { symbol: 'LTC', name: 'Litecoin', isVisible: true },
    { symbol: 'XRP', name: 'Ripple', isVisible: true },
    { symbol: 'ETH', name: 'Ethereum', isVisible: true },
    { symbol: 'DASH', name: 'Dash', isVisible: true },
  ]);

  const { token } = useAuthState();
  const { cryptos, error } = useCryptosState();

  if (error) return <div>{error}Jakiś tam error na serwerze</div>;

  if (!cryptos)
    return (
      <div className="flex w-full justify-center bg-white h-screen">
        <LoadingSpinner />
      </div>
    );

  const visibleCryptos = cryptos.filter((item: CryptoData) => {
    return listOfCurrences.find((el) => el.symbol === item.firstCurrency)?.isVisible;
  });

  return (
    <ClippedSection className="bg-gray-900" bgImage={bgImage}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:py-40">
        {token ? (
          <CryptosAuthUser visibleCryptos={visibleCryptos} />
        ) : (
          <CryptosNotAuthUser visibleCryptos={visibleCryptos} />
        )}

        <Options listOfCurrences={listOfCurrences} setListOfCurrences={setListOfCurrences} />
      </div>
    </ClippedSection>
  );
});

export default Cryptos;
