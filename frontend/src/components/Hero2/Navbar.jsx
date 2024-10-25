"use client"

import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxAvatar } from 'react-icons/rx';
import Button from './Button'; // Reusable button component


const fadeIn = {
    hidden: {
      opacity: 0,
      y: -100,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3, // Delay between children animations
        duration: 0.5,
      },
    },
  };

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false); // State to manage login status

  const handleMenu = () => {
    // Handle mobile menu toggle (Hamburger menu)
    console.log('Hamburger menu clicked');
  };

  const handleLogin = () => {
    // Handle login action
    setIsLogin(!isLogin); // Toggle login state
  };

  const navLinks = ['Pricing', 'Features', 'About', 'Contact', 'Blog']; // Navigation links

  return (
    <nav variants={fadeIn}
    initial="hidden"
    animate="show" className='h-[72px] bg-[white] flex items-center justify-between px-6 md:pl-8 border-b-2 border-[#84CC16]'>
      {/* Logo */}
      <div>
        <a href="/">
        <img src="/Hero/Logo.png" alt="Logo" className='w-[10em] object-cover' />
        </a>
      </div>

      {/* Navigation Links */}
      <div className='hidden md:flex gap-[40px] '>
        {navLinks.map((link, index) => (
          <a 
            key={index} 
            href={`/${link.toLowerCase()}`} 
            className='font-medium lg:text-xl  text-[#84CC16] hover:text-blue-600 hover:scale-105 transition-all duration-300 ease-in-out transform '>
            {link}
          </a>
        ))}
      </div>

      {/* Avatar or SignUp Button */}
      <div className='hidden md:flex items-center gap-4'>
        {isLogin ? (
          // Show Avatar if logged in
          <div className='flex items-center gap-4'>
            <span className='text-black font-medium'>Welcome, User</span>
            <div className='h-[60px] w-[60px] rounded-full overflow-hidden bg-white p-1'>
              <RxAvatar className='text-[60px] object-cover' />
            </div>
          </div>
        ) : (
          // Show SignUp Button if not logged in
          <Button 
            onClick={handleLogin} 
            variant="primary" 
            size="lg" 
            className='mr-[2em]  text-green-600 hover:bg-blue-300 hover:text-white transition-colors duration-200'>
            Sign Up
          </Button>
        )}
      </div>

      {/* Hamburger Menu for Mobile */}
      <button className='p-3 md:hidden' onClick={handleMenu}>
        <GiHamburgerMenu className='text-slate-600 text-xl' />
      </button>
    </nav>
  );
};

export default Navbar;
