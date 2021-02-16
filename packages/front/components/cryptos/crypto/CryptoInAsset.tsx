import React, { useEffect, useRef, useState } from 'react';
import { CryptoData } from '../Cryptos';
import { Icon } from 'coinmarketcap-cryptocurrency-icons';
import styled from 'styled-components';
// @ts-ignore
import bgImage from '../../../assets/bg_circle1.svg';
import EditIcon from '../../icons/EditIcon';

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

interface StyledFormProps {
  isEditVisible: boolean;
}

const StyledLi = styled.li<StyledLiProps>`
  background: ${(props) => `url('${props.bgImage}')`};
  background-size: cover;
`;

const StyledForm = styled.div<StyledFormProps>`
  transition: 1s;
  opacity: ${(props) => (props.isEditVisible ? 1 : 0)};
  transform: ${(props) => props.isEditVisible && `translateY(4rem)`};
`;

const CryptoInAsset = React.memo<CryptoProps>(({ crypto, animate, asset }) => {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [animates, setAnimate] = useState('');
  const { firstCurrency, name, price } = crypto;
  const inputReference = useRef<HTMLInputElement>(null);

  const handleToggleEdit = () => {
    setIsEditVisible((prevState) => !prevState);
  };

  useEffect(() => {
    setAnimate('animate-pulse');
    setTimeout(() => {
      setAnimate('');
    }, 1000);
    return () => {
      clearTimeout;
    };
  }, [price]);

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
          className="hidden sm:flex absolute -top-24 left-28  sm:-top-8 sm:-left-8 w-16 h-16 z-20 bg-white rounded-full transform opacity-0 group-hover:opacity-100 duration-1000 group-hover:scale-110  justify-center items-center"
          onClick={handleToggleEdit}
        >
          <EditIcon />
        </button>
        <div className="absolute -top-8 left-8  sm:-top-8 sm:-left-8 z-10 transform group-hover:scale-110 duration-1000 group-hover:opacity-0">
          <Icon i={firstCurrency.toLowerCase()} size={64} />
        </div>
        <div className="w-full h-2/5">
          <div className="flex flex-col justify-center items-center bg-black bg-opacity-25 rounded-t-md h-full relative">
            <span className="absolute top-0 right-4 text-xl">{asset.amount}</span>
            <span className="absolute bottom-0 right-4 text-md pt-10">{price} PLN</span>
            <h2 className="text-4xl font-bold text-white">{firstCurrency}</h2>
            <span className="text-lg text-white">{name}</span>
          </div>
        </div>
        <p className="text-4xl text-center mb-8 text-gray-100">
          {asset?.amount * parseInt(price)} <span className="text-xs">PLN</span>
        </p>
        <div className="flex flex-col items-end w-full mt-6 mr-6">
          <p className="text-xl">
            8h change <span className="text-green-400">+24</span>%
          </p>
          <p className="text-xl">
            7d change <span className="text-red-600">-3.2</span>%
          </p>
        </div>
        <StyledForm className="absolute bottom-0 left-0 w-full z-0" isEditVisible={isEditVisible}>
          <form action="">
            <div className="flex w-full items-center font-mono">
              <label htmlFor="newAmount" className="w-2/3 px-2">
                {firstCurrency} amount
              </label>
              <input
                id="newAmount"
                ref={inputReference}
                type="number"
                name="newAmount"
                defaultValue={asset.amount.toString()}
                className="block w-1/3 py-3 px-1 mb-2
                        text-white appearance-none text-center 
                        border-b-2 border-gray-100 bg-transparent
                        focus:text-green-500 focus:outline-none focus:border-gray-200"
                required
              />
            </div>
          </form>
        </StyledForm>
        {/* <div
          className={`flex items-center py-4 w-full max-w-md mx-auto bg-blue-300 m-2 p-2 rounded-md relative ${animates}`}
        >
          <div className="flex justify-between items-center w-full ">
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
              <p>{asset?.amount * parseInt(price)} PLN</p>
              <p className="text-right">
                {asset.amount} {firstCurrency}
              </p>
            </div>
            {!isEditVisible && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 text-blue-500 absolute top-2 right-2"
                onClick={handleToggleEdit}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            )}
          </div>
        </div> */}
        {/* {isEditVisible && (
          <form
            className="flex items-center justify-center w-full bg-gray-100 border border-gray-200 rounded-md relative my-1"
            method="POST"
          >
            <p className="absolute -top-2 left-2 text-xs font-mono bg-white underline">Edit</p>
            <div className="flex w-full items-center font-mono">
              <label htmlFor="newAmount" className="w-2/3 px-2">
                {firstCurrency} amount
              </label>
              <input
                id="newAmount"
                ref={inputReference}
                type="number"
                name="newAmount"
                defaultValue={asset.amount.toString()}
                className="block w-1/3 py-3 px-1 mb-2
                        text-gray-800 appearance-none text-center 
                        border-b-2 border-gray-100 bg-gray-100
                        focus:text-green-500 focus:outline-none focus:border-gray-200"
                required
              />
            </div>
            <div className="flex flex-col justify-between p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-yellow-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              <button onClick={handleToggleEdit} title="cancel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500 absolute -top-2 -right-2 bg-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        )} */}
      </StyledLi>
    );
  }
  return null;
});

export default CryptoInAsset;
