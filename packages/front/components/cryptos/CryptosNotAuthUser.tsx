import React from 'react';
import CryptoNotAuth from './crypto/CryptoNotAuth';
import { CryptoData } from './Cryptos';

interface CryptoNotAuthUserProps {
  visibleCryptos: CryptoData[];
}

const CryptosNotAuthUser = React.memo<CryptoNotAuthUserProps>(({ visibleCryptos }) => {
  return (
    <ul className="list-none mt-4 p-2 w-full">
      {visibleCryptos?.map((item: CryptoData) => (
        <CryptoNotAuth key={item.name} crypto={item} />
      ))}
    </ul>
  );
});

export default CryptosNotAuthUser;
