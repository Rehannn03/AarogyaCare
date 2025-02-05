"use client"

import { useState, useEffect, useRef } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { RxAvatar } from "react-icons/rx"
import { AiOutlineClose } from "react-icons/ai"
import Button from "./Button"
import Link from "next/link"
import { useUserStore } from "@/stores/store"
import { LayoutDashboard, User, LogOut } from "lucide-react"

const Navbar = () => {
  const { user, signOut } = useUserStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userImg, setUserImg] = useState(user?.avatar || "/default-avatar.png")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const timeoutRef = useRef(null)

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    setUserImg(user?.avatar || "/default-avatar.png")
  }, [user])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navLinks = ["Pricing", "Features", "About", "Contact", "Blog"]

  const handleDropdownOpen = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsDropdownOpen(true)
  }

  const handleDropdownClose = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 800) // 300ms delay before closing
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="h-[72px] bg-[white] flex items-center justify-between px-6 md:pl-8 border-b-2 border-[#84CC16] relative z-[50]">
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
        {user ? (
          <div
            className="flex items-center gap-6 relative"
            ref={dropdownRef}
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            <div className="h-[50px] w-[50px] rounded-full overflow-hidden bg-white p-1 cursor-pointer">
              {userImg ? (
                <img
                  src={userImg || "/placeholder.svg"}
                  alt="Profile"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <RxAvatar size={40} className="items-center" />
              )}
            </div>
            {isDropdownOpen && (
              <div
                className="absolute right-0 top-[60px] w-48 bg-white rounded-md shadow-lg py-1 z-10"
                onMouseEnter={handleDropdownOpen}
                onMouseLeave={handleDropdownClose}
              >
                <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <LayoutDashboard className="inline-block w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User className="inline-block w-4 h-4 mr-2" />
                  Profile
                </Link>
                <button
                  onClick={signOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="inline-block w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button
            variant="primary"
            size="lg"
            className="mr-[2em] text-green-600 hover:bg-blue-300 hover:text-white transition-colors duration-200 hidden md:flex md:text-sm"
          >
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        )}
      </div>

      {/* Hamburger Menu for Mobile */}
      <button className="p-3 md:hidden" onClick={handleMenu}>
        <GiHamburgerMenu className="text-slate-600 text-xl" />
      </button>

      {/* Collapsible Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-[100]" onClick={closeMenu}>
          <div className="absolute top-0 right-0 m-4 cursor-pointer" onClick={handleMenu}>
            <AiOutlineClose className="text-2xl text-gray-800" />
          </div>
          <div className="flex flex-col items-center mt-12">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={`/${link.toLowerCase()}`}
                className="font-medium text-[#84CC16] text-xl py-3 hover:text-blue-600 hover:scale-105 transition-all duration-300 ease-in-out transform"
                onClick={closeMenu}
              >
                {link}
              </Link>
            ))}
            <div className="flex flex-col items-center mt-4">
              {user ? (
                <>
                  <Link href="/profile" className="mb-2">
                    <div className="flex items-center gap-4">
                      <span className="text-black font-medium">Welcome, {user.name}</span>
                      <div className="h-[60px] w-[60px] rounded-full overflow-hidden bg-white p-1">
                        <img
                          src={user.avatar || "/default-avatar.png"}
                          alt="Profile"
                          className="h-full w-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </Link>
                  <Link href="/dashboard" className="py-2 text-gray-700 hover:text-blue-600">
                    <LayoutDashboard className="inline-block w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link href="/profile" className="py-2 text-gray-700 hover:text-blue-600">
                    <User className="inline-block w-4 h-4 mr-2" />
                    Profile
                  </Link>
                  <button onClick={signOut} className="py-2 text-gray-700 hover:text-blue-600">
                    <LogOut className="inline-block w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="justify-center text-green-600 hover:bg-blue-300 hover:text-white transition-colors duration-200"
                  onClick={closeMenu}
                >
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

