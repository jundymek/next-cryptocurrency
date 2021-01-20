import React, { useEffect, useState } from 'react';
import CryptoAuth from './crypto/CryptoAuth';
import CryptoNotAuth from './crypto/CryptoNotAuth';
import { CryptoData } from './Cryptos';

interface CryptoAuthUserProps {
  visibleCryptos: CryptoData[];
  token: string;
}

interface Asset {
  currencyName: string;
  amount: number;
}

const CryptosAuthUser = React.memo<CryptoAuthUserProps>(({ visibleCryptos, token }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  async function getAssets() {
    if (token) {
      const response = await fetch('http://localhost:3001/api/assets', {
        headers: {
          Authorization: token,
        },
      });
      const assets: Asset[] = await response.json();
      const ass = assets.map((item) => item['currencyName']);
      setAssets(assets);
      console.log(ass);
    }
  }

  useEffect(() => {
    getAssets();
  }, []);
  return (
    <div className="w-full sm:w-6/12">
      <div>
        In portfolio:
        <ul className="list-none mt-4 p-2 w-full">
          {visibleCryptos?.map((item: CryptoData) => (
            <CryptoAuth key={item.name} crypto={item} token={token} />
          ))}
        </ul>
      </div>
      <div>
        Not in assets:
        <ul className="list-none mt-4 p-2 w-full">
          {visibleCryptos
            ?.filter(
              (item: CryptoData) =>
                !assets.some((asset) => asset.currencyName === item.firstCurrency),
            )
            .map((item: CryptoData) => (
              <CryptoNotAuth key={item.name} crypto={item} />
            ))}
        </ul>
      </div>
    </div>
  );
});

export default CryptosAuthUser;
