import React from 'react';
import { useGetTotal } from '../cryptos/utils/useGetTotal';

const Total = () => {
  const total = useGetTotal();
  return (
    <div className="text-center sm:float-right font-bold py-4 self-end">
      <p className="text-black bg-gray-200 inline-block text-xl sm:text-4xl p-2 my-2 font-mono transform rotate-3">
        TOTAL
      </p>
      <br />
      <p className="text-black bg-gray-200 inline-block text-2xl sm:text-6xl p-2 my-2 font-mono">
        {total}
      </p>
      <span className="text-black bg-gray-200 inline-block text-xl sm:text-4xl p-2 my-2 font-mono mx-2 transform -rotate-3">
        PLN
      </span>
    </div>
  );
};

export default Total;
