import React from 'react';

const Hero = () => {
  return (
    <section className="self-start z-10 text-center sm:text-left sm:w-3/5 p-4">
      <div className="flex flex-col ">
        <h2 className="font-bold text-gray-700 text-2xl sm:text-5xl tracking-wide">
          The world's most popular Bitcoin & cryptocurrency portfolio tracker. Now with trading.
        </h2>
        <p className="mt-4 text-gray-500 text-md sm:text-2xl">
          Track your portfolio, get Blockfolio Signal updates from top teams, and buy and sell
          crypto with zero fees.
        </p>
      </div>
    </section>
  );
};

export default Hero;
