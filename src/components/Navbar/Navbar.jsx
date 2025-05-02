import React, { useState, useEffect } from "react";
import { FaUtensils, FaMoon, FaSun } from "react-icons/fa";
import { BiSolidBowlRice } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";
import { IoRestaurant } from "react-icons/io5";
import ResponsiveMenu from "./ResponsiveMenu";

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/#",
    icon: <IoRestaurant />
  },
  {
    id: 2,
    name: "MENU",
    link: "/#menu",
    icon: <BiSolidBowlRice />
  },
  {
    id: 3,
    name: "SPECIALS",
    link: "/#menu",
    icon: <GiKnifeFork />
  },
  {
    id: 4,
    name: "RESERVATIONS",
    link: "/#reservations",
    icon: <FaUtensils />
  },
  {
    id: 5,
    name: "ABOUT",
    link: "/#aboutpage",
    icon: <IoRestaurant />
  },
  {
    id: 6,
    name: "ORDER",
    link: "/#cart",
    icon: <BiSolidBowlRice />
  },
];

const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const handleSignIn = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  return (
    <div 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      } dark:text-white`}
      style={{
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <div 
              className="mr-2 text-amber-500 transform rotate-0 group-hover:rotate-12 transition-all duration-300"
              style={{
                filter: theme === 'dark' ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))' : 'none'
              }}
            >
              <GiKnifeFork size={32} />
            </div>
            <div>
              <span 
                className="text-3xl font-bold font-serif tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #ff7e00, #ff2a00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: theme === 'dark' ? "0 0 15px rgba(255,126,0,0.3)" : "none"
                }}
              >
                Gourmet
              </span>
              <span 
                className="text-3xl font-light font-serif ml-1"
                style={{
                  color: theme === 'dark' ? "#f0f0f0" : "#333",
                }}
              >
                Society
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {Navlinks.map(({ id, name, link, icon }) => (
                <li key={id} className="relative group">
                  <a
                    href={link}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium hover:text-amber-500 transition-colors duration-300"
                  >
                    <span className="text-amber-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300">{icon}</span>
                    <span>{name}</span>
                  </a>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-red-500 group-hover:w-full transition-all duration-300"></div>
                </li>
              ))}
              
{/*               
              <div className="ml-4 flex items-center gap-4">
                
                {isLoggedIn ? (
                  <button
                    onClick={handleSignOut}
                    className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
                    style={{
                      transform: "translateY(0)",
                      boxShadow: theme === 'dark' ? "0 4px 20px rgba(245, 158, 11, 0.3)" : "0 4px 12px rgba(245, 158, 11, 0.2)"
                    }}
                  >
                    Sign Out
                  </button>
                ) : (
                  <a
                    href="#Login"
                    onClick={handleSignIn}
                    className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
                    style={{
                      transform: "translateY(0)",
                      boxShadow: theme === 'dark' ? "0 4px 20px rgba(245, 158, 11, 0.3)" : "0 4px 12px rgba(245, 158, 11, 0.2)"
                    }}
                  >
                    Sign In
                  </a>
                )}
 */}
                {/* Theme Toggle */}
                <div 
                  className="p-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <FaSun className="text-amber-400 hover:rotate-45 transition-transform duration-300" size={20} />
                  ) : (
                    <FaMoon className="text-gray-600 hover:rotate-12 transition-transform duration-300" size={20} />
                  )}
                </div>
              </div>
            </ul>
          </nav>

          {/* Mobile View */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* Dark Mode Toggle */}
            <div 
              className="p-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <FaSun className="text-amber-400" size={20} />
              ) : (
                <FaMoon className="text-gray-600" size={20} />
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="relative w-10 h-10 flex justify-center items-center"
            >
              <div className={`burger-menu ${showMenu ? 'active' : ''}`}>
                <span 
                  className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    showMenu ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                  style={{ marginBottom: "5px" }}
                ></span>
                <span 
                  className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    showMenu ? 'opacity-0' : ''
                  }`}
                  style={{ marginBottom: "5px" }}
                ></span>
                <span 
                  className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    showMenu ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Menu */}
      <ResponsiveMenu 
        showMenu={showMenu} 
        setShowMenu={setShowMenu} 
        isLoggedIn={isLoggedIn}
        handleSignIn={handleSignIn}
        handleSignOut={handleSignOut}
        theme={theme}
      />
    </div>
  );
};

export default Navbar;
