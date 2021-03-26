import React from 'react';
import { CryptoData } from '../../Cryptos';
import { Asset } from '../../../../context/assetContext';
import AssetTableItem from './AssetTableItem';

interface AssetTableProps {
  cryptos: CryptoData[];
  animate?: string;
  assets: Asset[] | undefined;
}

export interface FinalAsset {
  id: number;
  amount: number;
  currency: string;
  currencyName: string;
  price: string;
}

const AssetTable = ({ cryptos, assets }: AssetTableProps) => {
  const getAsset = (currency: string) => {
    return assets?.filter((item) => item.currencyName === currency)[0];
  };

  const myAssets = cryptos.reduce((result: FinalAsset[], item) => {
    const asset = getAsset(item.firstCurrency);
    if (asset)
      result.push({
        id: asset.id,
        amount: asset.amount,
        currency: asset.currencyName,
        currencyName: item.name,
        price: item.price,
      });
    return result;
  }, []);

  console.log(myAssets);

  return (
    <table className="w-full table-auto rounded-md px-4 mt-10 row-span-2">
      <thead>
        <tr className="border-t border-b border-gray-300 h-10 text-center text-sm sm:text-2xl">
          <th>Crypto</th>
          <th>Amount</th>
          <th>Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="rounded-md">
        <tr className="w-full px-4 h-2"></tr>
        {myAssets.map((asset) => (
          <AssetTableItem key={asset.id} asset={asset} />
        ))}
      </tbody>
    </table>
  );
};

export default AssetTable;
