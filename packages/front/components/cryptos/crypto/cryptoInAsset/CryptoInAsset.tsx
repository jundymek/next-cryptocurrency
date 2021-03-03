import React, { useEffect, useRef, useState } from 'react';
import { CryptoData } from '../../Cryptos';
import { Icon } from 'coinmarketcap-cryptocurrency-icons';
import styled from 'styled-components';
// @ts-ignore
import bgImage from '../../../../assets/bg_circle1.svg';
import EditIcon from '../../../icons/EditIcon';
import CryptoInAssetEditForm from './CryptoInAssetEditForm';

interface CryptoProps {
  crypto: CryptoData;
  animate?: string;
  asset?: Asset;
}

interface Asset {
  currencyName: string;
  amount: number;
}

interface StyledLiProps {
  bgImage?: string;
}

const StyledLi = styled.li<StyledLiProps>`
  background: ${(props) => `url('${props.bgImage}')`};
  background-size: cover;
`;

const CryptoInAsset = React.memo<CryptoProps>(({ crypto, asset }) => {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const { firstCurrency, name, price } = crypto;
  const inputReference = useRef<HTMLInputElement>(null);
  console.log(asset)

  const handleToggleEdit = () => {
    setIsEditVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (isEditVisible) {
      inputReference.current?.focus();
    }
  }, [isEditVisible]);

  if (asset?.amount) {
    return (
      <StyledLi
        className="group my-10 sm:m-10 w-full sm:w-80 h-80 rounded-md relative flex flex-col items-center justify-between border border-gray-600 hover:border-gray-200 z-10 font-mono font-thin"
        bgImage={bgImage}
      >
        <button
          className="flex absolute -top-8 left-8  sm:-top-8 sm:-left-8 w-16 h-16 z-20 bg-white rounded-full transform opacity-0 group-hover:opacity-100 duration-1000 group-hover:scale-110  justify-center items-center"
          onClick={handleToggleEdit}
        >
          <EditIcon />
        </button>
        <div className="absolute -top-8 left-8  sm:-top-8 sm:-left-8 z-10 transform group-hover:scale-110 duration-1000 group-hover:opacity-0">
          <Icon i={firstCurrency.toLowerCase()} size={64} />
        </div>
        <div className="w-full h-2/5">
          <div className="flex flex-col justify-center items-center bg-black bg-opacity-25 rounded-t-md h-full relative">
            <span className="absolute top-0 right-0 p-1 bg-white text-black">{asset.amount}</span>
            <span className="absolute bottom-0 right-4 text-md pt-10">{price} PLN</span>
            <h2 className="text-4xl font-bold text-white">{firstCurrency}</h2>
            <span className="text-lg text-white">{name}</span>
          </div>
        </div>
        <p className="text-4xl text-center mb-8 p-2 bg-white text-black transform rotate-1">
          {parseFloat((asset?.amount * parseInt(price)).toPrecision(5))}{' '}
          <span className="text-xs">PLN</span>
        </p>
        <div className="flex flex-col items-end w-full mt-6 mr-6">
          <p className="text-xl">
            8h change <span className="text-green-400">+24</span>%
          </p>
          <p className="text-xl">
            7d change <span className="text-red-600">-3.2</span>%
          </p>
        </div>
        <CryptoInAssetEditForm isActive={isEditVisible} crypto={crypto} asset={asset} />
      </StyledLi>
    );
  }
  return null;
});

export default CryptoInAsset;
