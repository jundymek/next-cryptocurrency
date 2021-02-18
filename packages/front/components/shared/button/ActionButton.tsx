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
      className="group font-bold font-mono tracking-wide border rounded-md border-white border-opacity-80 hover:border-gray-400 hover:text-gray-400 transform duration-300 p-2 sm:p-6 bg-transparent w-24 sm:w-48"
      onClick={handleFunction}
    >
      <span className="transform group-hover:text-indigo-500 text-center uppercase">{text}</span>
    </button>
  );
};

export default ActionButton;
