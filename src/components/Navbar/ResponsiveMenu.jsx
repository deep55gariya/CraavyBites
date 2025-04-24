import React, { useEffect, useRef } from "react";
import { FaUserCircle, FaUtensils } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Navlinks } from "./Navbar";

const ResponsiveMenu = ({ showMenu, setShowMenu, isLoggedIn, handleSignIn, handleSignOut, theme }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Re-enable scrolling when menu is closed
      document.body.style.overflow = "auto";
    };
  }, [showMenu, setShowMenu]);

  // Animation variants for menu items
  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <AnimatePresence>
      {showMenu && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setShowMenu(false)}
          />
          
          {/* Menu Panel */}
          <motion.div
            ref={menuRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 dark:text-white shadow-2xl lg:hidden overflow-y-auto"
            style={{
              backgroundImage: theme === 'dark' 
                ? "radial-gradient(circle at top right, rgba(245, 158, 11, 0.1), transparent 70%)"
                : "radial-gradient(circle at top right, rgba(245, 158, 11, 0.05), transparent 70%)"
            }}
          >
            <div className="flex flex-col h-full p-6">
              {/* User Profile Section */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-red-500 flex items-center justify-center text-white overflow-hidden shadow-lg">
                  <FaUserCircle size={30} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {isLoggedIn ? "Chef Thomas" : "Welcome Guest"}
                  </h3>
                  <p className="text-xs text-amber-500 font-medium">
                    {isLoggedIn ? "Premium Member" : "Sign in for benefits"}
                  </p>
                </div>
              </motion.div>
              
              {/* Navigation Links */}
              <nav className="mb-auto">
                <ul className="space-y-1">
                  {Navlinks.map((data, index) => (
                    <motion.li 
                      key={data.id}
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <a 
                        href={data.link} 
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300"
                        onClick={() => setShowMenu(false)}
                      >
                        <span className="text-amber-500">{data.icon}</span>
                        <span className="font-medium">{data.name}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              {/* Sign In/Out Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleSignOut();
                      setShowMenu(false);
                    }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
                  >
                    <FaUtensils className="text-white" size={16} />
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleSignIn();
                      setShowMenu(false);
                    }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
                  >
                    <FaUtensils className="text-white" size={16} />
                    Sign In
                  </button>
                )}
              </motion.div>
              
              {/* Footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400"
              >
                <p>
                  Crafted with <span className="text-red-500">♥</span> by{" "}
                  <a 
                    href="https://deep55gariya.github.io/" 
                    className="text-amber-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Deepak
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;