import React, { useState } from 'react';
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
  value: number;
}

const AssetTable = ({ cryptos, assets }: AssetTableProps) => {
  const [sortedBy, setSortedBy] = useState<'currency' | 'amount' | 'value' | null>(null);
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');
  const getAsset = (currency: string) => {
    return assets?.filter((item) => item.currencyName === currency)[0];
  };

  const setSorted = (value: 'currency' | 'amount' | 'value') => {
    setSortedBy(value);
    if (sortDirection === 'ascending') {
      setSortDirection('descending');
    } else {
      setSortDirection('ascending');
    }
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
        value: parseFloat((asset.amount * parseFloat(item.price)).toPrecision(5)),
      });
    return result;
  }, []);

  const sortedAssets = React.useMemo(() => {
    let sortableItems = [...myAssets];
    if (sortedBy !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortedBy] < b[sortedBy]) {
          return sortDirection === 'ascending' ? -1 : 1;
        }
        if (a[sortedBy] > b[sortedBy]) {
          return sortDirection === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [myAssets, sortDirection]);

  console.log(myAssets);

  return (
    <table className="w-full table-auto rounded-md px-4 mt-10 row-span-2">
      <thead>
        <tr className="border-t border-b border-gray-300 h-10 text-center text-sm sm:text-2xl">
          <th>
            <button onClick={() => setSorted('currency')}>Crypto</button>
          </th>
          <th onClick={() => setSorted('amount')}>Amount</th>
          <th onClick={() => setSorted('value')}>Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="rounded-md">
        <tr className="w-full px-4 h-2"></tr>
        {sortedAssets.map((asset) => (
          <AssetTableItem key={asset.id} asset={asset} />
        ))}
      </tbody>
    </table>
  );
};

export default AssetTable;
