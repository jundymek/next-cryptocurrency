import React from 'react';

interface FeatureProps {
  title: string;
  text: string;
}

const Feature = ({ title, text }: FeatureProps) => {
  return (
    <div className="flex flex-col w-screen justify-center items-center">
      <div className="w-1/2">
        <h2 className="font-bold text-gray-700 text-2xl sm:text-5xl tracking-wide">{title}</h2>
        <p className="mt-4 text-gray-500 text-md sm:text-2xl">{text}</p>
      </div>
    </div>
  );
};

export default Feature;
