import React from 'react';

interface ButtonProps {
  handleFunction?: () => void;
  text: string;
  type?: 'submit' | 'button';
}

const ActionButton = ({ handleFunction, text, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      className="md:font-bold font-mono tracking-wide border rounded-sm border-gray-200 border-opacity-80 hover:border-gray-400 hover:text-gray-400 transform duration-300 p-2 md:p-4 bg-transparent w-full md:w-48"
      onClick={handleFunction}
    >
      <span className="transform text-center uppercase">{text}</span>
    </button>
  );
};

export default ActionButton;
