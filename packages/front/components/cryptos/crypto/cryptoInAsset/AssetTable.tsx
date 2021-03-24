import React from 'react';
import { CryptoData } from '../../Cryptos';
import { Asset } from '../../../../context/assetContext';
import AssetTableItem from './AssetTableItem';

interface AssetTableProps {
  cryptos: CryptoData[];
  animate?: string;
  assets: Asset[] | undefined;
}

const AssetTable = ({ cryptos, assets }: AssetTableProps) => {
  const getAsset = (currency: string) => {
    return assets?.filter((item) => item.currencyName === currency)[0];
  };
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
        {cryptos?.map((item: CryptoData) => {
          if (getAsset(item.firstCurrency)) {
            return (
              <AssetTableItem key={item.name} crypto={item} asset={getAsset(item.firstCurrency)} />
            );
          }
          return null;
        })}
      </tbody>
    </table>
  );
};

export default AssetTable;
