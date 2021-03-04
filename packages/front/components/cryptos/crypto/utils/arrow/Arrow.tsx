import React, { useEffect, useState } from 'react';

interface ArrowProps {
  pair: string;
  currentPrice: string;
}

export enum ArrowEnum {
  Up = 'UP',
  Down = 'DOWN',
  Neutral = 'NEUTRAL',
}

const Arrow = React.memo<ArrowProps>(({ pair, currentPrice }) => {
  const [arrow, setArrow] = useState<ArrowEnum | undefined>(undefined);
  const [arrowClass, setArrowClass] = useState('');

  const getArrow = async () => {
    try {
      const data = await fetch(`https://api.bitbay.net/rest/trading/stats/${pair}`);
      const res = await data.json();
      const price24h = parseFloat(res.stats.r24h);

      if (price24h < parseFloat(currentPrice)) {
        setArrowClass('text-green-500');
        setArrow(ArrowEnum.Up);
      } else {
        setArrowClass('text-red-500');
        setArrow(ArrowEnum.Down);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getArrow();
    return () => {
      setArrow(undefined);
      setArrowClass('')
    };
  }, []);

  if (!arrow) return null;

  return (
    <div className={`w-6 h-6 mr-2 fill-current ${arrowClass}`}>
      {arrow === ArrowEnum.Up ? (
        <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
          <title />
          <path d="M90,15.75H66a6,6,0,0,0,0,12h9.5156L54,49.2656,34.2422,29.5078a5.9979,5.9979,0,0,0-8.4844,0l-24,24a5.9994,5.9994,0,0,0,8.4844,8.4844L30,42.2344,49.7578,61.9922a5.9979,5.9979,0,0,0,8.4844,0L84,36.2344V45.75a6,6,0,0,0,12,0v-24A5.9966,5.9966,0,0,0,90,15.75Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
          <title />
          <path d="M90,42a5.9966,5.9966,0,0,0-6,6v9.5156L58.2422,31.7578a6.0429,6.0429,0,0,0-6.9258-1.125L31.1836,40.6992,10.2422,19.7578a5.9994,5.9994,0,0,0-8.4844,8.4844l24,24a6.0144,6.0144,0,0,0,6.9258,1.125L52.8164,43.3008,75.5156,66H66a6,6,0,0,0,0,12H90a5.9966,5.9966,0,0,0,6-6V48A5.9966,5.9966,0,0,0,90,42Z" />
        </svg>
      )}
    </div>
  );
});

export default Arrow;
