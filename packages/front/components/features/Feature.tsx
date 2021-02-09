import React from 'react';

interface FeatureProps {
  title: string;
  text: string;
}

const Feature = ({ title, text }: FeatureProps) => {
  return (
    <div className="flex flex-col w-screen justify-center items-center mt-4">
      <div className="p-4  sm:w-1/2 relative">
        <span className="absolute top-0 left-4 uppercase mb-2 text-sm text-gray-400">
          Key features
        </span>
        <h2 className="font-bold text-2xl sm:text-5xl tracking-wide pt-2">{title}</h2>
        <p className="mt-4 text-gray-400 text-md sm:text-2xl">{text}</p>
      </div>
    </div>
  );
};

export default Feature;
