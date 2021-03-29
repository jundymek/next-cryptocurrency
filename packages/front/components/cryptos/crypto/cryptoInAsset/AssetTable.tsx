import React, { useState } from 'react';
import { CryptoData } from '../../Cryptos';
import { Asset } from '../../../../context/assetContext';
import AssetTableItem from './AssetTableItem';
import styled from 'styled-components';

interface AssetTableProps {
  cryptos: CryptoData[];
  animate?: string;
  assets: Asset[] | undefined;
}

type SortedBy = 'currency' | 'amount' | 'value' | null;
type SortDirection = 'ascending' | 'descending';

interface StyledSpanProps {
  sorted: SortedBy;
  direction: SortDirection;
  variant: 'currency' | 'amount' | 'value';
}

export interface FinalAsset {
  id: number;
  amount: number;
  currency: string;
  currencyName: string;
  price: string;
  value: number;
}

const StyledSpan = styled.span<StyledSpanProps>`
  position: relative;
  &::before {
    position: absolute;
    display: ${(props) => (props.variant === props.sorted ? 'block' : 'none')};
    left: -20px;
    top: 0;
    color: #fff;
    font-size: 18px;
    content: '${(props) => (props.direction === 'ascending' ? '\\2191' : `\\2193`)}';
  }
`;

const AssetTable = ({ cryptos, assets }: AssetTableProps) => {
  const [sortedBy, setSortedBy] = useState<SortedBy>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('ascending');
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

  return (
    <table className="w-full table-auto rounded-md px-4 mt-10 row-span-2">
      <thead>
        <tr className="border-t border-b border-gray-300 h-10 text-center text-xs sm:text-sm">
          <th aria-sort={sortedBy === 'currency' ? sortDirection : 'none'}>
            <StyledSpan
              role="button"
              onClick={() => setSorted('currency')}
              variant={'currency'}
              sorted={sortedBy}
              direction={sortDirection}
            >
              Crypto
            </StyledSpan>
          </th>
          <th aria-sort={sortedBy === 'amount' ? sortDirection : 'none'}>
            <StyledSpan
              role="button"
              onClick={() => setSorted('amount')}
              variant={'amount'}
              sorted={sortedBy}
              direction={sortDirection}
            >
              Amount
            </StyledSpan>
          </th>
          <th aria-sort={sortedBy === 'value' ? sortDirection : 'none'}>
            <StyledSpan
              role="button"
              onClick={() => setSorted('value')}
              variant={'value'}
              sorted={sortedBy}
              direction={sortDirection}
            >
              Value
            </StyledSpan>
          </th>
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
