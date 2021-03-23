import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
  handleFunction?: () => void;
  text: string;
  type?: 'submit' | 'button';
  variant?: 'action' | 'cancel';
}

const ActionButton = ({
  handleFunction,
  text,
  type = 'button',
  variant = 'action',
}: ButtonProps) => {
  const buttonStyle = clsx(
    'text-white sm:text-2xl font-bold capitalize  tracking-wide border border-gray-400 rounded-sm hover:scale-105 transform duration-300 p-2 sm:p-4  w-full sm:w-56',
    variant === 'cancel'
      ? 'bg-transparent border-gray-400 hover:border-gray-200 text-gray-400 hover:text-gray-200'
      : 'bg-yellow-600 hover:bg-blue-600',
  );
  return (
    <button type={type} className={buttonStyle} onClick={handleFunction}>
      {text}
    </button>
  );
};

export default ActionButton;
