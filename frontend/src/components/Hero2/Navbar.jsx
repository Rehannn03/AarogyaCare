"use client"

import { useState, useEffect, useRef } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { RxAvatar } from "react-icons/rx"
import { AiOutlineClose } from "react-icons/ai"
import Button from "./Button"
import Link from "next/link"
import { useUserStore } from "@/stores/store"
import { LayoutDashboard, User, LogOut } from "lucide-react"
import { ChevronDown } from "lucide-react"
import setLanguageValue from "../../../action/set-language-action";
import { useTranslations } from "next-intl";
import apiClient from '@/api-client/apiClient';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image"
import { useLogout } from "@/features/use-logout"

const Navbar = () => {
  const { user,update} = useUserStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userImg, setUserImg] = useState(user?.avatar || "/default-avatar.png")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const timeoutRef = useRef(null)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const languageDropdownRef = useRef(null)
  const [currentLanguage, setCurrentLanguage] = useState("English")
  const t= useTranslations("NavBar")
  const { toast } = useToast();
  const router = useRouter();
  const [isLogOut,setIsLogOut]=useState(false)

  const {mutate:logout}= useLogout();

  
  console.log(user);
  
  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  useEffect(() => {
    if (!user) {
      setUserImg("/default-avatar.png"); 
    } else {
      setUserImg(user?.avatar || "/default-avatar.png"); 
    }
  }, [user]);  
  

  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  const navLinks = [
    { key: "pricing", path: "/pricing" },
    { key: "features", path: "/features" },
    { key: "about", path: "/about" },
    { key: "contact", path: "/contact" },
    { key: "blog", path: "/blog" },
  ];

  const handleDropdownOpen = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsDropdownOpen(true)
  }

  const handleDropdownClose = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 2500) // 300ms delay before closing
  }

  const handleLanguageDropdownOpen = () => {
    setIsLanguageDropdownOpen(true)
  }

  const handleLanguageDropdownClose = () => {
    timeoutRef.current = setTimeout(() => {
      setIsLanguageDropdownOpen(false)
    }, 2000)
    
  }

  const changeLanguage = (language) => {
    setCurrentLanguage(language);  // Update the language
    setLanguageValue(language);    // Make sure to set the language value for your app
    console.log("Language changed to:", language);  // Log the language being selected
};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="h-[72px] bg-[white] flex items-center justify-between px-6 md:pl-8 border-b-2 border-[#84CC16] relative z-[50] font-title">
      {/* Logo */}
      <div className="w-auto">
  <a href="/">
    <Image 
      src="/ArogayaCareLogo.svg" 
      width={1000} height={1000} 
      alt="Logo" 
      className="w-[200px] sm:w-[180px] md:w-[160px] lg:w-[140px] xl:w-[200px] h-auto object-cover"
    /> 
  </a>
</div>



      {/* Navigation Links for Desktop */}
      <div className="hidden md:flex gap-[40px]">
      {navLinks.map(({ key, path }) => (
          <a
            key={key}
            href={path}
            className="font-medium lg:text-xl text-[#84CC16] hover:text-blue-600 hover:scale-105 transition-all duration-300 ease-in-out transform"
          >
            {t(`${key}`)}
          </a>
        ))}
      </div>

      {/* Language Dropdown for Desktop */}
      

      {/* Avatar or SignUp Button for Desktop */}
      <div className="hidden md:flex items-center gap-4">
      <div className="hidden md:flex items-center mr-4">
        <div
          className="relative"
          ref={languageDropdownRef}
          onMouseEnter={handleLanguageDropdownOpen}
          onMouseLeave={handleLanguageDropdownClose}
        >
          <button
            className="flex items-center gap-2 text-[#84CC16] hover:text-blue-600 transition-colors duration-200"
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          >
            {currentLanguage=== "en" ? "English" : currentLanguage === "mr" ? "मराठी" : currentLanguage === "mr"? "தமிழ்" : "English"}
            <ChevronDown className="w-4 h-4" />
          </button>
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10">
              {["en", "mr", "tm"].map((language) => (
                <button
                  key={language}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => changeLanguage(language)}
                >
                  {language}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
        {user ? (
          <div
            className="flex items-center gap-6 relative"
            ref={dropdownRef}
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            <div className="h-[50px] w-[50px] rounded-full overflow-hidden bg-white p-1 cursor-pointer">
              {userImg ? (
                <Image
                width={28}
                height={28}
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
                  {t("dashboard")}
                </Link>
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User className="inline-block w-4 h-4 mr-2" />
                  {t("profile")}
                </Link>
                <button
                  onClick={()=>{logout()}}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="inline-block w-4 h-4 mr-2" />
                  {t("signOut")}
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
            <Link href="/sign-up">{t("signUp")}</Link>
          </Button>
        )}
      </div>

      {/* Hamburger Menu for Mobile */}
      <button className="p-3 md:hidden" onClick={handleMenu}>
        <GiHamburgerMenu className="text-slate-600 text-xl" />
      </button>

      {/* Collapsible Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-[100]" >
          <div className="absolute top-0 right-0 m-4 cursor-pointer" onClick={handleMenu}>
            <AiOutlineClose className="text-2xl text-gray-800" />
          </div>
          <div className="flex flex-col items-center mt-12">
          {navLinks.map(({ key, path }) => (
          <a
            key={key}
            href={path}
                className="font-medium text-[#84CC16] text-xl py-3 hover:text-blue-600 hover:scale-105 transition-all duration-300 ease-in-out transform"
              >
                 {t(`${key}`)}
              </a>
            ))}
            <div
          className="relative"
          ref={languageDropdownRef}
          onMouseEnter={handleLanguageDropdownOpen}
          onMouseLeave={handleLanguageDropdownClose}
        >
          <button
            className="font-medium flex text-[#84CC16] text-xl py-3 items-center hover:text-blue-600 hover:scale-105 transition-all duration-300 ease-in-out transform"
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          >
             {currentLanguage=== "en" ? "English" : currentLanguage === "mr" ? "मराठी" : "தமிழ்"}
            <ChevronDown className="w-4 h-4" />
          </button>
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10">
              {["en", "mr", "tm"].map((language) => (
                <button
                  key={language}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => changeLanguage(language)}
                >
                   {language === "en" ? "English" : language === "mr" ? "मराठी" : "தமிழ்"}
                </button>
              ))}
            </div>
          )}
        </div>
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
                  <button onClick={logOut} className="py-2 text-gray-700 hover:text-blue-600">
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

