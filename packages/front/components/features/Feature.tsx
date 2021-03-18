import React from 'react';

interface FeatureProps {
  title: string;
  text: string;
  img: string;
}

const Feature = ({ title, text, img }: FeatureProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center w-full  mb-12">
      <div className="flex flex-col justify-center items-center">
        <div className="p-4 sm:w-2/3 relative">
          <span className="absolute top-0 left-4 uppercase mb-2 text-sm text-gray-400">
            Key features
          </span>
          <h2 className="font-bold text-2xl sm:text-5xl tracking-wide pt-2">{title}</h2>
          <p className="my-4 text-gray-400 text-md sm:text-2xl">{text}</p>
        </div>
      </div>
      <div className="w-1/3">
        <img src={img} alt="" className="max-w-96 max-h-96" />
      </div>
    </div>
  );
};

export default Feature;
