import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiChevronDown,
  FiCheck,
  FiMapPin,
  FiUser, // Unused, but keeping as per requirement
  FiCreditCard,
  FiGift, // Unused, but keeping as per requirement
  FiHeart, // Unused, but keeping as per requirement
  FiArrowLeft,
  FiShield,
  FiX, // For closing toast/modal
  FiInfo, // For info toast
  FiAlertTriangle, // For error toast
  FiShoppingCart // Added for empty cart icon
} from "react-icons/fi";

// Helper functions for Local Storage
const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key “${key}”:`, error);
    return defaultValue;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing localStorage key “${key}”:`, error);
  }
};


const CartPage = () => {
  const navigate = useNavigate();

  // --- State Declarations ---
  const [cartItems, setCartItems] = useState(() => loadFromLocalStorage("cart", []));
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(() => loadFromLocalStorage("appliedCoupon", null));
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // FIX: Persist addresses and selected address ID
  const [addresses, setAddresses] = useState(() => loadFromLocalStorage("addresses", [
    { id: 1, name: "Home", address: "123 Gourmet Avenue, Culinary District", isDefault: true },
    { id: 2, name: "Office", address: "456 Flavor Street, Gastronomy Tower, Floor 12", isDefault: false },
  ]));
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
      const savedId = loadFromLocalStorage("selectedAddressId", null);
      const loadedAddresses = loadFromLocalStorage("addresses", []); // Load again to check consistency
      if (savedId && loadedAddresses.some(addr => addr.id === savedId)) {
          return savedId;
      }
      const defaultAddress = loadedAddresses.find(addr => addr.isDefault);
      return defaultAddress ? defaultAddress.id : (loadedAddresses.length > 0 ? loadedAddresses[0].id : null);
  });

  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [orderForSomeoneElse, setOrderForSomeoneElse] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // FIX: Update activeStep based on state
  const [activeStep, setActiveStep] = useState(1);

  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: "", address: "", isDefault: false });

  // FIX: State for toast notifications
  const [toastInfo, setToastInfo] = useState({ show: false, message: "", type: "info" }); // types: 'info', 'success', 'error'

  // Refs
  const addressDropdownRef = useRef(null);
  const couponInputRef = useRef(null); // Currently unused, but kept for potential future focus logic
  const toastTimeoutRef = useRef(null);

  // --- Derived State & Calculations (Memoized) ---
  const subtotal = useMemo(() =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const calculatedDiscount = appliedCoupon.type === "percentage"
      ? (subtotal * appliedCoupon.value) / 100
      : appliedCoupon.value;
    // Ensure discount doesn't exceed subtotal
    return Math.min(calculatedDiscount, subtotal);
  }, [appliedCoupon, subtotal]);

  const deliveryFee = useMemo(() => (subtotal > 100 || subtotal === 0 ? 0 : 5.99), [subtotal]);
  const serviceFee = useMemo(() => (subtotal > 0 ? 2.99 : 0), [subtotal]);

  const grandTotal = useMemo(() => {
    const total = subtotal - discount + deliveryFee + serviceFee;
    return Math.max(0, total); // Ensure total doesn't go below zero
  }, [subtotal, discount, deliveryFee, serviceFee]);

  const totalCartQuantity = useMemo(() =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const selectedAddress = useMemo(() =>
    addresses.find(address => address.id === selectedAddressId),
    [addresses, selectedAddressId]
  );

  // --- Effects ---

  // Update active step based on cart state and payment processing
  useEffect(() => {
    if (isPaymentProcessing) {
      setActiveStep(3);
    } else if (cartItems.length > 0) {
      setActiveStep(2); // Assume Step 2 (Delivery Details) is relevant if cart has items
    } else {
      setActiveStep(1); // Back to Step 1 if cart is empty
    }
  }, [cartItems.length, isPaymentProcessing]);


  // Persist cartItems to localStorage
  useEffect(() => {
    saveToLocalStorage("cart", cartItems);
    if (cartItems.length === 0) {
        // Optionally clear coupon if cart becomes empty
        // removeCoupon(); // Uncomment if this behaviour is desired
    }
  }, [cartItems]);

  // Persist appliedCoupon to localStorage
  useEffect(() => {
    if (appliedCoupon) {
      saveToLocalStorage("appliedCoupon", appliedCoupon);
    } else {
      localStorage.removeItem("appliedCoupon");
    }
  }, [appliedCoupon]);

  // Persist addresses to localStorage
  useEffect(() => {
    saveToLocalStorage("addresses", addresses);
  }, [addresses]);

  // Persist selectedAddressId to localStorage
  useEffect(() => {
    if (selectedAddressId !== null) {
        saveToLocalStorage("selectedAddressId", selectedAddressId);
    } else {
        localStorage.removeItem("selectedAddressId"); // Clear if null (e.g., no addresses left)
    }
  }, [selectedAddressId]);


  // Handle clicks outside the address dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addressDropdownRef.current && !addressDropdownRef.current.contains(event.target)) {
        setShowAddressDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle toast auto-hide
  useEffect(() => {
    if (toastInfo.show) {
      // Clear any existing timeout
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      // Set new timeout
      toastTimeoutRef.current = setTimeout(() => {
        setToastInfo(prev => ({ ...prev, show: false }));
      }, 3000); // Hide after 3 seconds
    }
    // Cleanup timeout on unmount or if toast is hidden manually
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [toastInfo.show]);


  // --- Functions ---

  // Show toast message
  const showToast = useCallback((message, type = 'info') => {
    setToastInfo({ show: true, message, type });
  }, []);

  // Hide toast message
  const hideToast = useCallback(() => {
    if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
    }
    setToastInfo(prev => ({ ...prev, show: false }));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((id, amount) => {
    setCartItems(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + amount) } // Prevent negative quantity
          : item
      ).filter(item => item.quantity > 0) // Remove items with quantity 0
    );
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((id) => {
    setCartItems(prevCart => prevCart.filter(item => item.id !== id));
    showToast("Item removed from cart.", "info");
  }, [showToast]);

   // Clear all items from cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    removeCoupon(); // Also remove coupon when clearing cart
    showToast("Cart cleared.", "info");
  }, [showToast]); // Added removeCoupon dependency indirectly via useCallback

  // Apply coupon
  const applyCoupon = useCallback(() => {
    if (!couponCode.trim()) {
      showToast("Please enter a coupon code.", "error");
      return;
    }
    setIsApplyingCoupon(true);

    // Simulate API call
    setTimeout(() => {
      const coupons = {
        "WELCOME20": { type: "percentage", value: 20, name: "New User Discount" },
        "CHEF10": { type: "percentage", value: 10, name: "Chef's Special" },
        "FLAT15": { type: "fixed", value: 15, name: "Flat Discount" }
      };

      const enteredCode = couponCode.toUpperCase().trim();
      const coupon = coupons[enteredCode];

      if (coupon) {
        setAppliedCoupon({ ...coupon, code: enteredCode });
        setCouponCode(""); // Clear input field
        showToast(`Coupon "${enteredCode}" applied successfully!`, "success");
      } else {
        // FIX: Use state-based toast instead of direct DOM manipulation
        showToast("Invalid coupon code.", "error");
        // Clear applied coupon just in case (though it shouldn't be set)
        setAppliedCoupon(null);
      }

      setIsApplyingCoupon(false);
    }, 800);
  }, [couponCode, showToast]); // Added dependencies

  // Remove applied coupon
  const removeCoupon = useCallback(() => {
    if (appliedCoupon) {
        setAppliedCoupon(null);
        showToast("Coupon removed.", "info");
    }
  }, [appliedCoupon, showToast]); // Added dependencies

  // Select address
  const selectAddress = useCallback((id) => {
    setSelectedAddressId(id);
    setShowAddressDropdown(false);
  }, []);

  // Handle adding new address
  const handleAddNewAddress = useCallback(() => {
    const trimmedName = newAddress.name.trim();
    const trimmedAddress = newAddress.address.trim();

    if (trimmedName && trimmedAddress) {
      setAddresses(prevAddresses => {
          const newId = prevAddresses.length > 0 ? Math.max(...prevAddresses.map(a => a.id)) + 1 : 1;
          let updatedAddresses = [...prevAddresses];

          // If new address is default, update other addresses
          if (newAddress.isDefault) {
              updatedAddresses = updatedAddresses.map(addr => ({
                  ...addr,
                  isDefault: false
              }));
          }

          const createdAddress = {
              id: newId,
              name: trimmedName,
              address: trimmedAddress,
              isDefault: newAddress.isDefault
          };

          // If no addresses existed before, or if this is the only one, make it selected
          if (updatedAddresses.length === 0 || newAddress.isDefault || selectedAddressId === null) {
              setSelectedAddressId(newId);
          } else if (updatedAddresses.length > 0 && selectedAddressId === null) {
             // If selection was null but addresses existed, select the first one (or this new one)
              setSelectedAddressId(newId);
          }

          return [...updatedAddresses, createdAddress];
      });


      setIsAddressFormOpen(false);
      setNewAddress({ name: "", address: "", isDefault: false }); // Reset form
      showToast("Address added successfully.", "success");
    } else {
        showToast("Please fill in both address name and full address.", "error");
    }
  }, [newAddress, showToast, selectedAddressId]); // Added dependencies

  // Check if proceed button should be enabled
  const canProceed = useMemo(() => {
    if (cartItems.length === 0) return false;
    if (!selectedAddressId) return false; // Must have an address selected
    if (orderForSomeoneElse && (!recipientName.trim() || !recipientPhone.trim())) return false;
    return true;
  }, [cartItems.length, selectedAddressId, orderForSomeoneElse, recipientName, recipientPhone]);


  // Handle proceeding to payment
  const proceedToPayment = useCallback(() => {
    if (!canProceed) return; // Double check if button wasn't disabled correctly

    setIsPaymentProcessing(true);
    setActiveStep(3); // Ensure step 3 is active

    // Simulate processing
    setTimeout(() => {
      setIsPaymentProcessing(false);
      setShowThankYou(true);

      // Order success actions after another delay (to show thank you message)
      setTimeout(() => {
        setShowThankYou(false); // Hide thank you message

        // Clear cart and related state after successful order
        setCartItems([]);
        setAppliedCoupon(null); // Also clear coupon state
        setCouponCode(""); // Clear coupon input if any text remained
        setOrderForSomeoneElse(false); // Reset gift option
        setRecipientName("");
        setRecipientPhone("");
        // Note: We keep addresses and selectedAddressId as they are user profile data

        // Redirect to menu page
        showToast("Order placed successfully! Redirecting...", "success");
        setTimeout(() => navigate("/menu"), 500); // Short delay after toast before navigating

      }, 3000); // Duration thank you message is shown

    }, 2000); // Duration of simulated payment processing
  }, [canProceed, navigate, showToast]); // Added dependencies


  // --- Render Functions ---

  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center justify-center py-16"
        >
          <div className="w-32 h-32 mb-6 opacity-30 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            {/* FIX: Added FiShoppingCart icon */}
            <FiShoppingCart className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-xl text-gray-600 dark:text-gray-300 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Explore our menu to add delicious items</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/menu")}
            className="bg-amber-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
          >
            Browse Menu
          </motion.button>
        </motion.div>
      );
    }

    return (
      <motion.div
        layout // Add layout animation for smoother additions/removals
        className="divide-y divide-gray-100 dark:divide-gray-800"
      >
        <AnimatePresence initial={false}> {/* Disable initial animation for items already present */}
            {cartItems.map((item) => (
            <motion.div
                key={item.id} // Use item.id as key
                layout // Animate layout changes
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }} // Slide out left on removal
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex py-6 first:pt-0 last:pb-0"
            >
                {/* Item image */}
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                <motion.img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    loading="lazy" // Add lazy loading for images
                />
                </div>

                {/* Item details */}
                <div className="ml-4 md:ml-6 flex flex-1 flex-col">
                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                    <h3 className="text-lg font-serif font-bold">
                        {item.name}
                    </h3>
                    <p className="ml-4 flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {item.category}
                    {item.tags && item.tags.length > 0 && (
                    <span className="ml-2 hidden sm:inline"> {/* Hide tags on very small screens */}
                        {item.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-1 mb-1"
                        >
                            {tag}
                        </span>
                        ))}
                    </span>
                    )}
                </p>

                <div className="flex flex-1 items-end justify-between text-sm mt-4">
                    {/* Quantity controls */}
                    <div className="flex items-center">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1} // Disable minus when quantity is 1
                    >
                        <FiMinus size={14} />
                    </motion.button>
                    <span
                        className="mx-3 w-8 text-center font-medium text-gray-800 dark:text-gray-200"
                        aria-live="polite" // Announce quantity changes to screen readers
                    >
                        {item.quantity}
                    </span>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <FiPlus size={14} />
                    </motion.button>
                    </div>

                    {/* Remove button */}
                    <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="flex items-center text-red-500 hover:text-red-600 transition-colors font-medium"
                    >
                    <FiTrash2 size={16} className="mr-1" />
                    <span>Remove</span>
                    </motion.button>
                </div>
                </div>
            </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    );
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }, // Reduced stagger
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  const slideInVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 25 } },
    exit: { x: 30, opacity: 0 }
  };

  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalContentVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { scale: 0.9, opacity: 0 }
  };

  // --- Main Component Return ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 md:py-24 relative"> {/* Added relative for positioning toast */}

        {/* --- Thank You Overlay --- */}
        <AnimatePresence>
          {showThankYou && (
            <motion.div
              variants={modalOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
              aria-labelledby="thank-you-title"
              role="alertdialog" // Use alertdialog for important temporary messages
            >
              <motion.div
                variants={modalContentVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-md mx-auto text-center"
              >
                <div className="mx-auto w-20 h-20 flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-full mb-6">
                  <FiCheck className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 id="thank-you-title" className="text-2xl font-serif font-bold text-gray-800 dark:text-white mb-3">
                  Order Confirmed!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your gourmet experience is being prepared. You'll receive updates shortly.
                </p>
                <motion.div
                  className="h-2 bg-green-500 rounded-full overflow-hidden" // Added overflow hidden for progress bar
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.8, ease: "linear" }} // Use linear ease for steady progress
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Back Button --- */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate("/menu")}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 mb-8 transition-colors group" // Added group for potential icon styling on hover
        >
          <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
          <span>Continue Shopping</span>
        </motion.button>

        {/* --- Page Title --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent pb-2"> {/* Added pb-2 for better spacing */}
            Your Gourmet Selection
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="h-1 bg-amber-500 mx-auto my-4 rounded-full" // Added rounded-full
          />
        </motion.div>

        {/* --- Order Progress Steps --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="flex justify-between relative items-start"> {/* Align items start */}
            {/* Progress line */}
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"> {/* Added overflow hidden */}
              <motion.div
                className="h-full bg-amber-500 rounded-full"
                initial={{ width: "0%" }}
                // FIX: Animate width based on activeStep state
                animate={{ width: activeStep === 1 ? "0%" : activeStep === 2 ? "50%" : "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            {/* Steps */}
            {[
              { step: 1, label: "Review Order" },
              { step: 2, label: "Delivery Details" },
              { step: 3, label: "Payment" },
            ].map(({ step, label }) => (
              <div key={step} className="flex flex-col items-center z-10 text-center w-1/3 px-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-white transition-colors duration-300 ${activeStep >= step ? "bg-amber-500" : "bg-gray-300 dark:bg-gray-600"}`}>
                  {step}
                </div>
                <span className={`mt-2 text-xs sm:text-sm font-medium transition-colors duration-300 ${activeStep >= step ? "text-amber-600 dark:text-amber-400" : "text-gray-500 dark:text-gray-400"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- Main Content Area --- */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:gap-8">

            {/* --- Left Column (Cart Items, Address, Gifting) --- */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit" // Add exit animation
              className="lg:flex-1 space-y-8" // Added space-y for consistent spacing
            >
              {/* Cart items */}
              <motion.section
                variants={itemVariants}
                aria-labelledby="cart-items-heading"
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              >
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <h2 id="cart-items-heading" className="text-xl font-semibold text-gray-800 dark:text-white">
                    Cart Items ({totalCartQuantity})
                  </h2>
                  {cartItems.length > 0 && (
                    <button
                      onClick={clearCart} // Use clearCart function
                      className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors font-medium flex items-center"
                    >
                      <FiTrash2 className="mr-1" /> Clear All
                    </button>
                  )}
                </div>
                {renderCartItems()}
              </motion.section>

              {/* Order for someone else */}
              {cartItems.length > 0 && (
                <motion.section
                  variants={itemVariants}
                  aria-labelledby="gifting-heading"
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 id="gifting-heading" className="text-lg font-medium text-gray-800 dark:text-white">
                      Is this a gift?
                    </h2>
                    <label htmlFor="orderForSomeoneElseToggle" className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="orderForSomeoneElseToggle"
                        className="sr-only peer"
                        checked={orderForSomeoneElse}
                        onChange={(e) => setOrderForSomeoneElse(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 sr-only">Order for someone else toggle</span>
                    </label>
                  </div>

                  <AnimatePresence>
                    {orderForSomeoneElse && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div>
                            <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Recipient Name*
                            </label>
                            <input
                              type="text"
                              id="recipientName"
                              value={recipientName}
                              onChange={(e) => setRecipientName(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                              placeholder="Enter recipient's name"
                              required={orderForSomeoneElse} // Mark as required when visible
                              aria-required={orderForSomeoneElse}
                            />
                          </div>
                          <div>
                            <label htmlFor="recipientPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Recipient Phone*
                            </label>
                            <input
                              type="tel"
                              id="recipientPhone"
                              value={recipientPhone}
                              onChange={(e) => setRecipientPhone(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                              placeholder="Enter phone number"
                              required={orderForSomeoneElse} // Mark as required when visible
                              aria-required={orderForSomeoneElse}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          We'll send order status updates to this number. Fields marked * are required.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.section>
              )}

              {/* Delivery Address */}
              {cartItems.length > 0 && (
                <motion.section
                  variants={itemVariants}
                  aria-labelledby="delivery-address-heading"
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
                >
                  <h2 id="delivery-address-heading" className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                    Delivery Address
                  </h2>

                  {addresses.length === 0 ? (
                     <div className="text-center py-6 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">No addresses found.</p>
                        <button
                            onClick={() => setIsAddressFormOpen(true)}
                            className="inline-flex items-center px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors text-sm font-medium"
                        >
                            <FiPlus className="mr-2" />
                            Add New Address
                        </button>
                     </div>
                  ) : (
                    <div className="relative" ref={addressDropdownRef}>
                        <button
                        onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                        aria-haspopup="listbox" // Indicate it controls a listbox
                        aria-expanded={showAddressDropdown} // Indicate expanded state
                        className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                        {/* FIX: Handle case where selectedAddress might be null/undefined initially or if list is empty */}
                        {selectedAddress ? (
                            <div className="flex items-center overflow-hidden"> {/* Added overflow hidden */}
                                <div className="mr-3 flex-shrink-0 bg-amber-100 dark:bg-amber-800 rounded-full p-2">
                                    <FiMapPin className="text-amber-600 dark:text-amber-300" />
                                </div>
                                <div className="flex-grow overflow-hidden"> {/* Added overflow hidden */}
                                    <p className="font-medium text-gray-800 dark:text-white truncate"> {/* Added truncate */}
                                    {selectedAddress.name}
                                    {selectedAddress.isDefault && (
                                        <span className="ml-2 text-xs py-0.5 px-1.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full whitespace-nowrap"> {/* Added whitespace-nowrap */}
                                        Default
                                        </span>
                                    )}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate"> {/* Added truncate */}
                                    {selectedAddress.address}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <div className="mr-3 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                                    <FiMapPin />
                                </div>
                                <span>Select an address</span>
                            </div>
                        )}
                        <FiChevronDown className={`text-gray-500 transition-transform duration-300 flex-shrink-0 ml-2 ${showAddressDropdown ? "transform rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                        {showAddressDropdown && (
                            <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-30 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                            role="listbox" // ARIA role for the dropdown list
                            >
                            <div className="max-h-64 overflow-y-auto py-2">
                                {addresses.map((address) => (
                                <div
                                    key={address.id}
                                    onClick={() => selectAddress(address.id)}
                                    role="option" // ARIA role for each item
                                    aria-selected={selectedAddressId === address.id} // Indicate selected state
                                    className={`px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between ${
                                    selectedAddressId === address.id
                                        ? "bg-amber-50 dark:bg-amber-900/30" // Adjusted dark mode selection color
                                        : ""
                                    }`}
                                >
                                    <div className="overflow-hidden"> {/* Added overflow hidden */}
                                    <p className="font-medium text-gray-800 dark:text-white truncate"> {/* Added truncate */}
                                        {address.name}
                                        {address.isDefault && (
                                        <span className="ml-2 text-xs py-0.5 px-1.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full whitespace-nowrap"> {/* Added whitespace-nowrap */}
                                            Default
                                        </span>
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate"> {/* Added truncate */}
                                        {address.address}
                                    </p>
                                    </div>
                                    {selectedAddressId === address.id && (
                                    <FiCheck className="text-amber-500 flex-shrink-0 ml-2" />
                                    )}
                                </div>
                                ))}

                                {/* Add new address option */}
                                <div
                                onClick={() => {
                                    setShowAddressDropdown(false);
                                    setIsAddressFormOpen(true);
                                }}
                                role="option"
                                className="px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center text-amber-600 dark:text-amber-400 font-medium"
                                >
                                <FiPlus className="mr-2" />
                                <span>Add New Address</span>
                                </div>
                            </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                  )}

                  {/* --- New address form modal --- */}
                    <AnimatePresence>
                        {isAddressFormOpen && (
                        <motion.div
                            variants={modalOverlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-60 p-4"
                            aria-labelledby="add-address-heading"
                            role="dialog" // Use dialog role
                            aria-modal="true" // Indicate it's a modal
                        >
                            <motion.div
                            variants={modalContentVariants}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
                            >
                            <div className="flex justify-between items-center mb-6">
                                <h3 id="add-address-heading" className="text-xl font-serif font-bold text-gray-800 dark:text-white">
                                Add New Address
                                </h3>
                                <button
                                    onClick={() => setIsAddressFormOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    aria-label="Close add address form"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); handleAddNewAddress(); }}> {/* Use form element */}
                                <div className="space-y-4">
                                <div>
                                    <label htmlFor="addressName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Address Label*
                                    </label>
                                    <input
                                    type="text"
                                    id="addressName"
                                    value={newAddress.name}
                                    onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                    placeholder="Home, Office, etc."
                                    required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Full Address*
                                    </label>
                                    <textarea
                                    id="fullAddress"
                                    value={newAddress.address}
                                    onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                    placeholder="Enter street, city, state, zip code"
                                    rows={3}
                                    required
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                    id="default-address"
                                    type="checkbox"
                                    checked={newAddress.isDefault}
                                    onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                                    className="h-4 w-4 text-amber-500 border-gray-300 dark:border-gray-600 rounded focus:ring-amber-500 focus:ring-offset-0" // Added dark border and offset
                                    />
                                    <label htmlFor="default-address" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    Set as default address
                                    </label>
                                </div>
                                </div>

                                <div className="flex justify-end mt-6 space-x-3">
                                <button
                                    type="button" // Prevent form submission
                                    onClick={() => setIsAddressFormOpen(false)}
                                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit" // Submit the form
                                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!newAddress.name.trim() || !newAddress.address.trim()} // Disable if fields are empty
                                >
                                    Save Address
                                </button>
                                </div>
                            </form>
                            </motion.div>
                        </motion.div>
                        )}
                    </AnimatePresence>
                </motion.section>
              )}
            </motion.div>

            {/* --- Right Column (Order Summary, Coupon) --- */}
            <motion.div
              variants={slideInVariants}
              initial="hidden"
              animate="visible"
              exit="exit" // Add exit animation
              className="lg:w-96 mt-8 lg:mt-0" // Add margin top for mobile
            >
              <div className="sticky top-8 space-y-8"> {/* Make column sticky, add spacing */}

                {/* Coupon section */}
                {cartItems.length > 0 && (
                  <motion.section
                    layout // Animate layout changes when coupon is applied/removed
                    variants={itemVariants} // Reuse item variant for entrance
                    aria-labelledby="coupon-heading"
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
                  >
                    <h2 id="coupon-heading" className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                      Have a Coupon?
                    </h2>

                    <AnimatePresence mode="wait"> {/* Use mode='wait' for smoother transition */}
                      {appliedCoupon ? (
                        <motion.div
                          key="applied"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 rounded-lg p-3"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center overflow-hidden mr-2"> {/* Added overflow & margin */}
                              <div className="bg-green-100 dark:bg-green-800 rounded-full p-2 mr-3 flex-shrink-0">
                                <FiCheck className="text-green-600 dark:text-green-400" size={16} />
                              </div>
                              <div className="overflow-hidden"> {/* Added overflow */}
                                <span className="block text-sm font-medium text-gray-800 dark:text-white truncate"> {/* Added truncate */}
                                  {appliedCoupon.name}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Code: {appliedCoupon.code}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={removeCoupon}
                              className="text-sm text-red-500 hover:text-red-600 transition-colors flex-shrink-0"
                              aria-label={`Remove coupon ${appliedCoupon.code}`}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="mt-2 text-sm text-green-700 dark:text-green-400 pl-11"> {/* Align with text */}
                            {appliedCoupon.type === "percentage"
                              ? `${appliedCoupon.value}% off applied`
                              : `$${appliedCoupon.value.toFixed(2)} discount applied`}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                          <div className="relative">
                            <input
                              type="text"
                              ref={couponInputRef} // Ref is kept, though not actively used for focus here
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              onKeyDown={(e) => { if (e.key === 'Enter') applyCoupon(); }} // Apply on Enter key
                              className="w-full pl-4 pr-24 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                              placeholder="Enter coupon code"
                              aria-label="Coupon code"
                            />
                            <button
                              onClick={applyCoupon}
                              disabled={!couponCode.trim() || isApplyingCoupon}
                              className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                                couponCode.trim() && !isApplyingCoupon
                                  ? "bg-amber-500 text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {isApplyingCoupon ? (
                                <span className="flex items-center justify-center w-12"> {/* Fixed width */}
                                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                </span>
                              ) : (
                                <span className="w-12 text-center">Apply</span> /* Fixed width */
                              )}
                            </button>
                          </div>

                           {/* Suggestion Buttons */}
                           <div className="flex flex-wrap gap-2 mt-3">
                                {[ "WELCOME20", "CHEF10", "FLAT15"].map(code => (
                                    <button
                                        key={code}
                                        onClick={() => setCouponCode(code)}
                                        className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500"
                                        aria-label={`Use coupon code ${code}`}
                                    >
                                        {code}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.section>
                )}

                {/* Order summary */}
                <motion.section
                    layout // Animate layout changes
                    variants={itemVariants} // Reuse item variant
                    aria-labelledby="order-summary-heading"
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
                >
                  <h2 id="order-summary-heading" className="text-xl font-semibold text-gray-800 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                    Order Summary
                  </h2>

                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">
                        Your summary will appear here once you add items.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 mb-6"> {/* Reduced spacing */}
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                          <span className="text-gray-800 dark:text-gray-200">${subtotal.toFixed(2)}</span>
                        </div>

                        {discount > 0 && (
                          <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                            <span>Discount ({appliedCoupon?.code})</span>
                            <span>-${discount.toFixed(2)}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                          <span className="text-gray-800 dark:text-gray-200">
                            {deliveryFee === 0 ? (
                              <span className="text-green-600 dark:text-green-400">Free</span>
                            ) : (
                              `$${deliveryFee.toFixed(2)}`
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Service Fee</span>
                          <span className="text-gray-800 dark:text-gray-200">${serviceFee.toFixed(2)}</span>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4 flex justify-between">
                          <span className="text-lg font-semibold text-gray-800 dark:text-white">Grand Total</span>
                          <motion.span
                            key={grandTotal} // Re-trigger animation when total changes
                            initial={{ scale: 1.1, color: "#f59e0b" }} // Amber color
                            animate={{ scale: 1, color: document.documentElement.classList.contains('dark') ? '#FFF' : '#1f2937' }} // Animate to text color based on theme
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="text-lg font-bold text-gray-900 dark:text-white"
                          >
                            ${grandTotal.toFixed(2)}
                          </motion.span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center text-sm text-green-600 dark:text-green-400 mb-6">
                        <FiShield className="mr-2 flex-shrink-0" />
                        <span>100% Secure Payment Gateway</span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!canProceed || isPaymentProcessing}
                        onClick={proceedToPayment}
                        className={`w-full py-3.5 rounded-lg flex items-center justify-center gap-2 font-medium text-lg transition-all duration-200 ${
                          canProceed && !isPaymentProcessing
                            ? "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {isPaymentProcessing ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <>
                            <FiCreditCard size={20} />
                            <span>Proceed to Pay</span>
                          </>
                        )}
                      </motion.button>

                      {/* Payment method icons */}
                      <div className="flex flex-wrap gap-2 justify-center mt-4 opacity-70">
                        {["visa", "mastercard", "amex", "paypal", "apple-pay"].map((payment) => (
                          <div
                            key={payment}
                            aria-label={`${payment} accepted`}
                            className="h-6 w-10 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center text-xs text-gray-500 dark:text-gray-400"
                          >
                           {/* Placeholder for actual icons/images */}
                           <span className="sr-only">{payment}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.section>

              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- Animated background elements (decorative) --- */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-200 dark:bg-amber-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-amber-300 dark:bg-amber-800/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-100 dark:bg-amber-700/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* --- Toast Notification --- */}
      <AnimatePresence>
        {toastInfo.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`fixed bottom-8 right-8 z-50 p-4 rounded-lg shadow-lg flex items-center max-w-sm w-full ${
              toastInfo.type === 'success' ? 'bg-green-500 text-white' :
              toastInfo.type === 'error' ? 'bg-red-500 text-white' :
              'bg-gray-800 text-white dark:bg-gray-700'
            }`}
            role="alert" // Use alert role for notifications
            aria-live="assertive" // Ensures screen readers announce the message immediately
          >
            <div className="flex-shrink-0 mr-3">
              {toastInfo.type === 'success' && <FiCheck size={20} />}
              {toastInfo.type === 'error' && <FiAlertTriangle size={20} />}
              {toastInfo.type === 'info' && <FiInfo size={20} />}
            </div>
            <div className="flex-grow text-sm font-medium">{toastInfo.message}</div>
            <button
              onClick={hideToast}
              className="ml-4 flex-shrink-0 p-1 rounded-full hover:bg-black/20 transition-colors"
              aria-label="Close notification"
            >
              <FiX size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- Animations CSS (using style jsx for simplicity here) --- */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 12s infinite ease-in-out;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        /* Improve focus visibility for accessibility */
        *:focus-visible {
            outline: 2px solid ${document.documentElement.classList.contains('dark') ? '#FDBA74' : '#F59E0B'}; /* Amber color */
            outline-offset: 2px;
            border-radius: 4px; /* Optional: match border-radius */
        }
        /* Remove default outline when focus-visible is supported */
        *:focus:not(:focus-visible) {
            outline: none;
        }

      `}</style>
    </div>
  );
};

export default CartPage;