import React, { useState } from 'react';
import { CryptoData } from '../Cryptos';
import { Icon } from 'coinmarketcap-cryptocurrency-icons';

interface CryptoProps {
  crypto: CryptoData;
  animate?: string;
  asset?: Asset;
}

interface Asset {
  currencyName: string;
  amount: number;
}

const CryptoAuth = React.memo<CryptoProps>(({ crypto, animate, asset }) => {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const { firstCurrency, name, price } = crypto;

  const handleToggleEdit = () => {
    setIsEditVisible((prevState) => !prevState);
  };

  if (asset?.amount) {
    return (
      <li className="flex flex-col sm:flex-row items-center">
        <div
          className={`flex items-center py-4 w-full max-w-md mx-auto bg-blue-100 m-2 p-2 rounded-md relative ${animate}`}
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
              <p>
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
            {isEditVisible && (
              <form
                className="flex items-center justify-center sm:absolute -right-48"
                method="POST"
              >
                <div className="rounded-md w-32 px-4 flex flex-col pt-6 top-0 border bg-blue-300">
                  <input
                    id="newAmount"
                    type="number"
                    name="newAmount"
                    defaultValue={asset.amount.toString()}
                    autoComplete="newAmount"
                    className="
                        text-gray-800 appearance-none text-center
                        border-b-2 border-gray-100
                        focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    required
                  />
                  <div className="flex justify-between p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-700"
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
                        className="w-6 h-6 text-gray-100"
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
                </div>
              </form>
            )}
          </div>
        </div>
      </li>
    );
  }
  return null;
});

export default CryptoAuth;
