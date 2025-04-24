import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";

// Replace with your actual food images
import appetizer1 from "../../assets/scooty1.jpg";
import appetizer2 from "../../assets/scooty2.jpg";
import appetizer3 from "../../assets/scooty3.jpg";

const menuItems = [
  {
    id: 7,
    name: "Truffle Arancini",
    price: 24,
    image: appetizer1,
    category: "Appetizer",
    prepTime: "25 min",
    rating: 4.9,
    description: "Black truffle infused risotto balls with mozzarella center",
    tags: ["Signature", "Vegetarian"],
    aosDelay: "0",
  },
  {
    id: 8,
    name: "Seared Scallops",
    price: 32,
    image: appetizer2,
    category: "Seafood",
    prepTime: "20 min",
    rating: 4.8,
    description: "Pan-seared scallops with cauliflower purée and bacon crumble",
    tags: ["Chef's Choice", "Gluten Free"],
    aosDelay: "500",
  },
  {
    id: 9,
    name: "Wagyu Carpaccio",
    price: 38,
    image: appetizer3,
    category: "Starter",
    prepTime: "15 min",
    rating: 5.0,
    description: "Thinly sliced A5 wagyu with truffle oil and aged parmesan",
    tags: ["Premium", "New"],
    aosDelay: "1000",
  },
];

const FeaturedMenu = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [hoveredItem, setHoveredItem] = useState(null);

  // Load cart and favorites from localStorage on initial render
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setCart(savedCart);
    setFavorites(savedFavorites);
  }, []);

  const addToCart = (item) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Show toast animation (implemented in CSS)
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  };

  const toggleFavorite = (item) => {
    const updatedFavorites = [...favorites];
    const existingIndex = updatedFavorites.findIndex((favItem) => favItem.id === item.id);

    if (existingIndex >= 0) {
      updatedFavorites.splice(existingIndex, 1);
    } else {
      updatedFavorites.push(item);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    },
    hover: {
      y: -10,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <div className="py-24 bg-gradient-to-b from-white to-amber-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Heading with animated underline */}
        <div className="text-center mb-16 relative">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
              Seasonal Specialties
            </span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-amber-500 mx-auto"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Exquisite flavors crafted with passion. Our chef's selection of premium dishes 
            made with locally-sourced seasonal ingredients.
          </motion.p>
        </div>

        {/* Filter menu */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {["All", "Appetizer", "Seafood", "Starter"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedFilter === filter
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/30"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Menu items grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {menuItems
            .filter(item => selectedFilter === "All" || item.category === selectedFilter)
            .map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 relative"
            >
              {/* Food image with overlay */}
              <div className="relative h-60 overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Price tag */}
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full font-bold shadow-lg">
                  ${item.price}
                </div>
                
                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-black/60 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-bold text-gray-800 dark:text-white">
                    {item.name}
                  </h3>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(item)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                  >
                    <FiHeart 
                      className={isFavorite(item.id) ? "fill-red-500 text-red-500" : ""} 
                      size={20} 
                    />
                  </motion.button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {item.description}
                </p>
                
                {/* Details row */}
                <div className="flex items-center justify-between mb-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <span>{item.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{item.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BsStarFill className="text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Add to cart button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(item)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <FiShoppingCart size={18} />
                  <span>Add to Order</span>
                </motion.button>
                
                {/* Animated highlight effect on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none border-2 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredItem === item.id ? 1 : 0,
                    borderColor: ["rgba(245, 158, 11, 0)", "rgba(245, 158, 11, 1)", "rgba(245, 158, 11, 0)"]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all button */}
        <div className="text-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            onClick={goToCart}
            className="bg-gray-800 dark:bg-amber-500 text-white px-8 py-4 rounded-lg font-medium hover:shadow-xl transition-all duration-300"
          >
            View Complete Menu
          </motion.button>
        </div>

        {/* Toast notification */}
        <div id="toast" className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-lg shadow-lg transform translate-y-20 opacity-0 transition-all duration-500 z-50">
          Item added to your order!
        </div>
      </div>
      
      {/* Background decoration elements */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-amber-200 dark:bg-amber-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-amber-300 dark:bg-amber-800/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      {/* Add this CSS to your global styles for the animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: scale(1);
          }
          33% {
            transform: scale(1.1);
          }
          66% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        #toast.show {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default FeaturedMenu;