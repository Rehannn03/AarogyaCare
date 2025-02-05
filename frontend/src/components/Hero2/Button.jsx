"use client"

import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', disabled = false, variant = 'primary', size = 'md' }) => {

  const baseStyle = 'px-4 py-2 font-semibold rounded-full focus:outline-none focus:ring';
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-300',
  };

  
  const sizes = {
    sm: 'text-sm py-1 px-3',
    md: 'text-md py-2 px-4',
    lg: 'text-lg py-3 px-6',
    xl: 'text-xl py-6 px-16'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
