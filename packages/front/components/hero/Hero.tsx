import React from 'react';

const Hero = () => {
  return (
    <section className="self-start z-10 text-center lg:text-left lg:w-3/5 p-4">
      <div className="flex flex-col lg:w-3/4">
        <h2 className="font-bold text-gray-100 text-2xl sm:text-4xl sm:leading-snug tracking-wide">
          Simplest Bitcoin & cryptocurrency portfolio tracker. No redundant options.{' '}
          <span className="tracking-widest sm:text-4xl text-yellow-500">
            Keep It Simple - stupid.
          </span>
        </h2>
        <p className="mt-4 text-gray-400 text-lg sm:text-2xl leading-relaxed">
          Sign up, add cryptos to your portfolio and monitor your wallet ballance in real time. No
          redundant options - no pain.
        </p>
      </div>
    </section>
  );
};

export default Hero;
