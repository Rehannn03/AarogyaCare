"use client";

import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxAvatar } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';
import Button from './Button'; // Reusable button component
import Link from 'next/link';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = ['Pricing', 'Features', 'About', 'Contact', 'Blog'];

  return (
    <nav
      variants={fadeIn}
      initial="hidden"
      animate="show"
      className="h-[72px] bg-[white] flex items-center justify-between px-6 md:pl-8 border-b-2 border-[#84CC16] relative z-[50]"
    >
      {/* Logo */}
      <div>
        <a href="/">
          <img src="/Hero/Logo.png" alt="Logo" className="w-[10em] object-cover" />
        </a>
      </div>

      {/* Navigation Links for Desktop */}
      <div className="hidden md:flex gap-[40px]">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={`/${link.toLowerCase()}`}
            className="font-medium lg:text-xl text-[#84CC16] hover:text-blue-600 hover:scale-105 transition-all duration-300 ease-in-out transform"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Avatar or SignUp Button for Desktop */}
      <div className="hidden md:flex items-center gap-4">
        {isLogin ? (
          <div className="flex items-center gap-4">
            <span className="text-black font-medium">Welcome, User</span>
            <div className="h-[60px] w-[60px] rounded-full overflow-hidden bg-white p-1">
              <RxAvatar className="text-[60px] object-cover" />
            </div>
          </div>
        ) : (
          <Button
            variant="primary"
            size="lg"
            className="mr-[2em] text-green-600 hover:bg-blue-300 hover:text-white transition-colors duration-200 hidden md:flex md:text-sm"
          >
            <Link href="/sign-up"> Sign Up</Link>
          </Button>
        )}
      </div>

      {/* Hamburger Menu for Mobile */}
      <button className="p-3 md:hidden" onClick={handleMenu}>
        <GiHamburgerMenu className="text-slate-600 text-xl" />
      </button>

      {/* Collapsible Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-white z-[100]"
          onClick={closeMenu} // Close the menu when clicking outside links
        >
          <div
            className="absolute top-0 right-0 m-4 cursor-pointer"
            onClick={handleMenu} // Close button to close the menu
          >
            <AiOutlineClose className="text-2xl text-gray-800" />
          </div>
          <div
            className="flex flex-col items-center mt-12"
            onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the background
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={`/${link.toLowerCase()}`}
                className="font-medium text-[#84CC16] text-xl py-3 hover:text-blue-600 hover:scale-105 transition-all duration-300 ease-in-out transform"
                onClick={closeMenu} // Close menu after clicking a link
              >
                {link}
              </Link>
            ))}
            <div className="flex justify-center mt-4">
              {isLogin ? (
                <div className="flex items-center gap-4">
                  <span className="text-black font-medium">Welcome, User</span>
                  <div className="h-[60px] w-[60px] rounded-full overflow-hidden bg-white p-1">
                    <RxAvatar className="text-[60px] object-cover" />
                  </div>
                </div>
              ) : (
                <div className="flex">
                  <Button
                    variant="primary"
                    size="lg"
                    className="justify-center text-green-600 hover:bg-blue-300 hover:text-white transition-colors duration-200"
                    onClick={closeMenu}
                  >
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;