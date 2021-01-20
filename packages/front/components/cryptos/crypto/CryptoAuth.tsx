import React, { useCallback, useEffect, useState } from 'react';
import { CryptoData } from '../Cryptos';
import { Icon } from 'coinmarketcap-cryptocurrency-icons';

interface CryptoProps {
  crypto: CryptoData;
  animate?: string;
  token: string;
}

interface Asset {
  currencyName: string;
  amount: number;
}

const CryptoAuth = React.memo<CryptoProps>(({ crypto, animate, token }) => {
  const [assetAmount, setAssetAmount] = useState<number>(0);
  const { firstCurrency, name, price } = crypto;

  const assetValue: number = assetAmount * parseInt(price);

  async function getAssets() {
    if (token) {
      const response = await fetch('http://localhost:3001/api/assets', {
        headers: {
          Authorization: token,
        },
      });
      const assets: Asset[] = await response.json();
      const thisAsset = assets.find((asset) => asset.currencyName === crypto.firstCurrency);
      if (thisAsset) {
        setAssetAmount(thisAsset.amount);
      }
    }
  }

  const memoizedCallback = useCallback(() => {
    getAssets();
  }, []);

  useEffect(() => {
    memoizedCallback();
  }, [memoizedCallback]);
  if (assetAmount > 0) {
    return (
      <li className="flex items-center">
        <div
          className={`flex items-center py-4 w-full max-w-md mx-auto bg-blue-100 m-2 p-2 rounded-md ${animate}`}
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <div className="mr-2">
                <Icon i={firstCurrency.toLowerCase()} size={32} />
              </div>
              <div>
                <p className="font-mono">{name}</p>
                <p className="font-bold text-xs">{firstCurrency}</p>
                <p className="text-sm md:text-sm">
                  {price} <span className="text-xs">PLN</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <p>{assetValue} PLN</p>
              <p>
                {assetAmount} {firstCurrency}
              </p>
            </div>
          </div>
        </div>
      </li>
    );
  }
  return null;
});

export default CryptoAuth;
