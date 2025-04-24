import React, { useEffect, useState, useRef } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";


import Signup from './components/Signup';
import Login from './components/Login';

import AOS from "aos";
import "aos/dist/aos.css";

// Component imports
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/Homepage";
import Reservation from "./components/Reservations/Reservation";
import AboutPage from "./components/AboutPage/AboutPage";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";
import ResponsiveMenu from "./components/Navbar/ResponsiveMenu"; // ResponsiveMenu import

const App = () => {

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showMenu, setShowMenu] = useState(false); // Menu ke liye state
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true"); // Track login state
  const menuRef = useRef(null); // Reference for ResponsiveMenu

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    AOS.init({ offset: 100, duration: 800, easing: "ease-in-sine", delay: 100 });
    AOS.refresh();
  }, []);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false); // Close the menu
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Handle Sign out
  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden relative">
        {/* Navbar */}
        <Navbar 
          theme={theme} 
          setTheme={setTheme} 
          setShowMenu={setShowMenu} 
          isLoggedIn={isLoggedIn}
          handleSignOut={handleSignOut} 
        />

        {/* Responsive Menu */}
        {showMenu && (
          <div ref={menuRef}>
            <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
          </div>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage theme={theme} />} />          
          <Route path="/Menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/Reservations" element={<Reservation />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
