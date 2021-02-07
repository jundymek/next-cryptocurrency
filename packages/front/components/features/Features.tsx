import React from 'react';

const Features = () => {
  return (
    <section className="clipped bg-yellow-600 z-10">
      <div className="flex items-center justify-center container">
        <div className="w-1/2">Right side</div>
        <div className="flex flex-col w-1/2">
          <h2 className="font-bold text-gray-700 text-2xl sm:text-5xl tracking-wide">
            The world's most popular Bitcoin & cryptocurrency portfolio tracker. Now with trading.
          </h2>
          <p className="mt-4 text-gray-500 text-md sm:text-2xl">
            Track your portfolio, get Blockfolio Signal updates from top teams, and buy and sell
            crypto with zero fees.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;