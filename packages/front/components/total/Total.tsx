import React from 'react';
import { CryptoData } from '../cryptos/Cryptos';
import { useGetTotal } from '../cryptos/utils/useGetTotal';

interface TotalProps {
  cryptos: CryptoData[] | undefined;
}

const Total = React.memo<TotalProps>(({ cryptos }) => {
  const total = useGetTotal(cryptos);
  return (
    <div className="text-center md:text-left sm:float-right font-bold md:mr-24 border-b py-4">
      <p className="text-black bg-white inline-block text-2xl sm:text-6xl p-2 my-2 font-mono transform rotate-3">
        TOTAL
      </p>
      <br />
      <p className="text-black bg-white inline-block text-4xl sm:text-8xl p-2 my-2 font-mono">
        {total}
      </p>
      <span className="text-black bg-white inline-block text-2xl sm:text-6xl p-2 my-2 font-mono mx-2 transform -rotate-3">
        PLN
      </span>
    </div>
  );
});

export default Total;
